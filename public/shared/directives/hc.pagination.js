'use strict';

function HCPagination() {
    return {
        restrict: 'E',
        controller: ['$scope', '$timeout', 'MainService', 'CONSTANTS', function ($scope, $timeout, MainService, CONSTANTS) {
            var mainService = MainService.initialize();
            $scope.t = mainService.UserReference.TranslationMap;
            $scope.pageCount = 0;
            var commonStorage = ['currentPage', 'itemsPerPage'];
            var isStorageInited = false;

            function assignStorage(s, v, storage) {
                if (angular.isDefined(storage[v])) {
                    s[v] = storage[v];
                }
            }

            function setStorage() {
                if ($scope.storage && isStorageInited) {
                    try {
                        var storage = {};
                        _.each(commonStorage, function (c) {
                            storage[c] = $scope[c];
                        });

                        _.each($scope.storage.filterModels, function (c) {
                            storage[c] = $scope.$parent[c];
                        });

                        sessionStorage.setItem($scope.storage.session, JSON.stringify(storage));
                    } catch (e) {
                        console.log(e);
                    }
                }
            }

            $scope.nextPageDisabled = function () {
                return $scope.currentPage === $scope.pageCount ? "disabled" : "";
            };

            $scope.prevPageDisabled = function () {
                return $scope.currentPage === 1 ? "disabled" : "";
            };

            $scope.prevPage = function () {
                if ($scope.currentPage > 1) {
                    $scope.currentPage--;
                }
            };
            $scope.firstPage = function () {
                $scope.currentPage = 1;
            };
            $scope.nextPage = function () {
                if ($scope.currentPage < $scope.pageCount) {
                    $scope.currentPage++;
                }
            };
            $scope.lastPage = function () {
                $scope.currentPage = $scope.pageCount;
            };

            $scope.setPage = function (page) {
                $scope.currentPage = page;
            };

            $scope.setItemsPerPage = function (itemsPerPage) {
                $scope.itemsPerPage = itemsPerPage;
                $scope.currentPage = CONSTANTS.DEFAULT_PAGE_NO;
            };

            $scope.$watchGroup(['totalItemNo', 'itemsPerPage'], function (newValues, oldValues, scope) {
                $timeout(function () {
                    if (!_.isUndefined(newValues[0])) {
                        $scope.pageCount = Math.ceil($scope.totalItemNo / $scope.itemsPerPage);
                    }
                    setStorage();
                });
            });

            $scope.$watchGroup(['itemsPerPage', 'pageCount'], function () {
                $timeout(function () {
                    //$scope.currentPage = 1;
                    if ($scope.currentPage > $scope.pageCount && $scope.pageCount) {
                        $scope.currentPage = $scope.pageCount;
                    }

                    setStorage();
                });
            });

            // for server side pagination
            $scope.$watchGroup(['currentPage', 'itemsPerPage'], function () {
                $timeout(function () {
                    if ($scope.getList()) {
                        ($scope.getList())();
                    }
                    setStorage();
                });
            });

            $scope.$watchGroup(['currentPage', 'pageCount'], function () {
                $scope.isLastPageVisible = false;
                $scope.isFirstPageVisible = false;

                var firstPage = $scope.currentPage - $scope.pageSpan;
                var lastPage = $scope.currentPage + $scope.pageSpan;


                if (firstPage < 1) {
                    firstPage = 1;
                    $scope.isFirstPageVisible = true;
                    lastPage = firstPage + $scope.pageSpan * 2;
                }


                if (lastPage > $scope.pageCount) {
                    lastPage = $scope.pageCount;
                    $scope.isLastPageVisible = true;
                    firstPage = $scope.currentPage - ($scope.pageSpan * 2 - lastPage + $scope.currentPage);
                    firstPage = firstPage < 1 ? 1 : firstPage;
                }

                setStorage();

                $scope.pageRanges = _.range(firstPage, lastPage + 1);
            });

            $scope.itemsPerPageList = [];
            angular.forEach(CONSTANTS.ITEMS_PER_PAGE, function (no) {
                $scope.itemsPerPageList.push({
                    label: no,
                    value: no
                });
            });

            $scope.pageSpan = CONSTANTS.PAGE_SPAN;
            $scope.itemsPerPage = CONSTANTS.DEFAULT_ITEMS_PER_PAGE;

            //session storage for the filters
            if ($scope.storage) {
                $timeout(function () {
                    try {
                        var storage = JSON.parse(sessionStorage.getItem($scope.storage.session));
                        _.each(commonStorage, function (v) {
                            assignStorage($scope, v, storage);
                        });

                        _.each($scope.storage.filterModels, function (v) {
                            assignStorage($scope.$parent, v, storage);
                        });
                    } catch (e) {
                        console.log(e);
                    }
                    isStorageInited = true;
                });


                _.each($scope.storage.filterModels, function (v) {
                    $scope.$parent.$watch(v, function () {
                        setStorage();
                    })
                });
            }
        }],
        scope: {
            totalItemNo: '=',
            pageCount: '=',
            currentPage: '=',
            itemsPerPage: '=',
            getList: '&',
            storage: '='
        },
        templateUrl: '/shared/directives/templates/mm-pagination.html'
    };
}

app.directive('hcPagination', MMPagination);