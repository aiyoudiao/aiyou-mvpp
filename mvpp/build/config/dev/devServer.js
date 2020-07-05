
const devServer =
{                       // 启动devServer，不会在本地生成文件，所有文件会编译在内存中(读取速度快)
    open: false,
    host: config.dev.host,
    port: config.dev.port,
    useLocalIp: false,                  // 允许浏览器使用本地IP打开

    hot: true,                         // 配合webpack.NamedModulesPlugin、webpack.HotModuleReplacementPlugin完成MHR
    compress: true,                    // 一切服务都启用gzip 压缩
    contentBase: './src/',             // dev服务器的根目录，用于加载静态。这个决定了static的位置范围(位置对的上才能引入静态文件)！！！！！！！！！！

    quiet: false,                       // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到node控制台。
    overlay: true,                     // 是否在浏览器中显示编译器错误
    inline: true,                      // 内联模式 实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台
    clientLogLevel: "warning",         // 内联模式 哪些构建消息将会出现在浏览器控制台

    historyApiFallback: {              // 当使用 HTML5 History API 时，任意的 404 响应是否需要被替代为 index.html。
        rewrites: [
            { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
        ],
    },
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
};