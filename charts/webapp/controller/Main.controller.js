sap.ui.define(
	[
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
		'sap/viz/ui5/data/FlattenedDataset',
		'sap/viz/ui5/controls/common/feeds/FeedItem',
	],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, JSONModel, FlattenedDataset, FeedItem) {
		'use strict';

		return Controller.extend('charts.controller.Main', {
			onInit: function () {
				var oData = {
					'dataset': [
						{ 'skillName': 'aaa', 'rate': '35' },
						{ 'skillName': 'bbb', 'rate': '15' },
						{ 'skillName': 'ccc', 'rate': '10' },
						{ 'skillName': 'ddd', 'rate': '15' },
						{ 'skillName': 'eee', 'rate': '20' },
						{ 'skillName': 'fff', 'rate': '5' },
					],
				};
				var oModel = new JSONModel();
				oModel.setData(oData);

				//Pie Chart그리기
				var oVizFrame = this.getView().byId('idPieChart');
				var oDataset = new FlattenedDataset({
					dimensions: [
						{
							name: 'SkillName',
							value: '{skillName}',
						},
					],
					measures: [
						{
							name: 'rate',
							value: '{rate}',
						},
					],
					data: {
						path: '/dataset',
					},
				});

				oVizFrame.setDataset(oDataset);
				oVizFrame.setModel(oModel);

				//Pie Chart property 설정
				oVizFrame.setVizProperties({
					title: { text: 'SAP Technology' },
					plotArea: d3.scale.category20().range(),
					drawingEffect: 'glossy',
				});

				//feed
				var feedSize = new FeedItem({
					'uid': 'size',
					'type': 'Measure',
					'values': ['rate'],
				});

				var feedColor = new FeedItem({
					'uid': 'color',
					'type': 'Dimension',
					'values': ['SkillName'],
				});

				oVizFrame.addFeed(feedSize);
				oVizFrame.addFeed(feedColor);

				//Line Chart그리기
				var oVizLineFrame = this.getView().byId('idLineChart');
				var oLineDataset = new FlattenedDataset({
					dimensions: [
						{
							name: 'SkillName',
							value: '{skillName}',
						},
					],
					measures: [
						{
							name: 'rate',
							value: '{rate}',
						},
					],
					data: {
						path: '/dataset',
					},
				});

				oVizLineFrame.setDataset(oLineDataset);
				oVizLineFrame.setModel(oModel);

				//Line Chart property 설정
				oVizLineFrame.setVizProperties({
					title: { text: 'SAP Technology' },
					plotArea: d3.scale.category20().range(),
				});

				//feed
				var feedValueAxis = new FeedItem({
					'uid': 'valueAxis',
					'type': 'Measure',
					'values': ['rate'],
				});

				var feedCategoryAxis = new FeedItem({
					'uid': 'categoryAxis',
					'type': 'Dimension',
					'values': ['SkillName'],
				});

				oVizLineFrame.addFeed(feedValueAxis);
				oVizLineFrame.addFeed(feedCategoryAxis);

				//Sales Model
				var oColData = {
					'sales': [
						{ 'product': 'Jackets', 'amount': '65' },
						{ 'product': 'Shirts', 'amount': '70' },
						{ 'product': 'Pants', 'amount': '83' },
						{ 'product': 'Coats', 'amount': '92' },
						{ 'product': 'Purse', 'amount': '77' },
					],
				};
				var oColModel = new JSONModel();
				oColModel.setData(oColData);

				//Column Chart그리기
				var oColFrame = this.getView().byId('idColChart');
				var oColDataset = new FlattenedDataset({
					dimensions: [
						{
							name: 'Product',
							value: '{test>product}',
						},
					],
					measures: [
						{
							name: 'Amount',
							value: '{test>amount}',
						},
					],
					data: {
						path: 'test>/sales',
					},
				});

				oColFrame.setDataset(oColDataset);
				oColFrame.setModel(oColModel, 'test');

				//Col Chart property 설정
				oColFrame.setVizProperties({
					title: { text: 'Sales Data' },
					plotArea: d3.scale.category20().range(),
				});

				//feed
				var feedColValueAxis = new FeedItem({
					'uid': 'valueAxis',
					'type': 'Measure',
					'values': ['Amount'],
				});

				var feedColCategoryAxis = new FeedItem({
					'uid': 'categoryAxis',
					'type': 'Dimension',
					'values': ['Product'],
				});

				oColFrame.addFeed(feedColValueAxis);
				oColFrame.addFeed(feedColCategoryAxis);
			},
		});
	}
);
