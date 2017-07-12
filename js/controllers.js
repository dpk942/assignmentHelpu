var bookControllers = angular.module('bookControllers', ['ngAnimate']);

bookControllers.controller('ListController', ['$scope', '$http', '$rootScope',function($scope,$http,$rootScope) {
  	$scope.keyword = '';
    $rootScope.results = [];

      $scope.searchData = function () {

        $http.get("https://pincode.saratchandra.in/api/pincode/"+ $scope.keyword).success(function (data, status, headers, config) {
                console.log(data);
                $rootScope.results = data.data;
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
        };
}]);

bookControllers.controller('DetailsController', ['$scope','$routeParams','$rootScope', function($scope, $routeParams,$rootScope) {
    $scope.results = $rootScope.results;
    $scope.whichItem = $routeParams.itemId;

    if ($routeParams.itemId > 0) {
      $scope.prevItem = Number($routeParams.itemId)-1;
    } else {
      $scope.prevItem = $scope.results.length-1;
    }

    if ($routeParams.itemId < $scope.results.length-1) {
      $scope.nextItem = Number($routeParams.itemId)+1;
    } else {
      $scope.nextItem = 0;
    }
}]);

