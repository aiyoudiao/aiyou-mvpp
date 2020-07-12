/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-21 17:07:00
 * @LastEditTime : 2020-01-21 20:58:40
 * @LastEditors  : ilovejwl
 */
layui
  .config ({
    base: 'lib/layui/lay/modules/authtree/'
  })
  .extend ({
    authtree: 'authtree'
  });

layui.use (['element', 'jquery', 'form'], function () {
  //   var element = layui.element;
  //   var $ = layui.jquery;
  var form = layui.form;
  okLoading.close ();
  form.on ('submit(auth)', function (data) {
    console.log (data.field);
    layer.msg ('授权成功！', { icon: 6, time: 1000, anim: 4 }, function () {
      parent.layer.close (parent.layer.getFrameIndex (window.name));
    });
    return false;
  });
});