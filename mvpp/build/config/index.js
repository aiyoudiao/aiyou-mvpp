const path = require('path');
const { entrys } = require('./entrys');
const htmlPluginList = require('./initHtmlWebpackPlugins');
const commonRules = require('./rules');
const commonMarcros = require('./marcros');


// #region 生产环境数据
const cssRulesProd = require('./prod/initAllStyleLoader');
const {
    cssExtractor, postcssExtractor,
    lessExtractor, sassExtractor,
    scssExtractor, stylusExtractor,
    stylExtractor, optimizeExtractor
} = require('./prod/initAllStyleExtractor');
// const cssRulesDev = require('./dev/initAllStyleLoader');
const optimizeChunkPluginProd = require('./prod/initOptimizeChunkPlugin');
const staticSourcePluginProd = require('./prod/initStaticSourcePlugin');
// #endregion


// #region 开发环境数据
const cssRulesDev = require('./dev/initAllStyleLoader');
const {
    definePlugin, namedModulesPlugin,
    hotModuleReplacementPlugin, noEmitOnErrorsPlugin
} = require('./dev/HotModuleReplacementPlugin');
const devServer = require('./dev/devServer');
// #endregion

const __DEV_MODE = process.env.NODE_ENV === 'development';
const __PRO_MODE = process.env.NODE_ENV === 'production';

module.exports = {
    entrys,
    htmlPluginList,
    commonRules,
    commonMarcros,
    
    /* 编译后资源发布的根目录 */
    assetsRoot: '',

    /* 编译后相对根目录的子目录 */
    assetSubDir: '',

    /* 开发环境下的变量 */
    dev: {
        assetsPublicPath: '',
        cssRulesDev,
        hotModuleReplacementPlugins: [
            definePlugin, namedModulesPlugin,
            hotModuleReplacementPlugin, noEmitOnErrorsPlugin
        ],
        devServer,
    },

    /* 生产环境下的变量 */
    prod: {
        assetsPublicPath: '',
        cssRulesProd,
        optimizeChunkPluginProd,
        staticSourcePluginProd,
        cssExtractors: [
            cssExtractor, postcssExtractor,
            lessExtractor, sassExtractor,
            scssExtractor, stylusExtractor,
            stylExtractor, optimizeExtractor
        ]
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