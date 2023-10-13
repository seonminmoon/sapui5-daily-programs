sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/f/library",
    "sap/ui/model/json/JSONModel",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, library, JSONModel) {
    "use strict";

    return Controller.extend("test0000.controller.Main", {
      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter();

        this.getView().setModel(
          new JSONModel({
            data: [
              { name: "hihi", age: "123" },
              { name: "hihi", age: "123" },
              { name: "hihi", age: "123" },
            ],
            fullName: "My Name",
          }),
          "main"
        );
      },

      fnCustomSum: function (num1, num2) {
        return num1 + num2;
      },

      /**
       * 아이템 클릭 시 미드컬럼 페이지 확장
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

      onGoNewDetail: function () {
        this.oView.getParent().getParent().setLayout("MidColumnFullScreen");
        this.oRouter.navTo("NewDetail", {
          layout: "MidColumnFullScreen",
        });
      },

      onSearch: function (oEvent) {
        debugger;
      },
    });
  }
);
