const production = require('./webpack.config.prod');
const development = require('./webpack.config.dev');

/**
 * 在这里根据环境来选择使用哪个配置，甚至可以在这里做一些相关的干扰处理或者过滤、注入处理
 */

// module.exports = production;
module.exports = development;
