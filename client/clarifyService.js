
var imageApp = angular.module('imagely', ['ngRoute'])
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
          'Authorization': 'Bearer maarbxlcmJdtTDGC5VCw3qHEiTt9xq'
        }
      }).success(function(json) {
        console.log(json.results[0].result.tag.classes);
        tags = json.results[0].result.tag.classes;
        return json.results[0].result.tag.classes;
      });
    },

    storeTags: function(tags, urlId) {
      return $http({
        method: 'POST',
        data: tags,
        url: '/api/storeTags:'+ urlId
      }).success(function(tags) {
        return tags;
      }).error(function(err) {
        console.log(err);
      });
    },

    getTags: function() {
      return tags;
    }
  }
}