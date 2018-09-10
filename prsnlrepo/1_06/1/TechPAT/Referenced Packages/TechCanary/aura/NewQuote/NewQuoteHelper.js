({
	goBack : function(component, event) {
		var navEvt = $A.get("e.force:navigateToSObject");
        
        if(navEvt != undefined) {
            navEvt.setParams({
                "recordId": component.get('v.recordId'),
                "slideDevName": "detail"
            });

            navEvt.fire();
        } else {
            window.open('/' + component.get('v.recordId'), '_blank');
        }
	},

	showNewQuote : function(component, event) {
		component.set('v.showFirstPage', false);
		component.set('v.showNewQuote', true);
	},

    showCloneQuote : function(component, event) {
        component.set('v.showFirstPage', false);
        component.set('v.showCloneQuote', true);
    },

    showCopyPolicy : function(component, event) {
        component.set('v.showFirstPage', false);
        component.set('v.showCopyPolicy', true);
    },

    createQuote : function(component, event) {

        var accountID = component.get("v.recordId");
        var typeName = component.get("v.recordTypeSelected");
        console.log('selected value:', typeName);
        
        if(typeName == '-- Select One --') {
            console.log('select one selected...do nothing');
            return;
        }

        var newQuoteMethod = component.get("c.generateQuoteFromAccount");

        newQuoteMethod.setParams(
            {   accID : accountID,
                IQType : typeName
            }
        );

        newQuoteMethod.setCallback (this, function(response) {
            var state = response.getState();
            if(state == 'SUCCESS') {

                var state = response.getState();
                if (state === "SUCCESS") {                
                    console.log('successfully created new quote');

                    var pid = response.getReturnValue();
        
                    // set the handler attributes based on event data

                        console.log('Success response:', response);
                        console.log('Success state:', state);
                        console.log('Success message:', response.getReturnValue());

                    if( (typeof sforce != 'undefined') && sforce && (!!sforce.one) ) {
                        // Salesforce1 navigation
                        sforce.one.navigateToSObject(pid, "detail");
                    }
                    else {
                        // Set the window's URL using a Visualforce expression
                        window.location.href = '/' + pid;
                    }    
                } 
            } else {
                // var errors = response.getError();
                // helper.showToast('Error', errors[0].message, 'error');
                console.log('failed to create new quote');
            }
        });
        
        // queue action
        $A.enqueueAction(newQuoteMethod);  
    },

    cloneQuote : function(component, event) {

        var accountID = component.get("v.recordId");
        var typeName = component.get("v.recordTypeSelected");
        var quotes = component.get("v.relatedQuotes");
        var checkedQuotes = quotes.filter(function(obj){ return obj.checked; });

        if(checkedQuotes.length == 1) {
            var selectedQuote = checkedQuotes[0];
            console.log('selected quote ID:', selectedQuote.Id);
            console.log('selected quote Name:', selectedQuote.Name);


            console.log('checked quotes',checkedQuotes);
            console.log('selected value:', typeName);
            
            if(typeName == '-- Select One --') {
                console.log('select one selected...do nothing');
                return;
            }

            var cloneQuoteMethod = component.get("c.generateCloneQuote");

            cloneQuoteMethod.setParams(
                {   accID : accountID,
                    quoteID : selectedQuote.Id,
                    IQType : typeName
                }
            );

            cloneQuoteMethod.setCallback (this, function(response) {
                var state = response.getState();
                if(state == 'SUCCESS') {

                    var state = response.getState();
                    if (state === "SUCCESS") {                
                        console.log('successfully cloned new quote');

                        var pid = response.getReturnValue();
            
                        // set the handler attributes based on event data

                        console.log('Success response:', response);
                        console.log('Success state:', state);
                        console.log('Success message:', response.getReturnValue());

                        if( (typeof sforce != 'undefined') && sforce && (!!sforce.one) ) {
                            // Salesforce1 navigation
                            sforce.one.navigateToSObject(pid, "detail");
                        }
                        else {
                            // Set the window's URL using a Visualforce expression
                            window.location.href = '/' + pid;
                        }    
                    } 
                } else {
                    // var errors = response.getError();
                    // helper.showToast('Error', errors[0].message, 'error');
                    console.log('failed to clone quote');
                    console.log('Error response:', response);
                    console.log('Error state:', state);
                    console.log('Error message:', response.getReturnValue());
                }
            });
            
            // queue action
           $A.enqueueAction(cloneQuoteMethod);  
        }
    },

    copyPolicy : function(component, event) {

        var accountID = component.get("v.recordId");
        var typeName = component.get("v.recordTypeSelected");
        var policies = component.get("v.relatedPolicies");
        var checkedPolicies = policies.filter(function(obj){ return obj.checked; });

        if(checkedPolicies.length == 1) {
            var selectedPolicy = checkedPolicies[0];
            console.log('selected policy ID:', selectedPolicy.Id);
            console.log('selected policy Name:', selectedPolicy.Name);


            console.log('checked policy', checkedPolicies);
            console.log('selected value:', typeName);
            
            if(typeName == '-- Select One --') {
                console.log('select one selected...do nothing');
                return;
            }

            var copyPolicyMethod = component.get("c.generateCopyPolicy");

            copyPolicyMethod.setParams(
                {   accID : accountID,
                    policyID : selectedPolicy.Id,
                    IQType : typeName
                }
            );

            copyPolicyMethod.setCallback (this, function(response) {
                var state = response.getState();
                if(state == 'SUCCESS') {

                    var state = response.getState();
                    if (state === "SUCCESS") {                
                        console.log('successfully cloned new quote');

                        var pid = response.getReturnValue();
            
                        // set the handler attributes based on event data

                        console.log('Success response:', response);
                        console.log('Success state:', state);
                        console.log('Success message:', response.getReturnValue());

                        if( (typeof sforce != 'undefined') && sforce && (!!sforce.one) ) {
                            // Salesforce1 navigation
                            sforce.one.navigateToSObject(pid, "detail");
                        }
                        else {
                            // Set the window's URL using a Visualforce expression
                            window.location.href = '/' + pid;
                        }    
                    } 
                } else {
                    // var errors = response.getError();
                    // helper.showToast('Error', errors[0].message, 'error');
                    console.log('failed to clone policy');
                    console.log('Error response:', response);
                    console.log('Error state:', state);
                    console.log('Error message:', response.getReturnValue());
                }
            });
            
            // queue action
           $A.enqueueAction(copyPolicyMethod);  
        }
    }
})