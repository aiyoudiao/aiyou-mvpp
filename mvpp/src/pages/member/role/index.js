layui.use (['element', 'table', 'form', 'laydate', 'okLayer', 'okUtils', 'okMock'], function () {
  const table = layui.table;
  const form = layui.form;
  const laydate = layui.laydate;
  const okLayer = layui.okLayer;
  const okUtils = layui.okUtils;
  const okMock = layui.okMock;
  okLoading.close ();
  laydate.render ({ elem: '#startTime', type: 'datetime' });
  laydate.render ({ elem: '#endTime', type: 'datetime' });

  const roleTable = table.render ({
    elem: '#tableId',
    url: okMock.api.listRole,
    limit: 10,
    page: true,
    toolbar: '#toolbarTpl',
    size: 'sm',
    cols: [[
      { type: 'checkbox' },
      { field: 'id', title: 'ID', width: 170, sort: true },
      { field: 'name', title: '角色名', width: 100 },
      { field: 'remarks', title: '备注', width: 100 },
      { field: 'createUsername', title: '创建者', width: 85 },
      { field: 'status', title: '状态', width: 85, templet: '#statusTpl' },
      { field: 'createTime', title: '创建时间', width: 150 },
      { title: '操作', width: 80, align: 'center', templet: '#operationTpl' }
    ]],
    done: function (res, curr, count) {
      console.log (res, curr, count);
    }
  });

  form.on ('submit(search)', function (data) {
    roleTable.reload ({
      where: data.field,
      page: { curr: 1 }
    });
    console.log ('0000');
    return false;
  });

  table.on ('toolbar(tableFilter)', function (obj) {
    switch (obj.event) {
    case 'add':
      add ();
      break;
    case 'batchDel':
      batchDel ();
      break;
    }
  });

  table.on ('tool(tableFilter)', function (obj) {
    const data = obj.data;
    switch (obj.event) {
    case 'edit':
      edit (data.id);
      break;
    case 'del':
      del (data.id);
      break;
    }
  });

  function add () {
    okLayer.open ('添加角色', '/member/role-add.html', '90%', '90%', null, function () {
      roleTable.reload ();
    });
  }

  function batchDel () {
    okLayer.confirm ('确定要批量删除吗？', function (index) {
      layer.close (index);
      const idsStr = okUtils.tableBatchCheck (table);
      if (idsStr) {
        okUtils.ajax ('/role/deleteRole', 'delete', { idsStr: idsStr }, true).done (function (response) {
          okUtils.tableSuccessMsg (response.msg);
        }).fail (function (error) {
          console.log (error);
        });
      }
    });
  }

  function edit (id) {
    okLayer.open ('编辑角色', '/member/role-edit.html?id=' + id, '90%', '90%', null, function () {
      roleTable.reload ();
    });
  }

  function del (id) {
    okLayer.confirm ('确定要删除吗？', function () {
      okUtils.ajax ('/role/deleteRole', 'delete', { idsStr: id }, true).done (function (response) {
        okUtils.tableSuccessMsg (response.msg);
      }).fail (function (error) {
        console.log (error);
      });
    });
  }
});