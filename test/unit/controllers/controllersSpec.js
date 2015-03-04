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





describe('appstatus factory testing', function() {

    beforeEach(module('taurus'));
    var $controller, appStatus, $httpBackend, ajax;
    beforeEach(inject(function(_$controller_, _appStatus_ , _$httpBackend_) {
        $controller = _$controller_;
        appStatus = _appStatus_;
        $httpBackend = _$httpBackend_;
    }));
    
      describe('testing init method', function() {
        it('isInterfaceVisible', function() {
             var $scope = {};
             var status = new appStatus($scope);
             status.init();
             expect($scope.isInterfaceVisible).toBeTruthy();
        });
        it('orderDate', function() {
             var $scope = {};
             var status = new appStatus($scope);
             status.init();
             expect($scope.orderDate.length === 10).toBeTruthy();
        });
        it('transactionID', function() {
             var $scope = {};
             var status = new appStatus($scope);
             status.init();
             expect($scope.transactionID).toBe(null);
        });
    });
   

});
