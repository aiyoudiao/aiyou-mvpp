/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-21 17:22:57
 * @LastEditTime : 2020-01-22 14:28:25
 * @LastEditors  : ilovejwl
 */
layui.use (['element', 'form', 'okLayer', 'okUtils'], function () {
  const form = layui.form;
  const $ = layui.jquery;
  const okLayer = layui.okLayer;
  const okUtils = layui.okUtils;

  // 单选框控件默认选中
  const storage = window.localStorage;
  const skin = storage.getItem ('skin');
  const anim = storage.getItem ('anim');
  const _skin = okUtils.number.isNumberWith (skin, 1, 4) ? skin : 4;
  $ ('#skin').find ('input').each (function () {
    const val = $ (this).val ();
    if (val === _skin) {
      $ (this).prop ('checked', true);
    }
  });

  const _anim = okUtils.number.isNumberWith (anim, 0, 7) ? anim : 7;
  $ ('#anim').find ('input').each (function () {
    const val = $ (this).val ();
    if (val === _anim) {
      $ (this).prop ('checked', true);
    }
  });

  form.render ();

  form.on ('submit(edit)', function (data) {
    // 持久化skin和anim
    const storage = window.localStorage;
    storage.skin = data.field.skin;
    storage.anim = data.field.anim;
    okLayer.msg.greenTick ('设置成功', function () {
      parent.layer.close (parent.layer.getFrameIndex (window.name));
    });
    return false;
  });
});