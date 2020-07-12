/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-26 12:25:28
 * @LastEditTime : 2020-01-26 16:05:35
 * @LastEditors  : ilovejwl
 */

/*!

   @Title: layui
   @Description：经典模块化前端 UI 框架
   @Site: www.layui.com
   @Author: 贤心
   @License：MIT

   */
import { aiyouUI, AiYouUI } from './aiyou-ui';

(function (win) {
  'use strict';
  if (aiyouUI) {
    win.layui = aiyouUI;
  } else {
    win.layui = new AiYouUI ();
  }
}) (window);