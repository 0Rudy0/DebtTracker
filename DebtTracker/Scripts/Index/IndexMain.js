

$(function () {
	$('.modal-trigger').leanModal();
	if (isAuthenticated) {
		initAll();
	}

	$('#loginButton').click(function () {
		window.location = appName + '/Account/Login';
	});

	$('#regButton').click(function () {
		window.location = appName + '/Account/Register';
	});

})

function openEditForm(e, useOld) {
	if (useOld == undefined ||
        useOld == null ||
        !useOld) {
		var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
		currentEditing = dataItem;
	}
	else {
		dataItem = currentEditing;
	}

	$("#editDebtModal").data("kendoWindow").open();
	if (currentEditing) {
		$('#editDebtModal .descInput').val(dataItem.Description);
		$("#editAmmount").data("kendoNumericTextBox").value(dataItem.Ammount)
		selectedEditDebtType = dataItem.TypeId;
		$('#editDebtModal .btn-selectDebtType').html(dataItem.TypeName);
		repeatCount.edit = dataItem.RepeatCount;
		if (repeatCount.edit == -1) {
			$('#editDatepicker').data('kendoDatePicker').enable(false);
			$('#editDebtModal .btn-selectDebtType').addClass('disabled');

			$('#editDebtModal .btn-repeatDebtCb').removeClass('darken-2');
			$('#editDebtModal .btn-repeatDebtCb').addClass('darken-3');
			$('#editDebtModal .doesRepeatBtnTxt').html('PONAVLJAJ');
			$('#editDebtModal .doesRepeatIcon').html('done');
			$("#editAmmount").data("kendoNumericTextBox").enable(false);
		}
		else if (repeatCount.edit > 0) {
			$('#editDatepicker').data('kendoDatePicker').enable(false);
			$('#editDebtModal .btn-selectDebtType').addClass('disabled');

			$('#editDebtModal .btn-repeatDebtCb').removeClass('darken-2');
			$('#editDebtModal .btn-repeatDebtCb').addClass('darken-3');
			$('#editDebtModal .doesRepeatBtnTxt').html(repeatCount.edit + ' puta');
			$('#editDebtModal .doesRepeatIcon').html('replay');
			$("#editAmmount").data("kendoNumericTextBox").enable(false);
		}
		else {
			$('#editDatepicker').data('kendoDatePicker').enable(true);
			$('#editDebtModal .btn-selectDebtType').removeClass('disabled');

			$('#editDebtModal .btn-repeatDebtCb').removeClass('darken-3');
			$('#editDebtModal .btn-repeatDebtCb').addClass('darken-2');

			$('#editDebtModal .doesRepeatBtnTxt').html('PONAVLJAJ');
			$('#editDebtModal .doesRepeatIcon').html('');
			$("#editAmmount").data("kendoNumericTextBox").enable(true);
		}
		$("#editDatepicker").data("kendoDatePicker").value(dataItem.Date);
	}

	$('.k-overlay').click(function () {
		//alert('');
		$("#editDebtModal").data("kendoWindow").close();
		//$('#editDebtModal').data
	})
}

function updateTemplates(templates) {
	var string = '<a href="#!" id="newTemplate" class="newTemplateText collection-item blue-grey darken-3">' +
		'<i class="material-icons left">add</i>Dodaj kao novi</a> <input value="" id="templateName" placeholder="Ime predloška" />';
	//string += '<li class="divider"></li>';

	for (var i = 0; i < templates.length; i++) {
		string += '<a class="collection-item white-text modal-close blue-grey darken-2"' +
			'href="#!" onclick="selectTemplate(this)" data-id="'
			+ templates[i].Id + '">' + templates[i].Name + '</a>' +
		    '<a href="#" class="btn-deleteTemplate btn blue-grey darken-3" onclick="deleteTemplate(this)" data-id=' + +templates[i].Id + '>OBRIŠI</a>';
		//string += ;
	}
	$('#templateModal .collection').html(string);

	$('#newTemplate').click(function () {
		if (validateMainForm() && $('#templateName').val().trim().length > 0) {
			$('#confirmText').html('Potvrdi unos');
			$('#acceptModal').openModal();
			$('#templateModal').closeModal();
			acceptModal.action = function () {
				InsertNewTemplate();
			}
		}
		else if ($('#templateName').val().trim().length == 0) {
			Materialize.toast('Nije uneseno ime predloška', 3000);
			$('#templateName').css('border', '1px solid red');
			setTimeout(function () {
				$('#templateName').css('border', '1px solid #3b4c54');
			}, 300);
			setTimeout(function () {
				$('#templateName').css('border', '1px solid red');
			}, 600);
			setTimeout(function () {
				$('#templateName').css('border', '1px solid #3b4c54');
			}, 900);
			setTimeout(function () {
				$('#templateName').css('border', '1px solid red');
			}, 1200);
		}
		else {
			$('#templateModal').closeModal();
			Materialize.toast('Nisu ispunjena sva polja', 3000);
		}
	});

	//$('#templateModal .collection').height($('#templateModal .collection').height() - 37);
}



