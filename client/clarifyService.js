
var imageApp = angular.module('imagely', [])
  .factory('ClarifyService', ['$http', ClarifyService]);

function ClarifyService($http) {
  var tags;
  return {
    retrieveTags: function(url) {
      return $http({
        method: 'GET',
        url: 'https://api.clarifai.com/v1/tag/\?url\=' + url,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': 'Bearer 2TLj4VyQsMt6KnbbpGENZ5sN1S5Hwh'
        }
      }).success(function(json) {
        console.log(json.results[0].result.tag.classes);
        tags = json.results[0].result.tag.classes;
        return json.results[0].result.tag.classes;
      });
    },

    getTags: function() {
      return tags;
    }
  }
}