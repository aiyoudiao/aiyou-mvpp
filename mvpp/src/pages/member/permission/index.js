layui.use (
  ['element', 'table', 'laydate', 'tree', 'okUtils', 'okMock'],
  function () {
    const table = layui.table;
    const laydate = layui.laydate;
    const tree = layui.tree;
    const okUtils = layui.okUtils;
    const okMock = layui.okMock;
    okLoading.close ();
    laydate.render ({ elem: '#startTime', type: 'datetime' });
    laydate.render ({ elem: '#endTime', type: 'datetime' });

    function initPermissionTree () {
      okUtils
        .ajax ('/permission/tree', 'get', null, true)
        .done (function (response) {
          tree.render ({
            elem: '#permissionTree',
            data: response.data,
            showCheckbox: true,
            id: 'demoId1',
            isJump: true,
            click: function (obj) {
              var data = obj.data;
              layer.msg (
                '状态：' + obj.state + '<br>节点数据：' + JSON.stringify (data)
              );
            }
          });

          initPermissionTable ();
        })
        .fail (function (error) {
          console.log (error);
        });
    }

    function initPermissionTable () {
      table.render ({
        elem: '#permissionTable',
        url: okMock.api.permission.list,
        limit: 20,
        page: true,
        size: 'sm',
        cols: [
          [
            { field: 'id', title: 'ID', width: 170, sort: true, fixed: 'left' },
            { field: 'name', title: '权限名称', width: 100 },
            { field: 'permit', title: '权限标识', width: 150 },
            { field: 'url', title: '权限路径', width: 150 },
            { field: 'parentName', title: '父菜单', width: 100 },
            { field: 'type', title: '类型', width: 100, templet: '#typeTpl' },
            { field: 'createTime', title: '创建时间', width: 150 },
            { field: 'updateTime', title: '创建时间', width: 150 },
            {
              title: '操作',
              width: 100,
              templet: '#operationTpl',
              align: 'center',
              fixed: 'right'
            }
          ]
        ],
        done: function (res, curr, count) {
          console.info (res, curr, count);
        }
      });
    }

    initPermissionTree ();
  }
);