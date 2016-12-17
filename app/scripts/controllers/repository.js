'use strict';

/**
 * @ngdoc function
 * @name dockerRegistryUiApp.controller:RepositoryCtrl
 * @description
 * # RepositoryCtrl
 * Controller of the dockerRegistryUiApp
 */
angular.module('dockerRegistryUiApp')
  .controller('RepositoryCtrl', function ($stateParams, $q, dockerRegistry, $mdSidenav) {
    var scope = this;
    scope.name = $stateParams.name;
    scope.registryBase = dockerRegistry.getRegistryBase();

    scope.toggleMenu = function () {
      $mdSidenav('left').toggle();
    }

    dockerRegistry.getTags($stateParams.name)
      .then(function (tags) {
        scope.tags = tags.map(function (tag) {
          return { name: tag };
        });

        // Fetch the manifest for each tag.
        return $q.all(tags.map(function (tag) {
          return dockerRegistry.getManifest($stateParams.name, tag);
        }));
      })
      .then(function (manifests) {
        scope.tags.forEach(function (tag, index) {
          tag.manifest = manifests[index];
        });
      });
  });
