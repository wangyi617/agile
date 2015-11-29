// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var agile = angular.module('agile', ['ionic', 'restangular']);

agile.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      window.StatusBar.styleDefault();
    }
  });
});

// --------------------config------------------------

agile.config(function(RestangularProvider) {
  // window.localStorage.agile_url = 'http://a.anasit.com';
  window.localStorage.agile_url = '/api';
  RestangularProvider.setBaseUrl(window.localStorage.agile_url + '/api/v1');
  RestangularProvider.setDefaultHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + window.localStorage.auth_token,
  });
  RestangularProvider.setDefaultHttpFields({'cache': true, 'withCredentials': true});
  RestangularProvider.setMethodOverriders(['put', 'patch']);
});

agile.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'http://anasit.com/**',
    'http://api.anasit.com/**',
    'http://bbs.anasit.com/**',
    'http://www.anasit.com/**',
  ]);
});

// ---------------------state--------------------------

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
        controller: 'ProjectsCtrl',
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
      'menuContent': {
        templateUrl: 'templates/userstories.html',
        controller: 'UserstoriesCtrl'
      }
    }
  })
  .state('agile.userstory', {
    url: '/userstories/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/userstory.html',
        controller: 'UserstoryCtrl'
      }
    }
  })
  .state('agile.issuesFilter', {
    url: '/issuesFilter?project=value',
    views: {
      'menuContent': {
        templateUrl: 'templates/issues-filter.html',
        controller: 'IssuesFilterCtrl'
      }
    }
  })
  .state('agile.issues', {
    url: '/issues?project=value&optionId=val',
    views: {
      'menuContent': {
        templateUrl: 'templates/issues.html',
        controller: 'IssuesCtrl'
      }
    }
  })
  .state('agile.issue', {
    url: '/issue/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/issue.html',
        controller: 'IssueCtrl'
      }
    }
  })
  .state('agile.wikis', {
    url: '/wiki?project=value',
    views: {
      'menuContent': {
        templateUrl: 'templates/wikis.html',
        controller: 'WikisCtrl'
      }
    }
  })
  .state('agile.wiki', {
    url: '/wiki/:project/:slug',
    views: {
      'menuContent': {
        templateUrl: 'templates/wiki.html',
        controller: 'WikiCtrl'
      }
    }
  })
  .state('agile.timelines', {
    url: '/timeline/project/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/timelines.html',
        controller: 'TimelinesCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/agile/projects');
});

// -------------------service----------------------------

agile.factory('usersService', function($http, Restangular) {
  function getAll() {
    return Restangular.all('users').getList().$object;
  }

  function getOne(id) {
    return Restangular.one('users', id).get().$object;
  }

  function auth(loginData) {
    loginData.type = 'normal';
    console.log('Doing login', loginData);
    return Restangular.all('auth').post(loginData);
  }

  return {
    getAll: getAll,
    getOne: getOne,
    auth: auth
  };
});

agile.factory('projectsService', function(Restangular) {
  function getAll() {
    return Restangular.all('projects').getList();
  }

  function getOne(id) {
    return Restangular.one('projects', id).get();
  }

  return {
    getAll: getAll,
    getOne: getOne,
  };
});

agile.factory('userstoriesService', function(Restangular) {
  function getAll() {
    return Restangular.all('userstories').getList();
  }

  function getOne(id) {
    return Restangular.one('userstories', id).get();
  }

  function getByPid(id) {
    return Restangular.all('userstories?project=' + id).getList().$object;
  }

  function getStatus(id) {
    return Restangular.all('userstory-statuses?project=' + id).getList().$object;
  }

  function getByPidStatus(id, status) {
    return Restangular.all('userstories?project=' + id + '&status=' + status).getList().$object;
  }

  function getByAssigned(id) {
    return Restangular.all('userstories?assigned_to=' + id + '&is_closed=false').getList();
  }

  function create(data) {
    return Restangular.all('userstories').post(data);
  }

  function update(id, data) {
    return Restangular.one('userstories', id).patch(data);
  }

  function remove(id) {
    return Restangular.one('userstories', id).remove();
  }

  return {
    getAll: getAll,
    getOne: getOne,
    getByPid: getByPid,
    getStatus: getStatus,
    getByPidStatus: getByPidStatus,
    getByAssigned: getByAssigned,
    create: create,
    update: update,
    delete: remove,
  };
});

