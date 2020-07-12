# root



## 安装依赖的脚本

所有历史安装的依赖，所使用到的命令都要进行列举  
格式：年、月、日、上午或者下午、时分、人员姓名首字母小写或者其它代表性的拼音、新增或者修改
例如：
    20200630am1114 zph new insert  
    20200630pm1634 zph new change

### 20200630am1114 zph new insert

| name | description | commmand  |
|   ---|          ---|        ---|
| dotenv | .env环境变量的支持  | npm i -D dotenv@8.2.0  |
| glob | 资源路径处理的node库  | npm i -D glob@7.1.6  |

### 20200630pm1239 zph new insert

| name | description | commmand  |
|   ---|          ---|        ---|
| fs-extra | 更加友好使用的文件流操作  | npm i -D fs-extra@9.0.1  |

### 20200630pm1239 zph new insert

| name | description | commmand  |
|   ---|          ---|        ---|
| html-webpack-plugin | webpack中对html文件的处理，比如注入js、css、优化html内容  | npm i -D html-webpack-plugin@4.3.0  |
| webpack webpack-cli | webpack构建工具、webpack构建的命令行工具  | npm i -D webpack@4.43.0 webpack-cli@3.3.12  |
| babel-loader @babel/core @babel/cli @babel/preset-env | 和babel编译相关的一些依赖包 | npm i babel-loader@8.1.0 @babel/core@7.10.3 @babel/cli@7.10.3 @babel/preset-env@7.10.3 |


### 20200706pm2105 zph new insert

webpack-merge@4.2.2

npm i -D extract-text-webpack-plugin optimize-css-assets-webpack-plugin cssnano
+ optimize-css-assets-webpack-plugin@5.0.3
+ extract-text-webpack-plugin@3.0.2
+ cssnano@4.1.10


### 20200707pm2240 zph new insert

npm i -D style-loader css-loader postcss-loader less-loader sass-loader stylus-loader
+ stylus-loader@3.0.2
+ style-loader@1.2.1
+ postcss-loader@3.0.0
+ sass-loader@9.0.1
+ less-loader@6.2.0
+ css-loader@3.6.0

npm i -D less node-sass stylus
+ node-sass@4.14.1
+ less@3.11.3
+ stylus@0.54.7

npm i -D shelljs
+ shelljs@0.8.4

npm i -D clean-webpack-plugin copy-webpack-plugin
+ copy-webpack-plugin@6.0.3
+ clean-webpack-plugin@3.0.0

