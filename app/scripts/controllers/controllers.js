/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function() {



    //var timeout = 1600;

// MODULE TO MANAGE CONTROLLERS
    var taurusControllers = angular.module('taurusControllers', []);

    taurusControllers.controller("MainController", ["$rootScope", function($rootScope) {

            $rootScope.isLoading = false;

            $rootScope.startLoader = function() {
                angular.element(".spinner-wrapper").css("display", "block");
                $rootScope.isLoading = true;
            };

            $rootScope.stopLoader = function() {
                angular.element(".spinner-wrapper").css("display", "none");
                $rootScope.isLoading = false;
            };

            $rootScope.background_img = "trumpet.jpg";
            $rootScope.setBg = function(b) {
                $rootScope.background_img = b;
            };



        }]);





    // NAVBAR CONTROLLER
    taurusControllers.controller("NavbarController",
            ["$timeout",
                "$scope",
                "TIMEOUT",
                function($timeout,
                        $scope,
                        timeout) {


                    $scope.load = function() {
                        $scope.startLoader();
                        $timeout($scope.stopLoader, timeout);
                    };


                }]);



    // NAVBAR CONTROLLER
    taurusControllers.controller("InterfaceController",
            ["$timeout",
                "$scope",
                "TIMEOUT",
                "RESPONSE_SUCCESS",
                "appStatus",
                "taurusService",
                '$window',
                '$location',
                '$anchorScroll',
                function($timeout,
                        $scope,
                        timeout,
                        success,
                        appStatus,
                        taurusService,
                        $window,
                        $location,
                        $anchorScroll) {



                    $scope.init = function() {
                        var objstatus = new appStatus($scope);
                        objstatus.init();
                        $location.hash('interface');
                        $anchorScroll();
                    };


                    $scope.setSecretCode = function() {
                        $scope.secretcode = angular.element("#secret-code").val().trim();
                        $scope.email = angular.element("#email").val().trim();
                        if (!$window.formHasErrors) {
                            $scope.startLoader();
                            var call = taurusService.verifySecretCode(
                                    $scope.secretcode,
                                    $scope.email);
                            call.success(function(data) {
                                if (data.response == success) {                                    
                                    var objstatus = new appStatus($scope);
                                    objstatus.setSecretCode();                                    
                                    $scope.transactionID = data.transactionid;
                                    $location.hash('interface');
                                    $anchorScroll();
                                } else {
                                    $scope.isSecretCodeError = true;
                                    alert(data.email);
                                }
                                $timeout($scope.stopLoader, timeout);
                            }).error(function(data) {
                                $scope.isSecretCodeError = true;
                                $timeout($scope.stopLoader, timeout);
                            });
                        }
                    };

                    $scope.updateAuthCode = function(number) {
                        if ($scope.operationCode.trim().length < 23) {
                            $scope.operationCode = $scope.operationCode + " " + number;
                        }
                        if ($scope.operationCode.trim().length == 23) {
                            $scope.startLoader();
                            var call = taurusService.veryfyAuthorizationCode(
                                    $scope.secretcode,
                                    $scope.operationCode.trim(),
                                    $scope.transactionID);
                            call.success(function(data) {
                                if (data.response == success) {
                                    var objstatus = new appStatus($scope);
                                    objstatus.updateAuthCode();
                                    $location.hash('interface');
                                    $anchorScroll();
                                } else {
                                    $scope.isAuhtCodeError = true;
                                }
                                $timeout($scope.stopLoader, timeout);
                            }).error(function(data) {
                                $scope.isAuhtCodeError = true;
                                $timeout($scope.stopLoader, timeout);
                            });
                        }
                    };

                    $scope.clearLastAuthCode = function() {
                        var objstatus = new appStatus($scope);
                        objstatus.clearLastAuthCode();
                    };

                    $scope.loadOrder = function() {
                        $scope.beneficiaryname = angular.element("#beneficiary-name").val();
                        $scope.beneficiaryaccount = angular.element("#beneficiary-account").val();
                        $scope.orderamount = angular.element("#order-amount").val();
                        $scope.banknote = angular.element("#bank-note").val();
                        
                        if (!$window.formHasErrors) {
                            $scope.startLoader();
                            var call = taurusService.executePayment(
                                    $scope.beneficiaryname,
                                    $scope.beneficiaryaccount,
                                    $scope.orderamount,
                                    $scope.banknote,
                                    $scope.transactionID);
                            call.success(function(data) {                                
                                var objstatus = new appStatus($scope);
                                if (data.response == success) {
                                    objstatus.loadOrder();
                                    $scope.operationID = data.operationid;
                                    $location.hash('interface');
                                    $anchorScroll();
                                } else {
                                    objstatus.cancelOrder();
                                }
                                $timeout($scope.stopLoader, timeout);
                            }).error(function(data) {
                                $scope.isPaymentError = true;
                                $timeout($scope.stopLoader, timeout);
                            });
                        }
                    };


                    $scope.newPayment = function() {
                        $scope.startLoader();
                        $scope.init();
                        $timeout($scope.stopLoader, timeout);
                    };

                    $scope.cancelOrder = function() {
                        $scope.startLoader();
                        $scope.init();
                        $timeout($scope.stopLoader, timeout);
                    };

                    $scope.init();
                }]);



    taurusControllers.controller("HeaderController", ['$scope', function($scope) {
            $scope.visiblecontact = false;
            $scope.classhome = "active";
            $scope.showContact = function() {
                $scope.visiblecontact = true;
                $scope.classcontact = "active";
                $scope.classhome = "";
            };
            $scope.showHome = function() {
                $scope.visiblecontact = false;
                $scope.classcontact = "";
                $scope.classhome = "active";
                location.replace("#/");
            };


        }]);




//CONTACT FORM CONTROLLER
    taurusControllers.controller("ContactController", ["$timeout",
        'saveContactService',
        'TIMEOUT',
        'RESPONSE_SUCCESS',
        "$scope",
        "$window",
        function($timeout, saveContactService,
                timeout,
                success,
                $scope,
                $window) {
            $scope.isSuccessContact = false;
            $scope.isServerErrorContact = false;
            $scope.submitContact = function() {
                $scope.contactname = angular.element("#contact-name").val().trim();
                $scope.contactemail = angular.element("#contact-email").val().trim();
                $scope.contactmessage = angular.element("#contact-message").val().trim();
                if (!$window.formHasErrors) {
                    $scope.startLoader();
                    var call = saveContactService.exec(
                            $scope.contactname,
                            $scope.contactemail,
                            $scope.contactmessage);
                    call.success(function(data) {
                        if (data.response == success) {
                            $scope.isSuccessContact = true;
                            $scope.isServerErrorContact = false;
                        } else {
                            $scope.isServerErrorContact = true;
                            $scope.isSuccessContact = false;
                        }
                        $timeout($scope.stopLoader, timeout);
                    }).error(function(data) {
                        $scope.isServerErrorContact = true;
                        $scope.isSuccessContact = false;
                        $timeout($scope.stopLoader, timeout);
                    });
                }
            };
        }]);


})();