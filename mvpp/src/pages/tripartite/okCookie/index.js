/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-21 17:22:58
 * @LastEditTime: 2020-01-22 15:46:32
 * @LastEditors: ilovejwl
 */
layui.use (['code', 'okCookie'], function () {
  const code = layui.code;
  const $ = layui.jquery;

  code ({
    elem: 'pre',
    title: '代码示例'
  });

  // 创建cookie
  $.cookie ('hello', 'word');

  // 读取cookie
  const hello = $.cookie ('hello');
  console.log (hello);

  // 删除cookie
  $.cookie ('hello', null);
});