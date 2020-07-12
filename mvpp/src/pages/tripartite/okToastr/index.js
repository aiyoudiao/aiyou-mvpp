/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-21 17:22:58
 * @LastEditTime: 2020-01-22 17:19:36
 * @LastEditors: ilovejwl
 */
layui.use (['code', 'okToastr'], function () {
  const code = layui.code;
  const okToastr = layui.okToastr;
  const $ = layui.jquery;

  code ({
    elem: 'pre',
    title: '代码示例'
  });

  // 是否显示关闭按钮
  okToastr.options.closeButton = true;
  // 回调函数
  okToastr.options.onShown = function () {
    console.log ('hello');
  };
  okToastr.options.onHidden = function () {
    console.log ('goodbye');
  };
  okToastr.options.onclick = function () {
    console.log ('clicked');
  };
  okToastr.options.onCloseClick = function () {
    console.log ('close button clicked');
  };

  $ ('#info').click (function () {
    okToastr.info ('aiyou-admin');
  });

  $ ('#success').click (function () {
    okToastr.success ('aiyou-admin');
  });

  $ ('#warning').click (function () {
    okToastr.warning ('aiyou-admin');
  });

  $ ('#error').click (function () {
    okToastr.error ('aiyou-admin');
  });

  $ ('#remove').click (function () {
    okToastr.remove ();
  });

  $ ('#clear').click (function () {
    okToastr.clear ();
  });
});