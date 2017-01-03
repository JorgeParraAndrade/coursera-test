(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {


  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'templates/home.template.html'
  })

  .state('categories', {
    url: '/categories',
    templateUrl: 'templates/menu.template.html',
    controller: 'MenuCategoriesController as ctrl',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('categories.items', {
    url: '/items/{index}',
    templateUrl: 'templates/items-view.template.html',
    controller: 'MenuItemsController as itemList',
    resolve: {
      items: ['$stateParams', 'categories', 'MenuDataService',
            function ($stateParams, categories, MenuDataService) {
              var index = $stateParams.index;
              var category = categories.data[index];
              return MenuDataService.getItemsForCategory(category.short_name);
            }]
    }
  });
}

})();