agile.factory('issuesService', function(Restangular) {
  var option = '';

  function getAll() {
    return Restangular.all('issues').getList();
  }

  function getOne(id) {
    return Restangular.one('issues', id).get();
  }

  function getIssue(projectId, issueId) {
    return Restangular.one('issues/by_ref?project=' + projectId + '&ref=' + issueId).get();
  }

  function getByPid(id) {
    return Restangular.all('issues?project=' + id).getList().$object;
  }

  function getFiltersData(id) {
    return Restangular.one('issues/filters_data?project=' + id).get();
  }

  function getIssueByProRef(id, ref) {
    return Restangular.one('issues/by_ref?project=' + id + '&ref=' + ref).get();
  }

  function getIssuesByProOption(id, optionId) {
    console.log('project=' + id + ',option=' + option + ',optionId=' + optionId);
    return Restangular.all('issues?project=' + id + '&' + option + '=' + optionId).getList().$object;
  }

  function getByAssigned(id) {
    return Restangular.all('issues?assigned_to=' + id + '&is_closed=false').getList();
  }

  function create(data) {
    return Restangular.all('issues').post(data);
  }

  function update(id, data) {
    return Restangular.one('issues', id).patch(data);
  }

  function remove(id) {
    return Restangular.one('issues', id).remove();
  }

  function setOption(op) {
    option = op;
  }

  return {
    getAll: getAll,
    getOne: getOne,
    getIssue: getIssue,
    getByPid: getByPid,
    getIssueByProRef: getIssueByProRef,
    getFiltersData: getFiltersData,
    getIssuesByProOption: getIssuesByProOption,
    setOption: setOption,
    getByAssigned: getByAssigned,
    create: create,
    update: update,
    delete: remove,
  };
});

agile.factory('wikiService', function(Restangular) {
  function getAll() {
    return Restangular.all('wiki-links').getList();
  }

  function getOne(project, slug) {
    return Restangular.one('wiki/by_slug?project=' + project + '&slug=' + slug).get();
  }

  function getByPid(id) {
    return Restangular.all('wiki-links?project=' + id).getList().$object;
  }

  function getEditorById(id) {
    return Restangular.one('users', id).get();
  }

  function create(data) {
    return Restangular.all('wiki').post(data);
  }

  function createWikiLink(data) {
    return Restangular.all('wiki-links').post(data);
  }


  function update(id, data) {
    return Restangular.one('wiki', id).patch(data);
  }

  function remove(id) {
    return Restangular.one('wiki-links', id).remove();
  }

  return {
    getAll: getAll,
    getOne: getOne,
    getByPid: getByPid,
    getEditorById: getEditorById,
    create: create,
    createWikiLink: createWikiLink,
    update: update,
    remove: remove
  };
});

agile.factory('timelinesService', function(Restangular) {
  function getAll() {
    return Restangular.all('timeline').getList();
  }

  function getOne(id) {
    return Restangular.one('timeline', id).get();
  }


  function getByPid(id) {
    return Restangular.all('timeline/project/' + id).getList().$object;
  }

  return {
    getAll: getAll,
    getOne: getOne,
    getByPid: getByPid
  };
});

// -------------------filter---------------------------

agile.filter('timelineFilter', function() {
  return function(timeline) {
    var output = '';
    var event_typeArray = timeline.event_type.split('.');

    switch (event_typeArray[2]) {
    case 'create':
      output += '创建 ';
      break;
    case 'delete':
      output += '删除 ';
      break;
    case 'change':
      output += '更新 ';
      break;
    default:
      break;
    }

    switch (event_typeArray[1]) {
    case 'membership':
      output += '成员 ';
      output += timeline.data.user.name;
      break;
    case 'userstory':
      output += '任务 #';
      output += timeline.data.userstory.ref;
      output += timeline.data.userstory.subject;
      break;
    case 'issue':
      output += '问题 #';
      output += timeline.data.issue.ref;
      output += timeline.data.issue.subject;
      break;
    case 'project':
      output += '项目 #';
      output += timeline.data.project.id;
      output += timeline.data.project.name;
      break;
    case 'wikipage':
      output += 'wikipage #';
      output += timeline.data.wikipage.id;
      output += timeline.data.wikipage.slug;
      break;
    default:
      break;
    }

    if (typeof timeline.data.values_diff !== 'undefined') {
      if (timeline.data.values_diff.assigned_to) {
        output += ' 指派给 ';
        output += timeline.data.values_diff.assigned_to[1];
      }
      if (timeline.data.values_diff.status) {
        output += ' 状态为 ';
        output += timeline.data.values_diff.status[1];
      }
      if (timeline.data.values_diff.points) {
        output += ' 点数';
      }
      if (timeline.data.values_diff.team_requirement) {
        output += ' 团队要求为 ';
        output += timeline.data.values_diff.team_requirement[1];
      }
      if (timeline.data.values_diff.client_requirement) {
        output += ' 客户要求为 ';
        output += timeline.data.values_diff.client_requirement[1];
      }
      if (timeline.data.values_diff.type) {
        output += ' 类型为 ';
        output += timeline.data.values_diff.type[1];
      }
      if (timeline.data.values_diff.severity) {
        output += ' 严重性为 ';
        output += timeline.data.values_diff.severity[1];
      }
      if (timeline.data.values_diff.priority) {
        output += ' 优先级为 ';
        output += timeline.data.values_diff.priority[1];
      }
      if (timeline.data.values_diff.subject) {
        output += ' 标题';
      }
      if (timeline.data.values_diff.description_diff) {
        output += ' 描述';
      }
      if (timeline.data.values_diff.is_blocked) {
        if (timeline.data.values_diff.is_blocked[1] === true) {
          output += ' 封锁';
        } else {
          output += ' 解除封锁';
        }
      }
    }
    return output;
  };
});

agile.filter('photoFilter', function() {
  return function(photo) {
    return (photo ? photo : 'img/unnamed.png');
  };
});

agile.filter('isAssignedFilter', function() {
  return function(data) {
    return (data ? data : '未指派');
  };
});

