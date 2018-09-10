({
	doInit : function(component, event, helper) {
		helper.loadCoveragesSelectOptions(component, event, helper);
        helper.loadLookup1SelectOptions(component, event, helper);
	},
	saveCoverage : function(component, event, helper) {
		var coverage = component.get('v.coverage');
		if(coverage.Name == '' || coverage.Name == null) {
			helper.showToast('Error', 'Please select the type of coverage.', 'error');
		} else {
			helper.saveCoverage(component, event, helper);
		}
	},
	cancelAddCoverage : function(component, event, helper) {
		helper.sendCancelMessage(component, event, helper);
	},
	setCoverageValues : function(component, event, helper) {
		helper.setCoverageCodeFromMap(component, helper);
		helper.setSequenceNumberFromMap(component, helper);
	},
	showDeductibleField : function(component, event, helper) {
		helper.showDeductibleField(component, event, helper);
	}
})