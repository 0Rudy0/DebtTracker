

//#region Debts

function AddNewDebt() {
	//setLoadingOnGrid();
	//console.log(JSON.stringify({
	//	Description: $("#mainDescInput").data("kendoAutoComplete").value(),
	//	Ammount: $("#mainAmmount").data("kendoNumericTextBox").value(),
	//	Date: $("#mainDatepicker").data("kendoDatePicker").value(),
	//	TypeId: selectedMainDebtType,
	//	DoesRepeat: repeatCount.main == 0 ? false : true,
	//	RepeatCount: repeatCount.main,
	//	ForUser: forUser,
	//	UserOwner: userId
	//}));
	//return;
	$('#mainDebtForm .k-loading-image').css('display', 'block');
	$.ajax({
		url: appName + "/Home/InsertNewDebt",
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		async: true,
		cache: false,
		data: JSON.stringify({
			Description: $("#mainDescInput").data("kendoAutoComplete").value(),
			Ammount: $("#mainAmmount").data("kendoNumericTextBox").value(),
			Date: $("#mainDatepicker").data("kendoDatePicker").value(),
			TypeId: selectedMainDebtType,
			DoesRepeat: repeatCount.main == 0 ? false : true,
			RepeatCount: repeatCount.main,
			ForUser: forUser,
			UserOwner: userId
		}),
		success: function (result) {
			if (result == 1) {
				$('#mainDebtForm .k-loading-image').css('display', 'none');
				Materialize.toast('Dodan novi trošak', 4000);
				getUnpaidDebts();
				resetMainForm();
			}
			else {
				$('#mainDebtForm .k-loading-image').css('display', 'none');
				Materialize.toast('Nemate pravo dodavanja novog troška', 4000);
			}
			//$('.k-loading-mask').css('display', 'none');
			//return result;
		},
		error: function (e) {
			$('#mainDebtForm .k-loading-image').css('display', 'none');
			Materialize.toast('Greška', 4000);
			console.log(e);
			//$('.k-loading-mask').css('display', 'none');
		}
	});
}

function EditDebt() {
	var updatedDebt = {
		Id: currentEditing.Id,
		Description: $('#editDebtModal .descInput').val(),
		Ammount: $("#editAmmount").data("kendoNumericTextBox").value(),
		Date: $("#editDatepicker").data("kendoDatePicker").value(),
		TypeId: selectedEditDebtType,
		DoesRepeat: repeatCount.edit == 0 ? false : true,
		RepeatCount: repeatCount.edit,
		ForUser: forUser,
		UserOwner: userId
	};
	setLoadingOnGrid();
	//$('.k-loading-mask').css('display', 'block');
	$.ajax({
		url: appName + "/Home/EditDebt",
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		async: true,
		cache: false,
		data: JSON.stringify(updatedDebt),
		success: function (result) {
			if (result == 1) {
				Materialize.toast('Izmjenjen trošak.', 4000);
				//$('.k-loading-mask').css('display', 'none');
				getUnpaidDebts();
				//resetMainForm();
				//return result;
			}
			else if (result == -1) {
				Materialize.toast('Ponavljajućem trošku nije moguće izmjeniti iznos', 4000);
				$('.mainGridLoading.k-loading-image').css('display', 'none');
			}
			else {
				Materialize.toast('Nemate pravo izmjene troškova.', 4000);
				$('.mainGridLoading.k-loading-image').css('display', 'none');
			}
		},
		error: function (e) {
			console.log(e);
			Materialize.toast('Greška!', 4000);
			$('.mainGridLoading.k-loading-image').css('display', 'none');
		}
	});
}

function deleteDebt(debtId) {
	setLoadingOnGrid();
	//$('.k-loading-mask').css('display', 'block');
	$.ajax({
		url: appName + "/Home/DeleteDebt",
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		async: true,
		cache: false,
		data: JSON.stringify({
			debtId: debtId,
			userId: userId
		}),
		success: function (result) {
			if (result == 1) {
				Materialize.toast('Izbrisan dug', 4000);
				$("#editDebtModal").data("kendoWindow").close();
				getUnpaidDebts();
				return 1;
			}
			else {
				Materialize.toast('Nemate pravo brisanja troškova', 4000);
				$('.mainGridLoading.k-loading-image').css('display', 'none');
				$("#editDebtModal").data("kendoWindow").close();
				return 0;
			}
		},
		error: function (e) {
			Materialize.toast('Greška!', 4000);
			$('.mainGridLoading.k-loading-image').css('display', 'none');
			console.log(e);
		}
	});
}

