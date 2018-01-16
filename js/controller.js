angular.module("App",[]).controller("Control", function($scope, $timeout) {

    const defaultMeal = {
        name: '',
        table: '',
        meal1: '',
        meal2: '',
        timer: 10
    };
    $scope.soup = 0;
    $scope.borshch = 0;
    $scope.bograch = 0;

    $scope.potato= 0;
    $scope.vegetable = 0;
    $scope.chicken= 0;
    $scope.fries= 0;



    $scope.deleteName = '';

    $scope.newMeal = angular.copy(defaultMeal);

    $scope.list = [];

    $scope.visibility= function(){
        return true;
        if( $scope.list.length < 5){
            return false;
        }
        else{
            return true;
        }
    };

    $scope.add = function() {


        if($scope.newMeal.name && $scope.newMeal.table && $scope.newMeal.meal1 && $scope.newMeal.meal2) {

            $scope.list.push($scope.newMeal);
            $scope.newMeal = angular.copy(defaultMeal);
            count();


            if (!$scope.timeoutId) {
                setTimer();
            }

        }
        render();

    };
    function count(){

        if($scope.list[$scope.list.length-1].meal1 ==="Soup"){
            $scope.soup++;
        }
        else if($scope.list[$scope.list.length-1].meal1 ==="Borshch"){
            $scope.borshch++;
        }
        else if($scope.list[$scope.list.length-1].meal1==="Bograch"){
            $scope.bograch++;
        }



    }
    function setTimer() {
        const item = $scope.list.find(function (item) {
            return item.timer > 0;
        });

        if (item) {
            $scope.timeoutId = $timeout(function() {
                item.timer--;
                setTimer();
            }, 1000);
        } else {
            $timeout.cancel($scope.timeoutId);
            $scope.timeoutId = false;
        }
    }


    $scope.clean = function(){
        const indexForDelete = $scope.list.findIndex(function (item) {
            return item.timer === $scope.deleteName;
        });
        console.log(indexForDelete);
        if (indexForDelete === -1) {
            $scope.list.splice(indexForDelete, 1);
        }
    };

    var chartConfig1 = {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'First Meal'
        },
        xAxis: {
            categories: ['Soup', 'Borshch', 'Borshch']
        },
        yAxis: {
            title: {
                text: 'Popularity'
            }
        },
        series: [{
            name: 'Amount',
            data: [0,0,0]
        }]
    };
    var chartConfig2 = {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Main Meal'
        },
        xAxis: {
            categories: ['French Fries', 'Bograch', 'Borshch', 'Fish soup']
        },
        yAxis: {
            title: {
                text: 'Popularity'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Main meal',
            colorByPoint: true,
            data: [{
                name: 'Potato and meat',
                y: 56.33
            }, {
                name: 'Vegetables and meat',
                y: 24.03,
                sliced: true,
                selected: true
            }, {
                name: 'Chicken',
                y: 10.38
            }, {
                name: 'French Fries',
                y: 4.77
            }
            ]
        }]
    };
    console.log($scope.bograch);
    var myChart1 = Highcharts.chart('container1', chartConfig1);
    var myChart2 = Highcharts.chart('container2', chartConfig2);
    function render() {
        myChart1.update({
            series: [{
                data: [$scope.soup,$scope.borshch,$scope.bograch]
            }]
        });

    }


})