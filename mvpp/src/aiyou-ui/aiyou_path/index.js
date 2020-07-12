/*
 * @Descripttion: ilovejwl
 * @version: 1.0.0
 * @Author: ilovejwl
 * @Date: 2020-01-26 12:49:26
 * @LastEditTime : 2020-01-26 12:58:44
 * @LastEditors  : ilovejwl
 */
import layuiModules from './layui-module-path';
import okModules from './ok-admin-module-path';
import { defineAssign } from '../presets/aiyou-preset';

defineAssign ();

const modulePath = Object.assign (layuiModules, okModules);

export const modules = modulePath;