function validateMainForm() {
	var formValid = true;
	if ($("#mainDescInput").data("kendoAutoComplete").value().length <= 0) {
		$('#mainDebtForm .descInput').addClass('invalid');
		$('#mainDebtForm .descInput').removeClass('validInput');
		formValid = false;
	}
	else {
		$('#mainDebtForm .descInput').removeClass('invalid');
		$('#mainDebtForm .descInput').addClass('validInput');
	}
	if ($("#mainAmmount").data("kendoNumericTextBox").value() == 0 ||
        $("#mainAmmount").data("kendoNumericTextBox").value() == null ||
        $("#mainAmmount").data("kendoNumericTextBox").value() == undefined) {
		$('#mainDebtForm span.ammount').addClass('invalid');
		$('#mainDebtForm span.ammount').removeClass('validInput');
		formValid = false;

	}
	else {
		$('#mainDebtForm span.ammount').removeClass('invalid');
		$('#mainDebtForm span.ammount').addClass('validInput');
	}
	if (selectedMainDebtType == null) {
		$('#mainDebtForm a.btn-selectDebtType').addClass('invalid');
		formValid = false;
	}
	else {
		$('#mainDebtForm a.btn-selectDebtType').removeClass('invalid');
	}

	if (formValid) {
		$('#mainDebtForm .btn-addDebt').removeClass('darken-2');
		$('#mainDebtForm .btn-addDebt').addClass('darken-3');
	}
	else {
		$('#mainDebtForm .btn-addDebt').removeClass('darken-3');
		$('#mainDebtForm .btn-addDebt').addClass('darken-2');
	}

	return formValid;
}

function resetMainForm() {
	$("#mainDescInput").data("kendoAutoComplete").value('')
	$("#mainAmmount").data("kendoNumericTextBox").value('0');
	$("#mainDatepicker").data("kendoDatePicker").value(new Date());

	$('#mainDebtForm .btn-selectDebtType').removeClass('darken-3');
	$('#mainDebtForm .btn-selectDebtType').addClass('darken-2');
	$('#mainDebtForm .btn-repeatDebtCb').removeClass('darken-3');
	$('#mainDebtForm .btn-repeatDebtCb').addClass('darken-2');
	$('#mainDebtForm .btn-addDebt').removeClass('darken-3');
	$('#mainDebtForm .btn-addDebt').addClass('darken-2');
	$('#mainDebtForm .descInput').removeClass('validInput');
	$('#mainDebtForm .ammount').removeClass('validInput');
	$('#mainDebtForm .btn-repeatDebtCb').removeClass('darken-3');
	$('#mainDebtForm .btn-repeatDebtCb').addClass('darken-2');
	$('#mainDebtForm .doesRepeatIcon').html('');
	$('#mainDebtForm .doesRepeatBtnTxt').html('Ponavljaj');

	selectedMainDebtType = null;
	repeatCount.main = 0;
	$("input.repeatCount.k-formatted-value").val(2);

	$('#mainDebtForm .btn-selectDebtType').html('Tip troška');
}

function validateEditForm() {
	var formValid = true;
	if ($('#editDebtModal .descInput').val().length <= 0) {
		$('#editDebtModal .descInput').addClass('invalid');
		formValid = false;
	}
	else {
		$('#editDebtModal .descInput').removeClass('invalid');
	}
	if ($("#editAmmount").data("kendoNumericTextBox").value() == 0 ||
		$("#editAmmount").data("kendoNumericTextBox").value() == null) {
		$('#editAmmount').addClass('invalid');
		formValid = false;

	}
	else {
		$('#editDebtModal input.ammount').removeClass('invalid');
	}
	if (selectedEditDebtType == null) {
		$('#editDebtModal a.btn-selectDebtType').addClass('invalid');
		formValid = false;
	}
	else {
		$('#editDebtModal a.btn-selectDebtType').removeClass('invalid');
	}

	if (formValid) {
		$('#editDebtModal .btn-saveChanges').removeClass('darken-2');
		$('#editDebtModal .btn-saveChanges').addClass('darken-3');
	}
	else {
		$('#editDebtModal .btn-saveChanges').removeClass('darken-3');
		$('#editDebtModal .btn-saveChanges').addClass('darken-2');
	}


	return formValid;
}

