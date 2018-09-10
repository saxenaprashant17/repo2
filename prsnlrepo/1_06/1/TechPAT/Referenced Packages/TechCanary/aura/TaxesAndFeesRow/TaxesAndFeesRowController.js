({
    doInit : function(component, event, helper) {

    },

    addNewTaxesAndFees : function(component, event, helper) {
        var saveNewRecord = component.get('v.saveNewRecord');

        if(saveNewRecord) {
            var record = component.get('v.record');

            if(record.taxes_fees.CanaryAMS__Category__c != '') {
                if($A.util.isUndefined(record.taxes_fees.Name)) {
                    record.taxes_fees.Name = record.taxes_fees.CanaryAMS__Category__c;
                }

                var action = component.get('c.saveNewTaxesAndFees')
                action.setParams({'taxesAndFees' : JSON.stringify(record)});
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if(state === "SUCCESS") {
                        var event = component.getEvent("taxesAndFeesEvent");
                        event.setParam("message", "refreshListAndCancelAddNew" );
                        event.fire();

                        var msg = "Taxes and Fees record has been saved";
                        helper.showToast(component, "success", msg);
                    }
                });

                $A.enqueueAction(action);
            } else {
                component.set('v.saveNewRecord', false);
                helper.showToast(component, "error", "Please select a category.");
            }
        }
    },

    cancelAddNewRow : function(component, event, helper) {
        var event = component.getEvent("taxesAndFeesEvent");
        event.setParam("message", "cancelAddNew" );
        event.fire();
    },

    deleteRow : function(component, event, helper) {
        var record = component.get('v.record');
        component.set('v.isDelete', true);

        record.checked = true;
        component.set('v.record', record);

        // var action = component.get('c.deleteTaxesAndFees')
        // action.setParams({'taxesAndFeesId' : record.taxes_fees.Id});
        // action.setCallback(this, function(response) {
        //     var state = response.getState();
        //     if(state === "SUCCESS") {
        //         var event = component.getEvent("taxesAndFeesEvent");
        //         event.setParam("message", "refreshList" );
        //         event.fire();

        //         var msg = "Taxes and Fees record has been deleted";
        //         helper.showToast(component, "success", msg);
        //     }
        // });

        // $A.enqueueAction(action);
    },

    navigateToRecord : function(component, event, helper) {
        var record = component.get('v.record');
        var navEvt = $A.get("e.force:navigateToSObject");
		var context = component.get("v.userContext");

        console.log('navEvt:');
        console.log(navEvt);
        
        console.log('context');
        console.log(context);

        if(context == undefined) {
            navEvt.setParams({
                "recordId": record.taxes_fees.Id,
                "slideDevName": "detail"
            });

            navEvt.fire();
        } else {
            console.log('VF Out Detected');
            window.open('/' + record.taxes_fees.Id, '_blank');
        }
    },

    sendSaveMessage : function(component, event, helper) {
        var isAdd = component.get('v.isAdd');
        var isDelete = component.get('v.isDelete');
        if(!isAdd && !isDelete) {
            var event = component.getEvent("taxesAndFeesEvent");
            event.setParam("message", "saveRows" );
            event.fire();
        }
    }
})