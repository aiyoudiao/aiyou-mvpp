/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-21 17:07:00
 * @LastEditTime : 2020-01-21 21:07:20
 * @LastEditors  : ilovejwl
 */
layui.config ({
  base: ''
}).extend ({
  authtree: 'authtree'
});

layui.use (['element', 'form', 'jquery'], function () {
//   var element = layui.element;
  var form = layui.form;
  //   var $ = layui.jquery;
  okLoading.close ();
  form.on ('submit(edit)', function (data) {
    console.log (data.field);
    layer.msg ('编辑成功！', { icon: 6, time: 1000, anim: 4 }, function () {
      parent.layer.close (parent.layer.getFrameIndex (window.name));
    });
    return false;
  });
});