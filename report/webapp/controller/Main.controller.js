sap.ui.define(
	['sap/ui/core/mvc/Controller', 'sap/ui/model/Filter', 'sap/ui/model/FilterOperator', 'sap/ui/model/json/JSONModel'],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, Filter, FilterOperator, JSONModel) {
		'use strict';

		return Controller.extend('report.controller.Main', {
			onInit: function () {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.getRoute('RouteMain').attachPatternMatched(this._onObjectMatched, this);
			},

			_onObjectMatched: function (oEvent) {
				let sKey = oEvent.getParameter('arguments').CustomerID;
				this.byId('searchCustomerID').setValue(sKey);
				this.onSearch();
			},

			formatter: {
				dateTimeString: function (oDate) {
					let oDateTimeInstance;
					oDateTimeInstance = sap.ui.core.format.DateFormat.getDateTimeInstance({
						pattern: 'yyyy-MM-dd',
					});

					return oDateTimeInstance.format(oDate);
				},
			},

			onCellClick: function (oEvent) {
				let oModel = this.getView().getModel();
				let oRouter = this.getOwnerComponent().getRouter();
				let sPath = oEvent.getParameters().rowBindingContext.getPath();
				let oData = oModel.getProperty(sPath);

				oRouter.navTo('RouteDetail', {
					OrderID: oData.OrderID,
				});
			},

			onSearch: function () {
				let sValue = this.byId('searchCustomerID').getValue();
				let oTable = this.byId('idTable');
				let aFilters = [];

				if (sValue) {
					aFilters.push(new Filter('CustomerID', 'EQ', sValue));
				}
				oTable.getBinding('rows').filter(aFilters);
			},
		});
	}
);
