(function() {

  angular.module('imagely')
    .config(function($routeProvider) {

      $routeProvider
        .when('/', {
          templateUrl: './index.html',
          controller: 'MainController'
        });
    });
})();
