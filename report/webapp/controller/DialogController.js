sap.ui.define(['sap/ui/base/ManagedObject'], function (ManagedObject) {
	'use strict';

	return {
		onClose: function (oEventObject) {
			oEventObject.getSource ? oEventObject.getSource().getParent().close() : oEventObject.close();
		},
	};
});
