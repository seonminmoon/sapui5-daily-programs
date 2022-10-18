sap.ui.define(
  [
    "sap/m/MessageToast",
    "sap/ui/core/mvc/Controller",
    "sap/ui/Device",
    "sap/base/Log",
    "sap/ui/model/json/JSONModel",
  ],
  function (MessageToast, Controller, Device, Log, JSONModel) {
    "use strict";

    return Controller.extend("todolist.controller.Main", {
      onInit: function () {
        let oModel = this.getOwnerComponent().getModel();
        oModel.loadData("../model/datas.json");

        this._setChartData();
      },

      /**
       * Chart Data Default Setting
       */
      _setChartData: function () {
        const oLineChart = this.byId("idLineChart");
        const oPieChart = this.byId("idPieChart");

        this.byId("idPiePopover").connect(oPieChart.getVizUid());
        this.byId("idLinePopover").connect(oLineChart.getVizUid());
      },

      /**
       * Split App Info
       */
      _getSplitAppObj: function () {
        var result = this.byId("SplitAppDemo");
        if (!result) {
          Log.info("SplitApp object can't be found");
        }
        return result;
      },

      /**
       * Split App DetailPage`s navButtonPress Event (DetailDetail -> Detail)
       */
      onBackNavButtonPress: function () {
        this._getSplitAppObj().backDetail();
      },

      /**
       * Button press Event (Detail -> DetailDetail)
       */
      onNavToSecondDetailDetailPress: function () {
        this._getSplitAppObj().to(this.createId("secondDetaildetail"));
      },

      /**
       * SplitApp MasterPage List itemPress Event
       */
      onListItemPress: function (oEvent) {
        var sToPageId = oEvent
          .getParameter("listItem")
          .getCustomData()[0]
          .getValue();

        this._getSplitAppObj().toDetail(this.createId(sToPageId));
      },

      /**
       * Pie Chart SelectData Event
       */
      onChartSelectData: function (oEvent) {
        var oModel = this.getView().getModel(); // chart model
        var sToPageId = oEvent.getSource().data().to; // chartPage custom data (page id)
        var sSelectKey = oEvent.getParameters().data[0].data["Product Name"]; // pie chart selected key
        var aSelectItems = oModel.getData().Product.filter(function (item) {
          // get selected items
          return item.ProductName === sSelectKey;
        });
        oEvent
          .getSource()
          .vizSelection([{ data: oEvent.getParameters().data[0].data }], {
            clearSelection: true,
          });

        this._getSplitAppObj().toDetail(this.createId(sToPageId)); // chart page 출력
        oModel.setProperty("/chartDetail", aSelectItems[0].items); // chart model 세팅
      },

      /**
       * Table Row Add Button Press Event
       */
      onAddPress: function (gubun) {
        let oModel = this.getView().getModel();
        let aDatas;

        const addUiTable = () => {
          aDatas = oModel.getData().uiTable;
          aDatas.push({ data1: "default value" });
          oModel.setProperty("/uiTable", aDatas);
        };
        const addMTable = () => {
          aDatas = oModel.getData().mTable;
          aDatas.push({
            Name: "default value",
            ProductId: "default ID",
            SupplierName: "Supplier Name",
          });
          oModel.setProperty("/mTable", aDatas);
        };

        gubun === "ui" ? addUiTable() : addMTable();
      },

      /**
       * Table Row Delete Button Press Event
       */
      onDeletePress: function (oEvent, gubun) {
        var oTable = oEvent.getSource().getParent().getParent();
        var oModel = this.getView().getModel();
        var aDatas, aSelectItems;

        if (gubun === "ui") {
          aDatas = oModel.getData().uiTable;
          aSelectItems = oTable.getSelectedIndices();

          for (var i = aSelectItems.length - 1; i >= 0; i--) {
            aDatas.splice(aSelectItems[i], 1);
          }
          oModel.setProperty("/uiTable", aDatas);
        } else {
          aDatas = oModel.getData().mTable;
          aSelectItems = oTable.getSelectedContextPaths();

          aSelectItems
            .sort(function (a, b) {
              var na = a.split("/").reverse()[0];
              var nb = b.split("/").reverse()[0];
              return nb - na;
            })
            .forEach(function (item) {
              var index = item.split("/").reverse()[0];
              aDatas.splice(index, 1);
            });

          oModel.setProperty("/mTable", aDatas);
          oTable.removeSelections();
        }
      },
    });
  }
);
