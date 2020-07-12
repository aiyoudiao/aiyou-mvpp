/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-21 17:22:57
 * @LastEditTime: 2020-01-21 21:53:07
 * @LastEditors: ilovejwl
 */
layui.use (
  ['element', 'util', 'form', 'laydate', 'okMock', 'okUtils'],
  function () {
    const util = layui.util;
    const okMock = layui.okMock;
    const form = layui.form;
    const laydate = layui.laydate;
    okLoading.close ();
    util.fixbar ({});

    laydate.render ({ elem: '#startTime', type: 'datetime' });
    laydate.render ({ elem: '#endTime', type: 'datetime' });

    $.fn.dataTable.defaults.oLanguage = {
      sProcessing: '处理中...',
      sLengthMenu: '显示 _MENU_ 项结果',
      sZeroRecords: '没有匹配结果',
      sInfo: '显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项',
      sInfoEmpty: '显示第 0 至 0 项结果，共 0 项',
      sInfoFiltered: '(由 _MAX_ 项结果过滤)',
      sInfoPostFix: '',
      sSearch: '搜索：',
      sUrl: '',
      sEmptyTable: '表中数据为空',
      sLoadingRecords: '载入中...',
      sInfoThousands: ',',
      oPaginate: {
        sFirst: '首页',
        sPrevious: '上页',
        sNext: '下页',
        sLast: '末页'
      },
      oAria: {
        sSortAscending: ': 以升序排列此列',
        sSortDescending: ': 以降序排列此列'
      }
    };

    $ ('#userTable').DataTable ({
      ajax: {
        url: okMock.api.datatables,
        type: 'get'
      },
      columns: [
        { data: 'id', title: 'ID' },
        { data: 'username', title: '账号' },
        { data: 'password', title: '密码' },
        { data: 'nickname', title: '昵称' },
        { data: 'name', title: '姓名' },
        { data: 'role', title: '角色' },
        { data: 'status', title: '状态' },
        { data: 'email', title: '邮箱' },
        { data: 'phone', title: '手机' },
        { data: 'createTime', title: '创建时间' },
        { data: 'updateTime', title: '更新时间' }
      ]
    });

    form.on ('submit(search)', function (data) {
      return false;
    });
  }
);