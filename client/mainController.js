imageApp
	.controller('MainController', ['$scope', '$http', '$location', 'ClarifyService', 'YandexService', MainController]);

function MainController($scope, $http, $location, ClarifyService, YandexService) {
	//Parsing text from Clarifai
	$scope.tags;
	$scope.toBeTranslated;
	$scope.translated;
	$scope.image;
	$scope.translatedArr;
  $scope.translationDict = {};
	$scope.lang = 'es';
	$scope.language = 'Español';

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

  $scope.saveImageUrl = function() {
    if ($scope.image && $scope.tags && $scope.translatedArr) {
      console.log($scope.translationDict);

      $http({
        method: 'POST',
        data: {
          url: $scope.image
        },
        url: '/api/storeImageUrl'
      }).success(function(urlId) {
        console.log(urlId);
        return ClarifyService.storeTags($scope.translationDict, urlId + $scope.lang);
      }).error(function(err) {
        console.log(err);
      });
    }
  }

	//Translating
	$scope.changeES = function() {
		$scope.lang = 'es';
		$scope.language = 'Español';
	}

	$scope.changeVI = function() {
		$scope.lang = 'vi';
		$scope.language = 'Tiếng Việt';
	}

	$scope.changeRU = function() {
		$scope.lang = 'ru';
		$scope.language = 'Русский';
	}

	$scope.changeHE = function() {
		$scope.lang = 'he';
		$scope.language = 'עברית';
	}

	$scope.changeDE = function() {
		$scope.lang = 'de';
		$scope.language = 'Deutsche';		
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
      $scope.translationDict = _.object($scope.tags, $scope.translatedArr);
		}	
	);
}
