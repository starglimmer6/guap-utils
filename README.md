# guap-utils
📚 无框架依赖的 JavaScript 通用工具函数库，封装前端高频使用的工具方法，提升开发效率。

## 📦 guap 生态成员
本包是 guap 技术生态核心成员之一，生态全套产品：
✅ guap-utils：JavaScript 通用工具函数包（基础核心）
✅ guap-components-vue：Vue3 专属业务组件库（Vue3 技术栈）
✅ guap-components-uni：Uniapp 跨端组件库（多端适配）

## ✨ 核心特性
- 🚀 零依赖，体积小巧，按需引入
- 📌 覆盖数组、对象、字符串、时间、浏览器等全场景工具函数
- 🔨 兼容所有前端项目，Vue/React/Uniapp 均可使用

## 🚀 安装使用
# 安装当前包

```bash
npm install guap-utils --save
```

## 快速开始

### CommonJS 方式

```javascript
const utils = require('guap-utils');
```

### ES Module 方式

```javascript
// 方式1：默认导入
import utils from 'guap-utils';

// 方式2：命名导入
import { file, time, color, data, validate } from 'guap-utils';

// 使用示例
const ext = utils.file.getExt('image.jpg'); // 'jpg'
// 或
const ext = file.getExt('image.jpg'); // 'jpg'

// 时间工具
const formatted = utils.time.formatDate(new Date(), 'YYYY-MM-DD'); // '2024-01-01'
const relative = utils.time.getRelativeTime(new Date(Date.now() - 3600000)); // '1小时前'

// 颜色工具
const hex = utils.color.rgbToHex(255, 0, 0); // '#ff0000'
const rgb = utils.color.hexToRgb('#ff0000'); // { r: 255, g: 0, b: 0 }

// 验证工具
const isPhone = utils.validate.isPhone('13800138000'); // true
const isEmail = utils.validate.isEmail('test@example.com'); // true

// 数据工具
const tree = utils.data.handleTree(flatData, 'id', 'parentId', 'children');
```

## 功能模块

### 📁 文件工具 (file)

#### 基础操作
- `getExt(filename)` - 获取文件扩展名
- `getNameNoExt(filepath)` - 获取文件名（不含扩展名）
- `getName(filepath)` - 获取文件名（含扩展名）

#### 文件大小
- `formatSize(bytes, decimals)` - 格式化文件大小

#### Base64 转换
- `toBase64(file)` - 文件转 base64（返回 Promise）
- `toBlob(dataUrl)` - base64 转 Blob（二进制）
- `toFile(dataUrl, fileName)` - base64 转 File 对象
- `calcBase64Size(base64)` - 计算 base64 字符串的大小（MB）

#### 图片处理
- `compressImg(base64Image, maxWidth, quality)` - 压缩 base64 图片（返回 Promise）

#### 其他
- `genUniqueName(filename)` - 生成唯一文件名（添加时间戳）
- `getMime(filename)` - 获取文件的 MIME 类型

### ⏰ 时间工具 (time)

#### 格式化
- `formatDate(date, format)` - 格式化日期时间
- `formatNum(numStr, type)` - 格式化数字字符串为日期时间（DT_NUM/TM_NUM/DTTM_NUM）
- `getRelativeTime(date)` - 获取相对时间（如：刚刚、5分钟前）
- `formatDuration(milliseconds)` - 格式化时长（毫秒转可读格式）

#### 时间戳
- `getTimestamp(date)` - 获取时间戳
- `timestampToDate(timestamp)` - 时间戳转日期对象

#### 日期范围
- `getTodayStart()` - 获取今天的开始时间
- `getTodayEnd()` - 获取今天的结束时间
- `getDateStart(date)` - 获取指定日期的开始时间
- `getDateEnd(date)` - 获取指定日期的结束时间
- `getMonthStart(date)` - 获取本月的第一天
- `getMonthEnd(date)` - 获取本月的最后一天
- `getYearStart(date)` - 获取本年的第一天
- `getYearEnd(date)` - 获取本年的最后一天
- `getMonthDates(date, format)` - 获取当月所有日期
- `getDateRange(date, days, format)` - 获取当前日期前或后多少天的所有日期

#### 日期计算
- `getDaysDiff(date1, date2)` - 计算两个日期之间的天数差
- `addDays(date, days)` - 添加天数
- `getPrevDay(date)` - 获取上一天时间
- `addHours(date, hours)` - 添加小时
- `addMinutes(date, minutes)` - 添加分钟
- `addMonths(date, months)` - 添加月份
- `addYears(date, years)` - 添加年份

#### 日期判断
- `isToday(date)` - 判断是否为今天
- `isYesterday(date)` - 判断是否为昨天
- `isTomorrow(date)` - 判断是否为明天
- `isWeekday(date)` - 判断是否为工作日（周一到周五）
- `isWeekend(date)` - 判断是否为周末（周六和周日）
- `isSameYear(date1, date2)` - 判断是否为同一年
- `isSameMonth(date1, date2)` - 判断是否为同一月

#### 信息获取
- `getWeekday(date)` - 获取星期几（中文）
- `getWeekdayEn(date, short)` - 获取星期几（英文）
- `getMonthName(date)` - 获取月份名称（中文）
- `getMonthNameEn(date, short)` - 获取月份名称（英文）
- `getQuarter(date)` - 获取季度（1-4）
- `calculateAge(birthDate, referenceDate)` - 计算年龄

### 🎨 颜色工具 (color)

