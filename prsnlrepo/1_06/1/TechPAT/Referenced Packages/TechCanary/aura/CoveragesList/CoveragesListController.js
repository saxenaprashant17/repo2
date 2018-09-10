({
	doInit : function(component, event, helper) {
		helper.setCSVMap(component, event, helper);
		helper.setObjectPrefix(component, event, helper);
	},
	newCoverage : function(component, event, helper) {
		helper.newCoverage(component, event, helper);
	},
	handleEvent : function(component, event, helper) {
		var message = event.getParam("message");
		if(message == 'refreshList') {
			helper.setCoverages(component, event, helper);
		} else if(message == 'cancelAddNew') {
			component.set('v.showNewRow', false);
			helper.determineShowFullComponent(component, event, helper);
		} else if(message == 'refreshListAndCancelAddNew') {
			helper.setCoverages(component, event, helper);
			component.set('v.showNewRow', false);
		}
	}
})