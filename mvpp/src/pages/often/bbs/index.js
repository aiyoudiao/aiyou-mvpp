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
      url: okMock.api.listBbs,
      limit: 20,
      page: true,
      even: true,
      toolbar: '#toolbarTpl',
      size: 'sm',
      cols: [
        [
          { type: 'checkbox', fixed: 'left' },
          { field: 'id', title: 'ID', width: 170, sort: true },
          { field: 'poster', title: '发帖人', width: 100 },
          { field: 'title', title: '标题', width: 150 },
          { field: 'summary', title: '摘要', width: 250 },
          { field: 'content', title: '内容', width: 350 },
          {
            field: 'status',
            title: '状态',
            width: 110,
            align: 'center',
            templet: '#statusTpl'
          },
          { field: 'createTime', title: '发帖时间', width: 150 },
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
        edit (data.id);
        break;
      case 'del':
        del (data.id);
        break;
      }
    });

    function batchEnabled () {
      okLayer.confirm ('确定要批量上架吗？', function (index) {
        layer.close (index);
        const idsStr = okUtils.tableBatchCheck (table);
        if (idsStr) {
          okUtils
            .ajax ('/bbs/update-bbs-status', 'put', { idsStr: idsStr }, true)
            .done (function (response) {
              okUtils.tableSuccessMsg (response.msg);
            })
            .fail (function (error) {
              console.log (error);
            });
        }
      });
    }

    function batchDisabled () {
      okLayer.confirm ('确定要批量下架吗？', function (index) {
        layer.close (index);
        const idsStr = okUtils.tableBatchCheck (table);
        if (idsStr) {
          okUtils
            .ajax ('/bbs/update-bbs-status', 'put', { idsStr: idsStr }, true)
            .done (function (response) {
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
            .ajax ('/bbs/deleteBbs', 'delete', { idsStr: idsStr }, true)
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
      okLayer.open ('添加帖子', 'bbs-add.html', '90%', '90%', null, function () {
        articleTable.reload ();
      });
    }

    function edit (id) {
      okLayer.open (
        '编辑帖子',
        'bbs-edit.html?id=' + id,
        '90%',
        '90%',
        null,
        function () {
          articleTable.reload ();
        }
      );
    }

    function del (id) {
      okLayer.confirm ('确定要删除吗？', function () {
        okUtils
          .ajax ('/bbs/deleteBbs', 'delete', { idsStr: id }, true)
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