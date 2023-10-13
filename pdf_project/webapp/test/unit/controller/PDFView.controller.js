/*global QUnit*/

sap.ui.define([
	"pdf_project/controller/PDFView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("PDFView Controller");

	QUnit.test("I should test the PDFView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
