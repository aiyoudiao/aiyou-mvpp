/*
 * @Descripttion: 预置的一些参数
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-26 14:50:41
 * @LastEditTime : 2020-01-27 13:33:25
 * @LastEditors  : ilovejwl
 */
import {aiyou_ui as layui} from '../../aiyou-ui';

export const MOD_NAME = 'form';
export const ELEM = '.layui-form';
export const THIS = 'layui-this';

export const SHOW = 'layui-show';
export const HIDE = 'layui-hide';
export const DISABLED = 'layui-disabled';

export const  TIPS = '请选择';
export const  CLASS = 'layui-form-select';
export const  TITLE = 'layui-select-title';
export const  NONE = 'layui-select-none';

export const $ = layui.$;
export const layer = layui.layer;
export const hint = layui.hint ();
export const device = layui.device ();

export const config = {
  verify: {
    required: [/[\S]+/, '必填项不能为空'],
    phone: [/^1\d{10}$/, '请输入正确的手机号'],
    email: [
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
      '邮箱格式不正确',
    ],
    url: [/(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/, '链接格式不正确'],
    number: function (value) {
      if (!value || isNaN (value)) return '只能填写数字';
    },
    date: [
      /^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/,
      '日期格式不正确',
    ],
    identity: [/(^\d{15}$)|(^\d{17}(x|X|\d)$)/, '请输入正确的身份证号'],
  },
};