agile.filter('rolePointsFilter', function() {
  return function(roleId) {
    var rolePoints = JSON.parse(localStorage.rolePoints);
    var points = JSON.parse(localStorage.points);
    for (var id in rolePoints) {
      if (roleId === id) {
        for (var i = points.length - 1; i >= 0; i--) {
          if (rolePoints[id] === points[i].id) {
            return points[i].name;
          }
        }
      }
    }
  };
});

// -------------------controller-------------------------
agile.controller('agileCtrl', function($http, $scope, $ionicModal, $timeout, usersService) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modallogin = modal;

    // 检测登录
    if (typeof window.localStorage.auth_token === 'undefined' || window.localStorage.auth_token === '') {
      $scope.login();
    }
  });

  // Create the logout modal that we will use later
  $ionicModal.fromTemplateUrl('templates/logout.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modallogout = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modallogin.hide();
  };

  // Open the login modal
  $scope.login = function() {
    if (typeof window.localStorage.user !== 'undefined') {
      if (window.localStorage.user !== '') {
        var user = JSON.parse(window.localStorage.user);
        $scope.loginData.username = user.email;
      }
    }
    $scope.modallogin.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    // 方式一：通过Restangular获取
    // usersService.auth($scope.loginData).then(function(auth){
    //  console.log(auth);
    //  //用户auth_token写入本地存储
    //  window.localStorage.auth_token = auth.auth_token;
    //  window.localStorage.user_id = auth.id;
    //  window.localStorage.user = JSON.stringify($scope.loginData);
    // }, function(error) {
    //   alert(JSON.stringify(error));
    // })

    // 方式二：通过$http获取
    $http.post(window.localStorage.agile_url + '/api/v1/auth', {
      type: 'normal',
      username: $scope.loginData.username,
      password: $scope.loginData.password
    }).success(function(auth) {
      window.localStorage.auth_token = auth.auth_token;
      window.localStorage.user_id = auth.id;
      window.localStorage.user = JSON.stringify($scope.loginData);
    }).error(function(data, status, header, config) {
      alert('登录失败:' + data._error_message);
      // alert("data=\n"+JSON.stringify(data));
      // alert("status=\n"+JSON.stringify(status));
      // alert("header=\n"+JSON.stringify(header));
      // alert("config=\n"+JSON.stringify(config));
    });

    // 方式三：XMLHttpRequest
    // var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange=function() {
    //   if (xmlhttp.readyState==4 && xmlhttp.status==200) {
    //     window.localStorage.auth_token = JSON.parse(xmlhttp.responseText).auth_token;
    //     window.localStorage.user_id = JSON.parse(xmlhttp.responseText).id;
    //     window.localStorage.user = JSON.stringify($scope.loginData);
    //   } else {
    //     alert("登录失败");
    //     alert(xmlhttp.status);
    //     alert(xmlhttp.responseText);
    //   }
    // }
    // xmlhttp.open("POST","http://a.anasit.com/api/v1/auth",false);
    // xmlhttp.setRequestHeader("Accept","application/json");
    // xmlhttp.setRequestHeader("Content-Type","application/json");
    // xmlhttp.send(JSON.stringify({
    //   type:"normal",
    //   username:$scope.loginData.username,
    //   password:$scope.loginData.password
    // }));

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
      window.location.reload(true);
    }, 1000);
  };

  // Triggered in the login modal to close it
  $scope.closeLogout = function() {
    $scope.modallogout.hide();
  };

  // Open the logout modal
  $scope.logout = function() {
    if (typeof window.localStorage.user !== 'undefined') {
      if (window.localStorage.user !== '') {
        var user = JSON.parse(window.localStorage.user);
        $scope.loginData.username = user.email;
      }
    }
    $scope.modallogout.show();
  };

  $scope.doLogout = function() {
    window.localStorage.auth_token = '';
    window.location.reload(true);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogout();
      window.location.reload(true);
    }, 1000);
  };
});

agile.controller('ProjectsCtrl', function($scope, projectsService, userstoriesService, issuesService) {
  projectsService.getAll().then(function(data) {
    $scope.projects = data;
  });
  userstoriesService.getByAssigned(window.localStorage.user_id).then(function(data) {
    $scope.userstoriesInProgress = data;
  });
  issuesService.getByAssigned(window.localStorage.user_id).then(function(data) {
    $scope.issuesInProgress = data;
  });

  $scope.doRefresh = function() {
    projectsService.getAll().then(function(data) {
      $scope.projects = data;
      console.log($scope.projects);
    });
    userstoriesService.getByAssigned(window.localStorage.user_id).then(function(data) {
      $scope.userstoriesInProgress = data;
    });
    issuesService.getByAssigned(window.localStorage.user_id).then(function(data) {
      $scope.issuesInProgress = data;
    });
    $scope.$broadcast('scroll.refreshComplete');
  };
});

agile.controller('ProjectCtrl', function($scope, $stateParams, projectsService) {
  $scope.project = projectsService.getOne($stateParams.id).$object;
});

