layui.use (
  [
    'element',
    'jquery',
    'table',
    'form',
    'laydate',
    'okLayer',
    'okUtils',
    'okMock'
  ],
  function () {
    const table = layui.table;
    const form = layui.form;
    const laydate = layui.laydate;
    const okLayer = layui.okLayer;
    const okUtils = layui.okUtils;
    const okMock = layui.okMock;
    const $ = layui.jquery;

    laydate.render ({ elem: '#startTime', type: 'datetime' });
    laydate.render ({ elem: '#endTime', type: 'datetime' });
    okLoading.close ($);
    const userTable = table.render ({
      elem: '#tableId',
      url: okMock.api.listUser,
      limit: 20,
      page: true,
      // toolbar: true,
      toolbar: '#toolbarTpl',
      size: 'sm',
      cols: [
        [
          { type: 'checkbox', fixed: 'left' },
          { field: 'id', title: 'ID', width: 160, sort: true },
          { field: 'username', title: '账号', width: 100 },
          { field: 'password', title: '密码', width: 100 },
          { field: 'name', title: '姓名', width: 100 },
          { field: 'nickname', title: '昵称', width: 100 },
          { field: 'role', title: '角色', width: 100, templet: '#roleTpl' },
          { field: 'status', title: '状态', width: 100, templet: '#statusTpl' },
          { field: 'email', title: '邮箱', width: 200 },
          { field: 'province', title: '省份', width: 120 },
          { field: 'city', title: '城市', width: 100 },
          { field: 'county', title: '区县', width: 120 },
          { field: 'logins', title: '登陆次数', width: 100 },
          { field: 'createTime', title: '创建时间', width: 150 },
          { field: 'updateTime', title: '更新时间', width: 150 },
          {
            title: '操作',
            width: 100,
            align: 'center',
            fixed: 'right',
            templet: '#operationTpl'
          }
        ]
      ],
      done: function (res, curr, count) {
        console.info (res, curr, count);
      }
    });

    form.on ('submit(search)', function (data) {
      userTable.reload ({
        where: data.field,
        page: { curr: 1 }
      });
      return false;
    });

    table.on ('toolbar(tableFilter)', function (obj) {
      switch (obj.event) {
      case 'batchEnabled':
        batchEnabled ();
        break;
      case 'batchDisabled':
        batchDisabled ();
        break;
      case 'batchDel':
        batchDel ();
        break;
      case 'add':
        add ();
        break;
      }
    });

    table.on ('tool(tableFilter)', function (obj) {
      const data = obj.data;
      switch (obj.event) {
      case 'edit':
        edit (data);
        break;
      case 'del':
        del (data.id);
        break;
      }
    });

    function batchEnabled () {
      okLayer.confirm ('确定要批量启用吗？', function (index) {
        layer.close (index);
        const idsStr = okUtils.tableBatchCheck (table);
        if (idsStr) {
          okUtils
            .ajax ('/user/normalUser', 'put', { idsStr: idsStr }, true)
            .done (function (response) {
              console.log (response);
              okUtils.tableSuccessMsg (response.msg);
            })
            .fail (function (error) {
              console.log (error);
            });
        }
      });
    }

    function batchDisabled () {
      okLayer.confirm ('确定要批量停用吗？', function (index) {
        layer.close (index);
        const idsStr = okUtils.tableBatchCheck (table);
        if (idsStr) {
          okUtils
            .ajax ('/user/stopUser', 'put', { idsStr: idsStr }, true)
            .done (function (response) {
              console.log (response);
              okUtils.tableSuccessMsg (response.msg);
            })
            .fail (function (error) {
              console.log (error);
            });
        }
      });
    }

    function batchDel () {
      okLayer.confirm ('确定要批量删除吗？', function (index) {
        layer.close (index);
        const idsStr = okUtils.tableBatchCheck (table);
        if (idsStr) {
          okUtils
            .ajax ('/user/deleteUser', 'delete', { idsStr: idsStr }, true)
            .done (function (response) {
              console.log (response);
              okUtils.tableSuccessMsg (response.msg);
            })
            .fail (function (error) {
              console.log (error);
            });
        }
      });
    }

    function add () {
      okLayer.open ('添加用户', '/member/user-add.html', '90%', '90%', null, function () {
        userTable.reload ();
      });
    }

    function edit (data) {
      okLayer.open (
        '更新用户',
        'user-edit.html',
        '90%',
        '90%',
        function (layero) {
          const iframeWin = window[layero.find ('iframe')[0].name];
          iframeWin.initForm (data);
        },
        function () {
          userTable.reload ();
        }
      );
    }

    function del (id) {
      okLayer.confirm ('确定要删除吗？', function () {
        okUtils
          .ajax ('/user/deleteUser', 'delete', { idsStr: id }, true)
          .done (function (response) {
            console.log (response);
            okUtils.tableSuccessMsg (response.msg);
          })
          .fail (function (error) {
            console.log (error);
          });
      });
    }
  }
);