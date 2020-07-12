/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-21 17:07:00
 * @LastEditTime: 2020-01-21 20:43:46
 * @LastEditors: ilovejwl
 */
let initData;

// function initForm (data) {
//   const jsonString = JSON.stringify (data);
//   initData = JSON.parse (jsonString);
// }

layui.use (['element', 'form', 'laydate', 'okLayer', 'okUtils'], function () {
  const form = layui.form;
  const laydate = layui.laydate;
  const okLayer = layui.okLayer;
  const okUtils = layui.okUtils;
  okLoading.close ();
  form.val ('filter', initData);

  laydate.render ({ elem: '#birthday', type: 'datetime' });

  form.verify ({
    birthdayVerify: [/^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))(\s(([01]\d{1})|(2[0123])):([0-5]\d):([0-5]\d))?$/, '日期格式不正确']
  });

  form.on ('submit(edit)', function (data) {
    okUtils.ajax ('/user/updateUser', 'put', data.field, true).done (function (response) {
      console.log (response);
      okLayer.greenTickMsg ('编辑成功', function () {
        parent.layer.close (parent.layer.getFrameIndex (window.name));
      });
    }).fail (function (error) {
      console.log (error);
    });
    return false;
  });
});