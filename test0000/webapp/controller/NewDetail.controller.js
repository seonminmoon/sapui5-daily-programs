sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("test0000.controller.NewDetail", {
      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter
          .getRoute("NewDetail")
          .attachPatternMatched(this._onPatternMatched, this);
      },

      /**
       * Route Pattern이 URI와 일치할 경우 실행
       * Title text 세팅
       */
      _onPatternMatched: function (oEvent) {
        // let sValue = oEvent.getParameter("arguments").product;
        // this.byId("headerKey").setText(sValue);
        // this._product = sValue;
      },
    });
  }
);
