/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-21 17:22:57
 * @LastEditTime : 2020-01-22 09:51:26
 * @LastEditors  : ilovejwl
 */
import './index.css';

function getUrlParam (name) {
  var reg = new RegExp ('(^|&)' + name + '=([^&]*)(&|$)'); // 构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr (1).match (reg); // 匹配目标参数
  if (r != null) return unescape (r[2]);
  return null; // 返回参数值
}

layui.use (['element', 'table', 'form', 'jquery', 'okTab', 'laydate', 'code'], function () {
  var $ = layui.jquery;
  //   var p_layer = parent.layer || layer;
  var okTab = layui.okTab ();// 获取父级的oktab
  var code = layui.code;
  code ({
    elem: 'pre'
  });

  $ ('#addNav1').click (function () {
    // 方式一（推荐）
    var url = 'pages/user/user.html';
    var page = '<div lay-id="add-1" data-url="' + url + '"><cite>个人中心</cite></div>';
    okTab.tabAdd (page);
  });

  $ ('#addNav2').click (function () {
    // 方式二(获取父级对象进行添加)
    var pLayui = parent.layui;// 获取父级的layui
    var pOkTab = pLayui.okTab ();// 拿到导航操作对象
    var url = 'pages/user/user.html';
    var page = '<a lay-id="u-1" href="javascript:;" data-url="' + url + '"><cite>个人中心</cite><span class="layui-badge-dot"></span></a>';
    pOkTab.tabAdd (page);
  });

  $ ('#addNav3,#addNav4').click (function () {
    okTab.tabAdd (this);
  });

  $ ('button.param').click (function () {
    var url = $ (this).attr ('data-url');
    var page = '<div lay-id="param" data-url="' + url + '"><cite>选项卡传参</cite></div>';
    okTab.tabAdd (page);
  });
  $ ('button.param2').click (function () {
    var url = '/pages/help/navOperate.html?param=c';
    var page = '<div lay-id="param2" is-close="false" data-url="' + url + '">不会被关闭</div>';
    okTab.tabAdd (page);
  });

  var getParam = getUrlParam ('param');
  if (getParam) {
    layer.msg ('参数为' + getParam);
  }
});