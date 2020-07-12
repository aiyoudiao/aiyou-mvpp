/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-21 17:22:58
 * @LastEditTime : 2020-01-22 17:15:46
 * @LastEditors  : ilovejwl
 */
const E = window.wangEditor;
const editor = new E ('#editor');
editor.create ();
/* eslint-disable no-unused-vars */

function setContent () {
  editor.txt.html ('<p>欢迎使用 <b>aiyou-admin v1.0</b> :) </p>');
}

function appendContent () {
  editor.txt.append ('<p>追加的内容</p>');
}

function clearContent () {
  editor.txt.clear ();
}

function getHtmlContent () {
  alert (editor.txt.html ());
}

function getTextContent () {
  alert (editor.txt.text ());
}

/* eslint-enable no-unused-vars */