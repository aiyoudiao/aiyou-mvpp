const fs = require('fs-extra');

/* 该路径是否在当前磁盘中已存在 */
exports.pathIsExists = function (path) {
    return fs.existsSync(path);
}