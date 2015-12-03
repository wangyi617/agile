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
