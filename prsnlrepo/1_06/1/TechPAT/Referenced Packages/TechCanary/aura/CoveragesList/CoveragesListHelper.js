({
    setCSVMap : function(component, event, helper) {
        var action = component.get('c.getLOBCoveragesMap');

        action.setParams({"parentId" : component.get('v.recordId')});
        action.setCallback (this, function(response) {
            var state = response.getState();
            if(state == 'SUCCESS') {
                var coveragesMap = response.getReturnValue();
                component.set('v.coveragesMap', coveragesMap);
                helper.setCoverages(component, event, helper);
                helper.setShowRelatedTo(component, helper);
            } else {
                var errors = response.getError();
                helper.showToast('Error', errors[0].message, 'error');
            }
        });
        
        // queue action
        $A.enqueueAction(action);  
    },
    setObjectPrefix : function(component, event, helper) {
        var action = component.get('c.getCoverageObjectPrefix');

        action.setCallback (this, function(response) {
            var state = response.getState();
            if(state == 'SUCCESS') {
                component.set('v.coverageObjectPrefix', response.getReturnValue());
            } else {
                var errors = response.getError();
                helper.showToast('Error', errors[0].message, 'error');
            }
        });
        
        // queue action
        $A.enqueueAction(action);  
    },
    setShowRelatedTo : function(component, helper) {
        var coveragesMap = component.get('v.coveragesMap');

        var showRelatedToColumn = false;
        Object.keys(coveragesMap).forEach(function(key) {
            if(coveragesMap[key] != null) {
                if(coveragesMap[key].lookup1APIName != null) {
                    showRelatedToColumn = true;
                }
            }
        });

        component.set('v.showRelatedToColumn', showRelatedToColumn);
    },
	setCoverages : function(component, event, helper) {		
		var action = component.get('c.getCoverages');

		action.setParams({
            "parentId": component.get("v.recordId")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state == 'SUCCESS') {
            	var coverages = response.getReturnValue();
                component.set('v.coveragesSize', coverages.length);
                component.set('v.coverages', coverages);
                helper.determineShowFullComponent(component, event, helper);
            }
        });

        $A.enqueueAction(action);
	},
	newCoverage : function(component, event, helper) {
        component.set('v.showNewRow', true);
        component.set('v.showFullComponent', true);
	},
    determineShowFullComponent : function(component, event, helper) {
        var coveragesSize = component.get('v.coveragesSize');

        if(coveragesSize > 0) {
            component.set('v.showFullComponent', true);
        } else {
            component.set('v.showFullComponent', false);
        }
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