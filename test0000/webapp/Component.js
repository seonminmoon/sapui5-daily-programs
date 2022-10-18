sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "test0000/model/models",
    "sap/base/util/UriParameters",
    "sap/f/FlexibleColumnLayoutSemanticHelper",
  ],
  function (
    UIComponent,
    Device,
    models,
    UriParameters,
    FlexibleColumnLayoutSemanticHelper
  ) {
    "use strict";

    return UIComponent.extend("test0000.Component", {
      metadata: {
        manifest: "json",
      },

      /**
       * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
       * @public
       * @override
       */
      init: function () {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);

        // enable routing
        this.getRouter().initialize();

        // set the device model
        this.setModel(models.createDeviceModel(), "device");
      },

      getHelper: function () {
        var oFCL = this.getRootControl().byId("fcl"),
          oParams = UriParameters.fromQuery(location.search),
          oSettings = {
            defaultTwoColumnLayoutType: sap.f.LayoutType.TwoColumnsMidExpanded,
            mode: oParams.get("mode"),
            maxColumnsCount: oParams.get("max"),
          };

        return FlexibleColumnLayoutSemanticHelper.getInstanceFor(
          oFCL,
          oSettings
        );
      },
    });
  }
);
