/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-21 17:22:57
 * @LastEditTime : 2020-01-22 15:32:44
 * @LastEditors  : ilovejwl
 */
import './index.css';
layui.use (['code', 'jquery', 'okCountUp'], function () {
  var $ = layui.jquery; var CountUp = layui.okCountUp; var code = layui.code;
  code ({
    elem: 'pre'
  });
  new CountUp ({
    target: $ ('#countUp1'),
    endVal: 1000
  }).start ();
  new CountUp ({
    target: $ ('#countUp2'),
    duration: 5, // 动画的持续时间为5秒默认为2秒
    endVal: 2000
  }).start ();
  new CountUp ({
    target: $ ('#countUp3'),
    decimals: 2, // 小数位数
    endVal: 3000
  }).start ();
  new CountUp ({
    target: $ ('#countUp4'),
    duration: 8,
    decimals: 2,
    endVal: Math.random () * 1900 + 100
  }).start ();
});