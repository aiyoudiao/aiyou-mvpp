const { 
    cssExtractor, postcssExtractor,
    lessExtractor, sassExtractor,
    scssExtractor, stylusExtractor,
    stylExtractor
} = require('./initAllStyleExtractor')

const cssRules = [
    {
        test: /\.css$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: cssExtractor.extract({
            fallback: 'style-loader',
            use: [
                { loader: 'css-loader', options: { sourceMap: config.dev.prodSourceMap } },
                { loader: 'postcss-loader', options: { sourceMap: config.dev.prodSourceMap } },
            ],
            publicPath: '../',       // 默认发布路径会是css，会拼接成css/img/x.png，所以需要重置
        })
    },
    {
        test: /\.postcss$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: postcssExtractor.extract({
            fallback: 'style-loader',
            use: [
                { loader: 'css-loader', options: { sourceMap: config.dev.prodSourceMap } },
                { loader: 'postcss-loader', options: { sourceMap: config.dev.prodSourceMap } }
            ],
            publicPath: '../',       // 默认发布路径会是css，会拼接成css/img/x.png，所以需要重置
        })
    },
    {
        test: /\.less$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: lessExtractor.extract({
            fallback: 'style-loader',
            use: [
                { loader: 'css-loader', options: { sourceMap: config.dev.prodSourceMap } },
                { loader: 'postcss-loader', options: { sourceMap: config.dev.prodSourceMap } },
                { loader: 'less-loader', options: { sourceMap: config.dev.prodSourceMap } }
            ],
            publicPath: '../',       // 默认发布路径会是css，会拼接成css/img/x.png，所以需要重置
        })
    },
    {
        test: /\.sass$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: sassExtractor.extract({
            fallback: 'style-loader',
            use: [
                { loader: 'css-loader', options: { sourceMap: config.dev.prodSourceMap } },
                { loader: 'postcss-loader', options: { sourceMap: config.dev.prodSourceMap } },
                { loader: 'sass-loader', options: { indentedSyntax: true, sourceMap: config.dev.prodSourceMap } }
            ],
            publicPath: '../',       // 默认发布路径会是css，会拼接成css/img/x.png，所以需要重置
        })
    },
    {
        test: /\.scss$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: scssExtractor.extract({
            fallback: 'style-loader',
            use: [
                { loader: 'css-loader', options: { sourceMap: config.dev.prodSourceMap } },
                { loader: 'postcss-loader', options: { sourceMap: config.dev.prodSourceMap } },
                { loader: 'sass-loader', options: { sourceMap: config.dev.prodSourceMap } }
            ],
            publicPath: '../',      // 默认发布路径会是css，会拼接成css/img/x.png，所以需要重置
        })
    },
    {
        test: /\.stylus$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: stylusExtractor.extract({
            fallback: 'style-loader',
            use: [
                { loader: 'css-loader', options: { sourceMap: config.dev.prodSourceMap } },
                { loader: 'postcss-loader', options: { sourceMap: config.dev.prodSourceMap } },
                { loader: 'stylus-loader', options: { sourceMap: config.dev.prodSourceMap } }
            ],
            publicPath: '../',      // 默认发布路径会是css，会拼接成css/img/x.png，所以需要重置
        })
    },
    {
        test: /\.styl$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: stylExtractor.extract({
            fallback: 'style-loader',
            use: [
                { loader: 'css-loader', options: { sourceMap: config.dev.prodSourceMap } },
                { loader: 'postcss-loader', options: { sourceMap: config.dev.prodSourceMap } },
                { loader: 'stylus-loader', options: { sourceMap: config.dev.prodSourceMap } }
            ],
            publicPath: '../',      // 默认发布路径会是css，会拼接成css/img/x.png，所以需要重置
        })
    }
]

module.exports = cssRules;