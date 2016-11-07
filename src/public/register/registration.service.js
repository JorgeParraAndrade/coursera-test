(function () {
angular.module('public')
.service('RegistrationService',RegistrationService);

var user = null;

function RegistrationService() {
  var service = this;
  var registered = false;

  service.setPreference = function(newuser) {
      user = newuser;
      registered = true;
  }

  service.getPreference = function() {
    return user;
  }


}

})();
