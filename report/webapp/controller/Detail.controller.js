sap.ui.define(
	['sap/ui/core/mvc/Controller', 'sap/ui/model/Filter', 'sap/ui/model/FilterOperator'],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, Filter, FilterOperator) {
		'use strict';

		return Controller.extend('report.controller.Detail', {
			onInit: function () {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.getRoute('RouteDetail').attachPatternMatched(this._onObjectMatched, this);
			},
			formatter: {
				dateTimeString: function (oDate) {
					// Date Object ==> String
					let oDateTimeInstance;
					oDateTimeInstance = sap.ui.core.format.DateFormat.getDateTimeInstance({
						pattern: 'yyyy-MM-dd',
					});

					return oDateTimeInstance.format(oDate); // 2020-12-12
				},
			},

			_onObjectMatched: function (oEvent) {
				let sKey = oEvent.getParameter('arguments').OrderID;
				let oModel = this.getView().getModel('view');

				// odata binding
				// this.byId('detailTable')
				// 	.getParent()
				// 	.bindElement('/Orders(' + sKey + ')', { expand: 'Order_Details' });

				// this.byId('detailTable').bindRows({
				// 	path: '/Order_Details',
				// 	parameters: { expand: 'Product' },
				// });

				// json binding
				this.getOwnerComponent()
					.getModel() // odata model
					.read('/Orders', {
						urlParameters: {
							'$expand': 'Customer,Employee,Order_Details/Product',
						},
						filters: [new Filter('OrderID', 'EQ', sKey)],
						success: function (oReturn) {
							console.log(oReturn);
							oModel.setProperty('/', oReturn.results[0]); // json model binding
						},
					});
			},

			onBack: function () {
				const oRouter = this.getOwnerComponent().getRouter();
				let sCustomerID = this.getView().getModel('view').getProperty('/Customer/CustomerID');
				oRouter.navTo('RouteMain', {
					CustomerID: sCustomerID,
				});
			},
		});
	}
);
