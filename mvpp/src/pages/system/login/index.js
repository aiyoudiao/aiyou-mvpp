/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2019-12-21 11:01:08
 * @LastEditTime : 2020-01-26 13:07:54
 * @LastEditors  : ilovejwl
 */
import '../../../../src/aiyou-ui/index';
class BaseLogin {
  constructor () {
    this.layuiFacade = layui || {};
  }
}

class Login extends BaseLogin {
  constructor () {
    super ();
    this.initAll ();
  }

  initAll () {
    this.initData ();
    this.initEvent ();
    this.initAction ();
    this.initBusinessLogic (() => {
      this.initBusinessLogicActions ();
      this.initBusinessLogicEvents ();
    });
  }

  initData () {}
  initEvent () {}
  initAction () {}

  initBusinessLogic (businessLogic) {
    this.layuiFacade.use (
      ['form', 'okGVerify', 'okUtils', 'okLayer'],
      businessLogic
    );
  }

  initBusinessLogicActions () {
    /* NOTE */
    // with (this) {
    //     console.log("form", form);
    //     console.log('location', location)
    // }
    // console.log('this.form', this.form);
    const layuiFacade = this.layuiFacade;

    const form = layuiFacade.form;
    // const $ = layuiFacade.jquery;
    const OkGVerify = layuiFacade.okGVerify;
    const okUtils = layuiFacade.okUtils;
    const okLayer = layuiFacade.okLayer;

    /**
                 * 初始化验证码
                 */
    const verifyCode = new OkGVerify ('#captchaImg');

    /**
                 * 数据校验
                 */
    form.verify ({
      password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
      captcha: function (val) {
        if (verifyCode.validate (val) !== 'true') {
          return verifyCode.validate (val);
        }
      }
    });

    /**
                 * 表单提交
                 */
    form.on ('submit(login)', function (data) {
      okUtils
        .ajax ('/login', 'post', data.field, true)
        .done (function (response) {
          okLayer.greenTickMsg (response.msg, function () {
            window.location = '/static/index.html';
          });
        })
        .fail (function (error) {
          console.log (error);
        });
      return false;
    });
  }

  initBusinessLogicEvents () {
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
  }
}

$ (function () {
  new Login ();
});