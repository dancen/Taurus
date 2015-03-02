/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



// HEADER CONTROLLER TEST
describe('HeaderController', function() {
    beforeEach(module('taurusControllers'));
    var $controller;
    beforeEach(inject(function(_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));
    describe('show contact and show home page', function() {
        it('show the contact', function() {
            var $scope = {};
            var controller = $controller('HeaderController', {$scope: $scope});
            $scope.showContact();
            expect($scope.visiblecontact).toEqual(true);
        });
        it('show the home', function() {
            var $scope = {};
            var controller = $controller('HeaderController', {$scope: $scope});
            $scope.showHome();
            expect($scope.classcontact).toEqual("");
        });
    });
});
// TORORROWDATE FACTORY TEST
describe('tomorrowDate', function() {

    var scope;
    beforeEach(module('taurusControllers'));
    beforeEach(module('taurusServices'));
    beforeEach(module('taurusFactories'));
    beforeEach(inject(function($injector) {
        createFactory = function() {
            return $injector.get('tomorrowDate');
        }
    }));
    it('should return 3', function() {
        var factory = createFactory();
        expect(factory["day"] > 0).toBeTruthy();
    });
});

describe("interface controller", function() {

    beforeEach(module('taurus'));
    var $controller, $window, taurusService, $httpBackend, appStatus;
    beforeEach(inject(function(_$controller_, _$window_, _taurusService_, _$httpBackend_, _appStatus_) {
        $controller = _$controller_;
        $window = _$window_;
        taurusService = _taurusService_;
        $httpBackend = _$httpBackend_;
        appStatus = _appStatus_;
    }));


    describe('$scope.isInterfaceVisible', function() {
        it('sets the interface not visible', function() {
            var $scope = {};
            var controller = $controller('InterfaceController', {$scope: $scope});
            $scope.isInterfaceVisible = false;
            $scope.init();
            expect($scope.isInterfaceVisible).toEqual(true);
        });
    });


    describe('$window.formHasErrors', function() {
        it('check transactionID is null', function() {
            var $scope = {};
            var controller = $controller('InterfaceController', {$scope: $scope});
            $window.formHasErrors = true;
            expect($scope.transactionID).toEqual(null);
        });
    });


    describe('$scope.workingInterface)', function() {
        it('check workingInterface visible', function() {
            var $scope = {};
            $scope.result = "error";
            var controller = $controller('InterfaceController', {$scope: $scope});
            $scope.workingInterface = false;
            var objstatus = new appStatus($scope);
            objstatus.setSecretCode();
            expect($scope.workingInterface).toEqual(true);

        });
    });


    describe('$scope.operationCode)', function() {
        it('check operationCode not visible', function() {
            var $scope = {};
            $scope.result = "error";
            var controller = $controller('InterfaceController', {$scope: $scope});
            $scope.workingInterface = false;
            var objstatus = new appStatus($scope);
            objstatus.updateAuthCode();
            expect($scope.isAuhtCodeError).toEqual(false);

        });
    });

    describe('taurusService.verifySecretCode)', function() {
        it('call the service method', function() {
            var $scope = {};
            var controller = $controller('InterfaceController', {$scope: $scope});
            $httpBackend.whenGET("./app/scripts/resources/data/verifySecretCode.json").respond({
                "transactionid": "789872ukh28928982jjjk299",
                "response": "success",
                "message": "",
                "bankid": "00192"
            });
            var service = taurusService.verifySecretCode("adcqwcd897", "test@teas.com");
            service.success(function(data) {
                expect(data.transactionid).toEqual("789872ukh28928982jjjk299");
            });
            $httpBackend.flush();


        });
    });

    describe('taurusService.veryfyAuthorizationCode)', function() {
        it('call the service method', function() {
            var $scope = {};
            var controller = $controller('InterfaceController', {$scope: $scope});
            $httpBackend.whenGET("./app/scripts/resources/data/veryfyAuthorizationCode.json").respond({
                "response": "success",
                "message": "",
                "bankid": "00192"
            });
            var service = taurusService.veryfyAuthorizationCode("adcqwcd897", "qcjkqwhkjcqwd89898098qwckjj", "qwdcl88908080909qwc-0980980");
            service.success(function(data) {
                expect(data.response).toEqual("success");
            });
            $httpBackend.flush();


        });
    });

    describe('taurusService.executePayment)', function() {
        it('call the service method', function() {
            var $scope = {};
            var controller = $controller('InterfaceController', {$scope: $scope});
            $httpBackend.whenGET("./app/scripts/resources/data/executePayment.json").respond({
                "operationid": "120000299292",
                "response": "success",
                "message": "",
                "bankid": "00192"
            });
            var service = taurusService.executePayment("daniele", "IT981098912090920000000000001212",
                    "123.00",
                    "pagamento fatura N.22333",
                    "qwjdcqwcq980989qwcdlkqwc-qwcdqw");
            service.success(function(data) {
                expect(data.operationid).toEqual("120000299292");
            });
            $httpBackend.flush();


        });
    });

});


describe('contact form test', function() {

    beforeEach(module('taurus'));
    var $controller, saveContactService, $httpBackend;
    beforeEach(inject(function(_$controller_, _saveContactService_, _$httpBackend_) {
        $controller = _$controller_;
        saveContactService = _saveContactService_;
        $httpBackend = _$httpBackend_;
    }));
    describe('show contact and show home page', function() {
        it('show the contact', function() {
            var $scope = {};
            var controller = $controller('ContactController', {$scope: $scope});
            $httpBackend.whenGET("./app/scripts/resources/data/contactResponse.json").respond({
                "response": "success"
            });
            var service = saveContactService.exec("daniele", "test@teas.com", "test message");
            service.success(function(data) {
                expect(data.response).toEqual("success");
            });
        });
    });

});
