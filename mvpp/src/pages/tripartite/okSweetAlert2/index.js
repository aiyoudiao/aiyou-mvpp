/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-21 17:22:58
 * @LastEditTime : 2020-01-22 17:19:13
 * @LastEditors  : ilovejwl
 */
layui.use (['util', 'code', 'okSweetAlert2'], function () {
  const util = layui.util;
  const code = layui.code;
  const okSweetAlert2 = layui.okSweetAlert2;
  const $ = layui.jquery;

  util.fixbar ({});

  code ({
    elem: 'pre',
    title: '代码示例'
  });

  $ ('#btn1').click (function () {
    okSweetAlert2.fire ('欢迎使用aiyou-admin');
  });

  $ ('#btn2').click (function () {
    okSweetAlert2.fire ('关于aiyou-admin的问题', '你觉得aiyou-admin好用吗？', 'question');
  });

  $ ('#btn3').click (function () {
    okSweetAlert2.fire ({
      type: 'error',
      title: '糟糕',
      text: '服务器好像开小差了！',
      footer: '<a href=\'javascript:;\' target=\'_blank\'>为什么会有这个问题？</a>'
    });
  });

  $ ('#btn4').click (function () {
    okSweetAlert2.fire ({
      type: 'info',
      title: '<strong>HTML <u>example</u></strong>',
      html: 'You can use <b>bold text</b>, <a href=\'javascript:;\' target=\'_blank\'>links</a> and other HTML tags',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<span class=\'ok-icon\'>&#xe644;</span> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<span class=\'ok-icon\'>&#xe64a;</span>',
      cancelButtonAriaLabel: 'Thumbs down'
    });
  });

  $ ('#btn5').click (function () {
    okSweetAlert2
      .fire ({
        type: 'warning',
        title: '你确定要这样操作吗？',
        text: '此操作您将无法还原！',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
      .then (result => {
        if (result.value) {
          okSweetAlert2.fire ('删除成功', '您已经将该记录删除成功！', 'success');
        }
      });
  });
});