(function () {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
		.controller('ToBuyController', ToBuyController)
		.controller('AlreadyBoughtController', AlreadyBoughtController)
		.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListService) {
		var list1 = this;

		list1.items = ShoppingListService.getItems();

		list1.addBoughtItem = function (indexnum) {
			ShoppingListService.addBoughtItem(indexnum);
		};

	}


	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListService) {
		var list2 = this;

		list2.items = ShoppingListService.getBoughtItems();

	}


	function ShoppingListCheckOffService() {
		var service = this;

		var items = [
			{nombre: 'Cookies', cantidad: 10 },
			{nombre: 'Cakes', cantidad: 15},
			{nombre: 'Sodas', cantidad: 20},
			{nombre: 'Chimichangas', cantidad: 25},
			{nombre: 'Pepto Bismols', cantidad: 30}];

		var boughtItems = [];


		service.addBoughtItem = function (indexNum) {
			var bItem = items[indexNum];
			items.splice(indexNum, 1);
			boughtItems.push(bItem);

		};

		service.getItems = function () {
			return items;
		};

		service.getBoughtItems = function () {
			return boughtItems;
		}


	}

})();