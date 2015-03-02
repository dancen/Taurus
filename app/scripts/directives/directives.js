(function() {

    var taurusDirectives = angular.module('taurusDirectives', []);

    taurusDirectives.directive("spinnerLoader", function() {
        return {
            restrict: 'E',
            templateUrl: 'app/scripts/views/partials/spinner-loader.html',
            replace: true
        };
    });
    
    taurusDirectives.directive("layoutFooter", function() {
        return {
            restrict: 'E',
            templateUrl: 'app/scripts/views/partials/layout-footer.html',
            replace: true
        };
    });
    
    taurusDirectives.directive("layoutHeader", function() {
        return {
            restrict: 'E',
            templateUrl: 'app/scripts/views/partials/layout-header.html',
            replace: true
        };
    });
    
    
    
    



})();