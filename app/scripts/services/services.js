/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function() {

    //var timeout = 1600;

// MODULE TO MANAGE CONTROLLERS
    var taurusServices = angular.module('taurusServices', []);


    taurusServices.service("taurusService", ["$http", function($http) {
            
            var service = this;
            
            service.verifySecretCode = function(secretCode,email) {
                return $.ajax({
                    type: 'POST',
                    url: 'http://localhost/taurusApi/web/app_dev.php/verify/secret-code',
                    data: 'secretcode=' + secretCode + '&email=' + email,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            };
       
            service.veryfyAuthorizationCode = function(secretCode,authCode,transactionID) {
                return $.ajax({
                    type: 'POST',
                    url: 'http://localhost/taurusApi/web/app_dev.php/verify/authorization-code',
                    data: 'secretcode=' + secretCode + '&authCode=' + this.normalizeCode(authCode) + '&transactionID=' + transactionID,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            };
       
            service.executePayment = function(beneficiaryName,beneficiaryAccount,orderAmount,bankNote,transactionID) {
                return $.ajax({
                    type: 'POST',
                    url: 'http://localhost/taurusApi/web/app_dev.php/execute/transaction',
                    data: 'beneficiaryname=' + beneficiaryName + '&beneficiaryaccount=' + beneficiaryAccount +'&orderamount=' + orderAmount + '&banknote=' + bankNote + '&transactionID=' + transactionID,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            };
            
            service.normalizeCode = function(code) {
               return code.replace(/ /g, "");   
            };
            
        }]);
    
    
    taurusServices.service("saveContactService", ["$http", function($http) {

            var service = this;
            service.exec = function(name,email,message) {
                return $http({
                    method: 'GET',
                    url: './app/scripts/resources/data/contactResponse.json',
                    data: 'contactname=' + name + '&contactemail=' + email + '&contactmessage=' + message,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            };
        }]);
    
    
   


    



})();