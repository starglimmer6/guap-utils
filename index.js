/**
 * guap-utils - 工具库主入口
 */

const fileUtils = require('./lib/file')
const timeUtils = require('./lib/time')
const colorUtils = require('./lib/color')
const dataUtils = require('./lib/data')
const validateUtils = require('./lib/validate')

module.exports = {
  // 文件工具
  file: fileUtils,
  // 时间工具
  time: timeUtils,
  // 颜色工具
  color: colorUtils,
  // 数据工具
  data: dataUtils,
  // 验证工具
  validate: validateUtils
}
