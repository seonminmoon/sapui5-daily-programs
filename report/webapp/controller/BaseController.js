sap.ui.define(
	['sap/ui/core/mvc/Controller', 'sap/ui/model/Filter', 'sap/ui/model/FilterOperator', 'sap/ui/core/Fragment'],
	function (Controller, Filter, FilterOperator, Fragment) {
		'use strict';

		return Controller.extend('report.controller.BaseController', {
			// getConditions: function () {
			// 	var that = this,
			// 		aFilters = [],
			// 		oCondData = this.getOwnerComponent().getModel('viewModel').getProperty('/list/cond');
			// 	for (var operator in oCondData) {
			// 		if (oCondData.hasOwnProperty(operator)) {
			// 			for (var field in oCondData[operator]) {
			// 				if (oCondData[operator].hasOwnProperty(field) && oCondData[operator][field].length) {
			// 					// Contains, EQ, ... Default Condition
			// 					if (Array.isArray(oCondData[operator][field])) {
			// 						var aDummyFilter = [];
			// 						oCondData[operator][field].forEach(function (item) {
			// 							if (!item) {
			// 								return true;
			// 							}
			// 							var sValue = typeof item === 'object' ? item[field] : item;
			// 							aDummyFilter.push(
			// 								new Filter({ path: field, operator: operator, value1: sValue })
			// 							);
			// 						});
			// 						aFilters.push(new Filter({ filters: aDummyFilter, and: false }));
			// 						continue;
			// 					}
			// 				} else if (operator === 'BT') {
			// 					// BT Condition
			// 					if (oCondData[operator][field].from || oCondData[operator][field].to) {
			// 						var startDate = oCondData[operator][field].from || oCondData[operator][field].to;
			// 						var endDate = oCondData[operator][field].to || oCondData[operator][field].from;
			// 						aFilters.push(
			// 							new Filter({
			// 								path: field,
			// 								operator: operator,
			// 								value1: that.getYYYYMMDD(startDate),
			// 								value2: that.getYYYYMMDD(endDate),
			// 							})
			// 						);
			// 					}
			// 					continue;
			// 				}
			// 				if (oCondData[operator][field]) {
			// 					aFilters.push(
			// 						new Filter({
			// 							path: field,
			// 							operator: operator,
			// 							value1: oCondData[operator][field].toString(),
			// 						})
			// 					);
			// 				}
			// 			}
			// 		}
			// 	}
			// 	return aFilters;
			// },
			// getYYYYMMDD: function (oDate) {
			// 	var oDateInstance;
			// 	oDateInstance = sap.ui.core.format.DateFormat.getDateInstance({ pattern: 'yyyyMMdd' });
			// 	return oDateInstance.format(oDate);
			// },
		});
	}
);
