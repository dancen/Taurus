(function() {

    var taurusFactories = angular.module('taurusFactories', []);

    taurusFactories.factory('tomorrowDate', function() {

        var tomorrow = new Date();
        var dd = tomorrow.getDate() + 1;
        var mm = tomorrow.getMonth() + 1; //January is 0!
        var yyyy = tomorrow.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }
        ;

        if (mm < 10) {
            mm = '0' + mm;
        }
        ;

        var tomorrowdate = new Array();
        tomorrowdate["day"] = dd;
        tomorrowdate["month"] = mm;
        tomorrowdate["year"] = yyyy;
        return tomorrowdate;


    });





    taurusFactories.factory('appStatus', ["tomorrowDate", function(tomorrowDate) {

            function Factory(scope) {

                $scope = scope;
            }
            ;

            Factory.prototype.init = function() {
                $scope.isInterfaceVisible = true;
                $scope.isSuccess = false;
                $scope.isPaymentError = false;
                $scope.workingInterface = false;
                $scope.initInterface = true;
                $scope.isAuthCode = false;
                $scope.isBankInfo = false;
                $scope.bankInfo = null;
                $scope.isOperationCode = false;
                $scope.operationCode = "";
                $scope.isSecretCode = true;
                $scope.isSecretCodeSent = true;
                $scope.isOrderActive = false;
                $scope.isCodeAccepted = false;
                $scope.isOpCodeAccepted = false;
                $scope.isReview = false;
                $scope.orderDate = tomorrowDate["day"] + "." + tomorrowDate["month"] + "." + tomorrowDate["year"];
                $scope.isSecretCodeError = false;
                $scope.isAuhtCodeError = false;
                $scope.transactionID = null;

            };

            Factory.prototype.setSecretCode = function() {
                $scope.workingInterface = true;
                $scope.initInterface = false;
                $scope.isBankInfo = true;
                $scope.isSecretCode = false;
                $scope.isOperationCode = true;
                $scope.bankInfo = "UBI - Banca dell'indusria e artigianato - Via G. Masina 15, Siziano (PV), 27010";
                $scope.isSecretCodeSent = false;
                $scope.isCodeAccepted = true;
                $scope.isSecretCodeError = false;
            };


            Factory.prototype.updateAuthCode = function() {
                $scope.isOrderActive = true;
                $scope.isCodeAccepted = false;
                $scope.isOpCodeAccepted = true;
                $scope.isOperationCode = false;
                $scope.isInterfaceVisible = false;
                $scope.isAuhtCodeError = false;
            };

            Factory.prototype.clearLastAuthCode = function() {
                var str = $scope.operationCode;
                $scope.operationCode = str.substring(0, str.length - 1).trim();
                $scope.isOrderActive = false;
                $scope.isCodeAccepted = true;
            };

            Factory.prototype.loadOrder = function() {
                $scope.isOrderActive = false;
                $scope.isCodeAccepted = false;
                $scope.isReview = true;
                $scope.isSuccess = true;
                $scope.isPaymentError = false;
                $scope.workingInterface = false;
                $scope.initInterface = true;
                $scope.isOpCodeAccepted = false;
                $scope.isInterfaceVisible = false;
            };

            Factory.prototype.cancelOrder = function() {
                $scope.isPaymentError = true;
                $scope.isOrderActive = false;
                $scope.isCodeAccepted = false;
                $scope.isReview = true;
                $scope.workingInterface = false;
                $scope.initInterface = true;
                $scope.isOpCodeAccepted = false;
                $scope.isInterfaceVisible = false;
            };


            return Factory;


        }]);


})();