agile.controller('UserstoriesCtrl', function($scope, $stateParams, $ionicModal, $ionicPopover, userstoriesService, projectsService, ionicMaterialInk, ionicMaterialMotion) {
  if (typeof $stateParams.project !== 'undefined') {
    $scope.userstories = userstoriesService.getByPid($stateParams.project);
    $scope.userstoryStatuses = userstoriesService.getStatus($stateParams.project);
    $scope.project = projectsService.getOne($stateParams.project).$object;
  } else {
    $scope.userstories = userstoriesService.getAll().$object;
  }

  $scope.new = {
    project: $stateParams.project,
    subject: '',
    points: {}
  };
  $scope.totalPoints = 0;
  $scope.rolePoint = [];
  $scope.roleInfo = {};
  var currentRoleId = '';

  $scope.teamRequirementToggle = function() {
    $scope.new.team_requirement = !$scope.new.team_requirement;
  };
  $scope.clientRequirementToggle = function() {
    $scope.new.client_requirement = !$scope.new.client_requirement;
  };
  $scope.lockToggle = function() {
    $scope.new.is_blocked = !$scope.new.is_blocked;
  };

  $scope.selectRole = function(roleId, $event) {
    $scope.openPopoverPoints($event);
    currentRoleId = roleId;
  };

  $scope.selectPoints = function(pointId, value) {
    $scope.new.points[currentRoleId] = pointId;
    // 计算totalPoints
    $scope.roleInfo[currentRoleId] = value;
    $scope.totalPoints = 0;
    for (var i in $scope.roleInfo) {
      $scope.totalPoints += $scope.roleInfo[i];
    }
    $scope.closePopoverPoints();
  };

  $scope.newUserstory = function() {
    if ($scope.new.subject === '') {
      alert('标题不能为空');
      return false;
    }
    console.log($scope.new);
    userstoriesService.create($scope.new).then(function() {
      $scope.closeModalNewUserstory();
      // 清空数据
      $scope.new = {
        project: $stateParams.project,
        subject: '',
        points: {}
      };
    });
  };

  $scope.byPid = function() {
    $scope.userstories = userstoriesService.getByPid($stateParams.project);
  };

  $scope.byStatus = function(sid) {
    $scope.userstories = userstoriesService.getByPidStatus($stateParams.project, sid);
  };

  $ionicModal.fromTemplateUrl('my-modal-newUserstory.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalNewUserstory = modal;
  });

  $ionicPopover.fromTemplateUrl('my-popover-points.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popoverPoints = popover;
  });

  $scope.openModalNewUserstory = function() {
    $scope.modalNewUserstory.show();
  };
  $scope.closeModalNewUserstory = function() {
    $scope.modalNewUserstory.hide();
  };

  $scope.openPopoverPoints = function($event) {
    $scope.popoverPoints.show($event);
  };
  $scope.closePopoverPoints = function() {
    $scope.popoverPoints.hide();
  };

  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modalNewUserstory.remove();
    $scope.popoverPoints.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  // Set Motion
  ionicMaterialMotion.fadeSlideInRight();
  // Set Ink
  ionicMaterialInk.displayEffect();
})

