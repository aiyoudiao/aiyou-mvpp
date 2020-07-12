/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-21 17:22:58
 * @LastEditTime : 2020-01-22 17:21:12
 * @LastEditors  : ilovejwl
 */

layui.use (['code', 'jquery', 'okQrcode', 'qrcode'], function () {
  var code = layui.code; var Qrcode = layui.qrcode; var $ = layui.jquery;
  code ({
    elem: 'pre'
  });
  /* eslint-disable no-unused-vars */
  var q = new Qrcode ($ ('#qrcode')[0], {
    width: 200,
    height: 200,
    text: 'aiyou-ui'
  });

  var q1 = $ ('#qrcodeCanvas2').qrcode ({
    render: 'canvas', // 生成的对象元素(canvas,table)
    text: 'aiyou-ui',
    width: '200', // 二维码的宽度
    height: '200', // 二维码的高度
    background: '#ffffff', // 二维码的后景色
    foreground: '#000000', // 二维码的前景色
    logo: '/static/images/logo.png' // 二维码中间的图片
  });

  var q2 = $ ('#qrcodeCanvas3').qrcode ({
    width: '200',
    height: '200',
    text: 'aiyou-ui'
  });
  /* eslint-enable no-unused-vars */
});