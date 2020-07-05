const webpack = require('webpack');

exports.definePlugin = new webpack.DefinePlugin({                   // 配置的全局常量 (指定为生产环境，进而让一些library可以做一些优化)
      'process.env.NODE_ENV': JSON.stringify('development')
});

exports.namedModulesPlugin = new webpack.NamedModulesPlugin();          // 开启HMR时显示模块的相对路径,建议用于开发环境

exports.hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();  // 启用热替换模块(Hot Module Replacement)，也被称为 HMR。

exports.noEmitOnErrorsPlugin = new webpack.NoEmitOnErrorsPlugin();        // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。