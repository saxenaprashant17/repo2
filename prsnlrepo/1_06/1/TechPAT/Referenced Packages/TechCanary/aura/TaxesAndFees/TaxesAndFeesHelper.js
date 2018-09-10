({
    loadTaxesAndFees : function(component, event, helper) {
        var action = component.get('c.populateTaxesAndFees');
        action.setParams({"policyId" : component.get('v.recordId')});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS") {
                debugger;
                var resp = response.getReturnValue();
                var parsedJSON = JSON.parse(resp);
                component.set('v.taxesAndFeesWrapper', parsedJSON);
                component.set('v.coveragesSize', parsedJSON.taxesAndFees.length);
                var editObj = component.get('v.taxesAndFeesWrapper.editRecord');
                component.set('v.editRecord', JSON.parse(JSON.stringify(editObj)));
                helper.determineShowFullComponent(component, event, helper);
                helper.setTotalTaxesAndFees(component, event, helper);
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
    setTotalTaxesAndFees : function(component, event, helper) {
        var taxesAndFeesWrapper = component.get('v.taxesAndFeesWrapper');
        var totalTaxesAndFees = 0.00;

        console.log('=> taxesAndFeesWrapper: ' + taxesAndFeesWrapper);
        if(taxesAndFeesWrapper != null) {
            console.log('=> Made it to taxesAndFeesWrapper not null');
            var innerTaxesAndFees = taxesAndFeesWrapper.taxesAndFees;
            innerTaxesAndFees.forEach(function (taxesAndFeesRow) {
                console.log('=> taxesAndFeesRow.CanaryAMS__Amount__c: ' + taxesAndFeesRow.taxes_fees.CanaryAMS__Amount__c);
                if(taxesAndFeesRow.taxes_fees.CanaryAMS__Amount__c != null) {
                    totalTaxesAndFees += taxesAndFeesRow.taxes_fees.CanaryAMS__Amount__c;
                }
            });
        }

        component.set('v.totalTaxesAndFees', totalTaxesAndFees);
    },
    loadObjectPrefix : function(component, event, helper) {
        var action = component.get('c.getTaxesAndFeesObjectPrefix');

        action.setCallback (this, function(response) {
            var state = response.getState();
            if(state == 'SUCCESS') {
                component.set('v.taxesAndFeesObjectPrefix', response.getReturnValue());
            } else {
                var errors = response.getError();
                helper.showToast(component, "error", errors);
            }
        });

        // queue action
        $A.enqueueAction(action);
    },
    setTheme : function(component, event, helper) {
        var action = component.get('c.getUIThemeDescription');

        action.setCallback (this, function(response) {
            var state = response.getState();
            if(state == 'SUCCESS') {
                component.set('v.uiTheme', response.getReturnValue());
            } else {
                var errors = response.getError();
                helper.showToast(component, "error", errors);
            }
        });

        // queue action
        $A.enqueueAction(action);
    },
    saveAllTaxesAndFees : function(component, event, helper) {
        var msg;
        var t = component.get('v.taxesAndFeesWrapper');
        var ui = JSON.stringify(component.get('v.taxesAndFeesWrapper'));
        var action = component.get('c.saveTaxesAndFees')
        action.setParams({'taxesAndFees' : ui});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS") {
                debugger;
                var resp = response.getReturnValue();
                helper.loadTaxesAndFees(component, event, helper);
                component.set('v.showEditRecords', false);
                var msg = "Taxes and Fees records have been saved.";
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
    showToast : function(component, toastType, toastMsg) {
        try {
            // handling of native lightning components
            var evt = $A.get("e.force:showToast");
            evt.setParams({
                mode : 'dismissible',
                message : toastMsg,
                type : toastType
            });
            evt.fire();
        } catch(e) {
            if(toastType != 'success') {
                alert(toastMsg);
            }
        }
    },
    determineShowFullComponent : function(component, event, helper) {
        var coveragesSize = component.get('v.coveragesSize');

        if(coveragesSize > 0) {
            component.set('v.showFullComponent', true);
        } else {
            component.set('v.showFullComponent', false);
        }
    }
})