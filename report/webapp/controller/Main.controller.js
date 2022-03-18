sap.ui.define(
	['sap/ui/core/mvc/Controller'],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		'use strict';

		return Controller.extend('report.controller.Main', {
			onInit: function () {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.getRoute('RouteMain').attachPatternMatched(this._onObjectMatched, this);
			},

			_onObjectMatched: function () {},

			formatter: {
				dateTimeString: function (oDate) {
					// Date Object ==> String
					var oDateTimeInstance;
					oDateTimeInstance = sap.ui.core.format.DateFormat.getDateTimeInstance({
						pattern: 'yyyy-MM-dd',
					});

					return oDateTimeInstance.format(oDate); // 2020-12-12
				},
			},

			onCellClick: function (oEvent) {
				var oModel = this.getView().getModel();
				var oRouter = this.getOwnerComponent().getRouter();
				var sPath = oEvent.getParameters().rowBindingContext.getPath();
				var oData = oModel.getProperty(sPath);

				oRouter.navTo('RouteDetail', {
					OrderID: oData.OrderID,
				});
			},
		});
	}
);