function getUnpaidDebts() {
	setLoadingOnGrid();
	$.ajax({
		url: appName + "/Home/GetUnpaidDebts",
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		async: true,
		cache: false,
		data: JSON.stringify({
			userId: forUser
		}),
		success: function (result) {
			initUnpaidGrid(result);
			$('.mainGridLoading.k-loading-image').css('display', 'none');
		},
		error: function (e) {
			console.log(e);
			Materialize.toast('Greška!', 4000);
			$('.mainGridLoading.k-loading-image').css('display', 'none');
			//$('body').html(e.statusText);
		}
	});
}

function getDebt(debtId) {
	$.ajax({
		url: appName + "/Home/GetDebt",
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		async: true,
		cache: false,
		data: JSON.stringify({
			debtId: debtId
		}),
		success: function (result) {
			//for (var i = 0; i < result.length; i++) {
			//	console.log(result[i]);
			//}
			return result;
		},
		error: function (e) {
			console.log(e);
			//$('body').html(e.messageText);
		}
	});
}

function payUnpaid() {
	setLoadingOnGrid();
	$.ajax({
		url: appName + "/Home/PayUnpaid",
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		async: true,
		cache: false,
		data: JSON.stringify({
			ownerId: userId
		}),
		success: function (result) {
			if (result == 1) {
				Materialize.toast('Podmireni svi dugovi.', 5000);
				getUnpaidDebts();
				return 1;
			}
			else {
				Materialize.toast('Nemate pravo podmirivanja dugova.', 5000);
				$('.mainGridLoading.k-loading-image').css('display', 'none');
				return 0;
			}
		},
		error: function (e) {
			console.log(e);
		}
	});
}

function getPaidDebts(dateFrom, dateTo) {
	$('#historyHolder').css('display', 'block');
	$('#loadingHistory').css('display', 'block');
	//var debts = getPaidDebts(dateHistory.from, dateHistory.to);
	$.ajax({
		url: appName + "/Home/GetPaidDebts",
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		async: true,
		cache: false,
		data: JSON.stringify({
			DateFrom: dateHistory.from,
			DateTo: dateHistory.to,
			forUser: forUser
		}),
		success: function (result) {
			if (result.length == 0) {
				Materialize.toast('Učitana je sva povijest', 5000);
				$('#btn-DebtHistory').addClass('disabled');
			}
			dateHistory.to = moment(dateHistory.from);
			dateHistory.from = dateHistory.from.subtract(dateHistory.substractBy, 'M');
			//= dateHistory.to.subtract(dateHistory.substractBy, 'M');
			//console.log(result);
			showFetchedHistory(result);
			$('#loadingHistory').css('display', 'none');
			//return result;
		},
		error: function (e) {
			console.log(e);
		}
	});
}

function GetAllDebtDescriptions() {
	$('#mainDebtForm .k-loading-image').css('display', 'block');
	$.ajax({
		url: appName + '/Home/GetAllDebtDescriptions',
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		async: true,
		cache: true,
		success: function (result) {
			//$("#mainDescInput").kendoAutoComplete({
			//	dataSource: result
			//});
			$('#mainDebtForm .k-loading-image').css('display', 'none');
			$("#mainDescInput").kendoAutoComplete({
				dataSource: {
					data: result
				},
				animation: {
					open: {
						effects: "fade:in",
						duration: 300
					}
				},
				filter: "startswith",
				//minLength: 3,
				select: function () {
					validateMainForm();
					$('#mainDebtForm input.ammount.k-formatted-value').focus();
					//$("#mainDescInput").data("kendoAutoComplete").select(null);
					//$("#mainDescInput").data("kendoAutoComplete").select(undefined);
					//$("#mainDescInput").data("kendoAutoComplete").refresh();
				},
				//change: function (e) {
				//    console.log(this.value());
				//}
			});
			$('.mainCard.row').css('padding-top', '1px');
			//$('#mainDescInput').data('kendoAutoComplete').dataSource.data = result;
			//$('#mainDescInput').data('kendoAutoComplete').dataSource.read();
			//$('#mainDescInput').data('kendoAutoComplete').refresh();
		},
		error: function (e) {
			console.log(e);
			//$('body').html(e.messageText);
		}
	})
}

