({
    doInit : function(component, event, helper) {
        var action = component.get('c.populateTaxesAndFees');
        action.setParams({"policyId" : component.get('v.recordId')});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS") {
                debugger;
                var resp = response.getReturnValue();
                var parsedJSON = JSON.parse(resp);
                component.set('v.taxesAndFeesWrapper', parsedJSON);
                var editObj = component.get('v.taxesAndFeesWrapper.editRecord');
                component.set('v.editRecord', JSON.parse(JSON.stringify(editObj)));
            } else if(state === "INCOMPLETE") {
                console.log('Could not get taxes and fees object - server did not respond or client is offline');
            } else if(state === "ERROR") {
                var errors = response.getError();
                if(errors[0] && errors[0].message) {
                    console.log('Failed to get taxes and fees object - ERROR: ' + errors[0].message);
                } else {
                    console.log('Failed to get taxes and fees object - the server returned an unspecified error');
                }
            }
        });
        $A.enqueueAction(action);
    },

    btnAddClick : function(component, event, helper) {
        debugger;
        var obj = component.get('v.taxesAndFeesWrapper');
        var showEditPanel = component.get('v.showEditPanel');
        if (showEditPanel === true) {
            component.set('v.showEditPanel', false);
        } else {
            component.set('v.showEditPanel', true);
            var editObj = JSON.parse(JSON.stringify(component.get('v.taxesAndFeesWrapper.editRecord')));
            component.set('v.editRecord', editObj);
        }
    },

    addRecord : function(component, event, helper) {
        debugger;
        var record = JSON.parse(JSON.stringify(component.get('v.editRecord')));
        if(record != null && record.checked) {
            var list = component.get('v.taxesAndFeesWrapper.taxesAndFees');
            list.push(record);
            component.set('v.taxesAndFeesWrapper.taxesAndFees', list);
            component.set('v.editRecord', JSON.parse(JSON.stringify(component.get('v.taxesAndFeesWrapper.editRecord'))));
            component.set('v.showEditPanel', false);
        }
    },

    saveUITaxesAndFees : function(component, event, helper) {
        debugger;
        var msg;
        var t = component.get('v.taxesAndFeesWrapper');
        var ui = JSON.stringify(component.get('v.taxesAndFeesWrapper'));
        var action = component.get('c.saveTaxesAndFees')
        action.setParams({'taxesAndFees' : ui});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS") {
                debugger;
                msg = "Taxes and Fees saved successfully";
                var resp = response.getReturnValue();
                component.set('v.taxesAndFeesWrapper', JSON.parse(resp));
                helper.showToast(component, "success", msg);
            } else if(state === "INCOMPLETE") {
                msg = 'Could not save Taxes and Fees - server did not respond or client is offline';
                helper.showToast(component, 'info', msg);
            } else if (state === "ERROR") {
                var errors = response.getError();
                if(errors[0] && errors[0].message) {
                    helper.showToast(component, "error", "There was an error saving taxes and fees, check log");
                    msg = "Could not save Taxes and Fees - ERROR: " + errors[0].message;
                }
                msg = "Could not save Taxes and Fees - server returned an unspecified error";
                helper.showToast(component, "error", msg);
            }
            console.log(msg);
        });
        $A.enqueueAction(action);
    },

    showList : function(component, event, helper) {
        var showList = component.get('v.showList');
        if(showList === true) {
            component.set('v.showList', false);
        } else {
            component.set('v.showList', true);
        }

        var icon = event.getSource().get('v.iconName');
        if(icon === "utility:right") {
            event.getSource().set('v.iconName', 'utility:down');
        } else {
            event.getSource().set('v.iconName', 'utility:right');
        }
    },

    hideUIMessage : function(component, event, helper) {
        component.set('v.showMsg', false);
    }
})