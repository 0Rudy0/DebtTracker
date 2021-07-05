
function initAll() {
	initNumericInputs();
	initDatePickers();
	initClickFunctions();
	initEditDebtWindow();
	getUnpaidDebts();
	initUnpaidGridEmpty();
	resizeWholeGrid();
	GetAllDebtDescriptions();
	//GetTemplates();
}

function initNumericInputs() {
	$("#mainAmmount").kendoNumericTextBox({
		value: 0,
		decimals: 2,
		format: '#.00 kn',
		//placeholder: "Iznos",
		spinners: false
	});
	$("#editAmmount").kendoNumericTextBox({
		value: 0,
		decimals: 2,
		format: '#.00 kn',
		//placeholder: "Iznos",
		spinners: false
	});
	$("#repeatCount").kendoNumericTextBox({
		value: 2,
		decimals: 0,
		min: 2,
		format: '#',
		spinners: false
	});
}

function initDatePickers() {
	$("#mainDatepicker").kendoDatePicker({
		value: new Date(),
		format: "dd.MM.yyyy.",
		position: "top right",
		origin: "bottom right",
	});

	$("#editDatepicker").kendoDatePicker({
		value: new Date(),
		format: "dd.MM.yyyy.",
		position: "top right",
		origin: "bottom right",
	});

	$("#repeatDatepicker").kendoDatePicker({
		format: "dd.MM.yyyy."
	});
	//$('.modal-trigger').leanModal();
	$("#calendar").kendoCalendar({
		start: 'decade',
		depth: 'month',
		change: function () {
			selectedRepeatDate = this.value();
			//console.log(value); //value is the selected date in the calendar				
		}
	});

	//$("#fileTypes").kendoMultiSelect({
	//	dataTextField: "text",
	//	dataValueField: "value",
	//	dataSource: [
	//		{ text: "txt", value: "txt" },
	//		{ text: "csv", value: "csv" }
	//	],
	//	value: ["txt", "csv"],
	//	change: onChange,
	//});
	initUpload();
}

function onChange() {
	var upload = $("#files").getKendoUpload();
	upload.destroy();

	initUpload();
}

function initUpload() {
	var validation = {};
	var filetypes = ['txt', 'csv'];

	validation.maxFileSize = 4194304;
	validation.allowedExtensions = filetypes;

	$("#files").kendoUpload({
		async: {
			chunkSize: 11000,// bytes
			saveUrl: appName + "/Home/UploadCSV",
			removeUrl: "Remove",
			autoUpload: true
		},
		localization: {
			select: '<i class="material-icons left">cloud_upload</i>Priloži CSV'
		},
		validation: validation,
		success: onSuccess,
		error: onError,
		select: onSelect,
		dropZone: ".dropZoneElement"
	}).data("kendoUpload");

	$('.k-dropzone > .k-button.k-upload-button').addClass('modal-trigger btn waves-effect  blue-grey darken-1 waves-light btn btn-large btn-upload')
}

function onSelect() {
	$('#mainDebtForm .k-loading-image').css('display', 'block');
}

function onSuccess(e, a, b) {
	// An array with information about the uploaded files
	var files = e.files;
	$('#mainDebtForm .k-loading-image').css('display', 'none');


	if (e.response.errorMessages.length > 0) {
		for (var i = 0; i < e.response.errorMessages.length; i++) {
			Materialize.toast(e.response.errorMessages[i], 3000);
        }
	}
	if (e.response.countSuccess > 0) {
		Materialize.toast("Uspješno uneseno " + e.response.countSuccess + " troškova." , 10000);
	}
	getUnpaidDebts();
	resetMainForm();
	//debugger;
	//if (e.operation == "upload") {
	//	alert("Successfully uploaded " + files.length + " files");
	//}
}

function onError(e) {
	// An array with information about the uploaded files
	var files = e.files;

	if (e.operation == "upload") {
		Materialize.toast("Došlo je do greške prilikom obrade datoteke", 10000);
		//alert("Failed to upload " + files.length + " files");
	}
}

