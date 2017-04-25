(function () {
    'use strict';

    angular
        .module('tmnApp')
        .controller('homeController', controller);

    controller.$inject = ['userService', 'classService', '$scope', '$mdToast'];

    function controller(userService, classService, $scope, $mdToast) {
        /* jshint validthis:true */
        
        $scope.usertypes = [{ text: "Student", bool: 1 }, { text: "Teacher", bool: 0 }];
        $scope.st = new Date();
        $scope.et = null;
        $scope.userformdata = {
            Id: null, //Not useful but added
            Name: null,
            IsTutor: null
        };

        $scope.sessionformdata = {
            Id: null, //Not useful but added
            Subject: null,
            Student: null,
            Tutor: null,
            StartTime: new Date(),
            EndTime: null
        };

        var vm = this;
        vm.users = {};
        vm.teachers = {};
        vm.sessions = {};
        //vm.mindate = new Date();

        activate();

        $scope.deletesession = function (id) {
            //simple validation
            classService.deleteData(id).success(function (data, status, headers, config) {
                vm.sessions = data;
                /* display proper error message */
                $mdToast.show(
                  $mdToast.simple()
                    .textContent("Record Deleted Successfully")
                    .hideDelay(5000)
                );
            }).error(function (response) {
                /* display proper error message */
                $mdToast.show(
                  $mdToast.simple()
                    .textContent(response.Message)
                    .hideDelay(5000)
                );
            });
            return false;
        };

        $scope.reshedulesession = function(data){
            alert("With more time....I will add this");
        }

        $scope.submitform = function () {
            $scope.userformdata.IsTutor = $scope.userformdata.IsTutor == "0" ? true : false;
            console.log($scope.userformdata);
            //simple validation
            userService.createUsers($scope.userformdata).success(function (data, status, headers, config) {
                if ($scope.userformdata.IsTutor) {
                    vm.teachers = data;
                    TweenMax.staggerFrom($('.tut md-list-item'), 2, { opacity: 0, y: 100, delay: 0, ease: Back.easeInOut }, 0.2);
                } else {
                    vm.users = data;
                    TweenMax.staggerFrom($('.stt md-list-item'), 2, { opacity: 0, y: 100, delay: 0, ease: Back.easeInOut }, 0.2);
                }
                $mdToast.show(
                  $mdToast.simple()
                    .textContent("Successfully added......and refreshed")
                    .hideDelay(5000)
                );
            }).error(function (response) {
                /* display proper error message */
                $mdToast.show(
                  $mdToast.simple()
                    .textContent(response.Message)
                    .hideDelay(5000)
                );
            });;
            return false;
        };

        $scope.submitsessionform = function () {
            var s = $scope.st;
            $scope.sessionformdata.StartTime.setHours(s.getHours());
            $scope.sessionformdata.StartTime.setMinutes(s.getMinutes());

            var et = $scope.et;
            $scope.sessionformdata.EndTime.setHours(et.getHours());
            $scope.sessionformdata.EndTime.setMinutes(et.getMinutes());

            $scope.sessionformdata.Id = Math.floor((Math.random() * 10) + 1);

            classService.postData($scope.sessionformdata).success(function (data, status, headers, config) {
                vm.sessions = data;
                $mdToast.show(
                  $mdToast.simple()
                    .textContent("Successfully added......and refreshed")
                    .hideDelay(5000)
                );
            }).error(function (response) {
                /* display proper error message */
                $mdToast.show(
                  $mdToast.simple()
                    .textContent(response.Message)
                    .hideDelay(5000)
                );
            });


            return false;
        };

        function activate() {

           userService.getUsers().then(function (response) {
               vm.users = response.data;
               TweenMax.staggerFrom($('.stt md-list-item'), 2, { opacity: 0, y: 100, delay: 0, ease: Back.easeInOut }, 0.2);
            }, function (reason) {
                alert('Failed: ' + reason);
            });

           classService.getData().then(function (response) {
               vm.sessions = response.data;
               console.log(response.data);
           }, function (reason) {
               alert('Failed: ' + reason);
           });

           userService.getTeachers().then(function (response) {
               vm.teachers = response.data;              
               TweenMax.staggerFrom($('md-list-item'), 2, { opacity: 0, y: 100, delay: 0, ease: Back.easeInOut }, 0.2);
           }, function (reason) {
               alert('Failed: ' + reason);
           });

        }
    }
})();
