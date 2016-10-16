(function () {
	'use strict';

	angular.module('NarrowItDownApp', [])
		.controller('NarrowItDownController', NarrowItDownController)
		.service('MenuSearchService', MenuSearchService)
		.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
		.directive('foundItems',foundItems);

	function foundItems() {
		var ddo = {
			restrict: 'E',
			templateUrl: 'template.html',
			controller: foundItemsDirectiveController,
			controllerAs: 'flist',
			bindToController: true,
			scope:{
				foundItems: '<',
				onRemove: '&onRemove'
			}

		};
		return ddo;
	}

	function foundItemsDirectiveController() {

	}

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var menu = this;

		menu.searchWord = "";

		menu.getItems = function (searchTerm) {
			if (searchTerm==""){
				menu.message = "Nothing found, empty search field";
				menu.found =[];
			}else{
				var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

				promise.then(function (response) {
					if (response!=false){
						menu.message = "";
						menu.found = response;
					}else{
						menu.message = "Nothing found";
						menu.found =[];
					}
				})
					.catch(function (error) {
						console.log("Something went terribly wrong.");
					});
			}

		};

		menu.removeItem = function (itemIndex) {
			return menu.found.splice(itemIndex,1);
		}


	}


	MenuSearchService.$inject = ['$http', 'ApiBasePath']
	function MenuSearchService($http, ApiBasePath) {
		var service = this;

		service.getMatchedMenuItems = function (searchTerm) {
			return $http({
				method: "GET",
				url: (ApiBasePath + "/menu_items.json")
			}).then(function (response) {
				var foundItems = response.data.menu_items;

				var nuArray = [];

				for(var item in foundItems) {
					var descCheck = foundItems[item].description.toLowerCase();
					var fixsearch = searchTerm.toLowerCase();
					if(descCheck.indexOf(fixsearch) != -1) {
						nuArray.push(foundItems[item]);
					}
				}

				foundItems = nuArray;

				return foundItems;

			}).catch(function (error) {
				console.log(error);
			});

		};

	}

})();