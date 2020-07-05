const config = require('./config');
const { entrys, htmlPluginList } = config;

module.exports = {
    /* 启动什么方式的调试地图 */
    devtool: 'source-map',

    /* 模块入口 */
    entry: entrys,

    /* 模块编译后的输出 */
    output: {
        filename: '[name].[hash:10].js',
        chunkFilename: '[id].[hash:10].js'
        path: buildPath
    },

    /* 模块的处理方式 */
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                /* 这里的babel 配置项之后会移动到配置文件中去 */
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    },

    /* 插件会对编译后的结果进行过滤 */
    plugins: [
        ...htmlPluginList
    ]
}