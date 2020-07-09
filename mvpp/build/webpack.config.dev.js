const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const webpackBaseConfig = require('./webpack.config.base');
const config = require('./config');
const { dev: { assetsPublicPath, hotModuleReplacementPlugins: [
    definePlugin, namedModulesPlugin,
    hotModuleReplacementPlugin, noEmitOnErrorsPlugin
], cssRulesDev, devServer } } = config;


const webpackDevConfig = {
    mode: 'development',
    devServer,
    stats: {
        colors: true,
    },
    devtool: 'eval-source-map',
    output: {
        filename: 'js/[name].[hash:10].js',
        chunkFilename: 'js/[id].[hash:10].js',
        publicPath: process.env.PUBLIC_PATH || assetsPublicPath || '/',
    },
    module: {
        rules: [
            ...cssRulesDev
        ]
    },
    plugins: [

        definePlugin,
        namedModulesPlugin,
        hotModuleReplacementPlugin,
        noEmitOnErrorsPlugin

    ]
}

module.exports = webpackMerge(webpackBaseConfig, webpackDevConfig)