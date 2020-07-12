/*=============================================
=            Section comment 引入加载器常用对象            =
=============================================*/

var loaderUtils = require('loader-utils');

var strRepeat = function (str, times) {
    var result = '';

    for (var i = 0; i < times; i++) {
        result += str;
    }

    return result;
};


var objExtend = function (args, obj) {
    args = Array.prototype.slice.call(args);

    var _a = args.slice(1);
    console.log(
        '================================obj 测试 start ====================================='
    );

    console.log('obj:', obj);
    console.log('\r\n');
    console.log('args:', args);

    _a.unshift(Object.assign(obj, args[0]));

    console.log(
        '================================obj 测试 end ====================================='
    );
    return _a;
};

/*=====  End of Section comment 引入加载器常用对象  ======*/

// 在宏命令中引入路由模块
// const { admin } = require('./router')
// const router = require ('./router');
// console.log("路由引入的是：", adminRouter)

const baseUrl = process.env.baseUrlPrefix || '/pages';

module.exports = {
    require2: function (resourcePath, args) {
        var argsExpr = args
            ? '(' + objExtend + ')' + '(arguments, ' + JSON.stringify(args) + ')'
            : 'arguments';
        return (
            'require(' +
            JSON.stringify(loaderUtils.urlToRequest(resourcePath)) +
            ').apply(null,' +
            argsExpr +
            ')'
        );
    },
    
    // 获取页面中所有的静态资源路径
    request: function (url, params) {
        // url = requestFilter (url);
        return getString(url);
    },

    // 纯字符串页面url
    // 获取所有的页面跳转路径
    redirect: function (url, params) {
        // url = redirectFilter (url);
        return getString(url);
    },

    // 根据页面的路由来跳转到合适的页面
    // router: function (route) {
    //   let routeArr = route.split ('/');
    //   let result = null;

    //   if (routeArr) {
    //     result = getRouteResult (router, routeArr, 0);
    //   }
    //   result = roterFilter (result);
    //   return getString (result);
    // },
};

// 获取页面中可以使用的字符串
function getString(params) {
    return "'" + params + "'";
}

// 过滤静态资源的请求url
function requestFilter(url) {
    return baseUrl + url;
}

// 过滤页面的请求url
function redirectFilter(url) {
    return baseUrl + url;
}

// 过滤roter的请求url
function roterFilter(url) {
    return url;
}

// 递归获取路由中的数据
function getRouteResult(target, routeArr, step) {
    // 递归结束条件
    if (typeof target === 'string') {
        return target;
    }

    // 获取key
    const key = routeArr[step];

    // 改变对象指针
    target = target[key];

    // 递归未获取到最终结果，就一直递归下去
    return getRouteResult(target, routeArr, step + 1);
}
