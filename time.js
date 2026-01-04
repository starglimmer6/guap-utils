/**
 * 日期时间工具函数
 */

/**
 * 格式化日期时间
 * @param {Date|string|number} date - 日期对象、日期字符串或时间戳
 * @param {string} format - 格式化字符串，默认 'YYYY-MM-DD HH:mm:ss'
 * @returns {string} 格式化后的日期字符串
 */
function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) {
    date = new Date();
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
    .replace('SSS', milliseconds);
}

/**
 * 格式化数字字符串为日期时间
 * @param {string|number} numStr - 数字字符串或数字
 * @param {string} type - 类型：'DT_NUM'(8位日期), 'TM_NUM'(6位时间), 'DTTM_NUM'(14位日期时间)
 * @returns {string} 格式化后的日期时间字符串
 */
function formatNum(numStr, type = 'DTTM_NUM') {
  if (!numStr) {
    return ''
  }
  
  const str = String(numStr).replace(/\D/g, '') // 移除非数字字符
  
  switch (type) {
    case 'DT_NUM':
      // 8位数字：YYYYMMDD -> YYYY-MM-DD
      if (str.length === 8) {
        return str.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
      }
      break
    case 'TM_NUM':
      // 6位数字：HHmmss -> HH:mm:ss
      if (str.length === 6) {
        return str.replace(/^(\d{2})(\d{2})(\d{2})$/, '$1:$2:$3')
      }
      break
    case 'DTTM_NUM':
      // 14位数字：YYYYMMDDHHmmss -> YYYY-MM-DD HH:mm:ss
      if (str.length === 14) {
        return str.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1-$2-$3 $4:$5:$6')
      }
      break
    default:
      // 自动识别：根据长度自动判断类型
      if (str.length === 8) {
        return str.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
      } else if (str.length === 6) {
        return str.replace(/^(\d{2})(\d{2})(\d{2})$/, '$1:$2:$3')
      } else if (str.length === 14) {
        return str.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1-$2-$3 $4:$5:$6')
      }
  }
  
  return str // 如果格式不匹配，返回原字符串
}

/**
 * 获取相对时间（如：刚刚、5分钟前、2小时前等）
 * @param {Date|string|number} date - 日期对象、日期字符串或时间戳
 * @returns {string} 相对时间字符串
 */
function getRelativeTime(date) {
  if (!date) {
    return '';
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }
  
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  if (seconds < 60) {
    return '刚刚';
  } else if (minutes < 60) {
    return `${minutes}分钟前`;
  } else if (hours < 24) {
    return `${hours}小时前`;
  } else if (days < 30) {
    return `${days}天前`;
  } else if (months < 12) {
    return `${months}个月前`;
  } else {
    return `${years}年前`;
  }
}

/**
 * 获取时间戳
 * @param {Date|string} date - 日期对象或日期字符串，不传则返回当前时间戳
 * @returns {number} 时间戳（毫秒）
 */
function getTimestamp(date) {
  if (!date) {
    return Date.now();
  }
  
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  if (date instanceof Date) {
    return date.getTime();
  }
  
  return Date.now();
}

/**
 * 时间戳转日期对象
 * @param {number} timestamp - 时间戳（毫秒）
 * @returns {Date} 日期对象
 */
function timestampToDate(timestamp) {
  return new Date(timestamp);
}

/**
 * 获取今天的开始时间（00:00:00）
 * @returns {Date} 今天的开始时间
 */
function getTodayStart() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

/**
 * 获取今天的结束时间（23:59:59.999）
 * @returns {Date} 今天的结束时间
 */
function getTodayEnd() {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return today;
}

/**
 * 获取指定日期的开始时间
 * @param {Date|string|number} date - 日期
 * @returns {Date} 开始时间
 */
