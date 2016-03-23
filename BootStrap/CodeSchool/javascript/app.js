(function () {
    var app = angular.module('myApp', ['ngRoute']);

    app.directive('companyTitle', function(){
            return {
                restrict: 'E',
                templateUrl: 'templates/company-title.html'
            };
        });


    app.config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/tickets', {
                    templateUrl: 'templates/pages/transport-systems/index.html'
                })
                .when('/planning', {
                    templateUrl: 'templates/pages/plan-your-trip/index.html'
                })
                .otherwise({ redirectTo: '/'});
            }]);


})();