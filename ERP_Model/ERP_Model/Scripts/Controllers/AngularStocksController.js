﻿angular.module("ERPModelApp").controller("AngularStocksController", AngularStocksController);

AngularStocksController.$inject = [
    "$scope", "AngularStocksService", "AngularAdminService", "$rootScope"
];

function AngularStocksController($scope, AngularStocksService, AngularAdminService, $rootScope) {
    if (localStorage.getItem("tokenKey") === null) {
        location.href = "/Home/Index";
    }

    var page = 0;
    $scope.pageSize = 20;
    $scope.newStock = new AngularStocksService();
    $scope.newStockTransaction = [];
    $scope.errorMessages = [];

    $scope.Next = function(currentPage, pageAmount, fnc) {
        if (currentPage + 1 === pageAmount) {
            page = currentPage;
        } else {
            page++;
        }

        fnc();
    };

    $scope.Previous = function(currentPage, pageAmount, fnc) {
        if (currentPage === 0) {
            page = currentPage;
        } else {
            page--;
        }

        fnc();
    };

    $scope.AddressList = function() {
        $scope.addresses = AngularAdminService.GetAddresses({
                page: page,
                pageSize: $scope.pageSize
            },
            function() {
                console.log($scope.addresses);
            });
    };

    $scope.StockList = function() {
        $scope.stocks = AngularStocksService.GetStocks({
                page: page,
                pageSize: $scope.pageSize
            },
            function() {
                console.log($scope.stocks);
            });
    };

    $scope.StockDetails = function(guid) {
        $scope.stock = AngularStocksService.GetStock({
                id: guid
            },
            function() {
                console.log($scope.stock);
            });
    };

    $scope.StockItemList = function(guid) {
        $scope.stockItems = AngularStocksService.GetStockItems({
                id: guid,
                page: page,
                pageSize: $scope.pageSize
            },
            function() {
                console.log($scope.stockItems);
            });
    };

    $scope.StockTransactionList = function(guid) {
        $scope.stockTransactions = AngularStocksService.GetStockTransactions({
                id: guid,
                page: page,
                pageSize: $scope.pageSize
            },
            function() {
                console.log($scope.stockTransactions);
            });
    };

    $scope.CreateStock = function() {
        $scope.newStock.$PostStock(
            function(response) {
                console.log("Success");
                location.href = "/Stock/Index";
            },
            function(response) {
                $scope.error = true;
                $scope.errorMessages = [];
                for (var key in response.data.ModelState) {
                    if (response.data.ModelState.hasOwnProperty(key)) {
                        response.data.ModelState[key].forEach(
                            function (element) {
                                $scope.errorMessages.push(element);
                            });
                    }
                };
                if (response.data.Message) {
                    $scope.errorMessages.push(response.data.Message);
                }
            });
    };

    $scope.EditStock = function() {
        $scope.stock.$PutStock({ id: $scope.stock.StockGuid },
            function(response) {
                console.log("Success");
                location.href = "/Stock/Index";
            },
            function(response) {
                $scope.error = true;
                $scope.errorMessages = [];
                for (var key in response.data.ModelState) {
                    if (response.data.ModelState.hasOwnProperty(key)) {
                        response.data.ModelState[key].forEach(
                            function (element) {
                                $scope.errorMessages.push(element);
                            });
                    }
                };
                if (response.data.Message) {
                    $scope.errorMessages.push(response.data.Message);
                }
            });
    };

    $scope.RemoveStock = function(guid) {
        AngularStocksService.DeleteStock({ id: guid },
            function(response) {
                console.log("Success");
                location.href = "/Stock/Index";
            },
            function(error) {
                console.log("Fail");
            });
    };

    $scope.StockTransaction = function(index) {
        $scope.newStockTransaction[index] = new AngularStocksService($scope.newStockTransaction[index]);
        $scope.newStockTransaction[index].$CreateStockTransaction(
            function(response) {
                console.log("Success");
                location.href = "/Stock/Index";
            },
            function(response) {
                $scope.error = true;
                $scope.errorMessages = [];
                for (var key in response.data.ModelState) {
                    if (response.data.ModelState.hasOwnProperty(key)) {
                        response.data.ModelState[key].forEach(
                            function (element) {
                                $scope.errorMessages.push(element);
                            });
                    }                   
                };
                if (response.data.Message) {
                    $scope.errorMessages.push(response.data.Message);
                }
            });
    };

    $scope.GetValueAtIndex = function(index) {
        var str = window.location.href;
        console.log(str.split("/")[index]);
        return str.split("/")[index];
    };
}