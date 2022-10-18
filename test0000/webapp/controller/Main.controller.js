sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/f/library"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, library) {
    "use strict";

    return Controller.extend("test0000.controller.Main", {
      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter();
      },

      /**
       * 아이템 클릭 시 Detail View로 이동
       */
      onListItemPress: function (oEvent) {
        var oNextUIState = this.getOwnerComponent()
          .getHelper()
          .getNextUIState(1);

        this.oView
          .getParent()
          .getParent()
          .setLayout(library.LayoutType.TwoColumnsMidExpanded);
        this.oRouter.navTo("Detail", {
          layout: oNextUIState.layout,
          product: oEvent.getParameters().id,
        });
      },
    });
  }
);
