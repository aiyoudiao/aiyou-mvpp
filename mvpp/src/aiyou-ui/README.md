<!--
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-26 14:04:51
 * @LastEditTime : 2020-01-26 14:25:47
 * @LastEditors  : ilovejwl
 -->

## aiyou-ui 2020-01-26 22:09

### aiyou-ui 说明
将layui.js进行了模块化的改造，并能够投入正常的使用，保留了原layui的特性，use和define方法未变，目录结构不动。

### 目前只在登录页面进行了使用
1. 登录页面是一个非常简单的页面，在aiyou-ui中能够正常使用，其它只要是注册过的都能够正常使用。
2. 但是所有请求的layui模块的请求根路径写死了，就是`/static/lib/layui/`下面。

### 总结
1. layui.js 重写完毕，变成了aiyou-ui.js，但是其它功能模块，依旧依赖于layui.js的其它功能模块。
