
const glob = require('glob');
const path = require('path');
const { pathIsExists } = require('../util');

/* 所有页面资源的根路径,同时将绝对路径的\\改成/ */
const __PAGE_DIR = path.resolve(__dirname, '../../src/pages').replace(/\\/gim, '/');

/* 页面目录深度 暂定为 5，之后可以在.env中进行设置 */
const __DEPTH = 5;

/* 入口列表 和 页面插件配置项列表，分别用在 webpack的entry 和 HtmlWebpackPlugin 中*/
const __entryList = {};
const __htmlPluginOptionList = [];

/* 定义一个排除列表 比如一些备份的文件可以直接忽略 */
const __exclude = [
    "@backup"
]

/* 一个自调的闭包函数 */
!(() => {
    /* 根据定义的目录结构深度，进行层序搜索html文件 */
    for (let i = 1; i < __DEPTH; i++) {
        let pathHolder = '/*';
        let entryHtmls = glob.sync(__PAGE_DIR + `${pathHolder.repeat(i)}.html`);
        if (entryHtmls.length < 0)
            continue;

        /* 遍历一遍搜错出来的html文件路径，获取所有可用的entry的js文件和HtmlWebpackPlugin的html文件 */
        entryHtmls.forEach(filePath => {
            
            let absolutePrefix = filePath.substring(0, filePath.lastIndexOf('/'))
            let relativePrefix = absolutePrefix.replace(__PAGE_DIR.replace(/\\/gmi, '/'), '')
            let filename = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'))
            let filePathNoPostfix = filePath.replace(/\.html$/gmi, '');

            const entryJsFile = `${filePathNoPostfix}.js`;
            const entryHtmlFile = `${filePathNoPostfix}.html`;
            
            /* entry的js文件路径不存在，就不必添加到entry列表和页面插件配置项列表中 */
            if (!pathIsExists(entryJsFile))
                return;
            /* 如果排除列表中的文件存在，就不必添加到entry列表和页面插件配置项列表中 */
            for (let i = 0; i < __exclude.length; i++) {
                const excludeDir = `${absolutePrefix}/${__exclude[i]}`
                if (pathIsExists(excludeDir))
                    return;
                    
            }

            /* 即是入口的key，也是htmlPlugin中插入文件的路径，之所以去掉第一个字符，因为第一个字符是/，在页面中的路径会出现 ..//这样多一个字符/，但实际上是../ */
            const chunk = filePathNoPostfix.replace(__PAGE_DIR, '').substr(1);
            __entryList[chunk] = entryJsFile;

            const htmlPluginOption = {
                template: entryHtmlFile,
                filename: `./pages${relativePrefix}.html`,
                chunk: chunk,/* NOTE 这个地方之后需要单独过滤一下，因为要抽离出公共代码块 */
                inject: true,/* 是否将js注入到html文件中去 */
            }
            __htmlPluginOptionList.push(htmlPluginOption);
        })
    }
})();

/* 向外到处 entrys 和 pages */
exports.entrys = { ...__entryList };
exports.htmlPluginOptions = [...__htmlPluginOptionList];

