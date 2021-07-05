using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DebtTracker.Models;
using Microsoft.AspNet.Identity;
using Kendo.Mvc.UI;
using System.Net.Mail;
using System.IO;
using System.Text;
using System.Runtime.Serialization.Json;

namespace DebtTracker.Controllers
{
	public class HomeController : Controller
	{
		private DebtTrackerEntities entities = new DebtTrackerEntities();

		#region SETTING FOR USER

		public int SetForuser(string userId)
		{
			if (String.IsNullOrEmpty(userId) || entities.AspNetUsers.Where(x => x.Id == userId).ToList().Count == 0)
			{
				return 0;
			}
			else
			{
				Session["forUser"] = userId;
				return 1;
			}
		}
		
		private bool IsSetForUser()
		{
			if (Request.IsAuthenticated)
			{
				string currentUserId = User.Identity.GetUserId();
				bool found = false;
				foreach (string userId in System.Configuration.ConfigurationManager.AppSettings.Get("ForUserIds").Split(';'))
				{
					if (currentUserId == userId)
					{
						Session["forUser"] = currentUserId;
						found = true;
						Session["isSpecial"] = true;
						break;
					}
				}
				if (!found)
				{
					object forUser = Session["forUser"];
					//Mama ili Tata
					if (forUser == null)
					{
						return false;
					}
					else
					{
						string fUser = forUser.ToString();
						string fUsername = entities.AspNetUsers.Where(x => x.Id == fUser).ToList().ElementAt(0).UserName;
						Session["isSpecial"] = false;
						Session["forUserName"] = fUsername;
						return true;
					}
				}
				return true;
			}
			else
			{
				Session["forUser"] = null;
				return true;
			}
		}

		#endregion

		#region UPLOAD

		public ActionResult Save(IEnumerable<HttpPostedFileBase> files)
		{
			try
            {
				var errorMessages = new List<string>();
				var countSuccess = 0;
				var debtTypes = entities.DebtType.ToList();

				if (files != null)
				{
					foreach (var file in files)
					{
						var streamReader = new StreamReader(file.InputStream, System.Text.Encoding.Default);
						var stream = streamReader.ReadToEnd();
						var content = HttpUtility.UrlDecode(stream);
						var result = Utils.ProcessCSV(content, debtTypes, Session["forUser"]?.ToString(), User.Identity.GetUserId());

						foreach (var debt in result.Item1)
						{
							entities.Debt.Add(debt);
						}
						countSuccess += result.Item1.Count;
						errorMessages.AddRange(result.Item2);
					}
					entities.SaveChanges();
				}

				// Return an empty string to signify success
				return Json(new
				{
					countSuccess,
					errorMessages
				});
			}
			catch (Exception ex)
            {
				throw;

				return Json(new
				{
					countSuccess = 0,
					errorMessages = new List<string> { ex.Message }
				});
			}			
		}

		public ActionResult UploadCSV(IEnumerable<HttpPostedFileBase> files, string metaData)
		{
			if (metaData == null)
			{
				return Save(files);
			}

			var ms = new MemoryStream(Encoding.UTF8.GetBytes(metaData));
			var serializer = new DataContractJsonSerializer(typeof(ChunkMetaData));
			ChunkMetaData somemetaData = serializer.ReadObject(ms) as ChunkMetaData;
			string path = String.Empty;
			// The Name of the Upload component is "files"
			if (files != null)
			{
				foreach (var file in files)
				{
					//path = Path.Combine(Server.MapPath("~/App_Data"), somemetaData.FileName);

					//AppendToFile(path, file.InputStream);
				}
			}

			var fileBlob = new Models.FileResult();
			fileBlob.uploaded = somemetaData.TotalChunks - 1 <= somemetaData.ChunkIndex;
			fileBlob.fileUid = somemetaData.UploadUid;

			return Json(fileBlob);
		}

		public ActionResult Remove(string[] fileNames)
		{
			// The parameter of the Remove action must be called "fileNames"

			if (fileNames != null)
			{
				foreach (var fullName in fileNames)
				{
					var fileName = Path.GetFileName(fullName);
					var physicalPath = Path.Combine(Server.MapPath("~/App_Data"), fileName);

					// TODO: Verify user permissions

					if (System.IO.File.Exists(physicalPath))
					{
						// The files are not actually removed in this demo
						// System.IO.File.Delete(physicalPath);
					}
				}
			}

			// Return an empty string to signify success
			return Content("");
		}

		#endregion

		#region PAGES

		public ActionResult Index()
		{
			if (!IsSetForUser())
			{
				return RedirectToAction("SelectUser");
			}
			return View();
		}

		[Authorize]
		public ActionResult SelectUser()
		{
			return View();
		}

