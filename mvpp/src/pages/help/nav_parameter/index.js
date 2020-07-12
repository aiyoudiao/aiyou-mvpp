/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-21 17:22:57
 * @LastEditTime : 2020-01-22 10:49:04
 * @LastEditors  : ilovejwl
 */

import './index.css';

layui.use (['code'], function () {
  var code = layui.code;
  code ({
    elem: 'pre'
  });
});