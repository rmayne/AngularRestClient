'use strict';

describe('service', function() {

  // load modules
  beforeEach(module('RMRestClient'));

  // Test service availability
  it('check the existence of Person factory', inject(function(Person) {
      expect(Person).toBeDefined();
    }));
});