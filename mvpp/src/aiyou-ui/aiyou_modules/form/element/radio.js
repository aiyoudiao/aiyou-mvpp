        //单选框
        radio: function () {
            var CLASS = 'layui-form-radio',
              ICON = ['&#xe643;', '&#xe63f;'],
              radios = elemForm.find ('input[type=radio]'),
              events = function (reElem) {
                var radio = $ (this), ANIM = 'layui-anim-scaleSpring';
      
                reElem.on ('click', function () {
                  var name = radio[0].name, forms = radio.parents (ELEM);
                  var filter = radio.attr ('lay-filter'); //获取过滤器
                  var sameRadio = forms.find (
                    'input[name=' + name.replace (/(\.|#|\[|\])/g, '\\$1') + ']'
                  ); //找到相同name的兄弟
      
                  if (radio[0].disabled) return;
      
                  layui.each (sameRadio, function () {
                    var next = $ (this).next ('.' + CLASS);
                    this.checked = false;
                    next.removeClass (CLASS + 'ed');
                    next.find ('.layui-icon').removeClass (ANIM).html (ICON[1]);
                  });
      
                  radio[0].checked = true;
                  reElem.addClass (CLASS + 'ed');
                  reElem.find ('.layui-icon').addClass (ANIM).html (ICON[0]);
      
                  layui.event.call (radio[0], MOD_NAME, 'radio(' + filter + ')', {
                    elem: radio[0],
                    value: radio[0].value,
                    othis: reElem,
                  });
                });
              };
      
            radios.each (function (index, radio) {
              var othis = $ (this),
                hasRender = othis.next ('.' + CLASS),
                disabled = this.disabled;
      
              if (typeof othis.attr ('lay-ignore') === 'string')
                return othis.show ();
              hasRender[0] && hasRender.remove (); //如果已经渲染，则Rerender
      
              //替代元素
              var reElem = $ (
                [
                  '<div class="layui-unselect ' + CLASS,
                  radio.checked ? ' ' + CLASS + 'ed' : '', //选中状态
                  (disabled ? ' layui-radio-disbaled ' + DISABLED : '') + '">', //禁用状态
                  '<i class="layui-anim layui-icon">' +
                    ICON[radio.checked ? 0 : 1] +
                    '</i>',
                  '<div>' +
                    (function () {
                      var title = radio.title || '';
                      if (typeof othis.next ().attr ('lay-radio') === 'string') {
                        title = othis.next ().html ();
                        othis.next ().remove ();
                      }
                      return title;
                    }) () +
                    '</div>',
                  '</div>',
                ].join ('')
              );
      
              othis.after (reElem);
              events.call (this, reElem);
            });
          },