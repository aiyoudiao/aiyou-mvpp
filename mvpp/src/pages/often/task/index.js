layui.use (
  ['element', 'table', 'form', 'laydate', 'okLayer', 'okUtils', 'okMock'],
  function () {
    const element = layui.element;
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
      url: okMock.api.listTask,
      limit: 20,
      page: true,
      even: true,
      toolbar: '#toolbarTpl',
      size: 'sm',
      cols: [
        [
          { type: 'checkbox', fixed: 'left' },
          { field: 'id', title: 'ID', width: 170, sort: true },
          { field: 'name', title: '任务名称', width: 150 },
          { field: 'createTime', title: '任务创建时间', width: 150 },
          { field: 'startTime', title: '任务开始时间', width: 150 },
          { field: 'endTime', title: '任务结束时间', width: 150 },
          { field: 'createUser', title: '任务创建人', width: 100 },
          {
            field: 'progress',
            title: '任务进度',
            width: 200,
            templet: '#progressTpl'
          },
          {
            field: 'status',
            title: '任务状态',
            width: 110,
            align: 'center',
            templet: '#statusTpl'
          },
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
        element.init ();
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
      case 'batchStart':
        batchStart ();
        break;
      case 'batchEnd':
        batchEnd ();
        break;
      case 'batchDelete':
        batchDelete ();
        break;
      case 'add':
        add ();
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

    function batchStart () {
      okLayer.confirm ('确定要批量开始吗？', function (index) {
        layer.close (index);
        const idsStr = okUtils.tableBatchCheck (table);
        if (idsStr) {
          okUtils
            .ajax ('/task/update-task-status', 'put', { idsStr: idsStr }, true)
            .done (function (response) {
              okUtils.tableSuccessMsg (response.msg);
            })
            .fail (function (error) {
              console.log (error);
            });
        }
      });
    }

    function batchEnd () {
      okLayer.confirm ('确定要批量结束吗？', function (index) {
        layer.close (index);
        const idsStr = okUtils.tableBatchCheck (table);
        if (idsStr) {
          okUtils
            .ajax ('/task/update-task-status', 'put', { idsStr: idsStr }, true)
            .done (function (response) {
              okUtils.tableSuccessMsg (response.msg);
            })
            .fail (function (error) {
              console.log (error);
            });
        }
      });
    }

    function batchDelete () {
      okLayer.confirm ('确定要批量删除吗？', function (index) {
        layer.close (index);
        const idsStr = okUtils.tableBatchCheck (table);
        if (idsStr) {
          okUtils
            .ajax ('/task/deleteTask', 'delete', { idsStr: idsStr }, true)
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
      okLayer.open ('添加任务', 'task-add.html', '90%', '90%', null, function () {
        articleTable.reload ();
      });
    }

    function updateById (id) {
      okLayer.open (
        '编辑任务',
        'task-edit.html?id=' + id,
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
          .ajax ('/task/deleteTask', 'delete', { idsStr: id })
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