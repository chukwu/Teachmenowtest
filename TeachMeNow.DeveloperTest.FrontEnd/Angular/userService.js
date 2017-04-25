(function () {
    'use strict';

    angular
        .module('tmnApp')
        .factory('userService', factory);

    factory.$inject = ['$http', 'baseUrl'];

    function factory($http, baseUrl) {

        var service = {
            getUsers: getUsers,
            getTeachers: getTeachers,
            createUsers: createUsers
        };

        return service;

        function getUsers() {
            return $http.get(baseUrl + 'api/users', {
                params: {
                    usertype: "student"
                }
            });
        }
        function createUsers(data) {
            return $http.post(baseUrl + 'api/users', data);
        }
        function getTeachers() {
            return $http.get(baseUrl + 'api/users', {
                params: {
                    usertype: "teachers"
                }
            });
        }
    }
})();