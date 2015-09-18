'use strict';

describe('Service: dockerRegistry', function () {

  // instantiate service
  var dockerRegistry,
    init = function () {
      inject(function (_dockerRegistry_) {
        dockerRegistry = _dockerRegistry_;
      });
    };

  // load the service's module
  beforeEach(module('dockerRegistryUiApp'));

  it('should do something', function () {
    init();

    expect(!!dockerRegistry).toBe(true);
  });

  it('should be configurable', function () {
    module(function (dockerRegistryProvider) {
      dockerRegistryProvider.setSalutation('Lorem ipsum');
    });

    init();

    expect(dockerRegistry.greet()).toEqual('Lorem ipsum');
  });

});