function getDateStart(date) {
  if (!date) {
    date = new Date();
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * 获取指定日期的结束时间
 * @param {Date|string|number} date - 日期
 * @returns {Date} 结束时间
 */
function getDateEnd(date) {
  if (!date) {
    date = new Date();
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * 计算两个日期之间的天数差
 * @param {Date|string|number} date1 - 第一个日期
 * @param {Date|string|number} date2 - 第二个日期
 * @returns {number} 天数差（可为负数）
 */
function getDaysDiff(date1, date2) {
  if (typeof date1 === 'string' || typeof date1 === 'number') {
    date1 = new Date(date1);
  }
  if (typeof date2 === 'string' || typeof date2 === 'number') {
    date2 = new Date(date2);
  }
  
  const diff = date2.getTime() - date1.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/**
 * 判断是否为今天
 * @param {Date|string|number} date - 日期
 * @returns {boolean} 是否为今天
 */
function isToday(date) {
  if (!date) {
    return false;
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

/**
 * 判断是否为昨天
 * @param {Date|string|number} date - 日期
 * @returns {boolean} 是否为昨天
 */
function isYesterday(date) {
  if (!date) {
    return false;
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
}

/**
 * 判断是否为明天
 * @param {Date|string|number} date - 日期
 * @returns {boolean} 是否为明天
 */
function isTomorrow(date) {
  if (!date) {
    return false;
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return date.toDateString() === tomorrow.toDateString();
}

/**
 * 添加天数
 * @param {Date|string|number} date - 日期
 * @param {number} days - 要添加的天数（可为负数）
 * @returns {Date} 新的日期对象
 */
function addDays(date, days) {
  if (!date) {
    date = new Date();
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * 获取上一天时间
 * @param {Date|string|number} date - 日期，不传则使用当前日期
 * @returns {Date} 上一天的日期对象
 */
function getPrevDay(date) {
  if (!date) {
    date = new Date();
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  const result = new Date(date);
  result.setDate(result.getDate() - 1);
  return result;
}

/**
 * 添加小时
 * @param {Date|string|number} date - 日期
 * @param {number} hours - 要添加的小时数（可为负数）
 * @returns {Date} 新的日期对象
 */
function addHours(date, hours) {
  if (!date) {
    date = new Date();
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
}

/**
 * 添加分钟
 * @param {Date|string|number} date - 日期
 * @param {number} minutes - 要添加的分钟数（可为负数）
 * @returns {Date} 新的日期对象
 */
function addMinutes(date, minutes) {
  if (!date) {
    date = new Date();
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  const result = new Date(date);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
}

/**
 * 添加月份
 * @param {Date|string|number} date - 日期
 * @param {number} months - 要添加的月数（可为负数）
 * @returns {Date} 新的日期对象
 */
function addMonths(date, months) {
  if (!date) {
    date = new Date();
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * 添加年份
 * @param {Date|string|number} date - 日期
 * @param {number} years - 要添加的年数（可为负数）
 * @returns {Date} 新的日期对象
 */
function addYears(date, years) {
  if (!date) {
    date = new Date();
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

/**
 * 获取星期几（中文）
 * @param {Date|string|number} date - 日期
 * @returns {string} 星期几
 */
function getWeekday(date) {
  if (!date) {
    date = new Date();
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return weekdays[date.getDay()];
}

/**
 * 获取星期几（英文）
 * @param {Date|string|number} date - 日期
 * @param {boolean} short - 是否使用缩写，默认false
 * @returns {string} 星期几
 */
function getWeekdayEn(date, short = false) {
  if (!date) {
    date = new Date();
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekdaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return short ? weekdaysShort[date.getDay()] : weekdays[date.getDay()];
}

/**
 * 获取月份名称（中文）
 * @param {Date|string|number} date - 日期
 * @returns {string} 月份名称
 */
function getMonthName(date) {
  if (!date) {
    date = new Date();
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  return months[date.getMonth()];
}

/**
 * 获取月份名称（英文）
 * @param {Date|string|number} date - 日期
 * @param {boolean} short - 是否使用缩写，默认false
 * @returns {string} 月份名称
 */
function getMonthNameEn(date, short = false) {
  if (!date) {
    date = new Date();
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return short ? monthsShort[date.getMonth()] : months[date.getMonth()];
}

/**
 * 判断是否为工作日（周一到周五）
 * @param {Date|string|number} date - 日期
 * @returns {boolean} 是否为工作日
 */
function isWeekday(date) {
  if (!date) {
    date = new Date();
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  const day = date.getDay();
  return day >= 1 && day <= 5;
}

/**
 * 判断是否为周末（周六和周日）
 * @param {Date|string|number} date - 日期
 * @returns {boolean} 是否为周末
 */
function isWeekend(date) {
  if (!date) {
    date = new Date();
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  const day = date.getDay();
  return day === 0 || day === 6;
}

/**
 * 获取季度
 * @param {Date|string|number} date - 日期
 * @returns {number} 季度（1-4）
 */
function getQuarter(date) {
  if (!date) {
    date = new Date();
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  const month = date.getMonth();
  return Math.floor(month / 3) + 1;
}

/**
 * 计算年龄
 * @param {Date|string|number} birthDate - 出生日期
 * @param {Date|string|number} referenceDate - 参考日期，默认今天
 * @returns {number} 年龄
 */
function calculateAge(birthDate, referenceDate) {
  if (!birthDate) {
    return 0;
  }
  
  if (typeof birthDate === 'string' || typeof birthDate === 'number') {
    birthDate = new Date(birthDate);
  }
  
  if (!referenceDate) {
    referenceDate = new Date();
  } else if (typeof referenceDate === 'string' || typeof referenceDate === 'number') {
    referenceDate = new Date(referenceDate);
  }
  
  let age = referenceDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = referenceDate.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && referenceDate.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * 格式化时长（毫秒转可读格式）
 * @param {number} milliseconds - 毫秒数
 * @returns {string} 格式化后的时长
 */
function formatDuration(milliseconds) {
  if (!milliseconds || isNaN(milliseconds) || milliseconds < 0) {
    return '0秒';
  }
  
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days}天${hours % 24}小时${minutes % 60}分钟`;
  } else if (hours > 0) {
    return `${hours}小时${minutes % 60}分钟${seconds % 60}秒`;
  } else if (minutes > 0) {
    return `${minutes}分钟${seconds % 60}秒`;
  } else {
    return `${seconds}秒`;
  }
}

/**
 * 获取本月的第一天
 * @param {Date|string|number} date - 日期
 * @returns {Date} 本月第一天
 */
function getMonthStart(date) {
  if (!date) {
    date = new Date();
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  const result = new Date(date);
  result.setDate(1);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * 获取本月的最后一天
 * @param {Date|string|number} date - 日期
 * @returns {Date} 本月最后一天
 */
function getMonthEnd(date) {
  if (!date) {
    date = new Date();
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  const result = new Date(date);
  result.setMonth(result.getMonth() + 1, 0);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * 获取本年的第一天
 * @param {Date|string|number} date - 日期
 * @returns {Date} 本年第一天
 */
function getYearStart(date) {
  if (!date) {
    date = new Date();
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  const result = new Date(date);
  result.setMonth(0, 1);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * 获取本年的最后一天
 * @param {Date|string|number} date - 日期
 * @returns {Date} 本年最后一天
 */
function getYearEnd(date) {
  if (!date) {
    date = new Date();
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  const result = new Date(date);
  result.setMonth(11, 31);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * 判断是否为同一年
 * @param {Date|string|number} date1 - 第一个日期
 * @param {Date|string|number} date2 - 第二个日期
 * @returns {boolean} 是否为同一年
 */
function isSameYear(date1, date2) {
  if (!date1 || !date2) {
    return false;
  }
  
  if (typeof date1 === 'string' || typeof date1 === 'number') {
    date1 = new Date(date1);
  }
  if (typeof date2 === 'string' || typeof date2 === 'number') {
    date2 = new Date(date2);
  }
  
  return date1.getFullYear() === date2.getFullYear();
}

/**
 * 判断是否为同一月
 * @param {Date|string|number} date1 - 第一个日期
 * @param {Date|string|number} date2 - 第二个日期
 * @returns {boolean} 是否为同一月
 */
function isSameMonth(date1, date2) {
  if (!date1 || !date2) {
    return false;
  }
  
  if (typeof date1 === 'string' || typeof date1 === 'number') {
    date1 = new Date(date1);
  }
  if (typeof date2 === 'string' || typeof date2 === 'number') {
    date2 = new Date(date2);
  }
  
  return date1.getFullYear() === date2.getFullYear() && 
         date1.getMonth() === date2.getMonth();
}

/**
 * 获取当月所有日期
 * @param {Date|string|number} date - 日期，不传则使用当前日期
 * @param {string} format - 格式化格式，不传则返回Date对象数组
 * @returns {Array<Date|string>} 日期数组
 */
function getMonthDates(date, format = null) {
  if (!date) {
    date = new Date();
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  const year = date.getFullYear();
  const month = date.getMonth();
  
  // 获取当月第一天和最后一天
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const dates = [];
  const daysInMonth = lastDay.getDate();
  
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month, day);
    if (format) {
      dates.push(formatDate(currentDate, format));
    } else {
      dates.push(currentDate);
    }
  }
  
  return dates;
}

/**
 * 获取当前日期前或后多少天的所有日期
 * @param {Date|string|number} date - 基准日期，不传则使用当前日期
 * @param {number} days - 天数，正数表示之后，负数表示之前
 * @param {string} format - 格式化格式，不传则返回Date对象数组
 * @returns {Array<Date|string>} 日期数组
 */
function getDateRange(date, days, format = null) {
  if (!date) {
    date = new Date();
  }
  
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  
  if (typeof days !== 'number' || isNaN(days)) {
    return [];
  }
  
  const dates = [];
  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);
  
  // 确定起始和结束日期
  let start, end;
  if (days >= 0) {
    // 之后的天数：从今天到N天后
    start = new Date(startDate);
    end = addDays(startDate, days);
  } else {
    // 之前的天数：从N天前到今天
    start = addDays(startDate, days);
    end = new Date(startDate);
  }
  
  // 确保start <= end
  if (start > end) {
    [start, end] = [end, start];
  }
  
  // 生成日期数组
  const current = new Date(start);
  while (current <= end) {
    if (format) {
      dates.push(formatDate(current, format));
    } else {
      dates.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }
  
  return dates;
}

module.exports = {
  formatDate,
  formatNum,
  getRelativeTime,
  getTimestamp,
  timestampToDate,
  getTodayStart,
  getTodayEnd,
  getDateStart,
  getDateEnd,
  getDaysDiff,
  isToday,
  isYesterday,
  isTomorrow,
  addDays,
  getPrevDay,
  addHours,
  addMinutes,
  addMonths,
  addYears,
  getWeekday,
  getWeekdayEn,
  getMonthName,
  getMonthNameEn,
  isWeekday,
  isWeekend,
  getQuarter,
  calculateAge,
  formatDuration,
  getMonthStart,
  getMonthEnd,
  getYearStart,
  getYearEnd,
  isSameYear,
  isSameMonth,
  getMonthDates,
  getDateRange
};
