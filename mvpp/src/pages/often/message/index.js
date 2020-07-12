/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-21 17:22:57
 * @LastEditTime: 2020-01-22 14:08:27
 * @LastEditors: ilovejwl
 */

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
      url: okMock.api.listMessage,
      limit: 20,
      page: true,
      even: true,
      toolbar: '#toolbarTpl',
      size: 'sm',
      cols: [
        [
          { type: 'checkbox', fixed: 'left' },
          { field: 'id', title: 'ID', width: 170, sort: true },
          { field: 'commenter', title: '留言者', width: 100 },
          { field: 'content', title: '留言内容', width: 300 },
          { field: 'url', title: '文章链接', width: 250, templet: '#urlTpl' },
          {
            field: 'status',
            title: '状态',
            width: 110,
            align: 'center',
            templet: '#statusTpl'
          },
          { field: 'createTime', title: '留言时间', width: 150 },
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
      case 'batchDelete':
        batchDelete ();
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

    function batchDelete () {
      okLayer.confirm ('确定要批量删除吗？', function (index) {
        layer.close (index);
        const idsStr = okUtils.tableBatchCheck (table);
        if (idsStr) {
          okUtils
            .ajax ('/message/deleteMessage', 'delete', { idsStr: idsStr }, true)
            .done (function (response) {
              okUtils.tableSuccessMsg (response.msg);
            })
            .fail (function (error) {
              console.log (error);
            });
        }
      });
    }

    function updateById (id) {
      okLayer.open (
        '编辑留言',
        'message-edit.html?id=' + id,
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
          .ajax ('/message/deleteMessage', 'delete', { idsStr: id }, true)
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