npm i -D @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators @babel/plugin-proposal-object-rest-spread @babel/plugin-proposal-optional-chaining @babel/plugin-proposal-private-methods @babel/plugin-transform-runtime @babel/preset-typescript @babel/runtime @babel/runtime-corejs2 @types/eslint @types/jest @types/lodash @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser @typescript-eslint/typescript-estree autoprefixer babel-polyfill core-js es6-promise eslint eslint-config-prettier eslint-config-standard eslint-friendly-formatter eslint-loader eslint-plugin-import eslint-plugin-node eslint-plugin-prettier eslint-plugin-promise eslint-plugin-standard express jest file-loader express npx postcss-import postcss-load-config postcss-loader postcss-nesting postcss-plugin postcss-preset-env postcss-px-to-viewport postcss-url precss prettier prettierrc pretty-quick proxy ts-jest ts-loader tslib typescript url-loader
+ @babel/runtime@7.10.4
+ @babel/plugin-transform-runtime@7.10.4
+ @babel/plugin-proposal-optional-chaining@7.10.4
+ @babel/plugin-proposal-class-properties@7.10.4
+ @babel/plugin-proposal-private-methods@7.10.4
+ @babel/runtime-corejs2@7.10.4
+ @babel/plugin-proposal-decorators@7.10.4
+ @babel/plugin-proposal-object-rest-spread@7.10.4
+ @babel/preset-typescript@7.10.4
+ @types/jest@26.0.4
+ @types/lodash@4.14.157
+ @types/node@14.0.18
+ autoprefixer@9.8.4
+ @typescript-eslint/parser@3.6.0
+ @typescript-eslint/eslint-plugin@3.6.0
+ @typescript-eslint/typescript-estree@3.6.0
+ core-js@3.6.5
+ es6-promise@4.2.8
+ eslint-friendly-formatter@4.0.1
+ eslint-loader@4.0.2
+ eslint-plugin-node@11.1.0
+ eslint-plugin-import@2.22.0
+ eslint-config-prettier@6.11.0
+ eslint@7.4.0
+ @types/eslint@7.2.0
+ eslint-plugin-standard@4.0.1
+ eslint-plugin-promise@4.2.1
+ express@4.17.1
+ express@4.17.1
+ eslint-config-standard@14.1.1
+ jest@26.1.0
+ file-loader@6.0.0
+ postcss-import@12.0.1
+ postcss-load-config@2.1.0
+ babel-polyfill@6.26.0
+ postcss-loader@3.0.0
+ npx@10.2.2
+ postcss-nesting@7.0.1
+ postcss-url@8.0.0
+ postcss-px-to-viewport@1.1.1
+ postcss-preset-env@6.7.0
+ postcss-plugin@1.0.0
+ precss@4.0.0
+ prettier@2.0.5
+ pretty-quick@2.0.1
+ proxy@1.0.1
+ prettierrc@0.0.0-5
+ ts-loader@7.0.5
+ ts-jest@26.1.1
+ tslib@2.0.0
+ typescript@3.9.6
+ url-loader@4.1.0
+ eslint-plugin-prettier@3.1.4

npm i -D eslint-friendly-formatter
+ eslint-friendly-formatter@4.0.1

### 20200708pm0007 zph change
extract-text-webpack-plugin目前版本不支持webpack4
改用next，虽然目前处于内部测试版本，但是已经很好用了，如果之后再找到其它替代品，再说。
npm install extract-text-webpack-plugin@next​​​​​​​

### 20200709pm2242 zph change

npm i -D webpack-dev-server
+ webpack-dev-server@3.11.0

### 20200711pm1259 zph 
编写loader，将aiyou-ui项目使用mvpp来完成编译，同时也添加一个最新的源loader。
主要是对比这两个loader的效果，从而能够取这两个loader之间的优点处。
如果OK，我会把作者的项目fork下来，然后提pull request。

npm i -D underscore-template-loader
+ underscore-template-loader@1.1.0

### 20200711pm1911 zph

无论是aiyou-template-loader 还是 underscore-template-loader，都不能在页面中引入图片，让图片进行打包
所以加入了以下loader的尝试

html-url-loader  这个loader可以让引入的图片被打包，但是输出的内容有问题，是一个json
html-withimg-loader 这个和上面的一样

应该是因为webpack版本的问题吧。所以针对这个问题调试了一下html-url-loader，把这个问题解决了

但是 很明显 aiyou-template-loader 和 html-url-loader不能兼容，
同时underscore-template-loader 也不能和 html-url-loader 兼容。

所以分别研究一下。


### 20200711pm2154

html-url-loader 给作者提一个pull request
underscore-template-loader 也给作者提一个pull request

问题解决了，结合html-url-loader 把 aiyou-template-loader修改了，可以打包图片了。

### 20200711pm2304

html-url-loader 的pull request 已经提交了。

underscore-template-loader 的pull request 提交不了，但是我创建了一个Issues，
告诉作者我改了这些，如果它自己知道改也行。

如果三天没有得到回复或者npm上没有更新，那我就把它们改个名字，自己提交到github上和npm上去，不然我用不了嘞。

### 20200712pm1728

新建一个aiyou-ui的分支，这个分支取消掉了在页面中对图片进行打包的支持，aiyou-template-loader 目前只能支持页面全都是本地图片打包的支持，如果路径不对就会报错。
所以这个分支就不会支持页面图片的打包。

在自己的aiyou-admin中添加了mvpp工程化的支持。无论是开发环境还是生产环境都可以正常的使用。

http-server
+ http-server@0.12.3