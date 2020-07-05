const path = require('path');
const { entrys } = require('./entrys');
const htmlPluginList = require('./initHtmlWebpackPlugins');


const __DEV_MODE = process.env.NODE_ENV === 'development';
const __PRO_MODE = process.env.NODE_ENV === 'production';

module.exports = {
    entrys,
    htmlPluginList,

    /* 编译后资源发布的根目录 */
    assetsRoot: '',

    /* 编译后相对根目录的子目录 */
    assetSubDir: '',

    /* 开发环境下的变量 */
    dev: {
        assetsPublicPath: ''
    },

    /* 生产环境下的变量 */
    prod: {
        assetsPublicPath: ''
    },

    externals: {
        // 第三方库使用cdn减少打包体积
        jquery: 'jQuery',
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },


    htmlPluginList
}