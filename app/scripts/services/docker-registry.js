'use strict';

/**
 * @ngdoc service
 * @name dockerRegistryUiApp.dockerRegistry
 * @description
 * # dockerRegistry
 * Provider in the dockerRegistryUiApp.
 */
angular.module('dockerRegistryUiApp')
  .provider('dockerRegistry', function () {

    // Private variables
    var username = null;
    var password = null;
    var registryUrl = null;

    // Public API for configuration
    this.setUsername = function setUsername(u) {
      username = u;
    };

    this.setPassword = function setPassword(p) {
      password = p;
    };

    this.setRegistryUrl = function setRegistryUrl(u) {
      registryUrl = u;
    };

    // Method for instantiating
    this.$get = function ($http, $base64, $document) {
      var getHeaders = function getHeaders() {
        return {
          'Authorization': 'Basic ' + $base64.encode(
              [ username, password ].join(':')
          )
        };
      };

      function DockerRegistry() {
        if (!registryUrl) {
          throw new Error('dockerRegistry requires setRegistryUrl to be called');
        }

        this.getRepositories = function getRepositories() {
          return $http
            .get(registryUrl + '/v2/_catalog', { headers: getHeaders() })
            .then(function (response) {
              return response.data.repositories;
            });
        };

        this.getTags = function getTags(repository) {
          return $http
            .get(registryUrl + '/v2/' + repository + '/tags/list', {
              headers: getHeaders()
            })
            .then(function (response) {
              return response.data.tags;
            });
        };

        this.getManifest = function getManifest(repository, tagOrDigest) {
          return $http
            .get(registryUrl + '/v2/' + repository + '/manifests/' + tagOrDigest, {
              headers: getHeaders()
            })
            .then(function (response) {
              response.data.history = response.data.history.map(
                  function (history) {
                    return JSON.parse(history.v1Compatibility);
                  }
              );
              return response.data;
            });
        };

        this.getRegistryBase = function getRegistryBase() {
          var parser = $document[0].createElement('a');
          parser.href = registryUrl;
          return parser.hostname;
        };
      }

      return new DockerRegistry();
    };
  });
