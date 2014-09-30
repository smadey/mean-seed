define(['angular', 'angularTranslate'], function(angular) {
    angular.module('pascalprecht.translate')
    /**
     * @ngdoc object
     * @name pascalprecht.translate.$translateStaticFilesLoader
     * @requires $q
     * @requires $http
     *
     * @description
     * Creates a loading function for a typical static file url pattern:
     * "lang-en_US.json", "lang-de_DE.json", etc. Using this builder,
     * the response of these urls must be an object of key-value pairs.
     *
     * @param {object} options Options object, which gets prefix, suffix and key.
     */
    .factory('$translateStaticFilesLoader', ['$q', '$http',
        function($q, $http) {

            return function(options) {

                if (!options || (!angular.isString(options.prefix) || !angular.isString(options.suffix))) {
                    throw new Error('Couldn\'t load static files, no prefix or suffix specified!');
                }

                var deferred = $q.defer();

                $http({
                    url: [
                        options.prefix,
                        options.key,
                        options.suffix
                    ].join(''),
                    method: 'GET',
                    params: ''
                }).success(function(data) {
                    deferred.resolve(data);
                }).error(function(data) {
                    deferred.reject(options.key);
                });

                return deferred.promise;
            };
        }
    ])

    /**
     * @ngdoc object
     * @name pascalprecht.translate.$translateCookieStorage
     * @requires $cookieStore
     *
     * @description
     * Abstraction layer for cookieStore. This service is used when telling angular-translate
     * to use cookieStore as storage.
     *
     */
    .factory('$translateCookieStorage', ['$cookieStore',
        function($cookieStore) {

            var $translateCookieStorage = {

                /**
                 * @ngdoc function
                 * @name pascalprecht.translate.$translateCookieStorage#get
                 * @methodOf pascalprecht.translate.$translateCookieStorage
                 *
                 * @description
                 * Returns an item from cookieStorage by given name.
                 *
                 * @param {string} name Item name
                 * @return {string} Value of item name
                 */
                get: function(name) {
                    return $cookieStore.get(name);
                },

                /**
                 * @ngdoc function
                 * @name pascalprecht.translate.$translateCookieStorage#set
                 * @methodOf pascalprecht.translate.$translateCookieStorage
                 *
                 * @description
                 * Sets an item in cookieStorage by given name.
                 *
                 * @param {string} name Item name
                 * @param {string} value Item value
                 */
                set: function(name, value) {
                    $cookieStore.put(name, value);
                }
            };

            return $translateCookieStorage;
        }
    ])

    /**
     * @ngdoc object
     * @name pascalprecht.translate.$translateLocalStorage
     * @requires $window
     *
     * @description
     * Abstraction layer for localStorage. This service is used when telling angular-translate
     * to use localStorage as storage.
     *
     */
    .factory('$translateLocalStorage', ['$window', '$translateCookieStorage',
        function($window, $translateCookieStorage) {

            // Setup adapter
            var localStorageAdapter = (function() {
                var langKey;
                return {
                    /**
                     * @ngdoc function
                     * @name pascalprecht.translate.$translateLocalStorage#get
                     * @methodOf pascalprecht.translate.$translateLocalStorage
                     *
                     * @description
                     * Returns an item from localStorage by given name.
                     *
                     * @param {string} name Item name
                     * @return {string} Value of item name
                     */
                    get: function(name) {
                        if (!langKey) {
                            langKey = $window.localStorage.getItem(name);
                        }

                        return langKey;
                    },
                    /**
                     * @ngdoc function
                     * @name pascalprecht.translate.$translateLocalStorage#set
                     * @methodOf pascalprecht.translate.$translateLocalStorage
                     *
                     * @description
                     * Sets an item in localStorage by given name.
                     *
                     * @param {string} name Item name
                     * @param {string} value Item value
                     */
                    set: function(name, value) {
                        langKey = value;
                        $window.localStorage.setItem(name, value);
                    }
                };
            }());

            var hasLocalStorageSupport = 'localStorage' in $window && $window.localStorage !== null;
            if (hasLocalStorageSupport) {
                var testKey = 'pascalprecht.translate.storageTest';
                try {
                    $window.localStorage.setItem(testKey, 'foo');
                    $window.localStorage.removeItem(testKey);
                } catch (e) {
                    hasLocalStorageSupport = false;
                }
            }
            var $translateLocalStorage = hasLocalStorageSupport ? localStorageAdapter : $translateCookieStorage;
            return $translateLocalStorage;
        }
    ]);
});
