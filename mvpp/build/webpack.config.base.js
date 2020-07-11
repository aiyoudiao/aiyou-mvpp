const config = require('./config');
const path = require('path');
const webpack = require('webpack');
const { entrys, htmlPluginList, commonRules, commonMarcros } = config;

/* TODO  测试：临时使用这种方式，之后会换成其它方式 */
const buildPath = path.resolve(__dirname, '../dist')

debugger;

const webpackBaseConfig = {

    /* 模块入口 */
    entry: {
        ...entrys
    },

    /* 模块编译后的输出 */
    output: {
        filename: '[name].[hash:10].js',
        // path: buildPath
        path: path.resolve(process.cwd(), 'dist')
    },


    /* 模块的处理方式 */
    module: {
        rules: [
            // {
            //     test: /\.html$/,
            //     use: [

            //         {
            //             // https://github.com/emaphp/underscore-template-loader
            //             // loader: 'underscore-template-loader', // html模板引擎
            //             loader: 'html-url-loader', // html模板引擎

            //         }
            //     ],
            // },
            {
                test: /\.html$/,
                use: [
                    {
                        // https://github.com/emaphp/underscore-template-loader
                        // loader: 'underscore-template-loader', // html模板引擎

                        // loader: 'html-withimg-loader'

                        // 处理了underscore-template-loader的缺陷和bug
                        loader: 'aiyou-template-loader', // html模板引擎

                        // options: {
                        //     // 自定义宏
                        // macros: {
                        //     ...commonMarcros
                        // },

                        // },

                        query: {
                            attributes: ['img:src', 'x-img:src']
                        }
                    }

                ],
            },

            ...commonRules,

        ],
    },

    // /* 自定义宏 */
    // macros: {
    //     ...commonMarcros
    // },

    /* 插件会对编译后的结果进行过滤 */
    plugins: [
        ...htmlPluginList,
        /* 给处理html的loader添加一个配置项 */
        new webpack.LoaderOptionsPlugin({
            test: /\.html$/, // may apply this only for some modules
            options: {
                macros: commonMarcros
            }
        })
    ],

    /* 设置自定义模块解析 */
    resolve: {
        /* 别名 */
        alias: {
            '@': path.resolve(__dirname, './src'),

            // 设置这些别名模块
            src: path.resolve(__dirname, '../src/'),
            app: path.resolve(__dirname, '../src/lib/app'),
            vendor: path.resolve(__dirname, '../src/lib/vendor'),
            common: path.resolve(__dirname, '../src/common'),
            mycomponent: path.resolve(__dirname, '../src/components'),
            loaders: path.relative(__dirname, '../loaders/my-temp-loader'),
            // 设置页面中需要使用到的别名模块
            './@app': path.resolve(__dirname, '../src/lib/app'),
            './@appcomponent': path.resolve(__dirname, '../src/lib/app/components'),
            './@common': path.resolve(__dirname, '../src/common'),
            './@my-component': path.resolve(__dirname, '../src/components'),
            './@my-static': path.resolve(__dirname, '../src/static'),
        },
        /* 文件查询扩展 */
        extensions: ['.ts', '.js', '.tsx', '.jsx', '.json'],
    },

    /* 设置本地注入的loader */
    resolveLoader: {
        modules: [path.resolve(__dirname, './loader'), 'node_modules'],
    },

    externals: {},
}

module.exports = webpackBaseConfig;