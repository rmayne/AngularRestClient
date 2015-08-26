'use strict';

describe('myApp.view1 module', function() {

  beforeEach(module('RMRestClient'));

  describe('Person list controller', function(){

    it('should instantiate the person list controller', inject(function($controller) {
 
      var controller1 = $controller('PersonListControl');
      expect(controller1).toBeDefined();
    }));

  describe('Person controller', function(){

    it('should instantiate the person controller', inject(function($controller) {
 
      var controller2 = $controller('PersonCtrl');
      expect(controller2).toBeDefined();
    }));

  });
});