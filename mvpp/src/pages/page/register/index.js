/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-18 18:24:58
 * @LastEditTime: 2020-01-21 15:29:58
 * @LastEditors: ilovejwl
 */
import './index.css';

layui.use (['form', 'okGVerify', 'okLayer'], function () {
  const form = layui.form;
  const $ = layui.jquery;
  // const okGVerify = layui.okGVerify;
  const okLayer = layui.okLayer;
  const regPhone = /^[1][0-9]{10}$/;
  /** 手机号验证**/
  let setInter = '';
  /** 定时器对象 */
  let second = 60; // 设置时间
  /**
             * 初始化验证码
             */
  // let verifyCode = new okGVerify("#captchaImg");

  /**
             * 数据校验
             */
  form.verify ({
    password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    phone: [regPhone, '输入的手机号格式不正确，请重新输入'],
    comPassword: function (val) {
      const password = $ ('#password').val ();
      return password === val ? '' : '两次密码不一致';
    }
  });

  /**
             * 表单提交
             */
  form.on ('submit(login)', function (data) {
    okLayer.greenTickMsg ('注册成功,去登陆', function () {
      window.location = './login.html';
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

  /** 获取验证码**/
  $ ('.btn-auth-code').click (function () {
    const that = $ (this);
    const phone = $ ('#phone').val ();
    if ($ (this).hasClass ('layui-btn-disabled')) {
      return;
    }
    if (regPhone.test (phone)) {
      if (!setInter) {
        clearInterval (setInter);
        that.addClass ('layui-btn-disabled');
        that.text (second + '秒后获取');
        setInter = setInterval (function () {
          second--;
          if (second < 1) {
            clearInterval (setInter);
            that.removeClass ('layui-btn-disabled');
            that.text ('重新获取');
            setInter = '';
            second = 60;
          } else {
            that.text (second + '秒后获取');
          }
        }, 1000);
      }
    } else {
      layer.msg ('输入的手机号格式不正确，请重新输入', {
        icon: '5',
        anim: '6'
      });
      $ ('#phone').focus ();
    }
  });
});