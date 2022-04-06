sap.ui.define(
	[
		'report/controller/BaseController',
		'sap/ui/model/Filter',
		'sap/ui/model/FilterOperator',
		'sap/ui/model/json/JSONModel',
	],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, Filter, FilterOperator, JSONModel) {
		'use strict';

		return Controller.extend('report.controller.Main', {
			onInit: function () {
				const oRouter = this.getOwnerComponent().getRouter();

				this.getOwnerComponent().setModel(new JSONModel(), 'local');
				this._setInitialFilter();
				oRouter.getRoute('RouteMain').attachPatternMatched(this._onObjectMatched, this);
			},

			_setInitialFilter: function () {
				var oModel = this.getOwnerComponent().getModel('local');

				oModel.setProperty('/search', {
					'EQ': {},
					'Contains': {},
				});
			},

			_onObjectMatched: function (oEvent) {
				let sKey = oEvent.getParameter('arguments').CustomerID;
				this.byId('searchCustomerID').setValue(sKey);
				if (sKey) {
					this.onSearch();
				}
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
				let oTable, aFilters, aMandatoryControls, validation, oControl;

				oTable = this.byId('idTable');
				aFilters = this.getConditions();

				aMandatoryControls = this.byId('filterBar')
					.getFilterGroupItems()
					.filter(function (item) {
						return item.getMandatory();
					});

				validation = aMandatoryControls.some(function (item) {
					oControl = item.getControl();
					if (oControl.getValue && !oControl.getValue()) {
						oControl.setValueState('Error');
						oControl.setValueStateText('필수값을 입력하세요.');
						return true;
					}
					return false;
				});

				if (!validation) {
					oTable.getBinding('rows').filter(aFilters);
				}
			},

			onClear: function () {
				var oModel = this.getOwnerComponent().getModel('local');

				oModel.setProperty('/search', {
					'EQ': {},
					'Contains': {},
					'BT': {},
					// FilterOperator 조건 추가 가능
				});
			},
			onReset: function () {
				this._setInitialFilter();
			},
		});
	}
);
