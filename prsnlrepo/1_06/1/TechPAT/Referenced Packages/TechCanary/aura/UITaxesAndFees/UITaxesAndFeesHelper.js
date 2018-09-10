({
    showToast : function(component, toastType, toastMsg) {
        debugger;
        var url = decodeURIComponent(window.location);

        if(url.includes('visual.force.com')) {
            // handling for components hosted in visual force page
            var visible = component.get('v.showMsg');
            component.set('v.showMsg', true);
            var msgcmp = component.find('uiMessage');
            msgcmp.set('v.severity', toastType);
            component.find('msgText').set('v.value', toastMsg);
        } else {
            // handling of native lightning components
            var evt = $A.get("e.force:showToast");
            evt.setParams({
                mode : 'dismissible',
                message : toastMsg,
                type : toastType
            });
            evt.fire();
        }
    }
})