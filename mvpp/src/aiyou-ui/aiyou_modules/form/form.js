import {
  MOD_NAME,
  ELEM,
  THIS,
  SHOW,
  HIDE,
  DISABLED,
  $,
  hint,
  TIPS,
  CLASS,
  TITLE,
  NONE,
} from './preset';
import { getItem } from './form-element';

class Form {
  constructor () {
    this.config = config;
  }

  set (options) {
    let that = this;
    $.extend (true, that.config, options);
    return that;
  }

  verify (settings) {
    let that = this;
    $.extend (true, that.config.verify, settings);
    return that;
  }

  on (events, callback) {
    return layui.onevent.call (this, MOD_NAME, events, callback);
  }

  val (filter, object) {
    let that = this, formElem = $ (ELEM + '[lay-filter="' + filter + '"]');

    //遍历
    formElem.each (function (index, item) {
      var itemForm = $ (this);

      //赋值
      layui.each (object, function (key, value) {
        var itemElem = itemForm.find ('[name="' + key + '"]'), type;

        //如果对应的表单不存在，则不执行
        if (!itemElem[0]) return;
        type = itemElem[0].type;

        //如果为复选框
        if (type === 'checkbox') {
          itemElem[0].checked = value;
        } else if (type === 'radio') {
          //如果为单选框
          itemElem.each (function () {
            if (this.value == value) {
              this.checked = true;
            }
          });
        } else {
          //其它类型的表单
          itemElem.val (value);
        }
      });
    });

    form.render (null, filter);

    //返回值
    return that.getValue (filter);
  }

  getValue (filter, itemForm) {
    itemForm = itemForm || $ (ELEM + '[lay-filter="' + filter + '"]').eq (0);

    var nameIndex = {}, //数组 name 索引
      field = {},
      fieldElem = itemForm.find ('input,select,textarea'); //获取所有表单域

    layui.each (fieldElem, function (_, item) {
      item.name = (item.name || '').replace (/^\s*|\s*&/, '');

      if (!item.name) return;

      //用于支持数组 name
      if (/^.*\[\]$/.test (item.name)) {
        var key = item.name.match (/^(.*)\[\]$/g)[0];
        nameIndex[key] = nameIndex[key] | 0;
        item.name = item.name.replace (
          /^(.*)\[\]$/,
          '$1[' + nameIndex[key]++ + ']'
        );
      }

      if (/^checkbox|radio$/.test (item.type) && !item.checked) return;
      field[item.name] = item.value;
    });

    return field;
  }

  render (type, filter) {
    let that = this;
    const selector = filter ? '[lay-filter="' + filter + '"]' : ''
    let elemForm = $ (ELEM + selector);
    let items = getItem(elemForm);
    type
      ? items[type] ? items[type] () : hint.error ('不支持的' + type + '表单渲染')
      : layui.each (items, function (index, item) {
          item ();
        });
    return that;
  }
}

export const AiYouForm = Form;
export const form = new AiYouForm ();
