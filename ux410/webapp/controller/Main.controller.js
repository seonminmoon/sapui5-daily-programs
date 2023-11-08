sap.ui.define(
    [
      "sap/ui/core/mvc/Controller",
      "sap/ui/model/Filter",
      "sap/ui/model/json/JSONModel",
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, JSONModel) {
      "use strict";
  
      return Controller.extend("ux410.controller.Main", {
        onInit: function () {
                      this.getView().setModel(new JSONModel({ datas : [
                  {type : 'bar'},
                  {type : 'column'},
                  {type : 'line'},
                  {type : 'donut'}
              ] }), 'typeList');
        },
  
        onSearch: function (oEvent) {
          // const oFilterItems = oEvent.getParameter("selectionSet"),
          //   oComboBox = oFilterItems[0],
          //   sSelectedKey = oComboBox.getSelectedKey(),
          let oFlattenedDataset = this.byId("dataSet");
          let sSelectedKey = this.byId("searchOrderID").getSelectedKey();
          let sSelectedType = this.byId("searchType").getSelectedKey();
          let oFilter;
  
          if (!sSelectedType) {
            this.byId("searchType").setValueState("Error");
            return;
          }
          this.byId("searchType").setValueState("None");
  
          if (sSelectedKey) oFilter = new Filter("OrderID", "EQ", sSelectedKey);
  
          oFlattenedDataset.getBinding("data").filter(oFilter);
          this.byId("idVizFrame").setVizType(sSelectedType);
        },
  
        onChartSelectData: function (oEvent) {
          const oComponent = this.getOwnerComponent(),
            oRouter = oComponent.getRouter(),
            oData = oEvent.getParameter("data")[0].data,
            oVizFrame = this.byId("idVizFrame");
  
          oVizFrame.vizSelection(oData, { clearSelection: true });
  
          oRouter.navTo("RouteDetail", {
            OrderID: oData.OrderID,
            ProductID: oData.ProductID,
          });
        },
      });
    }
  );