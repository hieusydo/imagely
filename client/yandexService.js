var imageApp = angular.module('imagely')
  .factory('YandexService', ['$http', YandexService]);

function YandexService($http) {
  var translated;
  return {
    translate: function(word) {
      return $http({
        method: 'GET',
        url: 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20150927T013447Z.0d8c7bc8f0f5c71c.4327628a8b6de7766c15fe1638af85dc4a88b0ee&lang=en-es&text=' + word,
      }).success(function(response) {
		translated = JSON.stringify(response["text"]);
		console.log(translated);
		return translated;
      });
    },

    getTranslated: function() {
    	return translated;
    }
  }
}