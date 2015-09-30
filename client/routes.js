imageApp
  .config(function($routeProvider) {
    .when('/quiz', {
      templateUrl: 'quiz.html',
      controller: 'QuizController'
    })
    .otherwise({
      redirectTo: '/',
    });
  })