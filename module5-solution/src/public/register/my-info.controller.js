(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['RegistrationService', 'MenuService'];
function MyInfoController(RegistrationService, MenuService) {
  var info = this;

  info.user  = RegistrationService.getPreference();
  if (info.user) {
    MenuService.getMenuItem(info.user.favdish.toUpperCase()).then(function(response){
      info.item = response;
      info.registered = true;
    });
  } else {
    info.registered = false;
  }

}

})();
