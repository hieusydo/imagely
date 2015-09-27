var quizApp = angular.module('quizApp', [])
  .controller('QuizController', ['$scope', '$http', '$location', QuizController]);

  function QuizController($scope, $http, $location) {
    $scope.imageUrl;
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
        console.log(urlId);
        $scope.imageUrl = _http({
          method: 'GET',
          url: '/api/findImage:' + urlId
        }).error(function(err) {
          console.log(err);
        });

        // var choices = record[0].
      })
    }
  }