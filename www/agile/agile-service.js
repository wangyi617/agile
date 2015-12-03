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
