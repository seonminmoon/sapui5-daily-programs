sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("pdfproject.controller.PDFView", {
      onInit: function () {},

      onDownPDF: function () {
        //https://jeffrey-oh.tistory.com/363 참고

        let oDomRef = this.byId("Page").getDomRef();
        let oPDF = new jsPDF("p", "mm", "a4");

        html2canvas(oDomRef).then((canvas) => {
          var imgData = canvas.toDataURL("image/jpeg");

          var imgWidth = 210;
          var pageHeight = imgWidth * 1.414;
          var imgHeight = (canvas.height * imgWidth) / canvas.width;
          var heightLeft = imgHeight; // new Page position
          var margin = 20;

          // oPDF.addPage();
          oPDF.addImage(imgData, "JPEG", 5, 5, imgWidth, imgHeight);
          oPDF.save("result.pdf");
          //   document.body.appendChild(canvas);
        });
      },
    });
  }
);
