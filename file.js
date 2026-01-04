/**
 * 文件操作工具函数
 */

/**
 * 获取文件扩展名
 * @param {string} filename - 文件名
 * @returns {string} 文件扩展名（不含点号）
 */
function getExt(filename) {
  if (!filename || typeof filename !== 'string') {
    return ''
  }
  const parts = filename.split('.')
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : ''
}

/**
 * 获取文件名（不含扩展名）
 * @param {string} filepath - 文件路径
 * @returns {string} 文件名（不含扩展名）
 */
function getNameNoExt(filepath) {
  if (!filepath || typeof filepath !== 'string') {
    return ''
  }
  const filename = filepath.split(/[/\\]/).pop()
  const lastDotIndex = filename.lastIndexOf('.')
  return lastDotIndex > 0 ? filename.substring(0, lastDotIndex) : filename
}

/**
 * 获取文件名（含扩展名）
 * @param {string} filepath - 文件路径
 * @returns {string} 文件名
 */
function getName(filepath) {
  if (!filepath || typeof filepath !== 'string') {
    return ''
  }
  return filepath.split(/[/\\]/).pop()
}

/**
 * 格式化文件大小
 * @param {number} bytes - 字节数
 * @param {number} decimals - 小数位数，默认2位
 * @returns {string} 格式化后的文件大小
 */
function formatSize(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  if (!bytes || isNaN(bytes)) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * 生成唯一文件名（添加时间戳）
 * @param {string} filename - 原始文件名
 * @returns {string} 带时间戳的唯一文件名
 */
function genUniqueName(filename) {
  if (!filename || typeof filename !== 'string') {
    return ''
  }
  const ext = getExt(filename)
  const nameWithoutExt = getNameNoExt(filename)
  const timestamp = Date.now()
  return ext ? `${nameWithoutExt}_${timestamp}.${ext}` : `${nameWithoutExt}_${timestamp}`
}

/**
 * 获取文件的MIME类型
 * @param {string} filename - 文件名
 * @returns {string} MIME类型
 */
function getMime(filename) {
  if (!filename || typeof filename !== 'string') {
    return 'application/octet-stream'
  }

  const ext = getExt(filename).toLowerCase()
  const mimeTypes = {
    // 图片
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    bmp: 'image/bmp',
    webp: 'image/webp',
    svg: 'image/svg+xml',
    ico: 'image/x-icon',
    // 视频
    mp4: 'video/mp4',
    avi: 'video/x-msvideo',
    mov: 'video/quicktime',
    wmv: 'video/x-ms-wmv',
    flv: 'video/x-flv',
    webm: 'video/webm',
    mkv: 'video/x-matroska',
    // 音频
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    flac: 'audio/flac',
    aac: 'audio/aac',
    ogg: 'audio/ogg',
    m4a: 'audio/mp4',
    // 文档
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    txt: 'text/plain',
    rtf: 'application/rtf',
    // 其他
    json: 'application/json',
    xml: 'application/xml',
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    zip: 'application/zip',
    rar: 'application/x-rar-compressed'
  }

  return mimeTypes[ext] || 'application/octet-stream'
}

/**
 * 计算base64字符串的大小（MB）
 * @param {string} base64 - base64字符串
 * @returns {number} 大小（MB）
 */
function calcBase64Size(base64) {
  if (!base64 || typeof base64 !== 'string') {
    return 0
  }
  // 移除data URL前缀（如：data:image/jpeg;base64,）
  const base64Data = base64.includes(',') ? base64.split(',')[1] : base64
  // base64编码后的大小约为原文件的4/3，再除以1024*1024得到MB
  const sizeInBytes = (base64Data.length * 3) / 4
  return sizeInBytes / (1024 * 1024)
}

/**
 * 文件转base64
 * @param {File|Blob} file - 文件对象
 * @returns {Promise<string>} base64字符串
 */
function toBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('文件不能为空'))
      return
    }
    try {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const base64Url = reader.result
        resolve(base64Url)
      }
      reader.onerror = err => {
        reject(err)
      }
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * base64转Blob（二进制）
 * @param {string} dataUrl - base64字符串（data URL格式）
 * @returns {Blob} Blob对象
 */
function toBlob(dataUrl) {
  if (!dataUrl || typeof dataUrl !== 'string') {
    throw new Error('base64字符串不能为空')
  }

  const arr = dataUrl.split(',')
  if (arr.length < 2) {
    throw new Error('无效的base64格式')
  }

  const mimeMatch = arr[0].match(/:(.*?);/)
  if (!mimeMatch) {
    throw new Error('无法识别MIME类型')
  }

  const mime = mimeMatch[1]
  const bstr = atob(arr[1])
  const n = bstr.length
  const u8arr = new Uint8Array(n)

  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i)
  }

  return new Blob([u8arr], { type: mime })
}

/**
 * base64转File对象
 * @param {string} dataUrl - base64字符串（data URL格式）
 * @param {string} fileName - 文件名
 * @returns {File} File对象
 */
function toFile(dataUrl, fileName) {
  if (!fileName || typeof fileName !== 'string') {
    throw new Error('文件名不能为空')
  }

  const blob = toBlob(dataUrl)
  const file = new File([blob], fileName, { type: blob.type })
  return file
}

/**
 * 压缩base64图片
 * @param {string} base64Image - base64图片字符串
 * @param {number} maxWidth - 最大宽度，默认1000
 * @param {number} quality - 压缩质量（0-1），默认根据文件大小自动调整
 * @returns {Promise<string>} 压缩后的base64字符串
 */
function compressImg(base64Image, maxWidth = 1000, quality = null) {
  return new Promise((resolve, reject) => {
    if (!base64Image || typeof base64Image !== 'string') {
      reject(new Error('base64图片字符串不能为空'))
      return
    }

    // 检查是否在浏览器环境
    if (typeof Image === 'undefined' || typeof document === 'undefined') {
      reject(new Error('此功能仅在浏览器环境中可用'))
      return
    }

    const img = new Image()

    // 如果没有指定质量，根据文件大小自动计算
    if (quality === null) {
      const size = calcBase64Size(base64Image)
      if (size <= 1) {
        quality = 0.9
      } else if (size > 1) {
        quality = 0.8
      } else {
        quality = 0.7
      }
    }

    img.onload = function () {
      try {
        const imgWidth = this.width
        const imgHeight = this.height
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        let canvasWidth = imgWidth
        let canvasHeight = imgHeight

        // 如果图片尺寸超过最大宽度，按比例缩放
        if (Math.max(imgWidth, imgHeight) > maxWidth) {
          if (imgWidth > imgHeight) {
            canvasWidth = maxWidth
            canvasHeight = (maxWidth * imgHeight) / imgWidth
          } else {
            canvasHeight = maxWidth
            canvasWidth = (maxWidth * imgWidth) / imgHeight
          }
        }

        canvas.width = canvasWidth
        canvas.height = canvasHeight

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height)

        const compressedBase64 = canvas.toDataURL('image/jpeg', quality)
        resolve(compressedBase64)
      } catch (error) {
        reject(error)
      }
    }

    img.onerror = function () {
      reject(new Error('图片加载失败'))
    }

    img.src = base64Image
    img.setAttribute('crossOrigin', 'Anonymous')
  })
}

module.exports = {
  getExt,
  getNameNoExt,
  getName,
  formatSize,
  genUniqueName,
  getMime,
  calcBase64Size,
  toBase64,
  toBlob,
  toFile,
  compressImg
}
