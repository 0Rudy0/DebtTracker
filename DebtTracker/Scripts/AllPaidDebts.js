var groupedDebts = [];

function GetAllPaidDebts() {
	setLoadingOnGrid();
	//$('.k-loading-mask').css('display', 'block');
	$.ajax({
		url: "GetAllPaidDebts",
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		async: true,
		cache: false,
		data: JSON.stringify({
			forUser: forUser
		}),
		success: function (result) {
			initHistoryGrid(result);
		},
		error: function (e) {
			Materialize.toast('Greška!', 4000);
			$('.k-loading-mask').css('display', 'none');
			console.log(e);
		}
	});
}

//function prepareData(debts) {
//	for (var i = 0; i < debts.length; i++) {
//		var found = false;
//		for (var j = 0; j < groupedDebts.length; j++) {
//			if (debts[i].payDate == groupedDebts[j].date) {
//				found = true;
//				groupedDebts[j].debts.push(debts[i]);
//				groupedDebts[j].total += debts[i].Ammount;
//				break;
//			}
//		}
//		if (!found) {
//			groupedDebts.push({
//				date: debts[i].payDate,
//				debts: [debts[i]],
//				total: debts[i].Ammount,
//				index: -1
//			})
//		}
//	}
//}

function initHistoryGrid(data) {
	//var data = this;
	//console.log(data);
	//$('#historyModal h4.header').html(moment(data.date).subtract(1, 'M').format("MM") + "/" +
	//		moment(data.date).format("MM YYYY"))
	//$('#historyModal').openModal();
	//return;
    $("#mainGrid").kendoGrid({
        toolbar: ["excel"],
        excel: {
            fileName: "Svi plaćeni dugovi na dan " + dateToday + " - " + forUserName + ".xlsx",
            proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
            filterable: true
        },
		dataSource: {
            data: data,
			schema: {
				model: {
					fields: {
						//Id: { type: 'number' },
						Date: { type: "date" },
						debtName: { type: "string" },
						debtType: { type: "string" },
						Ammount: { type: "number" },
						payDate: { type: "date" }
					}
				}
			},
			//group: {
			//    field: "debtType", aggregates: [
			//       { field: "Ammount", aggregate: "sum" }
			//    ]
			//},
			aggregate: [{ field: "Ammount", aggregate: "sum" }]
        },
		height: $(window).height() - 150,
		scrollable: true,
		sortable: true,
		filterable: true,
		groupable: true,
		pageable: false,
		columns: [
			{ field: "Date", format: "{0:dd.MM.yyyy.}", title: "Datum", width: "115px" },
			{ field: "debtName", title: "Opis" },
			{ field: "debtType", title: "Tip", width: '100px' },
			{ field: "Ammount", title: "Iznos", width: "130px", aggregates: ["sum"], groupFooterTemplate: "<div align=right>#: kendo.toString(sum, 'n0') # kn</div>", footerTemplate: "<div align=right>#: kendo.toString(sum, 'n0') # kn</div>", template: "<div align=right>#: kendo.toString(Ammount, 'n2') # kn</div>" },
			{ field: "payDate", format: "{0:dd.MM.yyyy.}", title: "Plaćeno", width: "115px" },
		    //{ field: "payDate", format: "{0:dd.MM.yyyy.}", title: "Kvartal", width: "115px" }
		]
	});
	//return;
	$('.k-grid-content table tbody tr').height($('.k-grid-content table tbody tr:nth-child(1)').height())

}

function setLoadingOnGrid() {
	//$('.mainGridLoading.k-loading-image').css('display', 'block');
}

// ============================================================
//                          MAIN RESIZE
// ============================================================
function resize() {
	setTimeout(function () {
		resizeGrid();
	});
}

function resizeGrid() {
	//return;
	resizeGridColumn(0, 115);
	//resizeGridColumn(1, 0);
	resizeGridColumn(2, 100);
	resizeGridColumn(3, 100);
	resizeGridColumn(4, 115);

	if ($('body').width() < 767) {
		resizeGridColumn(0, 100);
		resizeGridColumn(1, 120);
		resizeGridColumn(2, 90);
		resizeGridColumn(3, 90);
		resizeGridColumn(4, 100);
	}
	if ($('body').width() < 550) {
		resizeGridColumn(0, 80);
		resizeGridColumn(1, 90);
		resizeGridColumn(2, 70);
		resizeGridColumn(3, 70);
		resizeGridColumn(4, 80);
	}
	if ($('body').width() < 460) {
		resizeGridColumn(0, 70);
		resizeGridColumn(1, 80);
		resizeGridColumn(2, 60);
		resizeGridColumn(3, 60);
		resizeGridColumn(4, 70);
	}
}

function resizeGridColumn(idx, width) {
	$("#mainGrid .k-grid-header-wrap") //header
	   .find("colgroup col")
	   .eq(idx)
	   .css({ width: width });

	$("#mainGrid .k-grid-content") //content
	   .find("colgroup col")
	   .eq(idx)
	   .css({ width: width });
}


// =========================================================================
//                                  ON LOAD
// =========================================================================
$(function () {
	GetAllPaidDebts();
})