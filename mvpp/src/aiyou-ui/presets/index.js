/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-26 12:37:40
 * @LastEditTime : 2020-01-26 13:59:40
 * @LastEditors  : ilovejwl
 */

/* 宿主对象 */
export const HOST = (() => window) ();

/* 异常提示 */
export const error = function (msg) {
  HOST.console && console.error && console.error ('AiYouUI 提示: ' + msg);
};

/* 文档对象 */
export const doc = HOST.document;

/* 配置对象 */
export const config = {
  modules: {} /* 记录模块物理路径 */,
  status: {} /* 记录模块加载状态 */,
  timeout: 10 /* 符合规范的模块请求最长等待秒数 */,
  event: {} /* 记录模块自定义事件 */,
  callback: {} /* 存储模块的回调 */
};

/* 获取当前执行的脚本路径url */
export const getPath = (function () {
  var jsPath = doc.currentScript
    ? doc.currentScript.src
    : (function () {
      var js = doc.scripts;
      var last = js.length - 1;
      var src;
      for (var i = last; i > 0; i--) {
        if (js[i].readyState === 'interactive') {
          src = js[i].src;
          break;
        }
      }
      return src || js[last].src;
    }) ();
  // return jsPath.substring (0, jsPath.lastIndexOf ('/') + 1);
  console.log (jsPath);
  return '/static/lib/layui/';
}) ();

/* eslint-disable no-undef */
/* 是否是欧鹏浏览器 */
export const isOpera =
  typeof opera !== 'undefined' && opera.toString () === '[object Opera]';
/* eslint-enable no-undef */

/* 所有模块的url路径 */
export { modules } from '../aiyou_path';