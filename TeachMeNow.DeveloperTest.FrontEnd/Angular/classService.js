(function () {
    'use strict';

    angular
        .module('tmnApp')
        .factory('classService', factory);

    factory.$inject = ['$http', 'baseUrl'];

    function factory($http, baseUrl) {
        var service = {
            getData: getData,
            postData: postData,
            deleteData: deleteData
        };

        return service;

        function getData() {
            return $http.get(baseUrl + 'api/classes');
        }

        function deleteData(data) {
            alert(data);
            return $http.delete(baseUrl + 'api/classes/' + data);
        }


        function postData(data) {
            return $http.post(baseUrl + 'api/classes', data);
        }
    }
})();