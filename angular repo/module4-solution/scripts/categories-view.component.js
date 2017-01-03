(function() {
'use strict';

angular.module('MenuApp')
  .component('categoriesView', {
    templateUrl: 'templates/categories-view.template.html',
    bindings: {
      categories: '<'
    }
  });

})();
