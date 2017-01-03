(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://ancient-river-80934.herokuapp.com/')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
