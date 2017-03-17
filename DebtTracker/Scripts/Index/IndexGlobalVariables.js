
var selectedRepeatDate;
var selectedMainDebtType;
var selectedEditDebtType;
var selectedRepeatCount;
var currentEditing;
var acceptModal = {
	action: null
};
var repeatCount = {
	main: 0,
	edit: 0,
	active: ''
}
var dateHistory = {
	from: moment([moment().year(), moment().month(), 1]).subtract(1, 'M'),
	to: moment([moment().year(), moment().month(), 1]).add(1, 'M'),
	substractBy: 3
}

var groupedDebts = new Array();
var debtDescs = [];
var debtMainInputDataSource;
var adjustedTemplateModalHeight = false;

