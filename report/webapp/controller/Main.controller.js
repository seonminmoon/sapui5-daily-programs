sap.ui.define(
  [
    "./BaseController",
    "./fragments/CustomerIdController",
    "./DialogController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/export/Spreadsheet",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (
    BaseController,
    CustomerIdController,
    DialogController,
    Filter,
    FilterOperator,
    JSONModel,
    Fragment,
    Spreadsheet
  ) {
    "use strict";

    return BaseController.extend("report.controller.Main", {
      CustomerIdController: CustomerIdController,
      DialogController: DialogController,
      onInit: function () {
        const oRouter = this.getOwnerComponent().getRouter();

        this.getOwnerComponent().setModel(new JSONModel(), "local");
        this._setInitialFilter();
        oRouter
          .getRoute("RouteMain")
          .attachPatternMatched(this._onObjectMatched, this);
      },

      _setInitialFilter: function () {
        var oModel = this.getOwnerComponent().getModel("local");

        oModel.setProperty("/search", {
          EQ: {},
          Contains: {},
        });
      },

      _onObjectMatched: function (oEvent) {
        let sKey = oEvent.getParameter("arguments").CustomerID;
        this.byId("searchCustomerID").setValue(sKey);
        this.getView().setBusy(false);
        if (sKey) {
          this.onSearch();
        }
      },

      formatter: {
        dateTimeString: function (oDate) {
          let oDateTimeInstance;
          oDateTimeInstance = sap.ui.core.format.DateFormat.getDateTimeInstance(
            {
              pattern: "yyyy-MM-dd",
            }
          );

          return oDateTimeInstance.format(oDate);
        },
      },

      onCellClick: function (oEvent) {
        let oModel = this.getView().getModel();
        let oRouter = this.getOwnerComponent().getRouter();
        let sPath = oEvent.getParameters().rowBindingContext.getPath();
        let oData = oModel.getProperty(sPath);

        this.getView().setBusy(true);
        oRouter.navTo("RouteDetail", {
          OrderID: oData.OrderID,
        });
      },

      onSearch: function () {
        let oTable, aFilters, aMandatoryControls, validation, oControl;

        oTable = this.byId("idTable");
        aFilters = this.getConditions();

        aMandatoryControls = this.byId("filterBar")
          .getFilterGroupItems()
          .filter(function (item) {
            return item.getMandatory();
          });

        validation = aMandatoryControls.some(function (item) {
          oControl = item.getControl();
          if (oControl.getValue && !oControl.getValue()) {
            oControl.setValueState("Error");
            oControl.setValueStateText("필수값을 입력하세요.");
            return true;
          }
          return false;
        });

        if (!validation) {
          oTable.getBinding("rows").filter(aFilters);
        }
      },

      onClear: function () {
        var oModel = this.getOwnerComponent().getModel("local");

        oModel.setProperty("/search", {
          EQ: {},
          Contains: {},
          BT: {},
          // FilterOperator 조건 추가 가능
        });
      },
      onReset: function () {
        this._setInitialFilter();
      },

      onValueHelpCustomerID: function () {
        var oModel = this.getView().getModel();
        var oDialog = sap.ui.getCore().byId("DialogCustomerId");
        if (oDialog) {
          oDialog.setModel(oModel);
          oDialog.open();
          return;
        }

        Fragment.load({
          name: "report.view.fragments.CustomerID",
          type: "XML",
          controller: this,
        }).then(function (oDialog) {
          oDialog.setModel(oModel);
          oDialog.open();
        });
      },

      opBeforeOpenContextMenu: function (oEvent) {
        // Context Menu 오픈 전 이벤트
      },

      onMenuAction: function (oEvent) {
        sap.m.MessageToast.show(oEvent.getParameters().item.getText());
      },

      /*
      Excel Export 버튼을 누를 경우
      */
      onExportExcel: function () {
        var oTable = this.byId("idTable");
        var oSettings = {
          workbook: {
            columns: this._getCoulmnsExcel(),
          },
          dataSource: oTable.getBinding("rows"),
          fileName: "excel test",
        };
        var oSheet = new Spreadsheet(oSettings);

        // Excel Export
        oSheet.build().finally(function () {
          oSheet.destroy();
        });
      },

      /*
      Excel Export 를 위한 Column Info
      */
      _getCoulmnsExcel: function () {
        var oTable = this.byId("idTable");
        var aWorkBook = [];
        var aColumns = oTable.getColumns();

        aColumns.forEach(function (oColumn) {
          var obj = {};

          obj.label = oColumn.getLabel().getText();
          obj.property = oColumn.data("key");
          obj.width = oColumn.getWidth();
          if (oColumn.data("key") === "ShippedDate") {
            obj.format = "yyyymmdd";
            obj.type = sap.ui.export.EdmType.Date;
          }
          aWorkBook.push(obj);
        });

        return aWorkBook;
      },
    });
  }
);
