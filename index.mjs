/**
 * guap-utils - 工具库主入口 (ES Module)
 */

import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const fileUtils = require('./file.js')
const timeUtils = require('./time.js')
const colorUtils = require('./color.js')
const dataUtils = require('./data.js')
const validateUtils = require('./validate.js')

export default {
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

export const file = fileUtils
export const time = timeUtils
export const color = colorUtils
export const data = dataUtils
export const validate = validateUtils
