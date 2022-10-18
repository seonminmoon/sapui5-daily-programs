sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("test0000.controller.Detail", {
      onInit: function () {
        var oOwnerComponent = this.getOwnerComponent();

        this.oRouter = oOwnerComponent.getRouter();
        this.oModel = oOwnerComponent.getModel();

        this.oRouter
          .getRoute("Detail")
          .attachPatternMatched(this._onPatternMatched, this);
      },

      _onPatternMatched: function (oEvent) {
        var sValue = oEvent.getParameter("arguments").product;
        this.byId("headerKey").setText(sValue);
        // this._product =
        //   oEvent.getParameter("arguments").product || this._product || "0";
        // this.getView().bindElement({
        //   path: "/ProductCollection/" + this._product,
        //   model: "products",
        // });
      },
    });
  }
);
