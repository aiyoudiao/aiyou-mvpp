const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'); // 提取css，提取多个来源时，需要实例化多个，并用extract方法
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)
const CSSNano = require('cssnano');

exports.cssExtractor = new ExtractTextWebpackPlugin({
    filename: 'css/[name]-css.[hash:7].css',  // 直接导入的css文件，提取时添加-css标识
    allChunks: true,  // 从所有的chunk中提取，当有CommonsChunkPlugin时，必须为true
});

exports.postcssExtractor = new ExtractTextWebpackPlugin({
    filename: 'css/[name]-postcss.[hash:7].css',  // 直接导入的css文件，提取时添加-css标识
    allChunks: true,  // 从所有的chunk中提取，当有CommonsChunkPlugin时，必须为true
});

exports.lessExtractor = new ExtractTextWebpackPlugin({
    filename: 'css/[name]-less.[hash:7].css',  // 直接导入的css文件，提取时添加-css标识
    allChunks: true,  // 从所有的chunk中提取，当有CommonsChunkPlugin时，必须为true
});

exports.sassExtractor = new ExtractTextWebpackPlugin({
    filename: 'css/[name]-sass.[hash:7].css', // 直接导入的sass文件，提取时添加-sass标识
    allChunks: true,  // 从所有的chunk中提取，当有CommonsChunkPlugin时，必须为true
});

exports.scssExtractor = new ExtractTextWebpackPlugin({
    filename: 'css/[name]-scss.[hash:7].css', // 直接导入的sass文件，提取时添加-sass标识
    allChunks: true,  // 从所有的chunk中提取，当有CommonsChunkPlugin时，必须为true
});

exports.stylusExtractor = new ExtractTextWebpackPlugin({
    filename: 'css/[name]-stylus.[hash:7].css',  // 直接导入的css文件，提取时添加-css标识
    allChunks: true,  // 从所有的chunk中提取，当有CommonsChunkPlugin时，必须为true
});

exports.stylExtractor = new ExtractTextWebpackPlugin({
    filename: 'css/[name]-styl.[hash:7].css',  // 直接导入的css文件，提取时添加-css标识
    allChunks: true,  // 从所有的chunk中提取，当有CommonsChunkPlugin时，必须为true
});

// 压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)
exports.optimizeExtractor = new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: CSSNano,
    canPrint: true
});
