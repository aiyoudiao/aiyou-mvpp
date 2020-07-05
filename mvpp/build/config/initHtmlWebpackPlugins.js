const HtmlWebpackPlugin = require('html-webpack-plugin');
const { htmlPluginOptions } = require('./entrys');

const __CURRENT_ENV = 'dev'; /* 这个地方的环境变量需要根据不同环境来设定 */

if (!htmlPluginOptions || !htmlPluginOptions.length) {
    throw new Error(`
        path: build/config/initHtmlWebpackPlugins.js error. 
        htmlPluginOptions is null or htmlPluginOptions length is zero.
    `)
}

/*  */
/* 这里根据不同环境来设定HtmlWebpackPlugin的配置项 */
/*  */


let htmlPluginOptionList = htmlPluginOptions;
let htmlPluginList = [];

/* 遍历一遍htmlPlugin的配置项列表 */
htmlPluginOptionList.forEach(htmlPluginOption => {
    const { template, filename, chunk, inject } = htmlPluginOption;

    htmlPluginList.push(
        new HtmlWebpackPlugin({
            filename,
            template,
            // chuckName: undefined,
            /* 后面会进行模块的分割，会提取出 default(自己的公共代码)模块和vendors(第三方依赖库的公共代码)模块 */
            // chunks: [chunk, 'default', 'vendors'], 
            chunks: [chunk],
            inject: 'body'
        })
    )
})

module.exports = htmlPluginList;
