(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['RegistrationService', 'MenuService'];
function SignUpController(RegistrationService, MenuService) {
  var reg = this;
  reg.favInvalid = false;

  reg.submit = function () {
    MenuService.getMenuItem(reg.user.favdish.toUpperCase()).then(function(response){
      RegistrationService.setPreference(reg.user);
      reg.favInvalid = false;
      reg.registered = true;
    }, function(err) {
      reg.favInvalid = true;
    }
    )
  };

}

})();
