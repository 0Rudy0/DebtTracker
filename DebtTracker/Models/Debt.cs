using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DebtTracker.Models
{
	public class Debt
	{
		public int Id { get; set; }
		public string Description { get; set; }
		public float Ammount { get; set; }
		public DateTime Date { get; set; }
		public bool DoesRepeat { get; set; }
		public int RepeatCount { get; set; }
		public int MyProperty { get; set; }
		public DebtType Type { get; set; }
		public User Owner { get; set; }
		public User ForUser { get; set; }
	}
}