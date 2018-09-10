({
	doInit : function(component, event, helper) {

		var accountID = component.get("v.recordId");

		var getIQTypes = component.get('c.getIQTypes');

		getIQTypes.setParams(
			{   accID : accountID
			}
		);

        getIQTypes.setCallback (this, function(response) {
            var state = response.getState();
            if(state == 'SUCCESS') {



                console.log('init response:', response);
                console.log('init state:', state);
                console.log('init message:', response.getReturnValue());

                var recordTypeMap = response.getReturnValue();

                var state = response.getState();
	            if (state === "SUCCESS") {                
	                var typeList = [];
	                var resultMap = response.getReturnValue();
	                for(var key in resultMap){
	                    typeList.push({value:resultMap[key], key:key});
	                }
	                component.set("v.recordTypeList", typeList);
	            } 

                component.set('v.recordTypeMap', recordTypeMap);
            } else {
                // var errors = response.getError();
                // helper.showToast('Error', errors[0].message, 'error');


                console.log('init error response:', response);
                console.log('init error state:', state);
                console.log('init error message:', response.getReturnValue());
            }
        });

        var getQuotes = component.get("c.getQuotes");
        getQuotes.setParams(
            { accID : accountID
            }
        );

        getQuotes.setCallback(this, function(a) {
            if(a.getReturnValue() != null)
            {
            	var result = a.getReturnValue();
            	result.forEach(function(element){ element.checked = false; });
                component.set("v.relatedQuotes", result);
            }
        });


        var getPolicies = component.get("c.getPolicies");
        getPolicies.setParams(
            { accID : accountID
            }
        );

        getPolicies.setCallback(this, function(a) {
            if(a.getReturnValue() != null)
            {
            	var result = a.getReturnValue();
            	result.forEach(function(element){ element.checked = false; });
                component.set("v.relatedPolicies", result);
            }
        });
        
        // queue action
        $A.enqueueAction(getIQTypes);  
        $A.enqueueAction(getQuotes);  
        $A.enqueueAction(getPolicies);  
	},

	cancel : function(component, event, helper) {
		helper.goBack(component, event, helper);
	},

	newQuote : function(component, event, helper) {
		helper.showNewQuote(component, event, helper);
	},

	cloneQuote : function(component, event, helper) {
		helper.showCloneQuote(component, event, helper);
	},

	copyPolicy : function(component, event, helper) {
		helper.showCopyPolicy(component, event, helper);
	},

	copyNewPolicy : function(component, event, helper) {
		helper.copyPolicy(component, event, helper);
	},

	createNewQuote : function(component, event, helper) {
		helper.createQuote(component, event, helper);
	},

	cloneNewQuote : function(component, event, helper) {
		helper.cloneQuote(component, event, helper);
	},

	updateCheckboxes : function(component, event, helper) {
		var quotes = component.get("v.showCloneQuote");
		if(quotes == true) {
			console.log('checkboxes updating...');
			var index = event.getSource().get("v.text");
			console.log('index', index);
			var res = component.get("v.relatedQuotes");

			for(var i = 0; i < res.length; i++) {
				if(i != index) {
					res[i].checked = false;
				}
			}
			console.log('res:', res);
			component.set('v.relatedQuotes', res);
			// https://salesforce.stackexchange.com/questions/129130/get-the-values-of-checkboxes-in-a-lightning-component
			console.log('checkboxes updated.');
		} else {
			console.log('checkboxes updating...');
			var index = event.getSource().get("v.text");
			console.log('index', index);
			var res = component.get("v.relatedPolicies");

			for(var i = 0; i < res.length; i++) {
				if(i != index) {
					res[i].checked = false;
				}
			}
			console.log('res:', res);
			component.set('v.relatedPolicies', res);
			// https://salesforce.stackexchange.com/questions/129130/get-the-values-of-checkboxes-in-a-lightning-component
			console.log('checkboxes updated.');
		}

	}
})