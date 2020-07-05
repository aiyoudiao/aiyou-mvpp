const CleanWebpackPlugin = require('clean-webpack-plugin');  // 用于清除文件夹
const CopyWebpackPlugin = require('copy-webpack-plugin');     // 用于拷贝文件

const staticSourcePlugin = [
    // 删除dist文件夹
    new CleanWebpackPlugin(['./dist/'], {
        root: config.projectPath,               // 默认为__dirname，所以需要调整
    }),
    // 复制静态资源
    new CopyWebpackPlugin([
        {
            from: config.assetsSubDirectory,
            to: '../dist/static',
            ignore: ['.*']
        }
    ])
]

module.exports = staticSourcePlugin;


