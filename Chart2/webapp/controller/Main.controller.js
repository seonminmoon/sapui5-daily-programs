sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem",
    "sap/viz/ui5/format/ChartFormatter",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, FlattenedDataset, FeedItem, ChartFormatter) {
    "use strict";

    return Controller.extend("charts.controller.Main", {
      onInit: function () {
        this._setDefaultModel();
        this._setVizFrame();
      },

      _setVizFrame: function () {
        var oColumnChart = this.getView().byId("idColumnChart");
        var oDonutChart = this.getView().byId("idDonutChart");
        var oLineDataset = new FlattenedDataset({
          // 넓이(치수)
          dimensions: [{ name: "Name", value: "{name}" }],
          // 높이(측정값)
          measures: [{ name: "Rate", value: "{rate}" }],
          data: { path: "/dataset" },
        });
        oColumnChart.setDataset(
          new FlattenedDataset({
            // 넓이(치수)
            dimensions: [{ name: "Name", value: "{name}" }],
            // 높이(측정값)
            measures: [{ name: "Rate", value: "{rate}" }],
            data: { path: "/test" },
          })
        );
        oDonutChart.setDataset(oLineDataset);

        var feedValueAxis = new FeedItem({
          uid: "valueAxis",
          type: "Measure",
          values: ["Rate"],
        });
        var feedCategoryAxis = new FeedItem({
          uid: "categoryAxis",
          type: "Dimension",
          values: ["Name"],
        });
        oColumnChart.addFeed(feedValueAxis);
        oColumnChart.addFeed(feedCategoryAxis);

        var feedSize = new FeedItem({
          uid: "size",
          type: "Measure",
          values: ["Rate"],
        });
        var feedColor = new FeedItem({
          uid: "color",
          type: "Dimension",
          values: ["Name"],
        });
        oDonutChart.addFeed(feedSize);
        oDonutChart.addFeed(feedColor);

        // var oPopOver = this.getView().byId("idPopOver");
        // oPopOver.connect(oVizFrame.getVizUid());
        // oPopOver.setFormatString({
        //   Cost: ChartFormatter.DefaultPattern.STANDARDFLOAT,
        //   Revenue: ChartFormatter.DefaultPattern.STANDARDFLOAT,
        // });
      },

      _setDefaultModel: function () {
        const oDatas = {
          dataset: [
            { name: "Computer", rate: "24" },
            { name: "Computer2", rate: "23" },
            { name: "Mouse", rate: "11" },
            { name: "Mouse2", rate: 10 },
            { name: "Mouse2", rate: 20 },
            { name: "Keyboard", rate: 13 },
            { name: "Keyboard", rate: 15 },
            { name: "Keyboard", rate: 12 },
          ],
          test: [
            { name: "Mouse2", rate: 10 },
            { name: "Mouse2", rate: 20 },
            { name: "Keyboard", rate: 13 },
            { name: "Keyboard", rate: 15 },
            { name: "Keyboard", rate: 12 },
          ],
        };
        this.getView().setModel(new JSONModel(oDatas));
      },
    });
  }
);
