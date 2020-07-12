var CLASS = {
  checkbox: ['layui-form-checkbox', 'layui-form-checked', 'checkbox'],
  _switch: ['layui-form-switch', 'layui-form-onswitch', 'switch'],
};

function events (reElem, RE_CLASS) {
  var check = $ (this);

  //勾选
  reElem.on ('click', function () {
    var filter = check.attr ('lay-filter'), //获取过滤器
      text = (check.attr ('lay-text') || '').split ('|');

    if (check[0].disabled) return;

    check[0].checked
      ? ((check[0].checked = false), reElem
          .removeClass (RE_CLASS[1])
          .find ('em')
          .text (text[1]))
      : ((check[0].checked = true), reElem
          .addClass (RE_CLASS[1])
          .find ('em')
          .text (text[0]));

    layui.event.call (check[0], MOD_NAME, RE_CLASS[2] + '(' + filter + ')', {
      elem: check[0],
      value: check[0].value,
      othis: reElem,
    });
  });
}

//复选框/开关
export function checkbox () {
  checks = elemForm.find ('input[type=checkbox]');

  checks.each (function (index, check) {
    var othis = $ (this);
    var skin = othis.attr ('lay-skin');
    var text = othis.attr ('lay-text') || '';
    var text = text.split ('|');
    var disabled = this.disabled;
    if (skin === 'switch') skin = '_' + skin;
    var RE_CLASS = CLASS[skin] || CLASS.checkbox;

    if (typeof othis.attr ('lay-ignore') === 'string') return othis.show ();

    //替代元素
    var hasRender = othis.next ('.' + RE_CLASS[0]);
    reElem = $ (
      [
        '<div class="layui-unselect ' + RE_CLASS[0],
        check.checked ? ' ' + RE_CLASS[1] : '', //选中状态
        disabled ? ' layui-checkbox-disbaled ' + DISABLED : '', //禁用状态
        '"',
        skin ? ' lay-skin="' + skin + '"' : '', //风格
        '>',
        (function () {
          //不同风格的内容
          var title = check.title.replace (/\s/g, ''),
            type = {
              //复选框
              checkbox: [
                title ? '<span>' + check.title + '</span>' : '',
                '<i class="layui-icon layui-icon-ok"></i>',
              ].join (''),

              //开关
              _switch: '<em>' +
                ((check.checked ? text[0] : text[1]) || '') +
                '</em><i></i>',
            };
          return type[skin] || type['checkbox'];
        }) (),
        '</div>',
      ].join ('')
    );

    hasRender[0] && hasRender.remove (); //如果已经渲染，则Rerender
    othis.after (reElem);
    events.call (this, reElem, RE_CLASS);
  });
}
