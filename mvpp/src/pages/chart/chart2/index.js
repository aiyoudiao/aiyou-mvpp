/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-21 17:22:57
 * @LastEditTime : 2020-01-21 22:16:30
 * @LastEditors  : ilovejwl
 */
okLoading.close ();
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init (document.getElementById ('main'));

// 指定图表的配置项和数据
var option = {
  title: {
    text: '折线图'
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line'
    }
  ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption (option);
window.addEventListener ('resize', function () {
  myChart.resize ();
});