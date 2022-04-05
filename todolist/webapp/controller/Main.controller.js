sap.ui.define(
	[
		'sap/m/MessageToast',
		'sap/ui/core/mvc/Controller',
		'sap/ui/Device',
		'sap/base/Log',
		'sap/ui/model/json/JSONModel',
	],
	function (MessageToast, Controller, Device, Log, JSONModel) {
		'use strict';

		return Controller.extend('todolist.controller.Main', {
			onInit: function () {
				let oModel = this.getOwnerComponent().getModel();
				oModel.loadData('../model/datas.json');
			},

			onPressDetailBack: function () {
				this._getSplitAppObj().backDetail();
			},

			onListItemPress: function (oEvent) {
				var sToPageId = oEvent.getParameter('listItem').getCustomData()[0].getValue();

				this._getSplitAppObj().toDetail(this.createId(sToPageId));
			},

			_getSplitAppObj: function () {
				var result = this.byId('SplitAppDemo');
				if (!result) {
					Log.info("SplitApp object can't be found");
				}
				return result;
			},

			onPressChartSelectData: function (oEvent) {
				var oModel = this.getView().getModel(); // chart model
				var datas = oModel.getData().Product; // model datas
				var sToPageId = oEvent.getSource().data().to; // chartPage custom data (page id)
				var sSelectKey = oEvent.getParameters().data[0].data['Product Name']; // pie chart selected key
				var aSelectItems = datas.filter(function (item) {
					// get selected items
					return item.ProductName === sSelectKey;
				});

				this._getSplitAppObj().toDetail(this.createId(sToPageId)); // chart page 출력
				oModel.setProperty('/chartDetail', aSelectItems[0].items); // chart model 세팅
			},
		});
	}
);
