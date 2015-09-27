imageApp
	.controller('MainController', ['$scope', '$http', '$location', 'ClarifyService', 'YandexService', MainController]);

function MainController($scope, $http, $location, ClarifyService, YandexService) {
	//Parsing text from Clarifai
	$scope.tags;
	$scope.toBeTranslated;
	$scope.translated;
	$scope.image;
	$scope.translatedArr;
	$scope.lang = 'es';

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

	//Translating
	$scope.changeES = function() {
		$scope.lang = 'es';
	}

	$scope.changeVI = function() {
		$scope.lang = 'vi';
	}

	$scope.changeRU = function() {
		$scope.lang = 'ru';
	}

	$scope.changeHE = function() {
		$scope.lang = 'he';
	}

	$scope.changeDE = function() {
		$scope.lang = 'de';
	}

	$scope.translate = function() {
		YandexService.translate($scope.lang, $scope.toBeTranslated);
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
