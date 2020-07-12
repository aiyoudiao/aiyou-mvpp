/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-21 17:22:58
 * @LastEditTime: 2020-01-22 15:43:15
 * @LastEditors: ilovejwl
 */
layui.use (['code', 'okBarcode'], function () {
  const code = layui.code;
  const $ = layui.jquery;

  code ({
    elem: 'pre',
    title: '代码示例'
  });

  $ ('#try').click (function () {
    $ ('#barcode').barcode ('153510264086cc8e', 'code128', {
      output: 'css', // 渲染方式 css|bmp|svg|canvas
      // bgColor: "#ff0000", // 条码背景颜色
      // color: "#00ff00",   // 条码颜色
      barWidth: 1, // 单条条码宽度
      barHeight: 30, // 单体条码高度
      // moduleSize: 10,   // 条码大小
      // posX: 10,        // 条码坐标X
      // posY: 5,         // 条码坐标Y
      showHRI: true, // 是否在条码下方显示内容
      addQuietZone: false // 是否添加空白区（内边距）
    });
  });
});