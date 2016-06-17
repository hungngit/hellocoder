'use strict';

function DashboardCtrl($rootScope, $scope, $state, $uibModal, $loading, $http, RequestService, mainService) {
    console.log(345);
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

    //messages
    // if ($state.params.msg && $state.params.type) {
    //     $scope.messages = [{
    //         msg: $scope.t[$state.params.msg] || $state.params.msg,
    //         type: $state.params.type
    //     }];
    // }

    // for pagination
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
        return RequestService.get('/articles/paginationnext', {
            params: {
                "fromDate": '2016-06-17T11:14:08.148Z',
                "limit": 5
            }
        })
        .then(function (result) {
            $scope.posts = result.data;
            console.log($scope.posts);
        }, function () {
            $scope.messages = [
                {msg: $scope.t.MSG_ERR_ADMIN_GENERAL_ERR, type: 'danger'}
            ]
        })
        .then(function () {
            $scope.loading = false;
        });
    };

    init();
}

app.controller('DashboardCtrl', ['$rootScope', '$scope', '$state', '$uibModal', '$loading', '$http', 'RequestService', 'mainService', DashboardCtrl]);
