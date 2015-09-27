imageApp
	.controller('MainController', ['$scope', '$http', '$location', 'ClarifyService', 'YandexService', MainController]);

// <<<<<<< HEAD
// function MainController($scope, $location, ClarifyService) {
//   $scope.tags;
//   $scope.image;
//   // $scope.hasImage = false;

//   $scope.submit = function() {
//     $scope.image = $('#url-input').val();
//     // $scope.hasImage = true;
//     ClarifyService.retrieveTags($('#url-input').val());
//   };
// =======
function MainController($scope, $http, $location, ClarifyService, YandexService) {
	//Parsing text from Clarifai
	$scope.tags;
	$scope.toBeTranslated;
	$scope.translated;
  $scope.image;
	$scope.translatedArr;

	$scope.submit = function() {
    $scope.image = $('#url-input').val();
		ClarifyService.retrieveTags($('#url-input').val());
	};
	$scope.$watch(
		function() {
			return ClarifyService.getTags();
		},
		function(newVal, oldVal) {
			$scope.tags = newVal;
			console.log(JSON.stringify($scope.tags).replace(/\,/g, ', '));
			$scope.toBeTranslated = JSON.stringify($scope.tags).replace(/\,/g, ', ');
			$scope.translated = JSON.stringify($scope.translate($scope.toBeTranslated)); 
		}
	);
// >>>>>>> 2e5012c0cfb499d853d0840a1178fe2123b6e4fb

	//Translating
	// var word = 'art';
	$scope.translate = function() {
		YandexService.translate($scope.toBeTranslated);
	};

	$scope.$watch(
		function() {
			return YandexService.getTranslated();	
		},
		function(newVal, oldVal) {
			$scope.translated = newVal;
			$scope.translatedArr = $scope.translated.replace(/\[|\"\"|\"|\]|\\/g, '').split(',');
		}	
	);
}
