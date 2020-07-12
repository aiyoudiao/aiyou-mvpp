layui.use (
  ['element', 'table', 'form', 'laydate', 'okLayer', 'okUtils', 'okMock'],
  function () {
    var table = layui.table;
    var form = layui.form;
    var util = layui.util;
    var laydate = layui.laydate;
    var okLayer = layui.okLayer;
    var okUtils = layui.okUtils;
    var okMock = layui.okMock;

    util.fixbar ({});

    laydate.render ({ elem: '#startTime', type: 'datetime' });
    laydate.render ({ elem: '#endTime', type: 'datetime' });

    var articleTable = table.render ({
      elem: '#tableId',
      url: okMock.api.article.list,
      limit: 20,
      page: true,
      even: true,
      toolbar: '#toolbarTpl',
      size: 'sm',
      cols: [
        [
          { type: 'checkbox', fixed: 'left' },
          { field: 'guid', title: 'GUID', width: 280, sort: true },
          { field: 'title', title: '标题', width: 350 },
          { field: 'url', title: '链接', width: 250, templet: '#urlTpl' },
          { field: 'publisher', title: '发布者', width: 100 },
          { field: 'readSize', title: '阅读量', width: 80 },
          {
            field: 'isTop',
            title: '是否置顶',
            width: 100,
            align: 'center',
            templet: '#topTpl'
          },
          {
            field: 'status',
            title: '发布状态',
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
      }
    });
    const data = { field: 'field' };
    form.on ('submit(search)', function () {
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
      var data = obj.data;
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
        var idsStr = okUtils.table.batchCheck (table);
        if (idsStr) {
          okUtils
            .ajax ('/article/batchNormal', 'post', { idsStr: idsStr })
            .done (function (response) {
              console.log (response);
              okUtils.table.successMsg ('批量上架成功');
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
        var idsStr = okUtils.table.batchCheck (table);
        if (idsStr) {
          okUtils
            .ajax ('/article/batchStop', 'post', { idsStr: idsStr })
            .done (function (response) {
              console.log (response);
              okUtils.table.successMsg ('批量下架成功');
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
        var idsStr = okUtils.table.batchCheck (table);
        if (idsStr) {
          okUtils
            .ajax ('/article/batchDel', 'post', { idsStr: idsStr })
            .done (function (response) {
              console.log (response);
              okUtils.table.successMsg ('批量删除成功');
            })
            .fail (function (error) {
              console.log (error);
            });
        }
      });
    }

    function add () {
      okLayer.open (
        '添加文章',
        'article-add.html',
        '90%',
        '90%',
        null,
        function () {
          articleTable.reload ();
        }
      );
    }

    function edit (id) {
      okLayer.open (
        '编辑文章',
        'article-edit.html?id=' + id,
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
          .ajax ('/article/batchDel', 'post', { idsStr: id })
          .done (function (response) {
            console.log (response);
            okUtils.table.successMsg ('删除成功');
          })
          .fail (function (error) {
            console.log (error);
          });
      });
    }
  }
);