#### 颜色转换
- `rgbToHex(r, g, b)` - RGB 转十六进制
- `hexToRgb(hex)` - 十六进制转 RGB
- `rgbToHsl(r, g, b)` - RGB 转 HSL
- `hslToRgb(h, s, l)` - HSL 转 RGB
- `hexToHsl(hex)` - 十六进制转 HSL
- `hslToHex(h, s, l)` - HSL 转十六进制
- `hexToRgba(hex, alpha)` - 十六进制转 RGBA 格式
- `rgbaToHex(rgba, includeAlpha)` - RGBA 转十六进制

#### 颜色调整
- `lighten(hex, percent)` - 颜色变亮
- `darken(hex, percent)` - 颜色变暗
- `adjustSaturation(hex, percent)` - 调整颜色饱和度
- `adjustHue(hex, degrees)` - 调整颜色色相

#### 颜色分析
- `getBrightness(hex)` - 获取颜色亮度值
- `isLight(hex)` - 判断颜色是否为亮色
- `isDark(hex)` - 判断颜色是否为暗色
- `getContrastColor(hex)` - 获取颜色的对比色（黑白）
- `isValidHex(hex)` - 验证是否为有效的十六进制颜色值

#### 颜色生成
- `randomColor()` - 生成随机颜色
- `randomLightColor()` - 生成随机亮色
- `randomDarkColor()` - 生成随机暗色
- `generateGradient(startColor, endColor, steps)` - 生成渐变色数组
- `getComplementaryColor(hex)` - 生成互补色
- `generateTriadicColors(hex)` - 生成三色配色方案

### 📊 数据工具 (data)

#### 数据结构处理
- `handleTree(data, id, parentId, children)` - 构造树型结构数据
- `groupBy(data, key)` - 数组归类（按指定字段分组）

### ✅ 验证工具 (validate)

#### 格式验证
- `isPhone(phone)` - 校验是否为手机号
- `isEmail(email)` - 校验是否为邮箱
- `isUrl(url)` - 校验是否为链接（URL）
- `isIdCard(idCard)` - 校验是否为身份证号（中国）
- `isNumeric(value)` - 校验是否为数字字符串

#### 值处理
- `toEmptyString(value)` - 将 undefined、null 转换为空字符串，其他值保持不变
- `isEmpty(value)` - 校验是否为空（包括 null、undefined、空字符串、空数组、空对象）

## 使用示例

### 文件操作

```javascript
// 获取文件信息
const ext = utils.file.getExt('image.jpg'); // 'jpg'
const name = utils.file.getName('/path/to/file.txt'); // 'file.txt'
const size = utils.file.formatSize(1024000); // '1000 KB'

// Base64 转换
const base64 = await utils.file.toBase64(file);
const blob = utils.file.toBlob(base64);
const fileObj = utils.file.toFile(base64, 'image.jpg');

// 图片压缩
const compressed = await utils.file.compressImg(base64Image, 1000, 0.8);
```

### 时间处理

```javascript
// 格式化
const date = utils.time.formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss');
const numDate = utils.time.formatNum('20240101', 'DT_NUM'); // '2024-01-01'
const relative = utils.time.getRelativeTime(new Date(Date.now() - 3600000)); // '1小时前'

// 日期范围
const monthDates = utils.time.getMonthDates(new Date(), 'YYYY-MM-DD');
const dateRange = utils.time.getDateRange(new Date(), 7, 'YYYY-MM-DD');

// 日期计算
const prevDay = utils.time.getPrevDay(new Date());
const nextWeek = utils.time.addDays(new Date(), 7);
```

### 颜色处理

```javascript
// 颜色转换
const hex = utils.color.rgbToHex(255, 0, 0); // '#ff0000'
const rgb = utils.color.hexToRgb('#ff0000'); // { r: 255, g: 0, b: 0 }
const rgba = utils.color.hexToRgba('#ff0000', 0.5); // 'rgba(255, 0, 0, 0.5)'
const hexFromRgba = utils.color.rgbaToHex('rgba(255, 0, 0, 0.5)'); // '#ff0000'

// 颜色调整
const lighter = utils.color.lighten('#ff0000', 20);
const darker = utils.color.darken('#ff0000', 20);

// 颜色生成
const random = utils.color.randomColor();
const gradient = utils.color.generateGradient('#ff0000', '#0000ff', 10);
```

### 数据转换

```javascript
// 构造树型结构
const flatData = [
  { id: 1, name: 'A', parentId: null },
  { id: 2, name: 'B', parentId: 1 },
  { id: 3, name: 'C', parentId: 1 }
];
const tree = utils.data.handleTree(flatData, 'id', 'parentId', 'children');

// 数组分组
const data = [
  { category: 'A', value: 1 },
  { category: 'B', value: 2 },
  { category: 'A', value: 3 }
];
const grouped = utils.data.groupBy(data, 'category');
```

### 数据验证

```javascript
// 格式验证
utils.validate.isPhone('13800138000'); // true
utils.validate.isEmail('test@example.com'); // true
utils.validate.isUrl('https://www.example.com'); // true
utils.validate.isIdCard('110101199003075678'); // true

// 值处理
utils.validate.toEmptyString(null); // ''
utils.validate.toEmptyString(undefined); // ''
utils.validate.toEmptyString('hello'); // 'hello' (保持不变)
utils.validate.isEmpty(null); // true
utils.validate.isEmpty([]); // true
```

## License

MIT