function setLoadingOnGrid() {
	$('.mainGridLoading.k-loading-image').css('display', 'block');
}

function showFetchedHistory(debts) {
	//var curr
	var oldLenght = groupedDebts.length;
	for (var i = 0; i < debts.length; i++) {
		var found = false;
		for (var j = 0; j < groupedDebts.length; j++) {
			if (debts[i].payDate == groupedDebts[j].date) {
				found = true;
				groupedDebts[j].debts.push(debts[i]);
				groupedDebts[j].total += debts[i].Ammount;
				break;
			}
		}
		if (!found) {
			groupedDebts.push({
				date: debts[i].payDate,
				debts: [debts[i]],
				total: debts[i].Ammount,
				index: -1
			})
		}
	}
	console.log("Grupirani dugovi");
	console.log(groupedDebts);

	for (var i = oldLenght; i < groupedDebts.length; i++) {
		groupedDebts[i].index = i;
		$("<div></div>", {
			"class": "historyItem row row" + i
		}).appendTo("#history");

		$("<div class='col s12 m12'></div>")
			.addClass("col" + i)
			.appendTo("#history .row" + i);

		$("<div class='card brown lighten-2 black-text'></div>")
			.addClass('card' + i)
			.appendTo("#history .row" + i + " .col" + i);

		$("<div class='card-content'></div>")
			.addClass('card-content' + i)
			.appendTo("#history .row" + i + " .col" + i + " .card" + i);

		$("<div class='card-title black-text'>" +
			moment(groupedDebts[i].date).subtract(1, 'M').format("MM") + "/" +
			moment(groupedDebts[i].date).format("MM YYYY") + "</div>")
            .appendTo("#history .row" + i + " .col" + i + " .card" + i + " .card-content" + i);

		$("<p>" + formatFloat(groupedDebts[i].total, 2) + " kn - Podmireno " + moment(groupedDebts[i].date).format('DD.MM.YYYY.') + "</p>")
            .appendTo("#history .row" + i + " .col" + i + " .card" + i + " .card-content" + i);

		$("<a class='btn btn-large modal-trigger brown darken-3 waves-effect btn-showHistoryDetails'>" +
			"<i class='material-icons left'>receipt</i>Detalji</a>")
			.addClass('btn-showHistoryDetails' + i)
            .appendTo("#history .row" + i + " .col" + i + " .card" + i + " .card-content" + i);

		$("<div class='card-action brown darken-3'></div>")
			.addClass('card-action' + i)
			.appendTo("#history .row" + i + " .col" + i + " .card" + i);

		$("<a class='btn btn-large modal-trigger brown darken-2 waves-effect text-white btn-showHistoryDetailsAlt'>" +
			"<i class='material-icons left'>receipt</i>Detalji</a>")
			.addClass('btn-showHistoryDetails' + i)
            .appendTo("#history .row" + i + " .col" + i + " .card" + i + " .card-action" + i);

		//$('<a class="btn btn-large brown darken-1 waves-effect href="#">Detalji</a>')
		//	.addClass('btn-historyDetails' + i)
		//	.appendTo("#history .row" + i + " .col" + i + " .card" + i + " .card-action" + i);

		$('<div id="historyGrid"></div>')
			.addClass('historyGrid' + i)
			.appendTo("#history .row" + i + " .col" + i + " .card" + i + " .card-action" + i);




		$("<div class='modal brown lighten-1'></div>")
            .addClass('historyModal' + i)
            .appendTo("#historyModalsContainer");

		$("<div></div>")
            .addClass('historyGridModal' + i)
            .appendTo('.historyModal' + i);


		$('.btn-showHistoryDetails' + i).click(openHistoryGridModal.bind(groupedDebts[i]));
		//$('.btn-showHistoryDetails' + i).click(initHistoryGrid.bind(groupedDebts[i]));

		//$(".historyGrid" + i).css('display', 'none');

		$(".historyItem.row" + i).animate({
			opacity: '1'
		}, 1000, function () {
			// Animation complete.
		});
	}
}

function showGroupedDebtDetails(groupedDebts) {
	console.log('gg' + groupedDebts);
}

function openHistoryGridModal() {
	var data = this;
	$('.historyModal' + data.index).openModal();
	setTimeout(function () {
		initHistoryGridModal(data);
		resizeWholeGrid();
	}, 300);

}


