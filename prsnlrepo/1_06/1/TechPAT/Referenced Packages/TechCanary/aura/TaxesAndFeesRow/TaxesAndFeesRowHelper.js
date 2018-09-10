({
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
})