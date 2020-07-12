/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-21 17:22:58
 * @LastEditTime: 2020-01-22 16:05:46
 * @LastEditors: ilovejwl
 */
layui.use (['layedit'], function () {
  const $ = layui.jquery;
  const layedit = layui.layedit;

  const index = layedit.build ('editor');

  $ ('#contentBtn').click (function () {
    alert (layedit.getContent (index));
  });

  $ ('#textBtn').click (function () {
    alert (layedit.getText (index));
  });

  $ ('#selectionBtn').click (function () {
    alert (layedit.getSelection (index));
  });
});