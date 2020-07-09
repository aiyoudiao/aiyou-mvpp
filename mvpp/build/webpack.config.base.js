const config = require('./config');
const path = require('path');
const { entrys, htmlPluginList, commonRules } = config;

/* TODO  测试：临时使用这种方式，之后会换成其它方式 */
const buildPath = path.resolve(__dirname, '../dist')

const webpackBaseConfig = {

    /* 模块入口 */
    entry: {
        ...entrys
    },

    /* 模块编译后的输出 */
    output: {
        filename: '[name].[hash:10].js',
        path: buildPath
    },


    /* 模块的处理方式 */
    module: {
        rules: [
            ...commonRules
        ]
    },

    /* 插件会对编译后的结果进行过滤 */
    plugins: [
        ...htmlPluginList
    ],

    /* 设置自定义模块解析 */
    resolve: {
        /* 别名 */
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        /* 文件查询扩展 */
        extensions: ['.ts', '.js', '.tsx', '.jsx', '.json'],
    },
    externals: {},
}

module.exports = webpackBaseConfig;