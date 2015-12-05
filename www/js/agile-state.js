agile.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  // setup an abstract state for the tabs directive
  .state('agile', {
    url: '/agile',
    abstract: true,
    templateUrl: 'templates/agile.html',
    controller: 'agileCtrl'
  })
  .state('agile.projects', {
    url: '/projects',
    views: {
      'agileContent': {
        templateUrl: 'templates/projects.html',
        controller: 'ProjectsCtrl'
      }
    }
  })
  .state('agile.project', {
    url: '/projects/:id',
    views: {
      'agileContent': {
        templateUrl: 'templates/project.html',
        controller: 'ProjectCtrl'
      }
    }
  })
  .state('agile.userstories', {
    url: '/userstories?project=value',
    views: {
      'agileContent': {
        templateUrl: 'templates/userstories.html',
        controller: 'UserstoriesCtrl'
      }
    }
  })
  .state('agile.userstory', {
    url: '/userstories/:id',
    views: {
      'agileContent': {
        templateUrl: 'templates/userstory.html',
        controller: 'UserstoryCtrl'
      }
    }
  })
  .state('agile.issuesFilter', {
    url: '/issuesFilter?project=value',
    views: {
      'agileContent': {
        templateUrl: 'templates/issues-filter.html',
        controller: 'IssuesFilterCtrl'
      }
    }
  })
  .state('agile.issues', {
    url: '/issues?project=value&optionId=val',
    views: {
      'agileContent': {
        templateUrl: 'templates/issues.html',
        controller: 'IssuesCtrl'
      }
    }
  })
  .state('agile.issue', {
    url: '/issue/:id',
    views: {
      'agileContent': {
        templateUrl: 'templates/issue.html',
        controller: 'IssueCtrl'
      }
    }
  })
  .state('agile.wikis', {
    url: '/wiki?project=value',
    views: {
      'agileContent': {
        templateUrl: 'templates/wikis.html',
        controller: 'WikisCtrl'
      }
    }
  })
  .state('agile.wiki', {
    url: '/wiki/:project/:slug',
    views: {
      'agileContent': {
        templateUrl: 'templates/wiki.html',
        controller: 'WikiCtrl'
      }
    }
  })
  .state('agile.timelines', {
    url: '/timeline/project/:id',
    views: {
      'agileContent': {
        templateUrl: 'templates/timelines.html',
        controller: 'TimelinesCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/agile/projects');
});
