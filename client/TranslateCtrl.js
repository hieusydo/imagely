'use strict';

/* Controllers */
var imagely = angular.module('imagely', []);

imagely.controller('TranslateCtrl', function($scope, $http) {
	$scope.text = 'hello';
	$scope.translated;
	var word = 'dog';
	$http.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20150927T013447Z.0d8c7bc8f0f5c71c.4327628a8b6de7766c15fe1638af85dc4a88b0ee&lang=en-es&text=' + word).
		then(function(response) {
			$scope.translated = JSON.stringify(response["data"]["text"]).replace(/\[|\]|\"/g, '');
			console.log($scope.translated)
		}, function(error) {
			console.log(error);
		});
});