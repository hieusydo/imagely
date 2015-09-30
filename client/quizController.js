var quizApp = angular.module('quizApp', [])
  .controller('QuizController', ['$scope', '$http', '$location', QuizController]);

  function QuizController($scope, $http, $location) {
    $scope.imageUrl;
    $scope.imageId;
    $scope.questionTag;
    $scope.answerChoices;
    $scope.language;
    var _http = $http;

    $scope.nextQuestion = function() {
      $http({
        method: 'GET',
        url: '/api/getRandom'
      }).success(function(record) {
        console.log(record);
        return record;
        var urlId = record[0].imageUrl;
        $scope.imageId = urlId;
        console.log(urlId);

        $scope.imageUrl = _http({
          method: 'GET',
          url: '/api/findImage:' + urlId
        }).error(function(err) {
          console.log(err);
        });

        // var choices = record[0].
      });
      // $http({
      //   method: 'GET',
      //   url: '/api/findImage:' + $scope.imageId
      // })
    }

    $scope.$watch(function() {
      return $scope.imageUrl;
    }, function(newVal, oldVal) {
      $scope.imageUrl = newVal;
    })
  }