'use strict';

/**
 * @ngdoc function
 * @name dockerRegistryUiApp.controller:RepositoriesCtrl
 * @description
 * # RepositoriesCtrl
 * Controller of the dockerRegistryUiApp
 */
angular.module('dockerRegistryUiApp')
  .controller('RepositoriesCtrl', function ($state, $mdToast, $mdSidenav, dockerRegistry) {
    var scope = this;

    scope.openRepository = function openRepository(repository) {
      $mdSidenav('left').close();
      $state.go('main.repository', { name: repository });
    };

    dockerRegistry.getRepositories()
      .then(function (repositories) {
        scope.repositories = repositories;
      })
      .catch(function (err) {
        $mdToast.show(
            $mdToast.simple()
              .content('Failed getting repositories: ' + err.statusText)
              .position('top right')
              .hideDelay(3000)
        );
      });
  });
