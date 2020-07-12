/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-21 17:22:57
 * @LastEditTime : 2020-01-22 17:00:35
 * @LastEditors  : ilovejwl
 */
import './index.css';

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

    const gridObj = $.fn.bsgrid.init ('bsgrid', {
      url: okMock.api.bsgrid,
      pageSizeSelect: true,
      pageSize: 20,
      rowHoverColor: true,
      complete: function () {}
    });

    form.on ('submit(search)', function (data) {
      gridObj.search (data.field);
      return false;
    });
  }
);

/* eslint-disable no-unused-vars */
window.roleFmt = function roleFmt (row) {
  const role = row.role;
  if (role === 0) {
    return '超级会员';
  } else if (role === 1) {
    return '普通用户';
  }
};

window.statusFmt = function statusFmt (row) {
  const status = row.status;
  if (status === 0) {
    return '已启用';
  } else if (status === 1) {
    return '已停用';
  }
};

window.toolbar = function toolbar (row) {
  const id = row.id;
  let html = '';
  html +=
    '<a title="编辑" href="javascript:;" onclick="updateUser(\'' +
    id +
    '\')"><span class="ok-icon">&#xe649;</span></a>';
  html +=
    '<a title="删除" href="javascript:;" onclick="deleteUser(\'' +
    id +
    '\')"><span class="ok-icon">&#xe6b4;</span></a>';
  return html;
};

window.updateUser = function updateUser (id) {
  alert ('updateUser id=' + id);
};

window.deleteUser = function deleteUser (id) {
  alert ('deleteUser id=' + id);
};
/* eslint-enable no-unused-vars */