layui.use (
  ['table', 'form', 'laydate', 'okLayer', 'okUtils', 'okMock'],
  function () {
    const table = layui.table;
    const form = layui.form;
    const util = layui.util;
    const laydate = layui.laydate;
    const okLayer = layui.okLayer;
    const okUtils = layui.okUtils;
    const okMock = layui.okMock;
    okLoading.close ();
    util.fixbar ({});

    laydate.render ({ elem: '#startTime', type: 'datetime' });
    laydate.render ({ elem: '#endTime', type: 'datetime' });

    const articleTable = table.render ({
      elem: '#tableId',
      url: okMock.api.listLink,
      limit: 20,
      page: true,
      even: true,
      toolbar: '#toolbarTpl',
      size: 'sm',
      cols: [
        [
          { type: 'checkbox', fixed: 'left' },
          { field: 'id', title: 'ID', width: 170, sort: true },
          { field: 'name', title: '名称', width: 150 },
          { field: 'remarks', title: '备注', width: 310 },
          { field: 'url', title: '链接', width: 250, templet: '#urlTpl' },
          {
            field: 'status',
            title: '状态',
            width: 110,
            align: 'center',
            templet: '#statusTpl'
          },
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
        console.log (res, curr, count);
      }
    });

    form.on ('submit(search)', function (data) {
      articleTable.reload ({
        where: data.field,
        page: { curr: 1 }
      });
      return false;
    });

    table.on ('toolbar(tableFilter)', function (obj) {
      switch (obj.event) {
      case 'add':
        add ();
        break;
      case 'batchDelete':
        batchDel ();
        break;
      }
    });

    table.on ('tool(tableFilter)', function (obj) {
      const data = obj.data;
      switch (obj.event) {
      case 'updateById':
        updateById (data.id);
        break;
      case 'deleteById':
        deleteById (data.id);
        break;
      }
    });

    function batchDel () {
      okLayer.confirm ('确定要批量删除吗？', function (index) {
        layer.close (index);
        const idsStr = okUtils.tableBatchCheck (table);
        if (idsStr) {
          okUtils
            .ajax ('/link/deleteLink', 'delete', { idsStr: idsStr }, true)
            .done (function (response) {
              okUtils.tableSuccessMsg (response.msg);
            })
            .fail (function (error) {
              console.log (error);
            });
        }
      });
    }

    function add () {
      okLayer.open ('添加连接', 'link-add.html', '90%', '90%', null, function () {
        articleTable.reload ();
      });
    }

    function updateById (id) {
      okLayer.open (
        '编辑连接',
        'link-edit.html?id=' + id,
        '90%',
        '90%',
        null,
        function () {
          articleTable.reload ();
        }
      );
    }

    function deleteById (id) {
      okLayer.confirm ('确定要删除吗？', function () {
        okUtils
          .ajax ('/link/deleteLink', 'delete', { idsStr: id }, true)
          .done (function (response) {
            okUtils.tableSuccessMsg (response.msg);
          })
          .fail (function (error) {
            console.log (error);
          });
      });
    }
  }
);