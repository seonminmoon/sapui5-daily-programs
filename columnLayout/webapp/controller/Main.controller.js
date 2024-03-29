sap.ui.define(
  [
    "./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/f/library",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (
    BaseController,
    Filter,
    FilterOperator,
    JSONModel,
    Fragment,
    fioriLibrary
  ) {
    "use strict";

    return BaseController.extend("report.controller.Main", {
      onInit: function () {
        // const oRouter = this.getOwnerComponent().getRouter();

        this.getOwnerComponent().setModel(new JSONModel(), "local");
        this._setInitialFilter();
        // oRouter
        //   .getRoute("RouteMain")
        //   .attachPatternMatched(this._onObjectMatched, this);
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
        let oFCL = this.oView.getParent().getParent();

        // this.getView().setBusy(true);

        oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);

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
    });
  }
);
