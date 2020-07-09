
const path = require('path');
const srcPath = path.resolve(__dirname, '../../../src/pages');
// const srcPath = path.resolve(__dirname, '../../../src/pages').replace(/\\/gim, '/');
const assetsSubDirectory = '/';
const devSourceMap = false;

const cssRules = [
    {
        test: /\.css$/,
        include: [srcPath],
        exclude: [assetsSubDirectory],
        use: [
            'style-loader',
            { loader: 'css-loader', options: { sourceMap: devSourceMap } },
            { loader: 'postcss-loader', options: { sourceMap: devSourceMap } }
        ]
    },
    {
        test: /\.postcss$/,
        include: [srcPath],
        exclude: [assetsSubDirectory],
        use: [
            'style-loader',
            { loader: 'css-loader', options: { sourceMap: devSourceMap } },
            { loader: 'postcss-loader', options: { sourceMap: devSourceMap } }
        ]
    },
    {
        test: /\.less$/,
        include: [srcPath],
        exclude: [assetsSubDirectory],
        use: [
            'style-loader',
            { loader: 'css-loader', options: { sourceMap: devSourceMap } },
            { loader: 'postcss-loader', options: { sourceMap: devSourceMap } },
            { loader: 'less-loader', options: { sourceMap: devSourceMap } }
        ]
    },
    {
        test: /\.sass$/,
        include: [srcPath],
        exclude: [assetsSubDirectory],
        use: [
            'style-loader',
            { loader: 'css-loader', options: { sourceMap: devSourceMap } },
            { loader: 'postcss-loader', options: { sourceMap: devSourceMap } },
            { loader: 'sass-loader', options: { indentedSyntax: true, sourceMap: devSourceMap } }]
    },
    {
        test: /\.scss$/,
        include: [srcPath],
        exclude: [assetsSubDirectory],
        use: [
            'style-loader',
            { loader: 'css-loader', options: { sourceMap: devSourceMap } },
            { loader: 'postcss-loader', options: { sourceMap: devSourceMap } },
            { loader: 'sass-loader', options: { sourceMap: devSourceMap } }
        ]
    },
    {
        test: /\.stylus$/,
        include: [srcPath],
        exclude: [assetsSubDirectory],
        use: [
            'style-loader',
            { loader: 'css-loader', options: { sourceMap: devSourceMap } },
            { loader: 'postcss-loader', options: { sourceMap: devSourceMap } },
            { loader: 'stylus-loader', options: { sourceMap: devSourceMap } }
        ]
    },
    {
        test: /\.styl$/,
        include: [srcPath],
        exclude: [assetsSubDirectory],
        use: [
            'style-loader',
            { loader: 'css-loader', options: { sourceMap: devSourceMap } },
            { loader: 'postcss-loader', options: { sourceMap: devSourceMap } },
            { loader: 'stylus-loader', options: { sourceMap: devSourceMap } }
        ]
    }
]
module.exports = cssRules;