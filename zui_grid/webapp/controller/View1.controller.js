sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("zuigrid.controller.View1", {
      onInit: function () {
        // Use smaller margin around grid when on smaller screens
        var oGrid = this.getView().byId("demoGrid");
        // oGrid.attachLayoutChange(function (oEvent) {
        //   var sLayout = oEvent.getParameter("layout");
        //   debugger;
        //   if (sLayout === "layoutXS" || sLayout === "layoutS") {
        //     oGrid.removeStyleClass("sapUiSmallMargin");
        //     oGrid.addStyleClass("sapUiTinyMargin");
        //   } else {
        //     oGrid.removeStyleClass("sapUiTinyMargin");
        //     oGrid.addStyleClass("sapUiSmallMargin");
        //   }
        // });
      },

      //   onRevealGrid: function () {
      //     RevealGrid.toggle("demoGrid", this.getView());
      //   },

      //   onExit: function () {
      //     RevealGrid.destroy("demoGrid", this.getView());
      //   },

      onSnapToRowChange: function (oEvent) {
        console.log(oEvent.getParameter("state"));
        this.getView()
          .byId("demoGrid")
          .setSnapToRow(oEvent.getParameter("state"));
      },

      onAllowDenseFillChange: function (oEvent) {
        console.log(oEvent.getParameter("state"));
        this.getView()
          .byId("demoGrid")
          .setAllowDenseFill(oEvent.getParameter("state"));
      },

      onInlineBlockLayoutChange: function (oEvent) {
        console.log(oEvent.getParameter("state"));
        this.getView()
          .byId("demoGrid")
          .setInlineBlockLayout(oEvent.getParameter("state"));
      },

      onPress: function (oEvent) {
        MessageToast.show(
          "Press was fired on - " + oEvent.getSource().getMetadata().getName()
        );
      },

      onGridColumnsChange: function (oEvent) {
        this.getView()
          .byId("columnsCountText")
          .setText(
            "Current grid columns count: " + oEvent.getParameter("columns")
          );
      },
    });
  }
);
