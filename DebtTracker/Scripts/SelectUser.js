// =========================================================================
//                                  ON LOAD
// =========================================================================
$(function () {
	$('#forDanijel').click(function () {
		$('.k-loading-image').css('display', 'block');
		$.ajax({
			url: appName + '/Home/SetForUser',
			type: "POST",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			async: true,
			cache: false,
			data: JSON.stringify({
				userId: '066d5a34-ccb8-46db-ab4d-ce716272a65e'
			}),
			success: function (result) {
				if (result != 1) {
					Materialize.toast("Ovaj korisnik još nije registriran", 5000);
					$('.k-loading-image').css('display', 'none');
				}
				else {
					window.location = appName;
				}
			},
			error: function (result) {
				Materialize.toast("Greška", 5000);
				$('.k-loading-image').css('display', 'none');
				$('body').html(e.messageText);
			}

		})
		//window.location = "SetForuser?userId=066d5a34-ccb8-46db-ab4d-ce716272a65e";
	});
	$('#forMario').click(function () {
		$('.k-loading-image').css('display', 'block');
		$.ajax({
			url: appName + '/Home/SetForUser',
			type: "POST",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			async: true,
			cache: false,
			data: JSON.stringify({
				userId: '9f43b9fa-39c9-4f21-b93b-d8f2beadfe97'
			}),
			success: function (result) {
				if (result != 1) {
					Materialize.toast("Ovaj korisnik još nije registriran", 5000);
					$('.k-loading-image').css('display', 'none');
				}
				else {
					window.location = appName;
				}
			},
			error: function (result) {
				Materialize.toast("Greška", 5000);
				$('.k-loading-image').css('display', 'none');
				$('body').html(e.messageText);
			}

		})
		//window.location = "SetForuser?userId=066d5a34-ccb8-46db-ab4d-ce716272a65e";
	});
	//$('#forMario').click(function () {
	//	$('.k-loading-image').css('display', 'block');
	//	$.ajax({
	//		url: appName + '/Home/SetForUser',
	//		type: 'POST',
	//		dataType: 'json',
	//		contextType: 'application/json; charset=utf-8',
	//		async: true,
	//		cache: false,
	//		data: JSON.stringify({
	//			userId: '9f43b9fa-39c9-4f21-b93b-d8f2beadfe97'
	//		}),
	//		success: function (result) {
	//			if (result != 1) {
	//				Materialize.toast("Ovaj korisnik još nije registriran", 5000);
	//				$('.k-loading-image').css('display', 'none');
	//			}
	//			else {
	//				window.location = appName;
	//			}
	//		},
	//		error: function (result) {
	//			Materialize.toast("Greška", 5000);
	//			$('.k-loading-image').css('display', 'none');
	//			$('body').html(e.messageText);
	//		}

	//	})
	//})
})

