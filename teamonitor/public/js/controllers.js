var teamMonitorControllers = angular.module('teamMonitorControllers', []);

teamMonitorControllers.controller('SprintListCtrl', ['$scope', '$http',
  function ($scope, $http) {
    var data = {

      labels: [

        "Sprint 1",
        "Sprint 2",
        "Sprint 3",
        "Sprint 4",
        "Sprint 5",
        "Sprint 6",
        "Sprint 7",
        "Sprint 8",
        "Sprint 9",
        "Sprint 10",
      ],

      datasets: [

        {
          label: "Promised",
          fillColor: "#e14938",
          strokeColor: "#e14938",
          highlightFill: "#e14938",
          highlightStroke: "#e14938",
          data: [13,48]
        },

        {
          label: "Closed",
          fillColor: "#41a85f",
          strokeColor: "#41a85f",
          highlightFill: "#41a85f",
          highlightStroke: "#41a85f",
          data: [13,0]
        }
      ]
    };

    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx).Bar(data);
  }
]);

teamMonitorControllers.controller('SprintDetailCtrl', [
  '$scope', '$http', '$routeParams', '$interval',
  function($scope, $http, $routeParams, $interval) {
    $scope.sprintId = $routeParams.sprintId;
    $scope.loadOk = false;
    $scope.notFound = false;
    var dataSprintOne = {

      labels: [

        "Teamwork",
        "Pawns or players",
        "Codebase health",
        "Speed",
        "Ease of sprint",
        "Learning",
        "Fun",
        "Delivering value"
      ],


      datasets: [

        {
          label: "Happy",
          fillColor: "#41a85f",
          strokeColor: "#41a85f",
          highlightFill: "#41a85f",
          highlightStroke: "#41a85f",
          data: [0, 0, 0, 0, 0, 0, 0, 0]
        },

        {
          label: "Neutral",
          fillColor: "#f1c40f",
          strokeColor: "#f1c40f",
          highlightFill: "#f1c40f",
          highlightStroke: "#f1c40f",
          data: [0, 0, 0, 0, 0, 0, 0, 0]
        },

        {
          label: "Unhappy",
          fillColor: "#e14938",
          strokeColor: "#e14938",
          highlightFill: "#e14938",
          highlightStroke: "#e14938",
          data: [0, 0, 0, 0, 0, 0, 0, 0]
        },

      ]
    };

    var ctx = document.getElementById("sprintOne").getContext("2d");
    var sprintChart = new Chart(ctx).Bar(dataSprintOne);

    var dataChart = {

      labels: [

        "Teamwork",
        "Pawns or players",
        "Codebase health",
        "Speed",
        "Ease of sprint",
        "Learning",
        "Fun",
        "Delivering value"
      ],


      datasets: [

        {
          label: "Max",
          fillColor: "#3d8eb9",
          strokeColor: "#3d8eb9",
          highlightFill: "#3d8eb9",
          highlightStroke: "#3d8eb9",
          data: [3,3,1,3,3,1,1,1]
        }

      ]
    };

    var ctx = document.getElementById("classifica").getContext("2d");
    var finalChart = new Chart(ctx).Bar(dataChart);
    var stopAutoRefresh;
    function startAutoRefresh() {
      stopAutoRefresh = $interval(function(){
        $http.get("/api/v1/sprints/" + $scope.sprintId)
          .success(
            function(response) {
              updateSprintChart(response);
            }
          )
      }, 3000);
    }

    $http.get("/api/v1/sprints/" + $scope.sprintId)
      .success(
        function(response) {
          $scope.loadOk = true;
          updateSprintChart(response);
          startAutoRefresh();
        }
      )
      .error(function(data, status, headers, config) {
        if (status == 404) {
          $scope.notFound = true;
        }
      });

    $scope.$on('$destroy', function() {
      if (angular.isDefined(stopAutoRefresh)) {
        $interval.cancel(stopAutoRefresh);
        stopAutoRefresh = undefined;
      }
    });

    function updateSprintChart(data) {
      var happy = data['votes']['happy'];
      var neutral = data['votes']['neutral'];
      var unhappy = data['votes']['unhappy'];
      var chart = [];
      var aux = []
      for (var i = 0 ; i < 8 ; i++) {
        sprintChart.datasets[0].bars[i].value = happy[i];
        sprintChart.datasets[1].bars[i].value = neutral[i];
        sprintChart.datasets[2].bars[i].value = unhappy[i];
        aux = [happy[i], neutral[i], unhappy[i]];
        var max = 0;
        for (var j = 0 ; j < aux.length ; j++) {
          if (aux[j] >= aux[max]) {
            max = j;
          }
        }
        switch (max) {
          case 0:
          chart[i] = 3;
          break;
          case 1:
          chart[i] = 1;
          break;
          case 2:
          chart[i] = 0;
          break;
        }
      }

      sprintChart.update();

      for (var i = 0 ; i < 8 ; i++) {
        finalChart.datasets[0].bars[i].value = chart[i];
      }

      finalChart.update();
    }
  }
]);