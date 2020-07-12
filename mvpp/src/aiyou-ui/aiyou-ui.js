/*
 * @Descripttion: aiyou-ui 核心模块
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-26 12:31:54
 * @LastEditTime : 2020-01-26 16:06:48
 * @LastEditors  : ilovejwl
 */

import { HOST, error, doc, config, getPath, isOpera, modules } from './presets';
class Layui {
  constructor () {
    this.v = '2.5.5'; // 版本号
    this.cache = config;
    this.modules = (function () {
      var clone = {};
      for (var o in modules) {
        clone[o] = modules[o];
      }
      return clone;
    }) ();
  }

  define (deps, factory) {
    var that = this;
    var type = typeof deps === 'function';
    var callback = function () {
      var setApp = function (app, exports) {
        layui[app] = exports;
        config.status[app] = true;
      };
      typeof factory === 'function' &&
        factory (function (app, exports) {
          setApp (app, exports);
          config.callback[app] = function () {
            factory (setApp);
          };
        });
      return this;
    };

    // type && ((factory = deps), (deps = []));
    if (type) {
      factory = deps;
      deps = [];
    }

    if (!layui['layui.all'] && layui['layui.mobile']) {
      return callback.call (that);
    }

    that.use (deps, callback);
    return that;
  }

  use (apps, callback, exports) {
    var that = this;
    var dir = (config.dir = config.dir ? config.dir : getPath);
    var head = doc.getElementsByTagName ('head')[0];

    apps = typeof apps === 'string' ? [apps] : apps;

    /* eslint-disable no-undef */
    // 如果页面已经存在jQuery1.7+库且所定义的模块依赖jQuery，则不加载内部jquery模块
    if (window.jQuery && jQuery.fn.on) {
      that.each (apps, function (index, item) {
        if (item === 'jquery') {
          apps.splice (index, 1);
        }
      });
      layui.jquery = layui.$ = jQuery;
    }
    /* eslint-enable no-undef */

    var item = apps[0];
    var timeout = 0;
    exports = exports || [];

    // 静态资源host
    config.host =
      config.host ||
      (dir.match (/\/\/([\s\S]+?)\//) || ['//' + location.host + '/'])[0];

    // 加载完毕
    function onScriptLoad (e, url) {
      var readyRegExp = navigator.platform === 'PLaySTATION 3'
        ? /^complete$/
        : /^(complete|loaded)$/;
      if (
        e.type === 'load' ||
        readyRegExp.test ((e.currentTarget || e.srcElement).readyState)
      ) {
        config.modules[item] = url;
        head.removeChild (node);
        (function poll () {
          if (++timeout > config.timeout * 1000 / 4) {
            return error (item + ' is not a valid module');
          }
          config.status[item] ? onCallback () : setTimeout (poll, 4);
        }) ();
      }
    }

    // 回调
    function onCallback () {
      exports.push (layui[item]);
      apps.length > 1
        ? that.use (apps.slice (1), callback, exports)
        : typeof callback === 'function' && callback.apply (layui, exports);
    }

    // 如果引入了完整库（layui.all.js），内置的模块则不必再加载
    if (
      apps.length === 0 ||
      (layui['layui.all'] && modules[item]) ||
      (!layui['layui.all'] && layui['layui.mobile'] && modules[item])
    ) {
      onCallback ();
      return that;
    }

    // 首次加载模块
    if (!config.modules[item]) {
      var node = doc.createElement ('script');
      // 如果是内置模块，则按照 dir 参数拼接模块路径
      // 如果是扩展模块，则判断模块路径值是否为 {/} 开头，
      // 如果路径值是 {/} 开头，则模块路径即为后面紧跟的字符。
      // 否则，则按照 base 参数拼接模块路径
      var url =
        (modules[item]
          ? dir + 'lay/'
          : /^\{\/\}/.test (that.modules[item]) ? '' : config.base || '') +
        (that.modules[item] || item) +
        '.js';

      url = url.replace (/^\{\/\}/, '');

      node.async = true;
      node.charset = 'utf-8';
      node.src =
        url +
        (function () {
          var version = config.version === true
            ? config.v || new Date ().getTime ()
            : config.version || '';
          return version ? '?v=' + version : '';
        }) ();

      head.appendChild (node);

      if (
        node.attachEvent &&
        !(node.attachEvent.toString &&
          node.attachEvent.toString ().indexOf ('[native code') < 0) &&
        !isOpera
      ) {
        node.attachEvent ('onreadystatechange', function (e) {
          onScriptLoad (e, url);
        });
      } else {
        node.addEventListener (
          'load',
          function (e) {
            onScriptLoad (e, url);
          },
          false
        );
      }

      config.modules[item] = url;
    } else {
      // 缓存
      (function poll () {
        if (++timeout > config.timeout * 1000 / 4) {
          return error (item + ' is not a valid module');
        }
        typeof config.modules[item] === 'string' && config.status[item]
          ? onCallback ()
          : setTimeout (poll, 4);
      }) ();
    }

    return that;
  }

  getStyle (node, name) {
    var style = node.currentStyle
      ? node.currentStyle
      : HOST.getComputedStyle (node, null);
    return style[style.getPropertyValue ? 'getPropertyValue' : 'getAttribute'] (
      name
    );
  }

  link (href, fn, cssname) {
    var that = this;
    var link = doc.createElement ('link');
    var head = doc.getElementsByTagName ('head')[0];

    if (typeof fn === 'string') cssname = fn;

    var app = (cssname || href).replace (/\.|\//g, '');
    var id = (link.id = 'layuicss-' + app);
    var timeout = 0;

    link.rel = 'stylesheet';
    link.href = href + (config.debug ? '?v=' + new Date ().getTime () : '');
    link.media = 'all';

    if (!doc.getElementById (id)) {
      head.appendChild (link);
    }

    if (typeof fn !== 'function') return that;

    // 轮询css是否加载完毕
    (function poll () {
      if (++timeout > config.timeout * 1000 / 100) {
        return error (href + ' timeout');
      }
      parseInt (that.getStyle (doc.getElementById (id), 'width')) === 1989
        ? (function () {
          fn ();
        }) ()
        : setTimeout (poll, 100);
    }) ();

    return that;
  }

  factory (modName) {
    if (layui[modName]) {
      return typeof config.callback[modName] === 'function'
        ? config.callback[modName]
        : null;
    }
  }

  addcss (firename, fn, cssname) {
    return layui.link (config.dir + 'css/' + firename, fn, cssname);
  }

  img (url, callback, error) {
    var img = new Image ();
    img.src = url;
    if (img.complete) {
      return callback (img);
    }
    img.onload = function () {
      img.onload = null;
      typeof callback === 'function' && callback (img);
    };
    img.onerror = function (e) {
      img.onerror = null;
      typeof error === 'function' && error (e);
    };
  }

  config (options) {
    options = options || {};
    for (var key in options) {
      config[key] = options[key];
    }
    return this;
  }

  extend (options) {
    var that = this;

    // 验证模块是否被占用
    options = options || {};
    for (var o in options) {
      if (that[o] || that.modules[o]) {
        error ('\u6A21\u5757\u540D ' + o + ' \u5DF2\u88AB\u5360\u7528');
      } else {
        that.modules[o] = options[o];
      }
    }

    return that;
  }

  router (hash) {
    var that = this;
    hash = hash || location.hash;
    var data = {
      path: [],
      search: {},
      hash: (hash.match (/[^#](#.*$)/) || [])[1] || ''
    };

    if (!/^#\//.test (hash)) return data; // 禁止非路由规范
    hash = hash.replace (/^#\//, '');
    data.href = '/' + hash;
    hash = hash.replace (/([^#])(#.*$)/, '$1').split ('/') || [];

    // 提取Hash结构
    that.each (hash, function (index, item) {
      /^\w+=/.test (item)
        ? (function () {
          item = item.split ('=');
          data.search[item[0]] = item[1];
        }) ()
        : data.path.push (item);
    });

    return data;
  }

  data (table, settings, storage) {
    table = table || 'layui';
    storage = storage || localStorage;

    if (!HOST.JSON || !HOST.JSON.parse) return;

    // 如果settings为null，则删除表
    if (settings === null) {
      return delete storage[table];
    }

    settings = typeof settings === 'object' ? settings : { key: settings };
    let data = null;
    try {
      data = JSON.parse (storage[table]);
    } catch (e) {
      data = {};
    }

    if ('value' in settings) data[settings.key] = settings.value;
    if (settings.remove) delete data[settings.key];
    storage[table] = JSON.stringify (data);

    return settings.key ? data[settings.key] : data;
  }

  sessionData (table, settings) {
    return this.data (table, settings, sessionStorage);
  }

  device (key) {
    var agent = navigator.userAgent.toLowerCase ();
    // 获取版本号
    var getVersion = function (label) {
      var exp = new RegExp (label + '/([^\\s\\_\\-]+)');
      label = (agent.match (exp) || [])[1];
      return label || false;
    };
    // 返回结果集
    var result = {
      os: (function () {
        // 底层操作系统
        if (/windows/.test (agent)) {
          return 'windows';
        } else if (/linux/.test (agent)) {
          return 'linux';
        } else if (/iphone|ipod|ipad|ios/.test (agent)) {
          return 'ios';
        } else if (/mac/.test (agent)) {
          return 'mac';
        }
      }) (),
      ie: (function () {
        // ie版本
        return !!HOST.ActiveXObject || 'ActiveXObject' in HOST
          ? (agent.match (/msie\s(\d+)/) || [])[1] || '11' // 由于ie11并没有msie的标识
          : false;
      }) (),
      weixin: getVersion ('micromessenger') // 是否微信
    };

    // 任意的key
    if (key && !result[key]) {
      result[key] = getVersion (key);
    }

    // 移动设备
    result.android = /android/.test (agent);
    result.ios = result.os === 'ios';

    return result;
  }

  hint () {
    return {
      error: error
    };
  }

  each (obj, fn) {
    var key;
    var that = this;
    if (typeof fn !== 'function') return that;
    obj = obj || [];
    if (obj.constructor === Object) {
      for (key in obj) {
        if (fn.call (obj[key], key, obj[key])) break;
      }
    } else {
      for (key = 0; key < obj.length; key++) {
        if (fn.call (obj[key], key, obj[key])) break;
      }
    }
    return that;
  }

  sort (obj, key, desc) {
    var clone = JSON.parse (JSON.stringify (obj || []));

    if (!key) return clone;

    // 如果是数字，按大小排序，如果是非数字，按字典序排序
    clone.sort (function (o1, o2) {
      var isNum = /^-?\d+$/;
      var v1 = o1[key];
      var v2 = o2[key];

      if (isNum.test (v1)) v1 = parseFloat (v1);
      if (isNum.test (v2)) v2 = parseFloat (v2);

      if (v1 && !v2) {
        return 1;
      } else if (!v1 && v2) {
        return -1;
      }

      if (v1 > v2) {
        return 1;
      } else if (v1 < v2) {
        return -1;
      } else {
        return 0;
      }
    });

    desc && clone.reverse (); // 倒序
    return clone;
  }

  stope (thisEvent) {
    thisEvent = thisEvent || HOST.event;
    try {
      thisEvent.stopPropagation ();
    } catch (e) {
      thisEvent.cancelBubble = true;
    }
  }

  onevent (modName, events, callback) {
    if (typeof modName !== 'string' || typeof callback !== 'function') {
      return this;
    }

    return Layui.event (modName, events, null, callback);
  }

  event (modName, events, params, fn) {
    var that = this;
    var result = null;
    var filter = events.match (/\((.*)\)$/) || []; // 提取事件过滤器字符结构，如：select(xxx)
    var eventName = (modName + '.' + events).replace (filter[0], ''); // 获取事件名称，如：form.select
    var filterName = filter[1] || ''; // 获取过滤器名称,，如：xxx
    var callback = function (_, item) {
      var res = item && item.call (that, params);
      res === false && result === null && (result = false);
    };

    // 添加事件
    if (fn) {
      config.event[eventName] = config.event[eventName] || {};

      // 这里不再对多次事件监听做支持，避免更多麻烦
      // config.event[eventName][filterName] ? config.event[eventName][filterName].push(fn) :
      config.event[eventName][filterName] = [fn];
      return this;
    }

    // 执行事件回调
    layui.each (config.event[eventName], function (key, item) {
      // 执行当前模块的全部事件
      if (filterName === '{*}') {
        layui.each (item, callback);
        return;
      }

      // 执行指定事件
      key === '' && layui.each (item, callback);
      filterName && key === filterName && layui.each (item, callback);
    });

    return result;
  }

  static event (modName, events, params, fn) {
    var that = this;
    var result = null;
    var filter = events.match (/\((.*)\)$/) || []; // 提取事件过滤器字符结构，如：select(xxx)
    var eventName = (modName + '.' + events).replace (filter[0], ''); // 获取事件名称，如：form.select
    var filterName = filter[1] || ''; // 获取过滤器名称,，如：xxx
    var callback = function (_, item) {
      var res = item && item.call (that, params);
      res === false && result === null && (result = false);
    };

    // 添加事件
    if (fn) {
      config.event[eventName] = config.event[eventName] || {};

      // 这里不再对多次事件监听做支持，避免更多麻烦
      // config.event[eventName][filterName] ? config.event[eventName][filterName].push(fn) :
      config.event[eventName][filterName] = [fn];
      return this;
    }

    // 执行事件回调
    layui.each (config.event[eventName], function (key, item) {
      // 执行当前模块的全部事件
      if (filterName === '{*}') {
        layui.each (item, callback);
        return;
      }

      // 执行指定事件
      key === '' && layui.each (item, callback);
      filterName && key === filterName && layui.each (item, callback);
    });

    return result;
  }
}
export const AiYouUI = Layui;
export const aiyouUI = new AiYouUI ();