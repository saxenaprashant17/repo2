({
    showDeductibleField : function (component, event, helper) {
        var coverage = component.get('v.coverage');

        if(coverage.CanaryAMS__Deductible_Type_Code__c == 'FL') {
            component.set('v.showDeductiblePercentage', false);
            component.set('v.showDeductibleDollar', true);
            coverage.CanaryAMS__Percentage_Deductible__c = null;
        }
        if(coverage.CanaryAMS__Deductible_Type_Code__c == 'PT') {
            component.set('v.showDeductiblePercentage', true);
            component.set('v.showDeductibleDollar', false);
            coverage.CanaryAMS__Deductible_Format_Integer__c = null;
        }

        component.set('v.coverage', coverage);
    },
	deleteCoverage : function(component, event, helper) {
		var action = component.get('c.deleteCoverage');
        var coverage = component.get('v.coverage');

		action.setParams({"coverage" : coverage});
        action.setCallback (this, function(response) {
            var state = response.getState();
            if(state == 'SUCCESS') {
                helper.sendRefreshMessage(component, event, helper);
                helper.showToast('Success', 'Coverage \'' + coverage.Name + '\' has been deleted!', 'success');
            } else {
                var errors = response.getError();
                helper.showToast('Error', errors[0].message, 'error');
            }
        });
        
        // queue action
        $A.enqueueAction(action);  
	},
	editCoverage : function(component, event, helper) {
        var coverage = component.get('v.coverage');
        var navEvt = $A.get("e.force:navigateToSObject"); // Only use this to determine if in lightning out (returns undefined)
        var editRecordEvent = $A.get("e.force:editRecord");
    
        if(navEvt != undefined) {
            editRecordEvent.setParams({
                "recordId": coverage.Id
            });

            editRecordEvent.fire();
        } else {
            window.open('/' + coverage.Id + '/e', '_blank');
        }
	},
    setLookupOutputValue : function(component, event, helper) {
        var coveragesMap = component.get('v.coveragesMap');
        console.log('=> coveragesMap Rob: ' + coveragesMap);
        var lookup1OutputAPIName;
        var lookup1APIName;
        Object.keys(coveragesMap).forEach(function(key) {
            lookup1OutputAPIName = coveragesMap[key].lookup1OutputAPIName;
            lookup1APIName = coveragesMap[key].lookup1APIName;
        });

        var coverage = component.get('v.coverage');
        if(coverage[lookup1APIName] != null) {
            var split = lookup1OutputAPIName.split('.');
            component.set('v.lookup1Value', coverage[split[0]][split[1]]);
        }
    },
    sendRefreshMessage : function(component, event, helper) {
        var event = component.getEvent("coveragesListEvent");
        event.setParam("message", "refreshList" );
        event.fire();
    },
    navigateToRecord : function(component, event, helper) {
        var coverage = component.get('v.coverage');
        var navEvt = $A.get("e.force:navigateToSObject");
        
        if(navEvt != undefined) {
            navEvt.setParams({
                "recordId": coverage.Id,
                "slideDevName": "detail"
            });

            navEvt.fire();
        } else {
            window.open('/' + coverage.Id, '_blank');
        }
    },
    saveCoverage : function(component, event, helper) {
        var coverage = component.get('v.coverage');
        var action = component.get('c.updateCoverage');

        action.setParams({"coverage" : coverage});
        action.setCallback (this, function(response) {
            var state = response.getState();
            if(state == 'SUCCESS') {
                helper.showDeductibleField(component, event, helper);
            } else {
                var errors = response.getError();
                helper.showToast('Error', errors[0].message, 'error');
            }
        });
        
        // queue action
        $A.enqueueAction(action);  
    },
	showToast : function(title, message, type) {
        try {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": title,
                "message": message,
                "type" : type
            });
            toastEvent.fire();
        } catch(e) {
            alert(message);
        }
    }
})