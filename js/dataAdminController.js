(function () {

    //getting the existing module app-events
    angular.module('app-events')
        .controller('adminController', adminController);
    function adminController($http) {
        var vm = this;
        vm.unApprovedEvents = [];
        vm.ApprovedEvents = [];
        vm.selectedEvent = [];
        vm.selectEvent = function (x) {
            vm.selectedEvent = x;
            vm.approveEventName = x.NAME;
            vm.approveEventDate = x.EVENTDATE;
            vm.approveEventTime = x.EVENTTIME;
            vm.approveEventMoreUrl = x.MOREURL;
            vm.approveEventLocation = x.LOCATION;
            vm.approveEventImgUrl = 'assets/customEventImg.jpg';
            vm.approveEventDescription = x.DESCRIPTION;
            vm.approveEventType = 'Ostalo';

        };

        vm.unApprovedEventRemove = function (x) {
            $http.post('/admin/unApprovedEventRemove', x).then(function (res) {
                //Succes
                alert(res.data);
                $http.get('/api/getUnapprovedEvents')
                    .then(function (res) {
                        //Succes
                        angular.copy(res.data, vm.unApprovedEvents);
                    },
                    function (err) {
                        //Failure
                    });
            }, function (err) {
                //Failure
                alert(err);
            });
        };
        vm.ApprovedEventRemove = function (x) {
            $http.post('/admin/approvedEventRemove', x).then(function (res) {
                //Succes
                alert(res.data);
                $http.get('/api/getApprovedEvents')
                    .then(function (res) {
                        //Succes
                        angular.copy(res.data, vm.ApprovedEvents);
                    },
                    function (err) {
                        //Failure
                    });
            }, function (err) {
                //Failure
                alert(err);
            });

        };
        vm.ApproveEvent = function () {
            var x = [];
            x.push(vm.approveEventName);
            x.push(vm.approveEventLocation);
            x.push('abc');
            x.push(vm.approveEventType);
            x.push(vm.approveEventMoreUrl);
            x.push(vm.approveEventDate);
            x.push(vm.approveEventTime);
            x.push(vm.approveEventImgUrl);
            x.push(vm.approveEventDescription);
            $http.post('/admin/approveEvent', x).then(function (res) {
                //Succes
                alert(res.data);
                $http.get('/api/getApprovedEvents')
                    .then(function (res) {
                        //Succes
                        angular.copy(res.data, vm.ApprovedEvents);
                    },
                    function (err) {
                        //Failure
                    });
            }, function (err) {
                //Failure
                alert(err);
            });

        };

        $http.get('/api/getUnapprovedEvents')
            .then(function (res) {
                //Succes
                angular.copy(res.data, vm.unApprovedEvents);
            },
            function (err) {
                //Failure
            });
        $http.get('/api/getApprovedEvents')
            .then(function (res) {
                //Succes
                angular.copy(res.data, vm.ApprovedEvents);
            },
            function (err) {
                //Failure
            });
    }
})();