sap.ui.define(
	['sap/ui/core/mvc/Controller', 'sap/ui/model/Filter', 'sap/ui/model/FilterOperator'],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, Filter, FilterOperator) {
		'use strict';

		return Controller.extend('report.controller.Detail', {
			onInit: function () {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.getRoute('RouteDetail').attachPatternMatched(this._onObjectMatched, this);
			},
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

			_onObjectMatched: function (oEvent) {
				var sKey = oEvent.getParameter('arguments').OrderID;
				var oModel = this.getView().getModel('view');

				console.log(sKey);

				this.getOwnerComponent()
					.getModel()
					.read('/Orders', {
						urlParameters: {
							'$expand': 'Customer,Employee,Order_Details/Product',
						},
						filters: [new Filter('OrderID', 'EQ', sKey)],
						success: function (oReturn) {
							console.log(oReturn);

							oModel.setProperty('/', oReturn.results[0]);

							/*
							Customer: {__metadata: {…}, CustomerID: 'VINET', CompanyName: 'Vins et alcools Chevalier', ContactName: 'Paul Henriot', ContactTitle: 'Accounting Manager', …}
							CustomerID: "VINET"
							Employee: {__metadata: {…}, EmployeeID: 5, LastName: 'Buchanan', FirstName: 'Steven', Title: 'Sales Manager', …}
							EmployeeID: 5
							Freight: "32.3800"
							OrderDate: Thu Jul 04 1996 09:00:00 GMT+0900 (한국 표준시) {}
							OrderID: 10248
							Order_Details: {results: Array(3)}
							RequiredDate: Thu Aug 01 1996 09:00:00 GMT+0900 (한국 표준시) {}
							ShipAddress: "59 rue de l'Abbaye"
							ShipCity: "Reims"
							ShipCountry: "France"
							ShipName: "Vins et alcools Chevalier"
							ShipPostalCode: "51100"
							ShipRegion: null
							ShipVia: 3
							ShippedDate: Tue Jul 16 1996 09:00:00 GMT+0900 (한국 표준시) {}
							*/
						},
					});
			},

			onBack: function () {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo('RouteMain');
			},
		});
	}
);
