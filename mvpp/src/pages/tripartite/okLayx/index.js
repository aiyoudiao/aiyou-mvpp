/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-21 17:22:58
 * @LastEditTime : 2020-01-22 15:49:07
 * @LastEditors  : ilovejwl
 */
layui.use (['code', 'okLayx'], function () {
//   const code = layui.code;
  const okLayx = layui.okLayx;
  const $ = layui.jquery;

  $ ('#notice').click (function () {
    okLayx.notice ({
      title: '消息提示',
      message: '我是消息提示消息提示消息提示消息提示'
    });
  });

  $ ('#notice2').click (function () {
    okLayx.notice ({
      title: '成功提示',
      type: 'success',
      message: '我是消息提示消息提示消息提示消息提示'
    });
  });

  $ ('#notice3').click (function () {
    okLayx.notice ({
      title: '警告提示',
      type: 'warning',
      message: '我是消息提示消息提示消息提示消息提示'
    });
  });

  $ ('#notice4').click (function () {
    okLayx.notice ({
      title: '错误提示',
      type: 'error',
      message: '我是消息提示消息提示消息提示消息提示'
    });
  });
});