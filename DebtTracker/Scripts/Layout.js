
// if orientation is supported (eg. mobile device) 
// instead of resize, do the orientation event
var supportsOrientationChange = 'onorientationchange' in window,
    orientationEvent = supportsOrientationChange ? 'orientationchange' : 'resize';


// ============================================================
//                          MAIN RESIZE
// ============================================================
function resize() {
	
}


// =========================================================================
//                                  ON LOAD
// =========================================================================
$(function () {	
	if (isAuthenticated) {
		initToolbar();
	}
	else {
		$("#toolbar").kendoToolBar({
			items: [{
				type: "button",
				text: "Registracija",
				spriteCssClass: 'register',
				click: function () {
					window.location = appName + '/Account/Register';
				}
			}]
		});
	}
})

function initToolbar() {
	var items = [
			{
				type: "button",
				text: "<span class=toolbarText>Odjava</span>",
				spriteCssClass: 'logout',
				click: function () {
					document.getElementById('logoutForm').submit()
				}
			},
			{
				type: "button",
				text: "<span class=toolbarText>Svi plaćeni</span>",
				spriteCssClass: 'toGrid',
				click: function () {
					window.location = appName + '/Home/AllPaidDebts';
				}
			},
			//{
			//	type: "button",
			//	text: "<span class=toolbarText>Graf</span>",
			//	spriteCssClass: 'toGraph',
			//	click: function () {
			//		window.location = appName + '/Home/Statistics';
			//	}
			//}
	];
	if (!isSpecial) {
		items.push({
			type: "button",
			text: "<span class=toolbarText>Za koga</span>",
			spriteCssClass: 'selectUser',
			click: function () {
				window.location = appName + '/Home/SelectUser';
			}
		});
	}
	$("#toolbar").kendoToolBar({
		items: items
	});
}


// =========================================================================
//                         FUNCTION AND EVENT BINDING
// =========================================================================
if (!window.addEventListener) {
	window.attachEvent('onresize', function () {
		resize();
	});
}
else {
	window.addEventListener(orientationEvent, function () {
		resize();
	}, false);
}

window.onload = function () {
	resize();
}



