/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-18 18:24:58
 * @LastEditTime : 2020-01-21 15:22:10
 * @LastEditors  : ilovejwl
 */
import './index.css';

layui.use (['form', 'okLayer', 'okUtils'], function () {
  const $ = layui.jquery;
  const form = layui.form;
  const okLayer = layui.okLayer;
  const okUtils = layui.okUtils;
  const phoneRegex = /^[1][0-9]{10}$/;
  let timer = '';
  let intervalTime = 60;

  okLoading.close ($);

  /**
             * 数据校验
             */
  form.verify ({
    phone: [phoneRegex, '手机号格式不正确'],
    password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    comPassword: function (val) {
      const password = $ ('#password').val ();
      return password === val ? '' : '两次密码不一致';
    }
  });

  /**
             * 提交表单
             */
  form.on ('submit(verifyUser)', function (data) {
    okUtils
      .ajax ('/verifyUser', 'post', data.field, true)
      .done (function (response) {
        okLayer.greenTickMsg (response.msg, function () {
          // 样式修改
          $ ('.btn-auth-code').removeClass ('layui-btn-disabled');
          $ ('.btn-auth-code').text ('重新获取');
          // 重置定时器
          clearInterval (timer);
          timer = '';
          intervalTime = 60;
          // 显示重置密码表单
          $ ('.verify-user-form, .reset-password-form').toggle ();
        });
      })
      .fail (function (error) {
        console.log (error);
      });
    return false;
  });

  /**
             * 获取验证码
             */
  $ ('.btn-auth-code').click (function () {
    const _this = $ (this);
    if (_this.hasClass ('layui-btn-disabled')) {
      return;
    }
    const phone = $ ('#phone').val ();
    if (phoneRegex.test (phone)) {
      _this.addClass ('layui-btn-disabled');
      _this.text (intervalTime + '秒后获取');
      // 按钮操作定时器
      timer = setInterval (function () {
        intervalTime--;
        if (intervalTime < 1) {
          clearInterval (timer);
          _this.removeClass ('layui-btn-disabled');
          _this.text ('重新获取');
          intervalTime = 60;
        } else {
          _this.text (intervalTime + '秒后获取');
        }
      }, 1000);

      // 发送手机验证码
      okUtils
        .ajax ('/sendCaptcha', 'post', null, true)
        .done (function (response) {
          okLayer.greenTickMsg (response.msg);
        })
        .fail (function (error) {
          console.log (error);
        });
    } else {
      layer.msg ('手机号码格式不正确', { icon: '5', anim: '6' });
      $ ('#phone').focus ();
    }
  });

  /**
             * 重置密码
             */
  form.on ('submit(resetPassword)', function (data) {
    okUtils
      .ajax ('/resetPassword', 'post', data.field, true)
      .done (function (response) {
        okLayer.greenTickMsg (response.msg, function () {
          window.location = 'login.html';
        });
      })
      .fail (function (error) {
        console.log (error);
      });
    return false;
  });

  /**
             * 表单input组件单击时
             */
  $ ('#login .input-item .layui-input').click (function (e) {
    e.stopPropagation ();
    $ (this).addClass ('layui-input-focus').find ('.layui-input').focus ();
  });

  /**
             * 表单input组件获取焦点时
             */
  $ ('#login .layui-form-item .layui-input').focus (function () {
    $ (this).parent ().addClass ('layui-input-focus');
  });

  /**
             * 表单input组件失去焦点时
             */
  $ ('#login .layui-form-item .layui-input').blur (function () {
    $ (this).parent ().removeClass ('layui-input-focus');
    if ($ (this).val () !== '') {
      $ (this).parent ().addClass ('layui-input-active');
    } else {
      $ (this).parent ().removeClass ('layui-input-active');
    }
  });
});