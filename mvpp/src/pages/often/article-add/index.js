/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-21 17:22:57
 * @LastEditTime: 2020-01-22 11:11:35
 * @LastEditors: ilovejwl
 */
layui.use (['form', 'okUtils', 'okLayer'], function () {
  const form = layui.form;
  const okUtils = layui.okUtils;
  const okLayer = layui.okLayer;
  okLoading.close ();
  form.on ('submit(addArticle)', function (data) {
    okUtils
      .ajax ('/article/addArticle', 'post', data.field, true)
      .done (function (response) {
        okLayer.greenTickMsg (response.msg, function () {
          parent.layer.close (parent.layer.getFrameIndex (window.name));
        });
      })
      .fail (function (error) {
        console.log (error);
      });
    return false;
  });
});