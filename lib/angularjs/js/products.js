/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function() {

    var app = angular.module('store-products', []);

    app.directive("productTitle", function() {
        return{
            restrict: "E",
            templateUrl: "product-title.html",
        }
    });

    app.directive("productPanel", function() {
        return{
            restrict: "E",
            templateUrl: "product-panel.html",
            controller: function() {
                this.tab = 1;
                this.selectTab = function(setTab) {
                    this.tab = setTab;
                };
                this.isSelected = function(checkTab) {
                    return this.tab === checkTab;
                };
            },
            controllerAs: "panel",
        }
    });



})();