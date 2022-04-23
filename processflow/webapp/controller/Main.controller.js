sap.ui.define(
	['sap/suite/ui/commons/library', 'sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'sap/m/MessageToast'],
	function (SuiteLibrary, Controller, JSONModel, MessageToast) {
		'use strict';

		return Controller.extend('processflow.controller.Main', {
			onInit: function () {
				var oView = this.getView();
				this.oProcessFlow1 = oView.byId('processflow1');
				this.oProcessFlow2 = oView.byId('processflow2');

				var sDataPath = sap.ui.require.toUrl('processflow/model/ProcessFlowLanesAndNodes.json');
				var oModelPf1 = new JSONModel(sDataPath);
				oView.setModel(oModelPf1);
				oModelPf1.attachRequestCompleted(this.oProcessFlow1.updateModel.bind(this.oProcessFlow1));

				sDataPath = sap.ui.require.toUrl('processflow/model/ProcessFlowLanesOnly.json');
				var oModelPf2 = new JSONModel(sDataPath);
				oView.setModel(oModelPf2, 'pf2');
				oModelPf2.attachRequestCompleted(this.oProcessFlow2.updateModel.bind(this.oProcessFlow2));
			},

			onOnError: function (event) {
				MessageToast.show('Exception occurred: ' + event.getParameters().text);
			},

			onHeaderPress: function (event) {
				var sDataPath = sap.ui.require.toUrl('processflow/model/ProcessFlowNodes.json');
				this.getView().getModel('pf2').loadData(sDataPath);
			},

			onNodePress: function (event) {
				MessageToast.show('Node ' + event.getParameters().getNodeId() + ' has been clicked.');
			},

			onZoomIn: function () {
				this.oProcessFlow1.zoomIn();

				MessageToast.show('Zoom level changed to: ' + this.oProcessFlow1.getZoomLevel());
			},

			onZoomOut: function () {
				this.oProcessFlow1.zoomOut();

				MessageToast.show('Zoom level changed to: ' + this.oProcessFlow1.getZoomLevel());
			},

			onHighlightPath: function () {
				var sDataPath = sap.ui.require.toUrl('processflow/model/ProcessFlowNodesHighlightedNodes.json');
				this.getView().getModel().loadData(sDataPath);

				MessageToast.show('Path has been highlighted');
			},

			onUpdateModel: function () {
				var sDataPath = sap.ui.require.toUrl('processflow/model/ProcessFlowUpdateModel.json');

				this.getView().getModel().loadData(sDataPath);
				MessageToast.show('Model has been updated');
			},
		});
	}
);
