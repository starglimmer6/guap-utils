/**
 * 验证工具函数
 */

/**
 * 校验是否为手机号
 * @param {string|number} phone - 手机号
 * @returns {boolean} 是否为有效的手机号
 */
function isPhone(phone) {
  if (!phone) {
    return false
  }

  const phoneStr = String(phone)
  // 中国手机号：1开头，11位数字
  const phonePattern = /^1[3-9]\d{9}$/
  return phonePattern.test(phoneStr)
}

/**
 * 校验是否为邮箱
 * @param {string} email - 邮箱地址
 * @returns {boolean} 是否为有效的邮箱
 */
function isEmail(email) {
  if (!email || typeof email !== 'string') {
    return false
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailPattern.test(email.trim())
}

/**
 * 校验是否为链接（URL）
 * @param {string} url - 链接地址
 * @returns {boolean} 是否为有效的链接
 */
function isUrl(url) {
  if (!url || typeof url !== 'string') {
    return false
  }

  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch (e) {
    // 如果不支持URL构造函数，使用正则表达式
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/
    return urlPattern.test(url.trim())
  }
}

/**
 * 将undefined、null转换为空字符串，其他值保持不变
 * @param {*} value - 任意值
 * @returns {*} 转换后的值（undefined/null转为''，其他保持不变）
 */
function toEmptyString(value) {
  if (value === undefined || value === null) {
    return ''
  }
  return value
}

/**
 * 校验是否为身份证号（中国）
 * @param {string} idCard - 身份证号
 * @returns {boolean} 是否为有效的身份证号
 */
function isIdCard(idCard) {
  if (!idCard || typeof idCard !== 'string') {
    return false
  }

  const idCardStr = idCard.trim()
  // 18位身份证号
  const idCardPattern = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/
  return idCardPattern.test(idCardStr)
}

/**
 * 校验是否为数字字符串
 * @param {string|number} value - 值
 * @returns {boolean} 是否为数字字符串
 */
function isNumeric(value) {
  if (value === null || value === undefined || value === '') {
    return false
  }
  return !isNaN(value) && !isNaN(parseFloat(value))
}

/**
 * 校验是否为空（包括null、undefined、空字符串、空数组、空对象）
 * @param {*} value - 任意值
 * @returns {boolean} 是否为空
 */
function isEmpty(value) {
  if (value === null || value === undefined || value === '') {
    return true
  }
  if (Array.isArray(value) && value.length === 0) {
    return true
  }
  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true
  }
  return false
}

module.exports = {
  isPhone,
  isEmail,
  isUrl,
  toEmptyString,
  isIdCard,
  isNumeric,
  isEmpty
}
