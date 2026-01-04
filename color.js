/**
 * 颜色工具函数
 */

/**
 * RGB转十六进制
 * @param {number} r - 红色值 (0-255)
 * @param {number} g - 绿色值 (0-255)
 * @param {number} b - 蓝色值 (0-255)
 * @returns {string} 十六进制颜色值（如：#FF0000）
 */
function rgbToHex(r, g, b) {
  const toHex = n => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  return '#' + toHex(r) + toHex(g) + toHex(b)
}

/**
 * 十六进制转RGB
 * @param {string} hex - 十六进制颜色值（如：#FF0000 或 FF0000）
 * @returns {Object} RGB对象 {r, g, b}
 */
function hexToRgb(hex) {
  if (!hex || typeof hex !== 'string') {
    return null
  }

  // 移除 # 号
  hex = hex.replace('#', '')

  // 处理3位十六进制
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(char => char + char)
      .join('')
  }

  if (hex.length !== 6) {
    return null
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return { r, g, b }
}

/**
 * RGB转HSL
 * @param {number} r - 红色值 (0-255)
 * @param {number} g - 绿色值 (0-255)
 * @param {number} b - 蓝色值 (0-255)
 * @returns {Object} HSL对象 {h, s, l}
 */
function rgbToHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h,
    s,
    l = (max + min) / 2

  if (max === min) {
    h = s = 0 // 无色彩
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

/**
 * HSL转RGB
 * @param {number} h - 色相 (0-360)
 * @param {number} s - 饱和度 (0-100)
 * @param {number} l - 亮度 (0-100)
 * @returns {Object} RGB对象 {r, g, b}
 */
function hslToRgb(h, s, l) {
  h /= 360
  s /= 100
  l /= 100

  let r, g, b

  if (s === 0) {
    r = g = b = l // 无色彩
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

/**
 * 十六进制转HSL
 * @param {string} hex - 十六进制颜色值
 * @returns {Object} HSL对象 {h, s, l}
 */
function hexToHsl(hex) {
  const rgb = hexToRgb(hex)
  if (!rgb) return null
  return rgbToHsl(rgb.r, rgb.g, rgb.b)
}

/**
 * HSL转十六进制
 * @param {number} h - 色相 (0-360)
 * @param {number} s - 饱和度 (0-100)
 * @param {number} l - 亮度 (0-100)
 * @returns {string} 十六进制颜色值
 */
function hslToHex(h, s, l) {
  const rgb = hslToRgb(h, s, l)
  return rgbToHex(rgb.r, rgb.g, rgb.b)
}

/**
 * 获取颜色的透明度版本（RGBA格式）
 * @param {string} hex - 十六进制颜色值
 * @param {number} alpha - 透明度 (0-1)
 * @returns {string} RGBA颜色字符串
 */
function hexToRgba(hex, alpha = 1) {
  const rgb = hexToRgb(hex)
  if (!rgb) return `rgba(0, 0, 0, ${alpha})`
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
}

/**
 * RGBA转十六进制
 * @param {string} rgba - RGBA颜色字符串（如：rgba(255, 0, 0, 0.5)）
 * @param {boolean} includeAlpha - 是否包含透明度通道，默认false
 * @returns {string} 十六进制颜色值（如：#FF0000 或 #FF000080）
 */
function rgbaToHex(rgba, includeAlpha = false) {
  if (!rgba || typeof rgba !== 'string') {
    return null
  }

  // 匹配 rgba(r, g, b, a) 格式
  const rgbaMatch = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
  if (!rgbaMatch) {
    return null
  }

  const r = parseInt(rgbaMatch[1], 10)
  const g = parseInt(rgbaMatch[2], 10)
  const b = parseInt(rgbaMatch[3], 10)
  const alpha = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1

  // 验证值范围
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255 || alpha < 0 || alpha > 1) {
    return null
  }

  const toHex = n => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  let hex = '#' + toHex(r) + toHex(g) + toHex(b)

  // 如果包含透明度，添加alpha通道（0-255）
  if (includeAlpha) {
    const alphaHex = Math.round(alpha * 255)
    hex += toHex(alphaHex)
  }

  return hex
}

/**
 * 生成渐变色数组
 * @param {string} startColor - 起始颜色（十六进制）
 * @param {string} endColor - 结束颜色（十六进制）
 * @param {number} steps - 渐变步数，默认10
 * @returns {Array<string>} 渐变色数组
 */
function generateGradient(startColor, endColor, steps = 10) {
  const colors = []
  const rgb1 = hexToRgb(startColor)
  const rgb2 = hexToRgb(endColor)

  if (!rgb1 || !rgb2) {
    return colors
  }

  for (let i = 0; i <= steps; i++) {
    const ratio = i / steps
    const r = Math.round(rgb1.r * (1 - ratio) + rgb2.r * ratio)
    const g = Math.round(rgb1.g * (1 - ratio) + rgb2.g * ratio)
    const b = Math.round(rgb1.b * (1 - ratio) + rgb2.b * ratio)
    colors.push(rgbToHex(r, g, b))
  }

  return colors
}

/**
 * 生成互补色
 * @param {string} hex - 十六进制颜色值
 * @returns {string} 互补色（十六进制）
 */
function getComplementaryColor(hex) {
  const hsl = hexToHsl(hex)
  if (!hsl) return hex

  const complementaryHue = (hsl.h + 180) % 360
  return hslToHex(complementaryHue, hsl.s, hsl.l)
}

/**
 * 生成三色配色方案
 * @param {string} hex - 基础颜色（十六进制）
 * @returns {Object} 三色配色方案 {primary, secondary, tertiary}
 */
function generateTriadicColors(hex) {
  const hsl = hexToHsl(hex)
  if (!hsl) return { primary: hex, secondary: hex, tertiary: hex }

  const secondaryHue = (hsl.h + 120) % 360
  const tertiaryHue = (hsl.h + 240) % 360

  return {
    primary: hex,
    secondary: hslToHex(secondaryHue, hsl.s, hsl.l),
    tertiary: hslToHex(tertiaryHue, hsl.s, hsl.l)
  }
}

/**
 * 生成随机亮色
 * @returns {string} 随机亮色（十六进制）
 */
function randomLightColor() {
  const h = Math.floor(Math.random() * 360)
  const s = Math.floor(Math.random() * 30) + 70 // 70-100
  const l = Math.floor(Math.random() * 20) + 70 // 70-90
  return hslToHex(h, s, l)
}

/**
 * 生成随机暗色
 * @returns {string} 随机暗色（十六进制）
 */
function randomDarkColor() {
  const h = Math.floor(Math.random() * 360)
  const s = Math.floor(Math.random() * 30) + 70 // 70-100
  const l = Math.floor(Math.random() * 20) + 10 // 10-30
  return hslToHex(h, s, l)
}

module.exports = {
  rgbToHex,
  hexToRgb,
  rgbToHsl,
  hslToRgb,
  hexToHsl,
  hslToHex,
  hexToRgba,
  rgbaToHex,
  generateGradient,
  getComplementaryColor,
  generateTriadicColors,
  randomLightColor,
  randomDarkColor
}