agile.controller('UserstoryCtrl', function($scope, $state, $stateParams, $ionicPopup, $ionicPopover, userstoriesService, projectsService, ionicMaterialInk, ionicMaterialMotion) {
  var userstoryId = $stateParams.id;
  userstoriesService.getOne(userstoryId).then(function(userstoryData) {
    $scope.userstory = userstoryData;
    localStorage.rolePoints = JSON.stringify(userstoryData.points); // 传值给rolePointsFilter
    $scope.subject = $scope.userstory.subject;
    $scope.description = $scope.userstory.description;
    var projectId = $scope.userstory.project;
    projectsService.getOne(projectId).then(function(projectData) {
      $scope.project = projectData;
      localStorage.points = JSON.stringify(projectData.points); // 传值给rolePointsFilter
    });
  });

  $scope.isEditSubject = false;
  $scope.isEditDescription = false;

  $scope.changeSubject = function(subject) {
    $scope.subject = subject;
  };
  $scope.changeDescription = function(description) {
    $scope.description = description;
  };

  $scope.editSubject = function() {
    $scope.isEditSubject = true;
  };
  $scope.confirmSubject = function() {
    var data = {
      subject: $scope.subject,
      version: $scope.userstory.version
    };
    userstoriesService.update(userstoryId, data).then(function(userstoryData) {
      $scope.userstory = userstoryData;
    });
    $scope.isEditSubject = false;
  };
  $scope.cancelSubject = function() {
    $scope.subject = $scope.userstory.subject;
    $scope.isEditSubject = false;
  };

  $scope.editDescription = function() {
    $scope.isEditDescription = true;
  };
  $scope.confirmDescription = function() {
    var data = {
      description: $scope.description,
      version: $scope.userstory.version
    };
    userstoriesService.update(userstoryId, data).then(function(userstoryData) {
      $scope.userstory = userstoryData;
    });
    $scope.isEditDescription = false;
  };
  $scope.cancelDescription = function() {
    $scope.description = $scope.userstory.description;
    $scope.isEditDescription = false;
  };

  $scope.assigned = function(id) {
    var data = {
      assigned_to: id,
      version: $scope.userstory.version
    };
    userstoriesService.update(userstoryId, data).then(function(userstoryData) {
      $scope.userstory = userstoryData;
    });
    $scope.closePopoverAssigned();
  };

  $scope.clientRequirementToggle = function() {
    var data = {
      client_requirement: !$scope.userstory.client_requirement,
      version: $scope.userstory.version
    };
    userstoriesService.update(userstoryId, data).then(function(userstoryData) {
      $scope.userstory = userstoryData;
    });
  };

  $scope.teamRequirementToggle = function() {
    var data = {
      team_requirement: !$scope.userstory.team_requirement,
      version: $scope.userstory.version
    };
    userstoriesService.update(userstoryId, data).then(function(userstoryData) {
      $scope.userstory = userstoryData;
    });
  };

  $scope.changeStatus = function(sid) {
    var data = {
      status: sid,
      version: $scope.userstory.version,
    };
    userstoriesService.update(userstoryId, data).then(function(userstoryData) {
      $scope.userstory = userstoryData;
    });
    $scope.closePopoverChangeStatus();
  };

  $scope.roleId = '';
  $scope.changeRoleId = function(roleId) {
    $scope.roleId = roleId;
  };
  $scope.changePoints = function(pointId) {
    if ($scope.roleId === '') {
      alert('未选择角色');
      return false;
    }
    var data = {
      points: $scope.userstory.points,
      version: $scope.userstory.version
    };
    data.points[$scope.roleId] = pointId;
    userstoriesService.update(userstoryId, data).then(function(userstoryData) {
      $scope.userstory = userstoryData;
      localStorage.rolePoints = JSON.stringify(userstoryData.points);
    });
    $scope.closePopoverChangePoints();
    window.location.reload(true);
  };

  $scope.rolePoints = function() {
    return 'test';
  };

  $scope.delete = function() {
    $ionicPopup.confirm({
      title: '删除此任务吗？',
      okText: '删除',
      okType: 'button-assertive',
      cancelText: '取消',
      cancelType: 'button-positive',
    })
    .then(function(res) {
      if (res) {
        userstoriesService.delete(userstoryId).then(function() {
          console.log('delete');
          $state.go('app.userstories', {project: $scope.userstory.project}); // 传参projectId
        });
      } else {
        console.log('cancel');
      }
    });
  };

  $scope.lockToggle = function() {
    $scope.data = {};
    // 自定义弹窗
    $ionicPopup.show({
      template: '<input type="text" ng-model="data.blocked_note" placeholder="请解释原因">',
      title: '封锁任务',
      scope: $scope,
      buttons: [
        { text: '取消' },
        {
          text: '确定',
          type: 'button-positive',
          onTap: function(e) {
            // return console.log($scope.data.blocked_note);
            $scope.data.is_blocked = !$scope.userstory.is_blocked;
            $scope.data.version = $scope.userstory.version;
            console.log($scope.data);
            userstoriesService.update(userstoryId, $scope.data).then(function(userstoryData) {
              $scope.userstory = userstoryData;
              $scope.data = {};
            });
          }
        }
      ]
    })
    .then(function() {
      console.log('popup hide');
    });
  };

  // .fromTemplateUrl() 方法
  $ionicPopover.fromTemplateUrl('my-popover-changeStatus.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popoverChangeStatus = popover;
  });

  $ionicPopover.fromTemplateUrl('my-popover-changePoints.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popoverChangePoints = popover;
  });

  $ionicPopover.fromTemplateUrl('my-popover-assigned.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popoverAssigned = popover;
  });

  $scope.openPopoverChangeStatus = function($event) {
    $scope.popoverChangeStatus.show($event);
  };
  $scope.closePopoverChangeStatus = function() {
    $scope.popoverChangeStatus.hide();
  };

  $scope.openPopoverChangePoints = function($event) {
    $scope.popoverChangePoints.show($event);
  };
  $scope.closePopoverChangePoints = function() {
    $scope.popoverChangePoints.hide();
  };

  $scope.openPopoverAssigned = function($event) {
    $scope.popoverAssigned.show($event);
  };
  $scope.closePopoverAssigned = function() {
    $scope.popoverAssigned.hide();
  };

  // 清除浮动框
  $scope.$on('$destroy', function() {
    $scope.popoverChangeStatus.remove();
    $scope.popoverChangePoints.remove();
    $scope.popoverAssigned.remove();
  });
  // 在隐藏浮动框后执行
  $scope.$on('popover.hidden', function() {
    // 执行代码
  });
  // 移除浮动框后执行
  $scope.$on('popover.removed', function() {
    // 执行代码
  });

  // Set Motion
  ionicMaterialMotion.fadeSlideInRight();
  // Set Ink
  ionicMaterialInk.displayEffect();
});

