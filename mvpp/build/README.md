# 构建

这个目录下存放的是与构建相关的配置、加载器、插件、专属定制的构建脚本。

## config

构建脚本中会使用到的一些比较通用的变量。

## loader

构建脚本中会使用到的自定义加载器，加载器会将js、非js的内容进行进行特殊处理。

## plugin

构建脚本中会使用到的自定义插件，插件会在构建过程中对构建的结果进行二次过滤。

## 根目录下的文件

### webpack.config.base.js

构建脚本 --> 通用的基础构建脚本，需要结合不同环境的构建脚本来使用。

### webpack.config.dev.js

构建脚本 --> 构建出开发环境所需要的前端资源。

### webpack.config.prod.js

构建脚本 --> 构建出生产环境所需要的前端资源。

## 构建流程


## 构建问题

### 开发环境下的问题

问题一：文件不能使用hash命名

```
ERROR in chunk test2/index [entry]
js/[name].[chunkhash:8].bundle.js
Cannot use [chunkhash] or [contenthash] for chunk in 'js/[name].[chunkhash:8].bundle.js' (use [hash] instead)
```

原因：热替换影响了chunkhash的使用，你要确保hotModuleReplacementPlugin(）函数没在生产环境下执行



