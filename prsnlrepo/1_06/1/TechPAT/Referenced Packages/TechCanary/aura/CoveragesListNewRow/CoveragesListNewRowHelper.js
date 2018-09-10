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
    loadLookup1SelectOptions : function(component, event, helper) {
        var lookupAPIName = helper.getLookupAPIName(component, helper);

        var action = component.get('c.getLookup1Values');

        action.setParams({"parentId" : component.get('v.parentRecordId'), "lookupAPIName" : lookupAPIName});
        action.setCallback (this, function(response) {
            var state = response.getState();
            if(state == 'SUCCESS') {
                var lookup1Map = response.getReturnValue();
                var inputSel = component.find('lookup1Select');
                var opts = new Array();
                var op = new Object();
                var showRelatedTo = false;
                op.value = '';
                op.label = '-- Select --';
                opts.push(op);
                Object.keys(lookup1Map).forEach(function(key) {
                    showRelatedTo = true;
                    var op = new Object();
                    op.value = key;
                    op.label = lookup1Map[key];
                    opts.push(op);
                });
                component.set('v.showRelatedTo', showRelatedTo);
                if(inputSel != undefined) {
                    inputSel.set('v.options', opts);
                }
            } else {
                var errors = response.getError();
                helper.showToast('Error', errors[0].message, 'error');
            }
        });
        
        // queue action
        $A.enqueueAction(action);  
    },
    getLookupAPIName : function(component, helper) {
        var coveragesMap = component.get('v.coveragesMap');

        var lookupAPIName;
        Object.keys(coveragesMap).forEach(function(key) {
            lookupAPIName = coveragesMap[key].lookup1APIName;
        });

        return lookupAPIName
    },
    loadCoveragesSelectOptions : function(component, event, helper) {
        var coveragesMap = component.get('v.coveragesMap');

        var opts = new Array();
        Object.keys(coveragesMap).forEach(function(coverage) {
            var op = new Object();
            op = coverage;
            opts.push(op);
        });
        component.set('v.coverageNames', opts);
    },
	saveCoverage : function(component, event, helper) {
        var coverage = component.get('v.coverage');
        var lookupAPIName = helper.getLookupAPIName(component, helper);

        coverage[lookupAPIName] = component.get('v.lookup1Value');

		var action = component.get('c.saveNewCoverage');

		action.setParams({"coverage" : coverage, "parentId" : component.get('v.parentRecordId')});
        action.setCallback (this, function(response) {
            var state = response.getState();
            if(state == 'SUCCESS') {
                helper.sendSaveMessage(component, event, helper);
                helper.showToast('Success', 'Your coverage has been saved!', 'success');
            } else {
                var errors = response.getError();
                helper.showToast('Error', errors[0].message, 'error');
            }
        });
        
        // queue action
        $A.enqueueAction(action);  
	},
    setCoverageCodeFromMap : function(component, helper) {
        var coveragesMap = component.get('v.coveragesMap');
        var coverage = component.get('v.coverage');

        if(coverage.Name != 'Other Coverage') {
            component.set('v.showOtherCoverage', false);
            coverage.CanaryAMS__Coverage_Code__c = coveragesMap[coverage.Name].coverageCode;
        } else {
            coverage.Name = '';
            component.set('v.showOtherCoverage', true);
        }
        component.set('v.coverage', coverage);
    },
    setSequenceNumberFromMap : function(component,  helper) {
        var coveragesMap = component.get('v.coveragesMap');
        var coverage = component.get('v.coverage');

        if(coveragesMap[coverage.Name] != null) {
            coverage.CanaryAMS__Sequence_Number__c = coveragesMap[coverage.Name].sequenceNumber;
        }
        component.set('v.coverage', coverage);
    },
	sendCancelMessage : function(component, event, helper) {
		var event = component.getEvent("coveragesListEvent");
        event.setParam("message", "cancelAddNew" );
        event.fire();
	},
	sendSaveMessage : function(component, event, helper) {
        var event = component.getEvent("coveragesListEvent");
        event.setParam("message", "refreshListAndCancelAddNew" );
        event.fire();
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
            if(type != 'success') {
                alert(message);
            }
        }
    }
})