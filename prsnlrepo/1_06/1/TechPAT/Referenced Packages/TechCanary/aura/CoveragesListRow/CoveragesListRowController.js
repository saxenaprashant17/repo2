({
	doInit : function(component, event, helper) {
		helper.showDeductibleField(component, event, helper);
		helper.setLookupOutputValue(component, event, helper);
	},
	selectMenuItem : function(component, event, helper) {
		var selectedMenuItem = event.getParam("value");
		if(selectedMenuItem == 'Edit') {
			helper.editCoverage(component, event, helper);
		} else if(selectedMenuItem == 'Delete') {
			helper.deleteCoverage(component, event, helper);
		}
	},
	refreshList : function(component, event, helper) {
		helper.sendRefreshMessage(component, event, helper);
	},
	navigateToRecord : function(component, event, helper) {
		helper.navigateToRecord(component, event, helper);
	},
	saveCoverage : function(component, event, helper) {
		helper.saveCoverage(component, event, helper);
	}
})