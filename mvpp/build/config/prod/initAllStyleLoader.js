const { 
    cssExtractor, postcssExtractor,
    lessExtractor, sassExtractor,
    scssExtractor, stylusExtractor,
    stylExtractor
} = require('./initAllStyleExtractor')

const prodSourceMap = false;
const path = require('path');
const srcPath = path.resolve(__dirname, '../../../src/pages');
// const srcPath = path.resolve(__dirname, '../../../src/pages').replace(/\\/gim, '/');
const assetsSubDirectory = '/';

const cssRules = [
    {
        test: /\.css$/,
        include: [srcPath],
        exclude: [assetsSubDirectory],
        use: cssExtractor.extract({
            fallback: 'style-loader',
            use: [
                { loader: 'css-loader', options: { sourceMap: prodSourceMap } },
                { loader: 'postcss-loader', options: { sourceMap: prodSourceMap } },
            ]
        })
    },
    {
        test: /\.postcss$/,
        include: [srcPath],
        exclude: [assetsSubDirectory],
        use: postcssExtractor.extract({
            fallback: 'style-loader',
            use: [
                { loader: 'css-loader', options: { sourceMap: prodSourceMap } },
                { loader: 'postcss-loader', options: { sourceMap: prodSourceMap } }
            ]
        })
    },
    {
        test: /\.less$/,
        include: [srcPath],
        exclude: [assetsSubDirectory],
        use: lessExtractor.extract({
            fallback: 'style-loader',
            use: [
                { loader: 'css-loader', options: { sourceMap: prodSourceMap } },
                { loader: 'postcss-loader', options: { sourceMap: prodSourceMap } },
                { loader: 'less-loader', options: { sourceMap: prodSourceMap } }
            ]
        })
    },
    {
        test: /\.sass$/,
        include: [srcPath],
        exclude: [assetsSubDirectory],
        use: sassExtractor.extract({
            fallback: 'style-loader',
            use: [
                { loader: 'css-loader', options: { sourceMap: prodSourceMap } },
                { loader: 'postcss-loader', options: { sourceMap: prodSourceMap } },
                { loader: 'sass-loader', options: { indentedSyntax: true, sourceMap: prodSourceMap } }
            ]
        })
    },
    {
        test: /\.scss$/,
        include: [srcPath],
        exclude: [assetsSubDirectory],
        use: scssExtractor.extract({
            fallback: 'style-loader',
            use: [
                { loader: 'css-loader', options: { sourceMap: prodSourceMap } },
                { loader: 'postcss-loader', options: { sourceMap: prodSourceMap } },
                { loader: 'sass-loader', options: { sourceMap: prodSourceMap } }
            ]
        })
    },
    {
        test: /\.stylus$/,
        include: [srcPath],
        exclude: [assetsSubDirectory],
        use: stylusExtractor.extract({
            fallback: 'style-loader',
            use: [
                { loader: 'css-loader', options: { sourceMap: prodSourceMap } },
                { loader: 'postcss-loader', options: { sourceMap: prodSourceMap } },
                { loader: 'stylus-loader', options: { sourceMap: prodSourceMap } }
            ]
        })
    },
    {
        test: /\.styl$/,
        include: [srcPath],
        exclude: [assetsSubDirectory],
        use: stylExtractor.extract({
            fallback: 'style-loader',
            use: [
                { loader: 'css-loader', options: { sourceMap: prodSourceMap } },
                { loader: 'postcss-loader', options: { sourceMap: prodSourceMap } },
                { loader: 'stylus-loader', options: { sourceMap: prodSourceMap } }
            ]
        })
    }
]

module.exports = cssRules;