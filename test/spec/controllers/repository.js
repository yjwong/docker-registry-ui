'use strict';

describe('Controller: RepositoryCtrl', function () {

  // load the controller's module
  beforeEach(module('dockerRegistryUiApp'));

  var RepositoryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RepositoryCtrl = $controller('RepositoryCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RepositoryCtrl.awesomeThings.length).toBe(3);
  });
});
