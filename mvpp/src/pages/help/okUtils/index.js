/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-21 17:22:57
 * @LastEditTime: 2020-01-22 10:59:15
 * @LastEditors: ilovejwl
 */
import './index.css';

layui.use (['util', 'code'], function () {
  const util = layui.util;
  const code = layui.code;

  util.fixbar ({});

  code ({
    elem: 'pre',
    title: '代码示例'
  });
});