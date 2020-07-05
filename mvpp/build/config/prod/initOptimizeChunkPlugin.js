
const webpack = require('webpack');

const optimizeChunkPlugin = [
    // 根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境
    // 当供应商模块不变时，保持module.id稳定
    new webpack.HashedModuleIdsPlugin(),
    // 优化chunk
    new webpack.optimize.SplitChunksPlugin({
        chunks: "all",                   // 哪些块进行优化，"initial"|"all"|"async"(默认) (string function)
        minSize: 2000,                   // 要生成的块的最小大小，默认3000
        minChunks: 1,                    // 分割前必须共享模块的最小块数，默认1
        maxAsyncRequests: 5,             // 最大异步并行请求数，默认5
        maxInitialRequests: 3,           // 最大初始化并行请求书，默认3
        automaticNameDelimiter: '~',     // 生成的名称分隔符，默认~  (string)
        name: true,                      // 拆分快的名称，默认true(function true string)
        cacheGroups: {                   // 缓存组，可以继承和/或覆盖任何选项
            // priority: 0,                   // 缓存组的优先级，默认0
            // test: null,                    // 控制此缓存组选择的模块，默认空(function RegExp string)
            // reuseExistingChunk: true,      // 如果当前块包含已从主束拆分的模块，是否重用它。
            vendors: {
                name: 'vendors',
                test: /[\\/]node_modules[\\/]/,
                priority: -10, // 权重
            },
            default: {
                name: 'default',
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true,
            }
        }
    }),
]

module.exports = optimizeChunkPlugin;

