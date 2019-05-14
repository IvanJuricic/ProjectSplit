// eventsController.js
(function () {

    //getting the existing module app-events
    angular.module('app-events')
        .controller('eventsController', eventsController).directive('errSrc', function () {
            return {
                link: function (scope, element, attrs) {
                    element.bind('error', function () {
                        if (attrs.src != attrs.errSrc) {
                            attrs.$set('src', attrs.errSrc);
                        }
                    });
                }
            }
        });;
    function eventsController($http, $scope, $timeout, $element, $window) {

        Date.prototype.addDays = function (days) {
            this.setDate(this.getDate() + parseInt(days));
            return this;
        };

        var screenWidth = $window.innerWidth;

        if (screenWidth < 700) {
            $scope.respCheck = false;
        } else {
            $scope.respCheck = true;
        }

        var vm = this;
        vm.dayList = [];
        vm.dayNumber = [];
        for (var i = 0; i < 7; i++) {
            var dateProp = new Date();
            dateProp.addDays(i);
            vm.dayNumber.push(i);
            if (dateProp.getDay() === 0) {
                vm.dayList.push('Sunday');
            }
            else if (dateProp.getDay() === 1) {
                vm.dayList.push('Monday');
            }
            else if (dateProp.getDay() === 2) {
                vm.dayList.push('Tuesday');
            }
            else if (dateProp.getDay() === 3) {
                vm.dayList.push('Wednesday');
            }
            else if (dateProp.getDay() === 4) {
                vm.dayList.push('Thursday');
            }
            else if (dateProp.getDay() === 5) {
                vm.dayList.push('Friday');
            }
            else if (dateProp.getDay() === 6) {
                vm.dayList.push('Saturday');
            }

        }
        vm.approvedEvents = [];
        vm.locationEvents = [];
        vm.selectedLocation = '';
        vm.modalEvent = '';
        vm.modalLocation = '';
        vm.modalBuslist = [];
        vm.modalBusNamelist = [];
        vm.modalLocationLink = '';
        vm.events = [];
        vm.locations = [];
        vm.selectedEvents = [];
        vm.selectedLocations = [];
        vm.date = new Date();
        vm.category = '';
        vm.eventMesseage = '';
        vm.dataLoaded = false;
        vm.dataLoaded2 = false;
        vm.allEvents = [];
        vm.Kino = [];
        vm.recommendedLocations = {};
        vm.showEvents = function () {
            vm.eventMesseage = '';
            if (vm.category !== '') {
                vm.selectedEvents = [];
                vm.allEvents = [];
                for (var i = 0; i < vm.events.length; i++) {
                    vm.allEvents.push(vm.events[i]);
                }
                for (var i = 0; i < vm.Kino.length; i++) {
                    vm.allEvents.push(vm.Kino[i]);
                }
                for (var i = 0; i < vm.approvedEvents.length; i++) {
                    vm.allEvents.push(vm.approvedEvents[i]);
                }
                if (vm.category !== 'Other') {
                    for (var i = 0; i < vm.allEvents.length; i++) {
                        var from = vm.allEvents[i].EVENTDATE.split('-');
                        var f = new Date(from[2], from[1] - 1, from[0]);
                        if (vm.allEvents[i].EVENTTYPE === vm.category && f.getDate() === vm.date.getDate()) {
                            vm.selectedEvents.push(vm.allEvents[i]);
                        }
                    }
                }
                else {
                    for (var i = 0; i < vm.allEvents.length; i++) {
                        var from = vm.allEvents[i].EVENTDATE.split('-');
                        var f = new Date(from[2], from[1] - 1, from[0]);
                        if (vm.allEvents[i].EVENTTYPE !== 'Theatre' && vm.allEvents[i].EVENTTYPE !== 'Music' && vm.allEvents[i].EVENTTYPE !== 'Ostalo' && vm.allEvents[i].EVENTTYPE !== 'Glazba' && vm.allEvents[i].EVENTTYPE !== 'Film' && vm.allEvents[i].EVENTTYPE !== 'Predstava' && vm.allEvents[i].EVENTTYPE !== 'Cinema' && f.getDate() === vm.date.getDate()) {
                            vm.selectedEvents.push(vm.allEvents[i]);
                        }
                    }
                }

                if (vm.selectedEvents.length === 0) {
                    vm.eventMesseage = 'Sorry, but we can not find any events that match your request today!';
                }

            }
            else {
                alert('Choose Category First!');
            }

        };
        vm.selectModalLocation = function (x) {
            vm.locationEvents = [];
            vm.allEvents = [];
            for (var i = 0; i < vm.events.length; i++) {
                vm.allEvents.push(vm.events[i]);
            }
            for (var i = 0; i < vm.Kino.length; i++) {
                vm.allEvents.push(vm.Kino[i]);
            }
            for (var i = 0; i < vm.approvedEvents.length; i++) {
                vm.allEvents.push(vm.approvedEvents[i]);
            }
            for (var i = 0; i < vm.locations.length; i++) {
                if (x.LOCATION === vm.locations[i].LOCATIONCODENAME) {
                    vm.selectedLocation = vm.locations[i];
                    for (var j = 0; j < vm.allEvents.length; j++) {
                        if (vm.allEvents[j].LOCATION === vm.selectedLocation.LOCATIONCODENAME) {
                            vm.locationEvents.push(vm.allEvents[j]);
                        }
                    }
                }
            }
            vm.Buslist = [];
            vm.BusNamelist = [];
            vm.BusNamelist = vm.selectedLocation.LOCATIONBUSSTRING.split('#');
            // for (var j = 0; j < vm.modalBusNamelist.length - 1; j++) {
            //     vm.modalBusNamelist[j] += ', ';
            // }
            var t = vm.selectedLocation.BUSIDCODE.split('#');
            for (var j = 0; j < t.length; j++) {
                var bus = [];
                bus.push(vm.BusNamelist[j]);
                bus.push('http://www.promet-split.hr/BUS_LINIJE/voznired_Page_' + t[j] + '.png');
                vm.Buslist.push(bus);
            }
        };
        vm.selectLocation = function (x) {
            vm.selectedLocation = x;
            vm.locationEvents = [];
            vm.allEvents = [];
            for (var i = 0; i < vm.events.length; i++) {
                vm.allEvents.push(vm.events[i]);
            }
            for (var i = 0; i < vm.Kino.length; i++) {
                vm.allEvents.push(vm.Kino[i]);
            }
            for (var i = 0; i < vm.approvedEvents.length; i++) {
                vm.allEvents.push(vm.approvedEvents[i]);
            }
            for (var i = 0; i < vm.allEvents.length; i++) {
                if (vm.allEvents[i].LOCATION === vm.selectedLocation.LOCATIONCODENAME) {
                    vm.locationEvents.push(vm.allEvents[i]);
                }
            }
            vm.Buslist = [];
            vm.BusNamelist = [];
            vm.BusNamelist = vm.selectedLocation.LOCATIONBUSSTRING.split('#');
            // for (var j = 0; j < vm.modalBusNamelist.length - 1; j++) {
            //     vm.modalBusNamelist[j] += ', ';
            // }
            var t = vm.selectedLocation.BUSIDCODE.split('#');
            for (var j = 0; j < t.length; j++) {
                var bus = [];
                bus.push(vm.BusNamelist[j]);
                bus.push('http://www.promet-split.hr/BUS_LINIJE/voznired_Page_' + t[j] + '.png');
                vm.Buslist.push(bus);
            }

            $scope.searchBox = null;
        };
        vm.selectGroupLocation = function (x) {
            vm.selectedLocations = [];
            for (var i = 0; i < vm.locations.length; i++) {
                if (vm.locations[i].LOCATIONCATEGORY === x) {
                    vm.selectedLocations.push(vm.locations[i]);
                }
            }
            if (vm.dataLoaded2) {
                vm.dataLoaded2 = false;
            }
            else {
                vm.dataLoaded2 = true;
            }
        };
        vm.showModal = function (x) {
            vm.modalLocation = '';
            vm.modalBuslist = [];
            vm.modalBusNamelist = [];
            vm.modalLocationLink = '';
            var check = true;
            vm.modalEvent = x;
            for (var i = 0; i < vm.locations.length; i++) {
                if (x.LOCATION === vm.locations[i].LOCATIONCODENAME) {
                    vm.modalLocation = vm.locations[i];
                    check = false;
                    break;
                }
            }
            if (!check) {
                vm.modalBusNamelist = vm.modalLocation.LOCATIONBUSSTRING.split('#');
                // for (var j = 0; j < vm.modalBusNamelist.length - 1; j++) {
                //     vm.modalBusNamelist[j] += ', ';
                // }
                var t = vm.modalLocation.BUSIDCODE.split('#');
                for (var j = 0; j < t.length; j++) {
                    var bus = [];
                    bus.push(vm.modalBusNamelist[j]);
                    bus.push('http://www.promet-split.hr/BUS_LINIJE/voznired_Page_' + t[j] + '.png');
                    vm.modalBuslist.push(bus);
                }
                vm.busImg = vm.modalBuslist[0][1];
            }
        };
        vm.busImgClick = function (x) {
            vm.busImg = x;
        };
        vm.findLocation = function (x) {
            var check = false;
            for (var i = 0; i < vm.locations.length; i++) {
                if (x.LOCATION === vm.locations[i].LOCATIONCODENAME) {
                    vm.modalLocation = vm.locations[i];
                    check = true;
                    break;
                }
            }
            return (check);
        }
        vm.clearSelection = function () {
            vm.category = '';
            vm.selectedEvents = [];
        };

        vm.getDate = function (item) {
            vm.date = new Date();
            vm.date.addDays(item);
        };
        vm.sendCustomEvent = function () {
            var cEventName = vm.customEventName;
            var cEventDate = '';
            if (vm.customEventDate.getMonth() + 1 > 9) {
                if (vm.customEventDate.getDate() > 9) {
                    cEventDate = vm.customEventDate.getDate() + '-' + (vm.customEventDate.getMonth() + 1) + '-' + vm.customEventDate.getFullYear();
                }
                else {
                    cEventDate = '0' + vm.customEventDate.getDate() + '-' + (vm.customEventDate.getMonth() + 1) + '-' + vm.customEventDate.getFullYear();
                }

            }

            else {
                if (vm.customEventDate.getDate() > 9) {
                    cEventDate = vm.customEventDate.getDate() + '-0' + (vm.customEventDate.getMonth() + 1) + '-' + vm.customEventDate.getFullYear();
                }
                else {
                    cEventDate = '0' + vm.customEventDate.getDate() + '-0' + (vm.customEventDate.getMonth() + 1) + '-' + vm.customEventDate.getFullYear();
                }

            }
            var cEventTime;
            if (vm.customEventTime.getHours() < 10) {
                if (vm.customEventTime.getMinutes() < 10) {
                    cEventTime = '0' + vm.customEventTime.getHours() + '.0' + vm.customEventTime.getMinutes() + 'h';
                }
                else {
                    cEventTime = '0' + vm.customEventTime.getHours() + '.' + vm.customEventTime.getMinutes() + 'h';
                }
            }
            else {
                if (vm.customEventTime.getMinutes() < 10) {
                    cEventTime = vm.customEventTime.getHours() + '.0' + vm.customEventTime.getMinutes() + 'h';
                }
                else {
                    cEventTime = vm.customEventTime.getHours() + '.' + vm.customEventTime.getMinutes() + 'h';
                }
            }
            var cEventLocation = document.getElementById('customEventLocation').value;
            var cEventContact_adress = vm.customEventContact_adress;
            var cEventDescription = vm.customEventDescription;

            var cEvent = [];

            cEvent.push(cEventName);
            cEvent.push(cEventDate);
            cEvent.push(cEventTime);
            cEvent.push(cEventLocation);
            cEvent.push(cEventContact_adress);
            cEvent.push(cEventDescription);

            $http.post('/eng', cEvent).then(function (res) {
                //Succes
                alert(res.data);
                vm.customEventTime = '';
                vm.customEventName = '';
                vm.customEventDate = '';
                vm.customEventContact_adress = '';
                vm.customEventDescription = '';
                vm.customEvent_adress = '';
                document.getElementById('customEventLocation').value = '';
                $scope.myForm.$setPristine();
                $scope.myForm.$setUntouched();
            }, function (err) {
                //Failure
            });


        };
        $http.get('/api/getEventsEng')
            .then(function (res) {
                //Succes
                angular.copy(res.data, vm.events);
            },
            function (err) {
                //Failure
            });
        $http.get('/api/getLocations')
            .then(function (res) {
                //Succes
                angular.copy(res.data, vm.locations);
                vm.locations.forEach(function (element) {
                    if (element.LOCATIONNAME === 'Sustipan') {
                        vm.recommendedLocations.sustipan=element;
                    }
                    else if (element.LOCATIONNAME === 'Dioklecijanova palača') {
                        vm.recommendedLocations.dioklecijan=element;
                    }
                    else if (element.LOCATIONNAME === 'Katedrala Svetog Duje') {
                        vm.recommendedLocations.duje=element;
                    }
                    else if (element.LOCATIONNAME === 'Marjan') {
                        vm.recommendedLocations.marjan=element;
                    }
                    else if (element.LOCATIONNAME === 'Zapadna obala') {
                        vm.recommendedLocations.zapadna=element;
                    }
                    else if (element.LOCATIONNAME === 'Galerija Ivana Meštrovića') {
                        vm.recommendedLocations.mestrovic=element;
                    }
                    else if (element.LOCATIONNAME === 'Peristil') {
                        vm.recommendedLocations.peristil=element;
                    }
                    else if (element.LOCATIONNAME === 'Kliška tvrđava') {
                        vm.recommendedLocations.klis=element;
                    }
                    else if (element.LOCATIONNAME === 'Salona') {
                        vm.recommendedLocations.salona=element;
                    }
                }, this);
                vm.dataLoaded = true;
            },
            function (err) {
                //Failure
            });
        $http.get('/api/getKinoEng')
            .then(function (res) {
                //Succes
                angular.copy(res.data, vm.Kino);
                vm.dataLoaded = true;
            },
            function (err) {
                //Failure
            });

        $http.get('/api/getApprovedEvents')
            .then(function (res) {
                //Succes
                angular.copy(res.data, vm.approvedEvents);
                var today = new Date();
                for (var i = 0; i < vm.approvedEvents.length; i++) {
                    var from = vm.approvedEvents[i].EVENTDATE.split('-');
                    var f = new Date(from[2], from[1] - 1, from[0]);

                }
            },
            function (err) {
                //Failure
            });

    }

})();