		[Authorize]
		public ActionResult AllPaidDebts()
		{
			if (!IsSetForUser())
			{
				return RedirectToAction("SelectUser");
			}
			//object forUser = Session["forUser"];
			////Mama ili Tata
			//if (forUser == null)
			//{
			//	return RedirectToAction("SelectUser");
			//}

			return View();
		}

		[Authorize]
		public ActionResult Statistics()
		{
			if (!IsSetForUser())
			{
				return RedirectToAction("SelectUser");
			}

			//object forUser = Session["forUser"];
			////Mama ili Tata
			//if (forUser == null)
			//{
			//	return RedirectToAction("SelectUser");
			//}

			return View();
		}

		#endregion

		#region CRUD

		#region Debts



		public int InsertNewDebt(Debt newDebt)
		{
			if (int.Parse(entities.AspNetUsers.Where(x => x.Id == newDebt.UserOwner).
				ToList().ElementAt(0).AspNetRoles.
				ToList().ElementAt(0).Id) < 3)
			{
				if (newDebt.TypeId == 4)
				{
					newDebt.Ammount *= -1;
				}
				entities.Debt.Add(newDebt);
				entities.SaveChanges();
				try
				{
					SendEmailDebtAdded(newDebt);
				}
				catch (Exception ex)
				{

				}
				return 1;
			}
			else
			{
				return 0;
			}
		}

		public int EditDebt(Debt updatedDebt)
		{
			if (int.Parse(entities.AspNetUsers.Where(x => x.Id == updatedDebt.UserOwner).
			  ToList().ElementAt(0).AspNetRoles.
			  ToList().ElementAt(0).Id) < 3)
			{
				if (updatedDebt.TypeId == 4)
				{
					updatedDebt.Ammount *= -1;
				}
				var originalDebt = entities.Debt.Find(updatedDebt.Id);
				//entities.Debt.Remove(toEdit);
				//entities.Debt.Add
				originalDebt.Description = updatedDebt.Description.Trim();
				originalDebt.Date = updatedDebt.Date;
				originalDebt.RepeatCount =
					entities.PaidDebts.Where(x => x.DebtId == updatedDebt.Id).ToList().Count() +
					updatedDebt.RepeatCount;
				//originalDebt.DoesRepeat = updatedDebt.DoesRepeat;
				if (originalDebt.RepeatCount > 1 && originalDebt.Ammount != updatedDebt.Ammount)
				{
					return -1;
				}
				originalDebt.Ammount = updatedDebt.Ammount;
				originalDebt.TypeId = updatedDebt.TypeId;
				originalDebt.DebtType = entities.DebtType.Find(updatedDebt.TypeId);
				entities.SaveChanges();
				return 1;
			}
			else
			{
				return 0;
			}
		}

		public int DeleteDebt(int debtId, string userId)
		{
			Debt toRemove = entities.Debt.Where(x => x.Id == debtId).ToList().ElementAt(0);
			AspNetUsers user = entities.AspNetUsers.Where(x => x.Id == userId).ToList().ElementAt(0);


			if (toRemove != null && (Int32.Parse(user.AspNetRoles.ToList().ElementAt(0).Id.ToString())) < 3)
			{
				//if debt is repeating, don't delete it from database.
				//Instead, set repeat count to ammout of paid ammounts of that debt so that it doesn't show in unpaid debts any more 
				//but still shows in history
				if (toRemove.DoesRepeat)
				{
					toRemove.RepeatCount = entities.PaidDebts.Where(x => x.DebtId == debtId).ToList().Count;
					if (toRemove.RepeatCount == 0)
					{
						entities.Debt.Remove(toRemove);
					}
				}
				else
				{
					entities.Debt.Remove(toRemove);
				}
				entities.SaveChanges();
				return 1;
			}
			else
			{
				return 0;
			}
		}

		public string GetDebt(int debtId)
		{
			Debt d = entities.Debt.Where(x => x.Id == debtId).ElementAt(0);
			d.Description = d.Description.Trim();
			return JsonUtils.Serialize(entities.Debt.Where(x => x.Id == debtId).ElementAt(0));
		}

		#endregion


		#region Templates

		public int InsertNewTemplate(string Name, string Description, int DebtType, float Ammount, string UserOwner)
		{

			if (int.Parse(entities.AspNetUsers.Where(x => x.Id == UserOwner).
			ToList().ElementAt(0).AspNetRoles.
			ToList().ElementAt(0).Id) < 3)
			{
				if (entities.DebtTemplate.Where(x => x.Name.ToLower().Trim() == Name.ToLower().Trim()).ToList().Count > 0)
				{
					return -1;
				}
				DebtTemplate newTemplate = new DebtTemplate();
				newTemplate.Description = Description;
				newTemplate.UserOwner = UserOwner;
				newTemplate.Name = Name;
				newTemplate.DebtType = DebtType;
				newTemplate.Ammount = Ammount;
				entities.DebtTemplate.Add(newTemplate);
				entities.SaveChanges();
				return 1;
			}
			else
			{
				return 0;
			}
		}

