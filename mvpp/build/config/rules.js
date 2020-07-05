const eslintFriendlyFormatter = require('eslint-friendly-formatter')

const ESLintRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',                         // loader种类，pre / post
    include: [config.srcPath],              // 检测的目录
    options: {
        formatter: eslintFriendlyFormatter,    // 错误信息显示在终端上
        // 如果option设置为true，Loader将始终返回警告。如果您正在使用热模块更换，您可能希望在开发中启用此功能，否则在出现夹板错误时将跳过更新。
        emitWarning: !config.dev.showEslintErrorsInOverlay,
    }
})

const commonRules = [
    ...(config.dev.useEslint ? [ESLintRule()] : []),
    {
        test: /\.js$/,
        include: [config.srcPath],        // 在源文件目录查询
        exclude: [config.assetsSubDirectory],
        // exclude: /(node_modules|bower_components)/,
        use: [
                {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: ['@babel/preset-env'],
                    //     plugins: ['@babel/plugin-transform-runtime'],
                    // },
                },
        ]
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        include: [config.srcPath],        // 在源文件目录查询
        exclude: [config.assetsSubDirectory],    // 忽略第三方的任何代码
        use: [{ // 导入字体文件，并最打包到output.path+ options.name对应的路径中
            loader: 'url-loader',
            options: {
                limit: 8192,
                name: 'fonts/[name].[hash:7].[ext]',
                fallback: 'file-loader',
            }
        }]
    },
    {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        include: [config.srcPath],               // 在源文件目录查询
        // exclude: [config.assetsSubDirectory],    // 忽略第三方的任何代码
        use: [{ // 图片文件小于8k时编译成dataUrl直接嵌入页面，超过8k回退使用file-loader
            loader: 'url-loader',
            options: {
                limit: 8192, // 8k
                name: 'images/[name].[hash:7].[ext]', // 回退使用file-loader时的名称
                fallback: 'file-loader',  // 当超过8192byte时，会回退使用file-loader
            }
        }]
    },
    {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 8192,
            name: 'media/[name].[hash:7].[ext]',
            fallback: 'file-loader',
        }
    },
]

module.exports = commonRules;