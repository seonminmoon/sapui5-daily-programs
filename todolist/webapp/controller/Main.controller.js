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

				this.getSplitAppObj().setHomeIcon({
					'phone': 'phone-icon.png',
					'tablet': 'tablet-icon.png',
					'icon': 'desktop.ico',
				});

				Device.orientation.attachHandler(this.onOrientationChange, this);
			},

			onExit: function () {
				Device.orientation.detachHandler(this.onOrientationChange, this);
			},

			onOrientationChange: function (mParams) {
				var sMsg = 'Orientation now is: ' + (mParams.landscape ? 'Landscape' : 'Portrait');
				MessageToast.show(sMsg, { duration: 5000 });
			},

			onPressNavToDetail: function () {
				this.getSplitAppObj().to(this.createId('detailDetail'));
			},

			onPressDetailBack: function () {
				this.getSplitAppObj().backDetail();
			},

			onPressMasterBack: function () {
				this.getSplitAppObj().backMaster();
			},

			onPressGoToMaster: function () {
				this.getSplitAppObj().toMaster(this.createId('master2'));
			},

			onListItemPress: function (oEvent) {
				var sToPageId = oEvent.getParameter('listItem').getCustomData()[0].getValue();

				this.getSplitAppObj().toDetail(this.createId(sToPageId));
			},

			onPressModeBtn: function (oEvent) {
				var sSplitAppMode = oEvent.getSource().getSelectedButton().getCustomData()[0].getValue();

				this.getSplitAppObj().setMode(sSplitAppMode);
				MessageToast.show('Split Container mode is changed to: ' + sSplitAppMode, { duration: 5000 });
			},

			getSplitAppObj: function () {
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
					// selected items
					return item.ProductName === sSelectKey;
				});

				this.getSplitAppObj().toDetail(this.createId(sToPageId)); // chart page 출력
				oModel.setProperty('/lineChartData', aSelectItems[0].items); // chart model 세팅
			},
		});
	}
);
