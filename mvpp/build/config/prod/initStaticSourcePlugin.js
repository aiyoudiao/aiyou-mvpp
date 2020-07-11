const { CleanWebpackPlugin } = require('clean-webpack-plugin');  // 用于清除文件夹
const CopyWebpackPlugin = require('copy-webpack-plugin');     // 用于拷贝文件

const path = require('path');
const projectPath = path.resolve(__dirname, '../../../');

const staticSourcePlugin = [
    // 删除dist文件夹
    new CleanWebpackPlugin(), /* 3.0 之后 默认清除 output.path */
    // 复制静态资源
    // new CopyWebpackPlugin([
    //     {
    //         from: config.assetsSubDirectory,
    //         to: '../dist/static',
    //         ignore: ['.*']
    //     }
    // ])
]

module.exports = staticSourcePlugin;