agile.controller('IssueCtrl', function($scope, $state, $stateParams, $ionicPopup, $ionicPopover, issuesService, projectsService, ionicMaterialInk, ionicMaterialMotion) {
  var issueId = $stateParams.id;
  issuesService.getOne(issueId).then(function(issueData) {
    $scope.issue = issueData;
    $scope.subject = issueData.subject;
    $scope.description = issueData.description;
    var projectId = issueData.project;
    $scope.project = projectsService.getOne(projectId).$object;
    issuesService.getFiltersData(projectId).then(function(data) {
      $scope.types = data.types;
      $scope.statuses = data.statuses;
      $scope.priorities = data.priorities;
      $scope.severities = data.severities;
      syncType();
      syncPriority();
      syncSeverity();
    });
  });

  $scope.name = {
    type: '',
    typeColor: '',
    priority: '',
    priorityColor: '',
    severity: '',
    severityColor: ''
  };

  // 同步数据 显示名称
  function syncType() {
    for (var i = $scope.types.length - 1; i >= 0; i--) {
      if ($scope.issue.type === $scope.types[i].id) {
        $scope.name.type = $scope.types[i].name;
        $scope.name.typeColor = $scope.types[i].color;
        return;
      }
    }
  }
  function syncPriority() {
    for (var i = $scope.priorities.length - 1; i >= 0; i--) {
      if ($scope.issue.priority === $scope.priorities[i].id) {
        $scope.name.priority = $scope.priorities[i].name;
        $scope.name.priorityColor = $scope.priorities[i].color;
        return;
      }
    }
  }
  function syncSeverity() {
    for (var i = $scope.severities.length - 1; i >= 0; i--) {
      if ($scope.issue.severity === $scope.severities[i].id) {
        $scope.name.severity = $scope.severities[i].name;
        $scope.name.severityColor = $scope.severities[i].color;
        return;
      }
    }
  }

  $scope.isEditSubject = false;
  $scope.isEditDescription = false;

  $scope.changeSubject = function(subject) {
    $scope.subject = subject;
  };
  $scope.changeDescription = function(description) {
    $scope.description = description;
  };

  $scope.editSubject = function() {
    $scope.isEditSubject = true;
  };
  $scope.confirmSubject = function() {
    var data = {
      subject: $scope.subject,
      version: $scope.issue.version
    };
    issuesService.update(issueId, data).then(function(issueData) {
      $scope.issue = issueData;
    });
    $scope.isEditSubject = false;
  };
  $scope.cancelSubject = function() {
    $scope.subject = $scope.issue.subject;
    $scope.isEditSubject = false;
  };

  $scope.editDescription = function() {
    $scope.isEditDescription = true;
  };
  $scope.confirmDescription = function() {
    var data = {
      description: $scope.description,
      version: $scope.issue.version
    };
    issuesService.update(issueId, data).then(function(issueData) {
      $scope.issue = issueData;
    });
    $scope.isEditDescription = false;
  };
  $scope.cancelDescription = function() {
    $scope.description = $scope.issue.description;
    $scope.isEditDescription = false;
  };

  $scope.assigned = function(id) {
    var data = {
      assigned_to: id,
      version: $scope.issue.version
    };
    issuesService.update(issueId, data).then(function(issueData) {
      $scope.issue = issueData;
    });
    $scope.closePopoverAssigned();
  };

  $scope.changeStatus = function(sid) {
    var data = {
      status: sid,
      version: $scope.issue.version,
    };
    issuesService.update(issueId, data).then(function(issueData) {
      $scope.issue = issueData;
    });
    $scope.closePopoverChangeStatus();
  };

  $scope.changeSeverity = function(sid) {
    var data = {
      severity: sid,
      version: $scope.issue.version,
    };
    issuesService.update(issueId, data).then(function(issueData) {
      $scope.issue = issueData;
      syncSeverity();
    });
    $scope.closePopoverChangeSeverity();
  };

  $scope.changeType = function(sid) {
    var data = {
      type: sid,
      version: $scope.issue.version,
    };
    issuesService.update(issueId, data).then(function(issueData) {
      $scope.issue = issueData;
      syncType();
    });
    $scope.closePopoverChangeType();
  };

  $scope.changePriority = function(sid) {
    var data = {
      priority: sid,
      version: $scope.issue.version,
    };
    issuesService.update(issueId, data).then(function(issueData) {
      $scope.issue = issueData;
      syncPriority();
    });
    $scope.closePopoverChangePriority();
  };

  $scope.delete = function() {
    $ionicPopup.confirm({
      title: '删除此issue吗？',
      okText: '删除',
      okType: 'button-assertive',
      cancelText: '取消',
      cancelType: 'button-positive',
    })
    .then(function(res) {
      if (res) {
        issuesService.delete(issueId).then(function() {
          console.log('delete');
          $state.go('app.issues', {project: $scope.issue.project}); // 传参projectId
        });
      } else {
        console.log('cancel');
      }
    });
  };

  $scope.lockToggle = function() {
    $scope.data = {};
    // 自定义弹窗
    $ionicPopup.show({
      template: '<input type="text" ng-model="data.blocked_note" placeholder="请解释原因">',
      title: '封锁issue',
      scope: $scope,
      buttons: [
        { text: '取消' },
        {
          text: '确定',
          type: 'button-positive',
          onTap: function(e) {
            // return console.log($scope.data.blocked_note);
            $scope.data.is_blocked = !$scope.issue.is_blocked;
            $scope.data.version = $scope.issue.version;
            console.log($scope.data);
            issuesService.update(issueId, $scope.data).then(function(issueData) {
              $scope.issue = issueData;
              $scope.data = {};
            });
          }
        }
      ]
    })
    .then(function() {
      console.log('popup hide');
    });
  };

  // .fromTemplateUrl() 方法
  $ionicPopover.fromTemplateUrl('my-popover-changeStatus.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popoverChangeStatus = popover;
  });

  $ionicPopover.fromTemplateUrl('my-popover-changeSeverity.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popoverChangeSeverity = popover;
  });

  $ionicPopover.fromTemplateUrl('my-popover-changePriority.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popoverChangePriority = popover;
  });

  $ionicPopover.fromTemplateUrl('my-popover-changeType.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popoverChangeType = popover;
  });

  $ionicPopover.fromTemplateUrl('my-popover-assigned.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popoverAssigned = popover;
  });

  $scope.openPopoverChangeStatus = function($event) {
    $scope.popoverChangeStatus.show($event);
  };
  $scope.closePopoverChangeStatus = function() {
    $scope.popoverChangeStatus.hide();
  };

  $scope.openPopoverChangeSeverity = function($event) {
    $scope.popoverChangeSeverity.show($event);
  };
  $scope.closePopoverChangeSeverity = function() {
    $scope.popoverChangeSeverity.hide();
  };

  $scope.openPopoverChangePriority = function($event) {
    $scope.popoverChangePriority.show($event);
  };
  $scope.closePopoverChangePriority = function() {
    $scope.popoverChangePriority.hide();
  };

  $scope.openPopoverChangeType = function($event) {
    $scope.popoverChangeType.show($event);
  };
  $scope.closePopoverChangeType = function() {
    $scope.popoverChangeType.hide();
  };

  $scope.openPopoverAssigned = function($event) {
    $scope.popoverAssigned.show($event);
  };
  $scope.closePopoverAssigned = function() {
    $scope.popoverAssigned.hide();
  };

  // 清除浮动框
  $scope.$on('$destroy', function() {
    $scope.popoverChangeStatus.remove();
    $scope.popoverChangeSeverity.remove();
    $scope.popoverChangePriority.remove();
    $scope.popoverChangeType.remove();
    $scope.popoverAssigned.remove();
  });

  // Set Motion
  ionicMaterialMotion.fadeSlideInRight();
  // Set Ink
  ionicMaterialInk.displayEffect();
});

