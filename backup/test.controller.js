sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("odatatest.controller.Main", {
      onInit: function () {
        this.oModel = this.getOwnerComponent().getModel();
      },

      onUpdate: function () {
        var path = this.oModel.createKey("/maraSet", {
          Matnr: "1000",
        });
        var odata = {
          Spart: "55",
        };
        this.oModel.update(path, odata, {
          success: function (oRetrurn) {
            sap.m.MessageToast.show("Success Update");
          },
          error: function (oError) {
            debugger;
          },
        });
      },

      onCreate: function () {
        var odata = {
          Matnr: "F2000",
          Mtart: "ROH",
          Spart: "99",
          Meins: "EA",
        };
        this.oModel.create("/maraSet", odata, {
          success: function (oRetrurn) {
            sap.m.MessageToast.show("Success Create");
          },
          error: function (oError) {
            debugger;
          },
        });
      },

      onReadEntity: function () {
        var oTable = this.byId("idProductsTable");
        var sPath = oTable.getSelectedContextPaths()[0];
        this.oModel.read(sPath, {
          success: function (oRetrurn) {
            sap.m.MessageToast.show(oRetrurn.Matnr);
          },
          error: function (oError) {},
        });
      },

      onItemPress: function (oEvent) {
        // var path = oEvent.getParameters().listItem.getBindingContext().getPath();
        // this.oModel.read(path, {
        //     success: function(oRetrurn) {
        //         sap.m.MessageToast.show(oRetrurn.Matnr);
        //     },
        //     error: function(oError) {
        //     }
        // });
      },
    });
  }
);