function initClickFunctions() {

	//#region Focus / Blur on form inputs    

	$("#mainDebtForm input.ammount").focus(function () {
		$("#mainAmmount").data("kendoNumericTextBox").value(0);
		$("#mainDebtForm input.ammount").val('');
	});
	$("#editDebtModal input.ammount").focus(function () {
		$("#editAmmount").data("kendoNumericTextBox").value(0);
		$("#editDebtModal input.ammount").val('');
	});

	$("#mainDebtForm input.descInput").blur(function () {
		validateMainForm();
	});
	$('#mainDescInput').focus(function () {
	    //$("#mainDescInput").data("kendoAutoComplete").value('');
	    validateMainForm();
	});
	$("#mainDebtForm input.ammount").blur(function () {
		if ($("#mainDebtForm input.ammount").val() == '' ||
			$("#mainDebtForm input.ammount").val() == 0 ||
			$("#mainDebtForm input.ammount").val() == null)
			$("#mainDebtForm input.ammount").val('0 kn');
		validateMainForm();
	});


	$("#editDebtModal input.ammount").blur(function () {
		if ($("#editDebtModal input.ammount").val() == '' ||
			$("#editDebtModal input.ammount").val() == 0 ||
			$("#editDebtModal input.ammount").val() == null)
			$("#editDebtModal input.ammount").val('0 kn');
		validateEditForm();
	});

    //#endregion

	//setTimeout(function () {
	//    $('#templateModal .collection').height($('#templateModal .collection').height() - 37);
    //}, 5000);
	$('.btn-selectTemplate').click(function () {
	    if (!adjustedTemplateModalHeight) {
	        if ($('.debtTemplate').length > 0) {
	            $('#templateModal .collection').height($('#templateModal .collection').height() - 37);
	        }
	        else {
	            $('#templateModal .collection').height($('#templateModal .collection').height() - 9)
	        }
	        adjustedTemplateModalHeight = true;
	    }
    });

	//$('#templateModal').openModal();
	//$('#templateModal').closeModal();
	
	$('#newTemplate').click(function () {
	    if (validateMainForm() && $('#templateName').val().trim().length > 0) {
			$('#confirmText').html('Potvrdi unos');
			$('#acceptModal').openModal();
			$('#templateModal').closeModal();
			acceptModal.action = function () {
				InsertNewTemplate();
			}
		}
	    else if ($('#templateName').val().trim().length == 0){
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
	$('#addNewDebtBtn').click(function () {
		Materialize.toast('Dodan novi predložak', 2000);
		console.log('dodan novi predložak');
	});

	$('#btn-addDent').click(function () {
	    if (validateMainForm()) {
	        $('#confirmText').html('Potvrdi dodavanje');
	        $('#acceptModal').openModal();
	        acceptModal.action = function () {
	            AddNewDebt();
	        }
		}
		else {
			Materialize.toast('Nisu ispunjena sva polja.', 5000);
		}
	});

	$('a.mainDebtType').click(function () {
		$('#mainDebtForm .btn-selectDebtType').html(this.innerHTML);
		$('#mainDebtForm .btn-selectDebtType').removeClass('darken-2');
		$('#mainDebtForm .btn-selectDebtType').addClass('darken-3');
		for (var i = 0; i < this.attributes.length; i++) {
			if (this.attributes[i].name == 'data-id') {
				selectedMainDebtType = this.attributes[i].value;
			}
		}
		validateMainForm();
	});
	$('a.editDebtType').click(function () {
		$('#editDebtModal .btn-selectDebtType').html(this.innerHTML);
		for (var i = 0; i < this.attributes.length; i++) {
			if (this.attributes[i].name == 'data-id') {
				selectedEditDebtType = this.attributes[i].value;
			}
		}
	});

	//#region Repeat

	$('#mainDebtForm .btn-repeatDebtCb').click(function () {
		repeatCount.active = 'main';
	});
	$('#editDebtModal .btn-repeatDebtCb').click(function () {
		repeatCount.active = 'edit';
		//$('#editDebtModal').data('kendoWindow').close();
		$('#selectRepeatCountModal').openModal();
		$('#selectRepeatCountModal').css('z-index', '10004');
	});

	$('#bnt-repeatCountMinus').click(function () {
		if (parseInt($("input.repeatCount.k-formatted-value").val()) <= 2) {
			$("input.repeatCount.k-formatted-value").val(2);
			repeatCount[repeatCount.active] = 2;
			Materialize.toast('Minimalni broj ponavljanja je 2', 3000);
		}
		else {
			$("input.repeatCount.k-formatted-value").val(parseInt($("input.repeatCount.k-formatted-value").val()) - 1);
			repeatCount[repeatCount.active]--;
		}
	})
	$('#bnt-repeatCountPlus').click(function () {
		$("input.repeatCount.k-formatted-value").val(parseInt($("input.repeatCount.k-formatted-value").val()) + 1);
		repeatCount[repeatCount.active]++;
	})

	$('.bnt-cancelRepeat').click(function () {
		repeatCount[repeatCount.active] = 0;
		if (repeatCount.active == 'main') {
			$('#mainDebtForm .btn-repeatDebtCb').removeClass('darken-3');
			$('#mainDebtForm .btn-repeatDebtCb').addClass('darken-2');
			//$("#selectRepeatCountModal").data("kendoWindow").close();
			$('#mainDebtForm .doesRepeatIcon').html('');
			$('#mainDebtForm .doesRepeatBtnTxt').html('Ponavljaj');
		}
		else {
			$('#editDebtModal .btn-repeatDebtCb').removeClass('darken-3');
			$('#editDebtModal .btn-repeatDebtCb').addClass('darken-2');
			//$("#selectRepeatCountModal").data("kendoWindow").close();
			$('#editDebtModal .doesRepeatIcon').html('');
			$('#editDebtModal .doesRepeatBtnTxt').html('Ponavljaj');
		}
	})
	$('.bnt-acceptRepeat').click(function () {
		repeatCount[repeatCount.active] = parseInt($("input.repeatCount.k-formatted-value").val());
		if (repeatCount.active == 'main') {
			$('#mainDebtForm .btn-repeatDebtCb').removeClass('darken-2');
			$('#mainDebtForm .btn-repeatDebtCb').addClass('darken-3');
			//$("#selectRepeatCountModal").data("kendoWindow").close();
			$('#mainDebtForm .doesRepeatIcon').html('replay');
			$('#mainDebtForm .doesRepeatBtnTxt').html(repeatCount[repeatCount.active] + ' puta');
		}
		else {
			$('#editDebtModal .btn-repeatDebtCb').removeClass('darken-2');
			$('#editDebtModal .btn-repeatDebtCb').addClass('darken-3');
			//$("#selectRepeatCountModal").data("kendoWindow").close();
			$('#editDebtModal .doesRepeatIcon').html('replay');
			$('#editDebtModal .doesRepeatBtnTxt').html(repeatCount[repeatCount.active] + ' puta');
		}
	})
	$('.bnt-repeatNoEnd').click(function () {
		repeatCount[repeatCount.active] = -1;
		
		if (repeatCount.active == 'main') {
			$('#mainDebtForm .btn-repeatDebtCb').removeClass('darken-2');
			$('#mainDebtForm .btn-repeatDebtCb').addClass('darken-3');
			//$("#selectRepeatCountModal").data("kendoWindow").close();
			$('#mainDebtForm .doesRepeatIcon').html('done');
			$('#mainDebtForm .doesRepeatBtnTxt').html('Ponavljaj');
		}
		else {
			$('#editDebtModal .btn-repeatDebtCb').removeClass('darken-2');
			$('#editDebtModal .btn-repeatDebtCb').addClass('darken-3');
			//$("#selectRepeatCountModal").data("kendoWindow").close();
			$('#editDebtModal .doesRepeatIcon').html('done');
			$('#editDebtModal .doesRepeatBtnTxt').html('Ponavljaj');

		}
	})

	//#endregion

	$('.btn-deleteDebt').click(function () {
		if (currentEditing) {
			$("#editDebtModal").data("kendoWindow").close();
			$('#confirmText').html('Potvrdi brisanje');
			$('#acceptModal').openModal();
			acceptModal.action = function () {
				deleteDebt(currentEditing.Id);
			}
			acceptModal.cancelAction = function () {
			    openEditForm(null, true);
			    //$("#editDebtModal").data("kendoWindow").open();
			}
		}
	})
	$('.btn-saveChanges').click(function () {
		if (validateEditForm()) {
			$("#editDebtModal").data("kendoWindow").close();
			setTimeout(function () {
				$('#confirmText').html('Potvrdi Izmjenu');
				$('#acceptModal').openModal();
				acceptModal.action = function () {
					EditDebt();
				}
				acceptModal.cancelAction = function () {
				    openEditForm(null, true);
				    //$("#editDebtModal").data("kendoWindow").open();
				}
			}, 500);
		}
	});

	$('.btn-resolveDebts').click(function () {
		$('#confirmText').html('Potvrdi plaćanje');
		$('#acceptModal').openModal();
		acceptModal.action = function () {
			payUnpaid();
		}
	})

	$('.btn-confirmAccept').click(function () {
		setTimeout(function () {
		    acceptModal.action();
		    acceptModal.action = null;
		}, 500)
	});

	$('.btn-cancelAccept').click(function () {
	    setTimeout(function () {
	        if (acceptModal.cancelAction) {
	            acceptModal.cancelAction();
	            acceptModal.cancelAction = null;
	        }
	    }, 500)
	});

	$('#mainDebtForm .btn-repeatDebtC').click(function () {
		repeatCount.active = 'main';
	})
	$('#editDebtModal .btn-repeatDebtC').click(function () {
		repeatCount.active = 'edit';
	})

	$('#btn-DebtHistory').click(function () {
		getPaidDebts();
	});
}

function initEditDebtWindow() {
	var width = $(window).width() * 0.95;
	var height = 500;
	$("#editDebtModal").kendoWindow({
		actions: ["Maximize", 'Close'],
		//animation: true,
		//title: 'Izmjeni trošak',
		position: {
			top: ($(window).height() - height) / 2,
			left: ($(window).width() - width) / 2
		},
		visible: false,
		width: width,
		height: height,
		close: function () {
			if (selectedRepeatDate == '') {
				$("#repeatDebtCb").prop("checked", false);
			}
		},
		open: function () {
			selectedRepeatDate = '';
		},
		draggable: false,
		modal: true,
		pinned: true,
		resizable: false
	});
}

function initUnpaidGrid(data) {
	//$("#unresolvedDebtsGrid").data("kendoGrid").dataSource.data = data;
	//$("#unresolvedDebtsGrid").data("kendoGrid").dataSource.read();
	//$("#unresolvedDebtsGrid").data("kendoGrid").refresh();
	//return;
	$('.unresolvedDebtsGridHolder').html('');
	$('<div id="unresolvedDebtsGrid"></div>').appendTo('.unresolvedDebtsGridHolder');
    var grid = $("#unresolvedDebtsGrid").kendoGrid({
        toolbar: ["excel"],
        excel: {
            fileName: "Neplaćeni dugovi na dan " + dateToday + " - " + forUserName + ".xlsx",
            proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
            filterable: true
        },
		dataSource: {
			data: data,
			schema: {
				model: {
					fields: {
						Id: { type: 'number' },
						Date: { type: "date" },
						Description: { type: "string" },
						TypeName: { type: "string" },
						TypeId: { type: 'int' },
						Ammount: { type: "number" },
						RepeatCount: { type: "number" }
					},
					//sort: { field: "Date", dir: "desc" }
				}
			},
			sort: { field: "Date", dir: "desc" },
			group: {
			    field: "TypeName", dir:'desc', aggregates: [
			       { field: "Ammount", aggregate: "sum" }
			    ]
			},
			aggregate: [{ field: "Ammount", aggregate: "sum" }]
		},
		//height: 500,
		scrollable: false,
		sortable: true,
		filterable: true,
		groupable: true,
		pageable: false,
		columns: [
			{
				field: "Date",
				format: "{0:dd.MM.yyyy.}",
				title: "Datum",
				width: "120px"
			},
			{
				field: "Description",
				title: "Opis",
				template: '# if(RepeatCount == 0 || RepeatCount == 1) { # #:Description# #} else if(RepeatCount == -1) { # #:Description# (∞) # } else { # #:Description# (x#:RepeatCount#)  # } #'
			},
			{
				field: "TypeName",
				title: "Tip",
				width: "100px"
			},
			{
				field: "Ammount",
				title: "Iznos",
				width: "150px",
				aggregates: ["sum"],
				groupFooterTemplate: "<div align=right>#: kendo.toString(sum, 'n2') # kn</div>",
				footerTemplate: "<div align=right>#: kendo.toString(sum, 'n2') # kn</div>",
				template: "<div align=right>#: kendo.toString(Ammount, 'n2') # kn</div>"
			},
			{
				command: {
					text: "Izmijeni",
					attributes: {
						"class": 'disable',
						style: "# if(RepeatCount == 0) { # background-color: red; # }#"
					},
					click: openEditForm
				},
				hidden: false,
				title: "Izmijeni",
				width: "130px"
			},
			//{
			//	template: '# if(RepeatCount >= 0) { #<a class="k-button editButton">Izmijeni</a> # }#',
			//	title: "Izmijeni",
			//	width: "130px"
			//}
		]
	}).data('kendoGrid');

	//$('#unresolvedDebtsGrid .editButton').click(function (e, a) {
	//	console.log(this);
	//	openEditForm(e);
	//});
	grid.table.on('click', '.editButton', function (e) {
		openEditForm.call(grid, e);
	});
	resizeWholeGrid();

	$('.btn-resolveDebts').html('<i class="material-icons left">verified_user</i>Podmiri: <b>' + $('.k-grid-footer tr td:nth-child(5) div').html() + '</b>');

}

function initUnpaidGridEmpty() {
	//return;
	$("#unresolvedDebtsGrid").kendoGrid({
		dataSource: {
			data: [],
			schema: {
				model: {
					fields: {
						Id: { type: 'number' },
						Date: { type: "date" },
						Description: { type: "string" },
						TypeName: { type: "string" },
						TypeId: { type: 'int' },
						Ammount: { type: "number" },
						RepeatCount: { type: "number" }
					}
				}
			},
			//group: {
			//    field: "TypeName", aggregates: [
			//       { field: "Ammount", aggregate: "sum" }
			//    ]
			//},
			aggregate: [{ field: "Ammount", aggregate: "sum" }]
		},
		//height: 550,
		scrollable: false,
		sortable: true,
		filterable: true,
		groupable: true,
		pageable: false,
		columns: [
			{ field: "Date", format: "{0:dd.MM.yyyy.}", title: "Datum", width: "115px" },
			{ field: "Description", width: '200px', title: "Trošak", template: '# if(RepeatCount == 0) { # #:Description# #} else if(RepeatCount == -1) { # #:Description# (∞) # } else { # #:Description# (x#:RepeatCount#)  # } #' },
			{ field: "TypeName", width: '100px', title: "Tip", width: '100px' },
			{ field: "Ammount", title: "Iznos", width: "100px", aggregates: ["sum"], groupFooterTemplate: "<div align=right>#: kendo.toString(sum, 'n0') # kn</div>", footerTemplate: "<div align=right>#: kendo.toString(sum, 'n0') # kn</div>", template: "<div align=right>#: kendo.toString(Ammount, 'n2') # kn</div>" },
			{ command: { text: "Izmijeni", click: openEditForm }, title: "Izmijeni", width: "100px" }
		]
	});
	setLoadingOnGrid();
}

function initHistoryGrid() {
	var data = this;
	console.log(data);
	$('#historyModal h4.header').html(moment(data.date).subtract(1, 'M').format("MM") + "/" +
			moment(data.date).format("MM YYYY"))
	//$('#historyModal').openModal();
	//return;
	if ($(".historyGrid" + data.index).html().trim().length == 0) {
		$(".card-action" + data.index).css('padding', '0px');
        $(".historyGrid" + data.index).kendoGrid({
            toolbar: ["excel"],
            excel: {
                fileName: "Neplaćeni dugovi na dan " + dateToday + " - " + forUserName + ".xlsx",
                proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
                filterable: true
            },
			dataSource: {
				data: data.debts,
				schema: {
					model: {
						fields: {
							//Id: { type: 'number' },
							Date: { type: "date" },
							debtName: { type: "string" },
							debtType: { type: "string" },
							Ammount: { type: "number" }
						}
					}
				},
				group: {
				    field: "debtType", dir: 'desc', aggregates: [
				       { field: "Ammount", aggregate: "sum" }
				    ]
				},
				aggregate: [{ field: "Ammount", aggregate: "sum" }]
			},
			height: 400,
			scrollable: true,
			sortable: true,
			filterable: true,
			groupable: true,
			pageable: false,
			columns: [
				{ field: "Date", format: "{0:dd.MM.yyyy.}", title: "Datum", width: "115px" },
				{ field: "debtName", title: "Opis", width: '300px' },
				{ field: "debtType", title: "Tip", width: '100px' },
				{ field: "Ammount", title: "Iznos", width: "100px", aggregates: ["sum"], groupFooterTemplate: "<div align=right>#: kendo.toString(sum, 'n0') # kn</div>", footerTemplate: "<div align=right>#: kendo.toString(sum, 'n0') # kn</div>", template: "<div align=right>#: kendo.toString(Ammount, 'n2') # kn</div>" }
			]
		});
	}
	else {
		return;
		if ($(".historyGrid" + data.index).css('display') != 'none') {
			$(".historyGrid" + data.index).css('display', 'none');
			$(".card-action" + data.index).css('padding', '20px');
		}
		else {
			$(".historyGrid" + data.index).css('display', 'block');
			$(".card-action" + data.index).css('padding', '0px');

		}
	}
	//return;


}

function initHistoryGridModal(data) {
	//var data = this;
    console.log(data);
    $(".historyGridModal" + data.index).kendoGrid({
        toolbar: ["excel"],
        excel: {
            fileName: "Svi dugovi plaćeni na dan " + (new Date(data.date)).toLocaleDateString('hr').replace(' ', '').replace(' ', '') + " - " + forUserName + ".xlsx",
            proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
            filterable: true
        },
        dataSource: {
			data: data.debts,
			schema: {
				model: {
					fields: {
						//Id: { type: 'number' },
						Date: { type: "date" },
						debtName: { type: "string" },
						debtType: { type: "string" },
						Ammount: { type: "number" }
					}
				}
			},
			group: {
			    field: "debtType", dir:'desc', aggregates: [
			       { field: "Ammount", aggregate: "sum" }
			    ]
			},
			aggregate: [{ field: "Ammount", aggregate: "sum" }]
		},
		height: $('.historyModal' + data.index).height(),
		scrollable: true,
		sortable: true,
		filterable: true,
		groupable: true,
		pageable: false,
		columns: [
            { field: "Date", format: "{0:dd.MM.yyyy.}", title: "Datum", width: "120px" },
            { field: "debtName", title: "Trošak" },
            { field: "debtType", title: "Tip", width: '100px' },
            { field: "Ammount", title: "Iznos", width: "100px", aggregates: ["sum"], groupFooterTemplate: "<div align=right>#: kendo.toString(sum, 'n0') # kn</div>", footerTemplate: "<div align=right>#: kendo.toString(sum, 'n0') # kn</div>", template: "<div align=right>#: kendo.toString(Ammount, 'n2') # kn</div>" }
		]
	});

	var grid = $(".historyGridModal" + data.index).data('kendoGrid');
}

