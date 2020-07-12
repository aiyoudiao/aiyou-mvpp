/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-21 17:22:57
 * @LastEditTime : 2020-01-22 14:45:34
 * @LastEditors  : ilovejwl
 */
layui.use (['element', 'form'], function () {
  const $ = layui.jquery;
  const content = 'aa|bb|cc|dd';
  $ ('textarea[name=\'content\']').val (content);
});