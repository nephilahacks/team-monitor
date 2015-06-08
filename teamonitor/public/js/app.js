var teamMonitorApp = angular.module('teamMonitorApp', [
  'ngRoute',
  'teamMonitorControllers'
]);

teamMonitorApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/sprints/:sprintId', {
      templateUrl: 'partials/sprint.jade',
      controller: 'SprintDetailCtrl'
    }).
    when('/sprints', {
      templateUrl: 'partials/sprints.jade',
      controller: 'SprintListCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
  }
]);