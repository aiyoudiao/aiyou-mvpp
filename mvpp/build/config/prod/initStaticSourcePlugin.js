const { CleanWebpackPlugin } = require('clean-webpack-plugin');  // 用于清除文件夹
const CopyWebpackPlugin = require('copy-webpack-plugin');     // 用于拷贝文件

const path = require('path');
const projectPath = path.resolve(__dirname, '../../../');

const assetsSubDirectory = path.resolve(__dirname, '../../../src/static');

const staticSourcePlugin = [
    // 删除dist文件夹
    new CleanWebpackPlugin(), /* 3.0 之后 默认清除 output.path */
    // 复制静态资源
    new CopyWebpackPlugin({
        patterns: [
            {
                from: './src/static',
                to: './static',
                context: process.cwd(),
                // globOptions: {
                //     dot: true,
                //     gitignore: true,
                //     ignore: ['.*'],
                // },
            }
        ]
    })
]

module.exports = staticSourcePlugin;