		public string GetTemplates(string ownerId)
		{
			List<DebtTemplate> debtList = entities.DebtTemplate.Where(x => x.UserOwner == ownerId).OrderBy(x => x.Name).ToList();
			List<object> unpaidExpand = new List<object>();
			foreach (DebtTemplate debt in debtList)
			{
				string typeName = entities.DebtType.Where(x => x.Id == debt.DebtType).ToList().ElementAt(0).Description;
				unpaidExpand.Add(new
				{
					Id = debt.Id,
					Name = debt.Name.Trim()
				});
			}
			//return JsonUtils.Serialize(unpaidExpand);

			return JsonUtils.Serialize(unpaidExpand);
		}

		public string GetTemplate(int templateId)
		{
			DebtTemplate template = entities.DebtTemplate.Where(x => x.Id == templateId).ToList().ElementAt(0);
			template.DebtType1 = null;

			return JsonUtils.Serialize(new
			{
				Id = template.Id,
				Ammount = template.Ammount,
				Description = template.Description.Trim(),
				DebtType = template.DebtType,
				DebtTypeDesc = template.DebtType1.Description.Trim()
			});
		}

		public int DeleteTemplate(int templateId)
		{
			entities.DebtTemplate.Remove(entities.DebtTemplate.Where(x => x.Id == templateId).ToList().ElementAt(0));
			entities.SaveChanges();
			return 1;
		}

		#endregion


		#region Pay, get unpaid etc.


		public int PayUnpaid(string ownerId)
		{
			if (int.Parse(entities.AspNetUsers.Where(x => x.Id == ownerId).
			ToList().ElementAt(0).AspNetRoles.
			ToList().ElementAt(0).Id) < 2)
			{				
				try
				{
					List<getUnpaidDebts_Result> unpaid = entities.getUnpaidDebts(ownerId).ToList();
					double debtAmmount = 0;
					foreach (getUnpaidDebts_Result debt in unpaid)
					{
						debtAmmount += debt.Ammount;
					}

					SendEmailPaidUnpaid(ownerId);
					entities.payUnpaid(ownerId);

					if (debtAmmount < 0)
					{
						Debt previousMonthDebt = new Debt();
						previousMonthDebt.Ammount = debtAmmount * -1;
						previousMonthDebt.ForUser = ownerId;
						previousMonthDebt.TypeId = 4;
						previousMonthDebt.Description = "Višak od prošlog mjeseca";
						previousMonthDebt.UserOwner = ownerId;
						previousMonthDebt.DoesRepeat = false;
						previousMonthDebt.Date = DateTime.Now;
						InsertNewDebt(previousMonthDebt);
					}
				}
				catch (Exception ex)
				{

				}
				return 1;
			}
			else
			{
				return 0;
			}
		}

		public string GetUnpaidDebts(string userId)
		{
			List<getUnpaidDebts_Result> unpaid = entities.getUnpaidDebts(userId).ToList();
			List<object> unpaidExpand = new List<object>();
			foreach (getUnpaidDebts_Result debt in unpaid)
			{
				string typeName = entities.DebtType.Where(x => x.Id == debt.TypeId).ToList().ElementAt(0).Description;
				unpaidExpand.Add(new
				{
					Id = debt.Id,
					Date = debt.Date,
					Description = debt.Description.Trim(),
					TypeName = typeName.Trim(),
					TypeId = debt.TypeId,
					Ammount = debt.Ammount,
					RepeatCount = debt.RepeatCount
				});
			}
			return JsonUtils.Serialize(unpaidExpand);
		}

		public string GetDebtTypes()
		{
			return JsonUtils.Serialize(entities.DebtType.ToList());
		}

		public string GetPaidDebts(DateTime DateFrom, DateTime DateTo, string forUser)
		{
			List<getPaidDebts_Result> debts = entities.getPaidDebts(DateFrom, DateTo.AddDays(1), forUser).ToList();
			debts.ForEach(x => x.debtName = x.debtName.Trim());
			debts.ForEach(x => x.debtType = x.debtType.Trim());
			return JsonUtils.Serialize(debts);
		}

		public string GetAllDebtDescriptions()
		{
			List<string> allDescs = entities.Debt.Select(x => x.Description.Trim()).Distinct().ToList();
			return JsonUtils.Serialize(allDescs);
		}

		public string GetAllPaidDebts(string forUser)
		{
			return GetPaidDebts(new DateTime(2015, 1, 1), DateTime.Today, forUser);
		}

		#endregion


