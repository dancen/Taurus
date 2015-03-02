/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function() {


    // MAIN MODULE CREATION
    var taurus = angular.module('taurus', ['ngRoute',
        'taurusControllers',
        'taurusFactories',
        'taurusDirectives',
        'taurusServices'])
            .constant('TIMEOUT', 1600)
            .constant('RESPONSE_SUCCESS', "success");






})();