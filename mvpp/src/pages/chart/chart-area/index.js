import './index.css';

// function clone (origin) {
//   return JSON.parse (JSON.stringify (origin));
// }

okLoading.close ();
layui
  .config ({
    base: '/static/js/'
  })
  .use (['okUtils', 'chartArea'], function () {
    const $ = layui.jquery;
    const chartArea = layui.chartArea;
    const okUtils = layui.okUtils;

    const optionA = chartArea.option_a;
    const optionB = chartArea.option_b;
    const optionC = chartArea.option_c;
    const optionD = chartArea.option_d;

    const chinaA = echarts.init ($ ('#china_a')[0]);
    const chinaB = echarts.init ($ ('#china_b')[0]);
    const chinaC = echarts.init ($ ('#china_c')[0]);
    const chinaD = echarts.init ($ ('#china_d')[0]);
    chinaA.setOption (optionA);
    chinaB.setOption (optionB);
    chinaC.setOption (optionC);
    chinaD.setOption (optionD);
    okUtils.echartsResize ([chinaA, chinaB, chinaC, chinaD]);
  });