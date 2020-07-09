const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const webpackBaseConfig = require('./webpack.config.base');
const config = require('./config');
const { prod: { assetsPublicPath, cssRulesProd, optimizeChunkPluginProd, staticSourcePluginProd, cssExtractors } } = config;


const webpackProdConfig = {
    mode: "production",
    stats: {
        colors: true,
    },
    devtool: 'source-map',
    output: {
        filename: 'js/[name].[chunkhash:8].bundle.js',
        chunkFilename: 'js/[id].[chunkhash:7].js', 
        publicPath: process.env.PUBLIC_PATH || assetsPublicPath || '/', /* js 和 html 的路径 */
    },
    module: {
        rules: [
            ...cssRulesProd
        ]
    },
    plugins: [
        ... cssExtractors,
        ...optimizeChunkPluginProd,
        ...staticSourcePluginProd
    ]
}

module.exports = webpackMerge(webpackBaseConfig, webpackProdConfig)