agile.controller('IssuesFilterCtrl', function($scope, $stateParams, $ionicModal, issuesService, ionicMaterialInk, ionicMaterialMotion) {
  var requestName = ['type', 'status', 'priority', 'severity', 'assigned_to', 'owner', 'tags'];
  $scope.filtersName = ['Type', 'Status', 'Priority', 'Severity', 'Assigned_To', 'Owner', 'Tag'];
  $scope.subFilterStatus = [false, false, false, false, false, false, false];
  if (typeof $stateParams.project !== 'undefined') {
    issuesService.getFiltersData($stateParams.project).then(function(filters) {
      $scope.project = $stateParams.project;
      $scope.issueFilters = [];
      $scope.issueFilters[0] = filters.types;
      $scope.issueFilters[1] = filters.statuses;
      $scope.issueFilters[2] = filters.priorities;
      $scope.issueFilters[3] = filters.severities;
      $scope.issueFilters[4] = filters.assigned_to;
      $scope.issueFilters[5] = filters.owners;
      $scope.issueFilters[6] = filters.tags;
    });
  }

  $scope.showSubFilters = function(index) {
    issuesService.setOption(requestName[index]);
    for (var i = 0; i < $scope.filtersName.length; i++) {
      if (i === index) {
        if ($scope.subFilterStatus[i]) {
          $scope.subFilterStatus[i] = false;
        } else {
          $scope.subFilterStatus[i] = true;
        }
      } else {
        $scope.subFilterStatus[i] = false;
      }
    }
  };

  // 弹出页输入issue信息
  $ionicModal.fromTemplateUrl('modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.add = function(data) {
    console.log(data);
    var dataUp = {'priority': data.priority,
                  'severity': data.severity,
                  'project': $stateParams.project,
                  'type': data.type,
                  'subject': $('#subjectId').val(),
                  'status': $scope.issueFilters[1][0].id,
                  'description': $('#desId').val()
                };
    console.log(dataUp);
    issuesService.create(dataUp).then(function(d) {
      $scope.modal.hide();
      window.location.reload(true);
    });
    // var data = {html:$scope.wiki.html,version: $scope.wiki.version}
    // wikiService.update($scope.wiki.id, data).then(function(){
    //   console.log($scope.wiki.id+"================="+$scope.wiki.html);
    //   $scope.modal.hide();
    // });
  };

  // Set Motion
  ionicMaterialMotion.fadeSlideInRight();
  // Set Ink
  ionicMaterialInk.displayEffect();
});

agile.controller('IssuesCtrl', function($scope, $state, $stateParams, issuesService, ionicMaterialInk, ionicMaterialMotion) {
  if (typeof $stateParams.project !== 'undefined') {
    if (typeof $stateParams.optionId !== 'undefined') {
      $scope.issues = issuesService.getIssuesByProOption($stateParams.project, $stateParams.optionId);
    } else {
      $scope.issues = issuesService.getByPid($stateParams.project);
    }
  } else {
    $scope.issues = issuesService.getAll().$object;
  }

  // Set Motion
  ionicMaterialMotion.fadeSlideInRight();
  // Set Ink
  ionicMaterialInk.displayEffect();
});

