({
    doInit : function(component, event, helper) {
        helper.loadTaxesAndFees(component, event, helper);
        helper.loadObjectPrefix(component, event, helper);
        helper.setTheme(component, event, helper);
    },

    btnAddClick : function(component, event, helper) {
        var obj = component.get('v.taxesAndFeesWrapper');
        var showEditPanel = component.get('v.showEditPanel');

        component.set('v.showEditPanel', true);
        component.set('v.showFullComponent', true);
        var editObj = JSON.parse(JSON.stringify(component.get('v.taxesAndFeesWrapper.editRecord')));
        component.set('v.editRecord', editObj);
    },

    btnSave : function(component, event, helper) {
        var showEditPanel = component.get('v.showEditPanel');
        var showEditRecords = component.get('v.showEditRecords');

        if(showEditRecords) {
            helper.saveAllTaxesAndFees(component, event, helper);
            helper.determineShowFullComponent(component, event, helper);
        } else if(showEditPanel) {
            console.log('made it to save new record');
            component.set('v.saveNewRecord', true);
        }
    },

    btnCancel : function(component, event, helper) {
        var showEditPanel = component.get('v.showEditPanel');
        var showEditRecords = component.get('v.showEditRecords');

        if(showEditRecords) {
            component.set('v.showEditRecords', false);
            helper.loadTaxesAndFees(component, event, helper);
            helper.determineShowFullComponent(component, event, helper);
        } else if(showEditPanel) {
            component.set('v.showEditPanel', false);
            helper.determineShowFullComponent(component, event, helper);
        }
    },

    btnEdit : function(component, event, helper) {
        component.set('v.showEditRecords', true);
    },

    saveUITaxesAndFees : function(component, event, helper) {
        helper.saveAllTaxesAndFees(component, event, helper);
    },

    goToViewAll : function(component, event, helper) {
        var homeEvent = $A.get("e.force:navigateToObjectHome");
        var theme = component.get('v.uiTheme');

        if(theme == 'Theme2' || theme == 'Theme3') {
            window.open('/' + component.get('v.taxesAndFeesObjectPrefix') + '/o', '_blank');
        } else {
            homeEvent.setParams({
                "scope": "CanaryAMS__Taxes_Fees__c"
            });

            homeEvent.fire();
        }
    },

    handleEvent : function(component, event, helper) {
        var message = event.getParam("message");
        if(message == 'saveRows') {
            helper.saveAllTaxesAndFees(component, event, helper);
        } else if(message == 'cancelAddNew') {
            component.set('v.showEditPanel', false);
            helper.determineShowFullComponent(component, event, helper);
        } else if(message == 'refreshListAndCancelAddNew') {
            component.set('v.showEditPanel', false);
            component.set('v.saveNewRecord', false);
            helper.loadTaxesAndFees(component, event, helper);
        } else if(message == 'refreshList') {
            helper.loadTaxesAndFees(component, event, helper);
        }
    }
})