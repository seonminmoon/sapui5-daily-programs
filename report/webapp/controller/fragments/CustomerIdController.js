sap.ui.define(['../DialogController', 'sap/ui/base/ManagedObject'], function (DialogController, ManagedObject) {
	'use strict';

	return {
		DialogController: DialogController,
		onCustomerRowSelectionChange: function (that, oEvent) {
			var oSelectItem = oEvent.getParameters().rowContext.getObject();

			that.byId('searchCustomerID').setValue(oSelectItem.CustomerID);
			DialogController.onClose(oEvent.getSource().getParent());
		},

		onBeforeOpen: function (that, oEvent) {
			sap.ui.getCore().byId('DialogCustomerIdTable').setSelectedIndex(-1);
		},
	};
});
