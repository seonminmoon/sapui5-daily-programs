sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/viz/ui5/format/ChartFormatter",
    "sap/viz/ui5/api/env/Format",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Filter, ChartFormatter, Format) {
    "use strict";

    return Controller.extend("sap.btp.exproject.controller.Main", {
      /**
       * Life Cycle onInit
       */
      onInit: function () {
        this._setInitModel();
        this._setVizFrame();
      },

      /**
       * Initialize Model Setting
       * 기본 모델 세팅
       */
      _setInitModel: function () {
        const oFakeData = this.getFakeData();

        const oView = this.getView();
        oView.setModel(new JSONModel(oFakeData), "data");

        oView.setModel(new JSONModel([]), "donut");

        oView.setModel(new JSONModel([]), "stacked");
      },

      /**
       * VizFrame Property Setting
       * 차트 기본 세팅 함수
       */
      _setVizFrame: function () {
        Format.numericFormatter(ChartFormatter.getInstance());
        const oView = this.getView();
        const oDonutVizFrame = oView.byId("donutChart");
        const oStackedVizFrame = oView.byId("stackChart");

        let oProperties = {
          title: {
            visible: true,
          },

          legend: {
            drawingEffect: "glossy", //'normal, glossy'
          },

          plotArea: {
            drawingEffect: "glossy",
            dataLabel: {
              visible: true,
            },
          },
        };

        oDonutVizFrame.setVizProperties(oProperties);
        oStackedVizFrame.setVizProperties(oProperties);

        const oDonutPopOver = oView.byId("donutPopover");
        const oStackedPopOver = oView.byId("stackPopover");
        oDonutPopOver.connect(oDonutVizFrame.getVizUid());
        oDonutPopOver.setFormatString(
          ChartFormatter.DefaultPattern.STANDARDFLOAT
        );
        oStackedPopOver.connect(oStackedVizFrame.getVizUid());
        oStackedPopOver.setFormatString(
          ChartFormatter.DefaultPattern.STANDARDFLOAT
        );
      },

      /**
       * 검색 조건 버튼 이벤트
       */
      onSearchPress: function () {
        const oView = this.getView(),
          oSelect = oView.byId("selectYear"),
          sKey = oSelect.getSelectedKey();

        const oTable = oView.byId("airplanTable");

        oTable.getBinding("items").filter(new Filter("year", "EQ", sKey));

        oView.getModel("donut").setData([]);
        oView.getModel("stacked").setData([]);
      },

      /**
       * Table Item Click Event
       * 테이블 Item 클릭 이벤트
       * @param {sap.ui.base.Event} oEvent
       */
      onTableItemPress: function (oEvent) {
        const oDonutVizFrame = this.getView().byId("donutChart");
        oDonutVizFrame.getModel("stacked").setData([]);
        oDonutVizFrame.setBusy(true);

        const oControl = oEvent.getSource(),
          oDataModel = oControl.getModel("data"),
          sContextPath = oControl.getBindingContextPath();

        const aTableData = oDataModel.getProperty("/"),
          oContextData = oDataModel.getProperty(sContextPath);

        const aDonutData = aTableData.filter(
          (oRow) => oRow.airline === oContextData.airline
        );

        let oProperties = oDonutVizFrame.getVizProperties();
        oProperties.title.text = aDonutData[0].airlineName + " 년도별 매출액";
        oDonutVizFrame.setVizProperties(oProperties);
        oDonutVizFrame.getModel("donut").setData(aDonutData);

        oDonutVizFrame.setBusy(false);
      },

      /**
       * VizFrame(Donut Chart) SelectData Event
       * 도넛 차트 각 데이터에 대한 클릭 이벤트
       * @param {sap.ui.base.Event} oEvent
       */
      onSelectData: function (oEvent) {
        const oVizFrame = this.getView().byId("stackChart");
        oVizFrame.setBusy(true);

        const oDonutModel = oVizFrame.getModel("donut"),
          oSelectData = oEvent.getParameter("data")[0].data,
          oDonutData = oDonutModel.getProperty("/");

        const aSelectData = oDonutData.filter(
          (oRow) => oRow.year === oSelectData["연도"]
        );

        let oProperties = oVizFrame.getVizProperties();
        oProperties.title.text = aSelectData[0].year + "년도 월별 매출액";
        oProperties.plotArea.dataLabel.visible = false;
        oProperties.plotArea.dataLabel.formatString =
          ChartFormatter.DefaultPattern.SHORTFLOAT_MFD2;
        oProperties.valueAxis.label.formatString =
          ChartFormatter.DefaultPattern.SHORTFLOAT;

        oVizFrame.setVizProperties(oProperties);
        oVizFrame.getModel("stacked").setData(aSelectData[0].items);

        oVizFrame.setBusy(false);
      },

      /**
       * 서버데이터 없어 클라이언트 데이터로 대체
       * @returns {Array}
       */
      getFakeData: function () {
        return [
          {
            year: "2021",
            airline: "SQ",
            airlineName: "Singapore Airlines",
            numberOfReservations: 13097,
            salesAmount: 2520862288,
            salesCurrency: "KRW",
            cancellations: 0,
            items: [
              {
                Month: "1월",
                Curam: 1,
                Curam_c: 2,
              },
              {
                Month: "2월",
                Curam: 3,
                Curam_c: 1,
              },
              {
                Month: "3월",
                Curam: 4,
                Curam_c: 2,
              },
            ],
          },
          {
            year: "2021",
            airline: "UA",
            airlineName: "United Airlines",
            numberOfReservations: 17584,
            salesAmount: 1353276426,
            salesCurrency: "KRW",
            cancellations: 581,
            items: [
              {
                Month: "1월",
                Curam: 22000000,
                Curam_c: 20000,
              },
              {
                Month: "2월",
                Curam: 21000000,
                Curam_c: 11111,
              },
              {
                Month: "3월",
                Curam: 20000000,
                Curam_c: 222421,
              },
              {
                Month: "4월",
                Curam: 23000000,
                Curam_c: 2134444,
              },
              {
                Month: "5월",
                Curam: 21000000,
                Curam_c: 5531233,
              },
              {
                Month: "6월",
                Curam: 12000000,
                Curam_c: 3333334,
              },
              {
                Month: "7월",
                Curam: 14000000,
                Curam_c: 9012411,
              },
              {
                Month: "8월",
                Curam: 20000000,
                Curam_c: 2,
              },
              {
                Month: "9월",
                Curam: 10000000,
                Curam_c: 2,
              },
              {
                Month: "10월",
                Curam: 40000000,
                Curam_c: 200,
              },
              {
                Month: "11월",
                Curam: 10000000,
                Curam_c: 2,
              },
              {
                Month: "12월",
                Curam: 11000000,
                Curam_c: 2,
              },
            ],
          },
          {
            year: "2021",
            airline: "AZ",
            airlineName: "Alitalia",
            numberOfReservations: 13091,
            salesAmount: 1322811710,
            salesCurrency: "KRW",
            cancellations: 434,
            items: [
              {
                Month: "1월",
                Curam: 1,
                Curam_c: 2,
              },
              {
                Month: "2월",
                Curam: 3,
                Curam_c: 1,
              },
              {
                Month: "3월",
                Curam: 4,
                Curam_c: 2,
              },
            ],
          },
          {
            year: "2022",
            airline: "AZ",
            airlineName: "Alitalia",
            numberOfReservations: 13091,
            salesAmount: 1322811710,
            salesCurrency: "KRW",
            cancellations: 434,
            items: [
              {
                Month: "1월",
                Curam: 1,
                Curam_c: 2,
              },
              {
                Month: "2월",
                Curam: 3,
                Curam_c: 1,
              },
              {
                Month: "3월",
                Curam: 4,
                Curam_c: 2,
              },
            ],
          },
        ];
      },
    });
  }
);