// ============================================================
//                          MAIN RESIZE
// ============================================================
function resize() {
	if ($(window).width() <= 700) {
		//$('#historyHolder').css('display', 'none');
	}
	else {
		$('#historyHolder').css('display', 'block');
	}
	//return;

	setTimeout(function () {
		//resizeWholeGrid();

		var editModalHeight = 250;
		var endDateModalHeight = 500;

		if ($(window).width() <= 1165) {
			editModalHeight = 390;
			endDateModalHeight = 500;
		}
		if ($(window).width() <= 1100) {
			editModalHeight = 390;
			endDateModalHeight = 500;

		}
		if ($(window).width() < 540) {
			editModalHeight = 450;
			endDateModalHeight = 500;

		}
		if ($(window).width() < 440) {
			editModalHeight = 490;
			endDateModalHeight = 500;
		}

		var width = $(window).width() * 0.95;
		//var height = 500;
		var dialog = $("#editDebtModal").data("kendoWindow");
		if (dialog != undefined) {
			dialog.setOptions({
				position: {
					top: ($(window).height() - editModalHeight) / 2,
					left: ($(window).width() - width) / 2
				},
				width: width,
				height: editModalHeight
			});
		}

		var width = 400;
		//var height = 500;
		var dialog = $("#endDateModal").data("kendoWindow");
		if (dialog != undefined) {
			dialog.setOptions({
				position: {
					top: ($(window).height() - endDateModalHeight) / 2,
					left: ($(window).width() - width) / 2
				},
				width: width,
				height: endDateModalHeight
			});
		}

		var width = 330;
		var height = 330;
		var dialog = $("#selectRepeatCountModal").data("kendoWindow");
		if (dialog != undefined) {
			dialog.setOptions({
				position: {
					top: ($(window).height() - height) / 2,
					left: ($(window).width() - width) / 2
				},
				width: width,
				height: height
			});
		}
	}, 500);

}

function resizeWholeGrid(mainStartIndex, historyStartIndex) {
	return;
	var mainStartIndex = 0;
	var historyStartIndex = 0;
	if ($("#unresolvedDebtsGrid").data('kendoGrid').dataSource.options.group != undefined) {
		mainStartIndex = 0;
	}
	else {

	}
	//return;
	resizeMainGridColumn(0, 120);
	//resizeMainGridColumn(1, 50);
	resizeMainGridColumn(2, 100);
	resizeMainGridColumn(3, 100);
	resizeMainGridColumn(4, 130);

	resizeHistoryGridColumn(1, 120);
	//resizeMainGridColumn(2, 50);
	resizeHistoryGridColumn(3, 100);
	resizeHistoryGridColumn(4, 110);
	//resizeHistoryGridColumn(5, 130);

	if ($('body').width() < 767) {
		resizeMainGridColumn(0, 88);
		//resizeMainGridColumn(1, 50);
		resizeMainGridColumn(2, 65);
		resizeMainGridColumn(3, 80);
		resizeMainGridColumn(4, 100);

		resizeHistoryGridColumn(0, 88);
		//resizeMainGridColumn(1, 50);
		resizeHistoryGridColumn(2, 65);
		resizeHistoryGridColumn(3, 80);
		//resizeHistoryGridColumn(5, 100);
	}
	if ($('body').width() < 550) {
		resizeMainGridColumn(0, 78);
		//resizeMainGridColumn(1, 50);
		resizeMainGridColumn(2, 55);
		resizeMainGridColumn(3, 67);
		resizeMainGridColumn(4, 87);

		resizeHistoryGridColumn(0, 78);
		//resizeMainGridColumn(1, 50);
		resizeHistoryGridColumn(2, 55);
		resizeHistoryGridColumn(3, 67);
		//resizeHistoryGridColumn(5, 87);
	}
	if ($('body').width() < 460) {
		resizeMainGridColumn(0, 67);
		resizeMainGridColumn(1, 70);
		resizeMainGridColumn(2, 47);
		resizeMainGridColumn(3, 57);
		resizeMainGridColumn(4, 80);

		resizeHistoryGridColumn(0, 67);
		resizeHistoryGridColumn(1, 50);
		resizeHistoryGridColumn(2, 47);
		resizeHistoryGridColumn(3, 57);
		//resizeHistoryGridColumn(5, 80);
	}
}

function resizeHistoryGridColumn(idx, width) {
	$("#historyModalsContainer .k-grid-header-wrap") //header
	   .find("colgroup col")
	   .eq(idx)
	   .css({ width: width });

	$("#historyModalsContainer .k-grid-content") //content
	   .find("colgroup col")
	   .eq(idx)
	   .css({ width: width });
}

function resizeMainGridColumn(idx, width) {
	$("#unresolvedDebtsGrid .k-grid-header-wrap") //header
	   .find("colgroup col")
	   .eq(idx)
	   .css({ width: width });

	$("#unresolvedDebtsGrid .k-grid-content") //content
	   .find("colgroup col")
	   .eq(idx)
	   .css({ width: width });
}

//#endregion

