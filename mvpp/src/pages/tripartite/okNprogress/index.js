/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-21 17:22:58
 * @LastEditTime : 2020-01-22 15:53:03
 * @LastEditors  : ilovejwl
 */
layui.use (['code', 'okNprogress'], function () {
  const code = layui.code;
  const okNprogress = layui.okNprogress;
  const $ = layui.jquery;

  code ({
    elem: 'pre',
    title: '代码示例'
  });

  okNprogress.start ();
  if (
    document.readyState === 'complete' ||
    document.readyState === 'interactive'
  ) {
    okNprogress.done ();
  }

  $ ('#start').click (function () {
    okNprogress.start ();
  });

  $ ('#done').click (function () {
    okNprogress.done ();
  });
});