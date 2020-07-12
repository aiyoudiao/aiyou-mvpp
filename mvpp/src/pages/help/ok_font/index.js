/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-21 17:22:57
 * @LastEditTime: 2020-01-22 10:53:12
 * @LastEditors: ilovejwl
 */
$ (document).ready (function () {
  $ ('.tab-container .content:first').show ();

  $ ('#tabs li').click (function (e) {
    var tabContent = $ ('.tab-container .content');
    var index = $ (this).index ();

    if ($ (this).hasClass ('active')) {

    } else {
      $ ('#tabs li').removeClass ('active');
      $ (this).addClass ('active');

      tabContent.hide ().eq (index).fadeIn ();
    }
  });
});