'use strict';

/**
 * @ngdoc overview
 * @name dockerRegistryUiApp
 * @description
 * # dockerRegistryUiApp
 *
 * Main module of the application.
 */
angular
  .module('dockerRegistryUiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngMaterial',
    'ui.router',
    'base64',
    'angularMoment'
  ])
  .config(function ($locationProvider, $stateProvider, $urlRouterProvider,
                    $urlMatcherFactoryProvider, $mdThemingProvider,
                    dockerRegistryProvider, CONFIG) {
    // Use HTML5 mode.
    $locationProvider.html5Mode(true);

    // Register custom parameter types.
    $urlMatcherFactoryProvider.type('repository', {
      encode: function (value) {
        return value !== null ? value.toString() : value;
      },
      decode: function (value) {
        return value !== null ? value.toString() : value;
      },
      is: function (value) {
        return /.*/.test(value);
      }
    });

    // Configure the states.
    $stateProvider
      .state('main', {
        url: '/',
        views: {
          main: {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'vm'
          },
          'menu@main': {
            templateUrl: 'views/repositories.html',
            controller: 'RepositoriesCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('main.repository', {
        url: 'repositories/{name:repository}',
        views: {
          'content@main': {
            templateUrl: 'views/repository.html',
            controller: 'RepositoryCtrl',
            controllerAs: 'vm'
          }
        }
      });

    $urlRouterProvider.otherwise('/');

    // Set up the theme.
    $mdThemingProvider.theme('default')
      .primaryPalette('pink')
      .accentPalette('orange');

    // Set up Docker Registry.
    dockerRegistryProvider.setUsername(CONFIG.registry.username);
    dockerRegistryProvider.setPassword(CONFIG.registry.password);
    dockerRegistryProvider.setRegistryUrl(CONFIG.registry.url);
  });
