sap.ui.define(
	['sap/ui/core/mvc/Controller'],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		'use strict';

		return Controller.extend('todolist.controller.Main', {
			onInit: function () {
				let oModel = this.getOwnerComponent().getModel();
				oModel.setData({
					'uiTable': [],
					'mTable': [],
				});
			},

			onAdd1: function () {},

			onDelete1: function () {},

			onAdd2: function () {},

			onDelete2: function () {},
		});
	}
);
