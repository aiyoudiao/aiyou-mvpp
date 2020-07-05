
const cssRules = [
    {
        test: /\.css$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: [
            'style-loader',
            { loader: 'css-loader', options: { sourceMap: config.dev.devSourceMap } },
            { loader: 'postcss-loader', options: { sourceMap: config.dev.devSourceMap } }
        ]
    },
    {
        test: /\.postcss$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: [
            'style-loader',
            { loader: 'css-loader', options: { sourceMap: config.dev.devSourceMap } },
            { loader: 'postcss-loader', options: { sourceMap: config.dev.devSourceMap } }
        ]
    },
    {
        test: /\.less$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: [
            'style-loader',
            { loader: 'css-loader', options: { sourceMap: config.dev.devSourceMap } },
            { loader: 'postcss-loader', options: { sourceMap: config.dev.devSourceMap } },
            { loader: 'less-loader', options: { sourceMap: config.dev.devSourceMap } }
        ]
    },
    {
        test: /\.sass$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: [
            'style-loader',
            { loader: 'css-loader', options: { sourceMap: config.dev.devSourceMap } },
            { loader: 'postcss-loader', options: { sourceMap: config.dev.devSourceMap } },
            { loader: 'sass-loader', options: { indentedSyntax: true, sourceMap: config.dev.devSourceMap } }]
    },
    {
        test: /\.scss$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: [
            'style-loader',
            { loader: 'css-loader', options: { sourceMap: config.dev.devSourceMap } },
            { loader: 'postcss-loader', options: { sourceMap: config.dev.devSourceMap } },
            { loader: 'sass-loader', options: { sourceMap: config.dev.devSourceMap } }
        ]
    },
    {
        test: /\.stylus$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: [
            'style-loader',
            { loader: 'css-loader', options: { sourceMap: config.dev.devSourceMap } },
            { loader: 'postcss-loader', options: { sourceMap: config.dev.devSourceMap } },
            { loader: 'stylus-loader', options: { sourceMap: config.dev.devSourceMap } }
        ]
    },
    {
        test: /\.styl$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: [
            'style-loader',
            { loader: 'css-loader', options: { sourceMap: config.dev.devSourceMap } },
            { loader: 'postcss-loader', options: { sourceMap: config.dev.devSourceMap } },
            { loader: 'stylus-loader', options: { sourceMap: config.dev.devSourceMap } }
        ]
    }
]
module.exports = cssRules;