'use strict';

function DashboardCtrl($rootScope, $scope, $state, $modal, $loading, $http, RequestService, mainService) {
    
    // Code Sample for Adding new constant value
    // var CONSTANTS = setScopeConstants();
    // function setScopeConstants() {
    //     var CONSTANTS = $rootScope.CONSTANTS;
    //     CONSTANTS.ROWACTION = {
    //         EDIT: 1
    //     };
    //     // Sync back to $scope
    //     $scope.CONSTANTS = CONSTANTS;
    //     return CONSTANTS;
    // }

    // get ResourceMap from Db
    $scope.resourceMap = mainService.ResourceMap;
    // declare services
    $scope.mainService = mainService;
    $scope.requestService = RequestService;
    $scope.go = $state.go;
    //$scope.messages = [];
    $scope.loading = false;

    $scope.locationId = $state.params.locationId;

    $scope.posts = [];
    $scope.reverse = false;

    //messages
    // if ($state.params.msg && $state.params.type) {
    //     $scope.messages = [{
    //         msg: $scope.t[$state.params.msg] || $state.params.msg,
    //         type: $state.params.type
    //     }];
    // }

    // fỏ pagination
    $scope.fromDate = moment();

    var init = function(){
        // $scope.$watch('loading', function (flag) {
        //     if (flag) $loading.start('loading');
        //     else $loading.finish('loading');
        // });
        $scope.getData();
    } 
        
    $scope.getData = function () {
        $scope.loading = true;
        return $http.get($rootScope.servicePrefix + '/courier/list', {
            params: {
                "cc": $scope.languageCode
            }
        })
        .then(function (result) {
            $scope.items = result.data;
            console.log($scope.items);
        }, function () {
            $scope.messages = [
                {msg: $scope.t.MSG_ERR_ADMIN_GENERAL_ERR, type: 'danger'}
            ]
        })
        .then(function () {
            $scope.loading = false;
        });
    };
}

app.controller('DashboardCtrl', ['$rootScope', '$scope', '$state', '$modal', '$loading', '$http', 'RequestService', 'mainService', DashboardCtrl]);
