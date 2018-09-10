({
    doInit : function(component, event, helper) {
        var isAdd = component.get('v.isAdd');
        if (!isAdd) {
            var variant = 'label-hidden';
            component.find('txtAmount').set('v.variant', variant);
            component.find('txtDescription').set('v.variant', variant);
            component.find('selCategory').set('v.variant', variant);
        }
    },

    chkAddRecordClick : function(component, event, helper) {
        var isAddPanel = component.get('v.isAdd');
        if(isAddPanel) {
            var isChecked = component.get('v.record.checked');
            if(isChecked) {
                var record = component.get('v.record');
                if($A.util.isUndefined(record.taxes_fees.Name)) {
                    record.taxes_fees.Name = record.taxes_fees.CanaryAMS__Category__c;
                }
                component.set('v.record', record);
            }
        }

    }
})