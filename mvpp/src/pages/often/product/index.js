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
      url: okMock.api.listProduct,
      limit: 20,
      page: true,
      even: true,
      toolbar: '#toolbarTpl',
      size: 'lg',
      cols: [
        [
          { type: 'checkbox', fixed: 'left' },
          { field: 'id', title: 'ID', width: 200, sort: true },
          { field: 'name', title: '产品名称', width: 100 },
          { field: 'logo', title: '产品LOGO', width: 150, templet: '#logoTpl' },
          { field: 'url', title: '产品官网', width: 200, templet: '#urlTpl' },
          { field: 'description', title: '产品描述', width: 400 },
          { field: 'createTime', title: '创建时间', width: 180 },
          { field: 'updateTime', title: '更新时间', width: 180 },
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
      case 'batchEnabled':
        batchEnabled ();
        break;
      case 'batchDisabled':
        batchDisabled ();
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

    function batchEnabled () {
      okLayer.confirm ('确定要批量上架吗？', function (index) {
        layer.close (index);
        const idsStr = okUtils.tableBatchCheck (table);
        if (idsStr) {
          okUtils
            .ajax (
              '/product/update-product-status',
              'put',
              { idsStr: idsStr },
              true
            )
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
            .ajax (
              '/product/update-product-status',
              'put',
              { idsStr: idsStr },
              true
            )
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
            .ajax ('/product/deleteProduct', 'delete', { idsStr: idsStr }, true)
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
      okLayer.open (
        '添加产品',
        'product-add.html',
        '90%',
        '90%',
        null,
        function () {
          articleTable.reload ();
        }
      );
    }

    function updateById (id) {
      okLayer.open (
        '编辑产品',
        'product-edit.html?id=' + id,
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
          .ajax ('/product/deleteProduct', 'delete', { idsStr: id })
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