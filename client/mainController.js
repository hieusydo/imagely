imageApp
  .controller('MainController', ['$scope', '$location', 'ClarifyService', MainController]);

function MainController($scope, $location, ClarifyService) {
  $scope.tags;
  $scope.image;
  // $scope.hasImage = false;

  $scope.submit = function() {
    $scope.image = $('#url-input').val();
    // $scope.hasImage = true;
    ClarifyService.retrieveTags($('#url-input').val());
  };

  // $scope.submit = ClarifyService.retrieveTags($('#url-input').val());

  $scope.$watch(
    function() { return ClarifyService.getTags(); },
    function(newVal, oldVal) {
      $scope.tags = newVal;
    }
  )

}

