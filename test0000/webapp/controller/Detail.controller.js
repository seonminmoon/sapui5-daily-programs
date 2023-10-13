sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("test0000.controller.Detail", {
      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter();

        let oExitButton = this.getView().byId("exitFullScreenBtn"),
          oEnterButton = this.getView().byId("enterFullScreenBtn");

        this.oRouter
          .getRoute("Detail")
          .attachPatternMatched(this._onPatternMatched, this);

        [oExitButton, oEnterButton].forEach(function (oButton) {
          oButton.addEventDelegate({
            onAfterRendering: function () {
              if (this.bFocusFullScreenButton) {
                this.bFocusFullScreenButton = false;
                oButton.focus();
              }
            }.bind(this),
          });
        }, this);
      },

      /**
       * Route Pattern이 URI와 일치할 경우 실행
       * Title text 세팅
       */
      _onPatternMatched: function (oEvent) {
        let sValue = oEvent.getParameter("arguments").product;
        this.byId("headerKey").setText(sValue);
        this._product = sValue;
      },

      /**
       * 닫기 버튼 클릭 시 메인화면으로 이동
       */
      handleClose: function () {
        let oNextUIState = this.getOwnerComponent()
          .getHelper()
          .getNextUIState(0);
        this.oRouter.navTo("Main", { layout: oNextUIState.layout });
      },

      /**
       * 풀스크린 모드 세팅
       */
      handleFullScreen: function () {
        this.bFocusFullScreenButton = true;
        var sNextLayout = "MidColumnFullScreen"; //sap.f.LayoutType
        this.oRouter.navTo("Detail", {
          layout: sNextLayout,
          product: this._product,
        });
      },

      /**
       * 풀스크린 모드 종료
       */
      handleExitFullScreen: function () {
        this.bFocusFullScreenButton = true;
        var sNextLayout = "TwoColumnsMidExpanded"; //sap.f.LayoutType

        this.oRouter.navTo("Detail", {
          layout: sNextLayout,
          product: this._product,
        });
      },
    });
  }
);