		#endregion


		#region SENDING EMAIL

		private string _fromEmailAddress = "debttracker@openmailbox.org";
		private string _smtpHost = "in-v3.mailjet.com";
		private string _credentialsUsername = "f21fc2f872cfaee8ba7be04996d6ccad";
		private string _credentialsPassword = "f75b57060ff58ba3474c70a529635c5e";

		public void SendEmailDebtAdded(Debt newDebt)
		{
			System.Globalization.CultureInfo ci = new System.Globalization.CultureInfo("hr-HR");
			var toAddress = entities.AspNetUsers.Where(x => x.Id == newDebt.ForUser).ToList().ElementAt(0).Email;
			var byUser = entities.AspNetUsers.Where(x => x.Id == newDebt.UserOwner).ToList().ElementAt(0).UserName;
            var body = string.Format("Unio korisnik: {0}\r\nDatum: {1}\r\nTrosak: {2}, {3} kn\r\n\r\nUkupno dugovanje: {4} kn",
                byUser,
                newDebt.Date.ToString("d", ci),
                newDebt.Description,
                newDebt.Ammount.ToString("#.00"),
				entities.getUnpaidDebts(newDebt.ForUser).ToList().Sum(x => x.Ammount).ToString("#."));
			var mailMessage = new MailMessage();
			mailMessage.To.Add(new MailAddress(toAddress));
			mailMessage.From = new MailAddress(_fromEmailAddress);
			mailMessage.Subject = "Pratitelj dugova - Dodan novi dug";
			mailMessage.Body = body;
			mailMessage.IsBodyHtml = true;
			//IMPORANT:  Your smtp login email MUST be same as your FROM address.
			var smtp = new SmtpClient
			{
				Host = _smtpHost,
				Port = 587,
				EnableSsl = true,
				DeliveryMethod = SmtpDeliveryMethod.Network,
				UseDefaultCredentials = false,
				Credentials = new System.Net.NetworkCredential(_credentialsUsername, _credentialsPassword)
			};
			using (var message = new MailMessage(mailMessage.From.Address, mailMessage.To.ElementAt(0).Address)
			{
				Subject = mailMessage.Subject,
				Body = mailMessage.Body
			})
			{
				var success = false;
				while (!success)
				{
					try
					{
						smtp.Send(message);
						success = true;
					}
					catch
					{

					}
				}
			}
		}

		public void SendEmailPaidUnpaid(string forUser)
		{
			System.Globalization.CultureInfo ci = new System.Globalization.CultureInfo("hr-HR");
			var byUser = entities.AspNetUsers.Where(x => x.Id == forUser).ToList().ElementAt(0).UserName;
			var body = string.Format("{0} je podmirio sve dugove u iznosu od {1} kn.",
				byUser,
				entities.getUnpaidDebts(forUser).Where(d => d.Ammount > 0).ToList().Sum(x => x.Ammount).ToString("#."));
            if (entities.getUnpaidDebts(forUser).ToList().Sum(x => x.Ammount) < 0)
            {
                body = string.Format("{0} je podmirio sve dugove u iznosu od {1} kn. Višak u iznosu od {2} kn je prebačen na sljedeći mjesec.",
                byUser,
                entities.getUnpaidDebts(forUser).Where(d => d.Ammount > 0).ToList().Sum(x => x.Ammount).ToString("#."),
                entities.getUnpaidDebts(forUser).ToList().Sum(x => x.Ammount).ToString("#."));
            }
			var mailMessage = new MailMessage();
			mailMessage.To.Add(new MailAddress("ljerka.rudman@gmail.com"));
			mailMessage.To.Add(new MailAddress("zrudman7@gmail.com"));
			mailMessage.From = new MailAddress(_fromEmailAddress);
			mailMessage.Subject = "Pratitelj dugova - " + byUser.ToUpper() + " je podirio svoje dugove";
			mailMessage.Body = body;
			mailMessage.IsBodyHtml = true;
			//IMPORANT:  Your smtp login email MUST be same as your FROM address.
			var smtp = new SmtpClient
			{
				Host = _smtpHost,
				Port = 587,
				EnableSsl = true,
				DeliveryMethod = SmtpDeliveryMethod.Network,
				UseDefaultCredentials = false,
				Credentials = new System.Net.NetworkCredential(_credentialsUsername, _credentialsPassword)
			};
			foreach (MailAddress address in mailMessage.To)
			{
				using (var message = new MailMessage(mailMessage.From.Address, address.Address)
				{
					Subject = mailMessage.Subject,
					Body = mailMessage.Body
				})
				{
					var success = false;
					while (!success)
					{
						try
						{
							smtp.Send(message);
							success = true;
						}
						catch
						{

						}
					};
				}
			}
		}

		#endregion

	
	}
}