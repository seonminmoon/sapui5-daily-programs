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
  
      return Controller.extend("ux410.controller.Detail", {
        onInit: function () {
          const oComponent = this.getOwnerComponent(),
            oRouter = oComponent.getRouter();
  
          oRouter
            .getRoute("RouteDetail")
            .attachPatternMatched(this._onRoutePatternMatched, this);
        },
  
        _onRoutePatternMatched: function (oEvent) {
          const oView = this.getView(),
            oModel = oView.getModel(),
            oArgs = oEvent.getParameter("arguments");
  
          let sBindPath = oModel.createKey("/Order_Details", {
            OrderID: oArgs.OrderID,
            ProductID: oArgs.ProductID,
          });
  
          this._bindView(oView, sBindPath);
        },
  
        _bindView: function (oView, sBindPath) {
          console.log(sBindPath);
          oView.bindElement(sBindPath);
        },
      });
    }
  );