//#endregion

function InsertNewTemplate() {
	var newTemplate = {
		Name: $('#templateName').val().trim(),
		Description: $("#mainDescInput").data("kendoAutoComplete").value(),
		DebtType: selectedMainDebtType,
		Ammount: $("#mainAmmount").data("kendoNumericTextBox").value(),
		UserOwner: userId
	};
	$('#mainDebtForm .k-loading-image').css('display', 'block');
	$.ajax({
		url: appName + "/Home/InsertNewTemplate",
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		async: true,
		cache: false,
		data: JSON.stringify(newTemplate),
		success: function (result) {
			if (result == 1) {
				GetTemplates();
			}
			else if (result == -1) {
				Materialize.toast('Postoji predložak s istim imenom', 4000);
				$('#mainDebtForm .k-loading-image').css('display', 'none');
			}
			else if (result == 0) {
				Materialize.toast('Nemate pravo dodavanja novog predloška', 4000);
				$('#mainDebtForm .k-loading-image').css('display', 'none');

			}
			//console.log(result);
			//templates = GetTemplates();
			//updateTemplates( result;
		},
		error: function (e) {
			$('#mainDebtForm .k-loading-image').css('display', 'none');
			Materialize.toast('Greška!', 4000);
			console.log(e);
		}
	});
}

function GetTemplates() {
	$('#templateModal .collection').height('auto');
	$.ajax({
		url: appName + "/Home/GetTemplates",
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		async: true,
		cache: false,
		data: JSON.stringify({
			ownerId: userId
		}),
		success: function (result) {
			$('#mainDebtForm .k-loading-image').css('display', 'none');
			updateTemplates(result);
			console.log(result);
			if (result.length > 0) {
				$('#templateModal .collection').height($('#templateModal .collection').height() - 37);
			}
			else {
				$('#templateModal .collection').height($('#templateModal .collection').height() - 9)
			}
			//return result;
		},
		error: function (e) {
			console.log(e);
			//$('body').html(e.messageText);
		}
	});
}

function selectTemplate(template) {
	var templateId = 0;
	for (var i = 0; i < template.attributes.length; i++) {
		if (template.attributes[i].name == 'data-id') {
			templateId = template.attributes[i].value;
		}
	}

	$.ajax({
		url: appName + "/Home/GetTemplate",
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		async: true,
		cache: false,
		data: JSON.stringify({
			templateId: templateId
		}),
		success: function (result) {
			$('#mainDebtForm .descInput').val(result.Description.trim());
			$("#mainAmmount").data("kendoNumericTextBox").value(result.Ammount);
			$('#mainDebtForm a.btn-selectDebtType').html(result.DebtTypeDesc.trim())
			selectedMainDebtType = result.DebtType;
			$('#mainDebtForm .btn-selectDebtType').removeClass('darken-2');
			$('#mainDebtForm .btn-selectDebtType').addClass('darken-3');
			Materialize.toast('Učitan predložak', 4000);
			validateMainForm();
			//console.log(result);
			//return result;
		},
		error: function (e) {
			console.log(e);
		}
	});
}

function deleteTemplate(template) {
	var templateId = 0;
	for (var i = 0; i < template.attributes.length; i++) {
		if (template.attributes[i].name == 'data-id') {
			templateId = template.attributes[i].value;
		}
	}
	$('#confirmText').html('Potvrdi brisanje');
	$('#acceptModal').openModal();
	acceptModal.action = function () {
		$.ajax({
			url: appName + "/Home/DeleteTemplate",
			type: "POST",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			async: true,
			cache: false,
			data: JSON.stringify({
				templateId: templateId
			}),
			success: function (result) {
				GetTemplates();
			},
			error: function (e) {
				console.log(e);
			}
		});
	}

}

