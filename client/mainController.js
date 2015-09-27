imageApp
	.controller('MainController', ['$scope', '$http', '$location', 'ClarifyService', 'YandexService', MainController]);

function MainController($scope, $http, $location, ClarifyService, YandexService) {
	//Parsing text from Clarifai
	$scope.tags;
	$scope.toBeTranslated;
	$scope.translated;
	$scope.translatedArr;

	$scope.submit = function() {
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