// .controller('IssueCtrl', function($scope, $stateParams, issuesService, ionicMaterialInk, ionicMaterialMotion) {
//   if(typeof $stateParams.project != "undefined" && typeof $stateParams.ref != "undefined"){
//     issuesService.getIssueByProRef($stateParams.project, $stateParams.ref).then(function(issue){
//       $scope.issue = issue;
//     });
//   }else{
//     $scope.issue = issuesService.getAll().$object;
//   }
//   // Set Motion
//   ionicMaterialMotion.fadeSlideInRight();
//   // Set Ink
//   ionicMaterialInk.displayEffect();
// })

agile.controller('WikisCtrl', function($scope, $state, $stateParams, $ionicPopup, wikiService, ionicMaterialInk, ionicMaterialMotion) {
  if (typeof $stateParams.project !== 'undefined') {
    $scope.wikis = wikiService.getByPid($stateParams.project);
  } else {
    $scope.wikis = wikiService.getAll().$object;
  }

  $scope.delete = function(id) {
    $scope.showConfirm('删除Wiki', '确定要删除这条Wiki吗？', id);
  };
  // confirm 对话框
  $scope.showConfirm = function(title, template, itemId) {
    var confirmPopup = $ionicPopup.confirm({
      title: title,
      template: template
    });
    confirmPopup.then(function(res) {
      if (res) {
        wikiService.remove(itemId).then(function() {
          window.location.reload(true);
        });
      } else {
        console.log('取消了删除Wiki');
      }
    });
  };

  // 创建Wiki弹窗
  $scope.add = function() {
    $scope.data = {};

    // 自定义弹窗
    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.wikiname">',
      title: 'Enter Wiki Name',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.wikiname) {
              // 不允许用户关闭，除非输入 wikiname
              e.preventDefault();
            } else {
              return $scope.data.wikiname;
            }
          }
        }
      ]
    });
    myPopup.then(function(res) {
      var dataUp = {project: $stateParams.project, 'title': res.toString(), slug: res.toString()};
      wikiService.createWikiLink(dataUp).then(function(data) {
        var dataToAdd = {slug: data.slug, id: 0};
        // $scope.wikis.push(dataToAdd);
        window.location.reload(true);
      });
    });
  };

  // Set Motion
  ionicMaterialMotion.fadeSlideInRight();
  // Set Ink
  ionicMaterialInk.displayEffect();
});

agile.controller('WikiCtrl', function($scope, $stateParams, wikiService, $ionicModal, ionicMaterialInk, ionicMaterialMotion) {
  $scope.wiki = {project: $stateParams.project};
  var isCreate = false;
  if (typeof $scope.wiki.content) {
    isCreate = true;
  }
  wikiService.getOne($stateParams.project, $stateParams.slug).then(function(wiki) {
    $scope.wiki = wiki;
    wikiService.getEditorById(wiki.owner).then(function(user) {
      $scope.editor = user.full_name;
      $scope.user_avatar = user.photo;
    });
  });

  $scope.addWikiContent = 'addWikiContent.html';
  $scope.editTime = '2015.10.10';

  // 弹出页输入Wiki内容
  $ionicModal.fromTemplateUrl('modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.addContent = function() {
    var data = {'content': $scope.wiki.html,
                'version': $scope.wiki.version,
                'slug': $stateParams.slug,
                'project': $scope.wiki.project};
    if (isCreate) {
      wikiService.create(data).then(function() {
        $scope.modal.hide();
        window.location.reload(true);
      });
    } else {
      wikiService.update($scope.wiki.id, data).then(function() {
        $scope.modal.hide();
      });
    }
  };

  // Set Motion
  ionicMaterialMotion.fadeSlideInRight();
  // Set Ink
  ionicMaterialInk.displayEffect();
});

agile.controller('TimelinesCtrl', function($scope, $stateParams, $state, timelinesService, ionicMaterialInk, ionicMaterialMotion) {
  if (typeof $stateParams.id !== 'undefined') {
    $scope.timelines = timelinesService.getByPid($stateParams.id);
  } else {
    $scope.timelines = timelinesService.getAll().$object;
  }

  $scope.goDetails = function(id) {
    if ($scope.timelines[id].event_type.split('.')[2] === 'delete') {
      return;
    } else if ($scope.timelines[id].event_type.split('.')[0] === 'wiki') {
      $state.go('app.wiki', {id: $scope.timelines[id].data.wikipage.id});
    } else if ($scope.timelines[id].event_type.split('.')[0] === 'issues') {
      $state.go('app.issue', {id: $scope.timelines[id].data.issue.id});
    } else if ($scope.timelines[id].event_type.split('.')[0] === 'userstories') {
      $state.go('app.userstory', {id: $scope.timelines[id].data.userstory.id});
    } else {
      console.log('type:' + $scope.timelines[id].event_type);
    }
  };

  // Set Motion
  ionicMaterialMotion.fadeSlideInRight();
  // Set Ink
  ionicMaterialInk.displayEffect();
});
