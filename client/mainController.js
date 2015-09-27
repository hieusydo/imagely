// (function() {

angular.module('imagely', [])
  .controller('MainController', ['$scope', '$location', MainController]);

function MainController($scope, $location) {
  $scope.json;

  $scope.submit = function() {
    console.log($('#url-input').val());
    var url = $('#url-input').val();

    $.ajax({
      'type': 'GET',
      'contentType': 'application/json; charset=utf-8',
      'url': 'https://api.clarifai.com/v1/tag/\?url\=' + url,
      'headers': {
        'Authorization': 'Bearer URQPb61EeLHho94TOHzZmthOWwHJRL'
      }
    }).then(function(json) {
      console.log(json);
      $scope.json = JSON.parse(json);
    });
  }
}
// })();
