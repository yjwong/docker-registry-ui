'use strict';

/**
 * @ngdoc function
 * @name dockerRegistryUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dockerRegistryUiApp
 */
angular.module('dockerRegistryUiApp')
  .controller('MainCtrl', function ($mdMedia, $mdSidenav) {
    if (!$mdMedia('gt-md')) {
      $mdSidenav('left', true).then(function (instance) {
        instance.open();
      });
    }
  });
