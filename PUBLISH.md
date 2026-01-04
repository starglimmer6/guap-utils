# NPM 包发布流程

## 发布前准备

### 1. 检查 package.json

确保 `package.json` 配置正确：

```json
{
  "name": "guap-utils",
  "version": "1.0.0",
  "description": "一个实用的 JavaScript 工具库",
  "main": "index.js",
  "module": "index.mjs",
  "type": "module",
  "exports": {
    ".": {
      "import": "./index.mjs",
      "require": "./index.js",
      "default": "./index.js"
    }
  },
  "keywords": ["utils", "file", "time", "color", "validate", "data"],
  "author": "你的名字",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "你的仓库地址"
  }
}
```

**重要字段说明：**
- `name`: 包名，必须唯一，不能与现有包冲突
- `version`: 版本号，遵循语义化版本（semver）
- `main`: CommonJS 入口文件，通常是 `index.js`
- `module`: ES 模块入口文件，通常是 `index.mjs`
- `type`: 设置为 `"module"` 支持 ES 模块
- `exports`: 定义包的导出方式，同时支持 import 和 require
- `keywords`: 关键词，便于搜索
- `license`: 许可证类型

### 2. 检查代码质量

```bash
# 检查语法错误（如果有配置 ESLint）
npm run lint

# 运行测试（如果有测试）
npm test
```

### 3. 检查文件完整性

确保以下文件已准备好：
- ✅ `index.js` - 主入口文件
- ✅ `README.md` - 使用文档
- ✅ `package.json` - 包配置
- ✅ `.gitignore` - Git 忽略文件
- ✅ `.npmignore` - NPM 发布忽略文件（可选）

### 4. 创建 .npmignore（可选）

如果不想发布某些文件，创建 `.npmignore`：

```
# 测试文件
test/
*.test.js
*.spec.js

# 开发工具
.vscode/
.idea/
*.swp
*.swo

# Git
.git/
.gitignore

# 其他
node_modules/
npm-debug.log*
.DS_Store
```

## 发布流程

### 第一步：登录 NPM

如果还没有 NPM 账号，先注册：
1. 访问 https://www.npmjs.com/
2. 点击 "Sign Up" 注册账号
3. 验证邮箱

登录 NPM：

```bash
npm login
```

输入：
- Username: 你的用户名
- Password: 你的密码
- Email: 你的邮箱

### 第二步：检查登录状态

```bash
npm whoami
```

如果显示你的用户名，说明登录成功。

### 第三步：检查包名是否可用

```bash
npm view guap-utils
```

如果返回 404，说明包名可用。如果包名已被占用，需要修改 `package.json` 中的 `name` 字段。

### 第四步：更新版本号

遵循语义化版本（Semantic Versioning）：
- `1.0.0` - 主版本号.次版本号.修订号
- **主版本号（Major）**: 不兼容的 API 修改
- **次版本号（Minor）**: 向下兼容的功能性新增
- **修订号（Patch）**: 向下兼容的问题修正

更新版本号的方式：

```bash
# 方式1：手动修改 package.json 中的 version 字段

# 方式2：使用 npm version 命令（推荐）
npm version patch   # 1.0.0 -> 1.0.1 (修订号+1)
npm version minor   # 1.0.0 -> 1.1.0 (次版本号+1，修订号归0)
npm version major   # 1.0.0 -> 2.0.0 (主版本号+1，其他归0)
```

`npm version` 命令会自动：
- 更新 `package.json` 中的版本号
- 创建 Git 标签（如果项目是 Git 仓库）
- 创建 Git commit（如果项目是 Git 仓库）

### 第五步：发布到 NPM

#### 首次发布

```bash
npm publish
```

#### 更新发布

```bash
# 1. 更新版本号
npm version patch  # 或其他版本类型

# 2. 发布
npm publish
```

### 第六步：验证发布

发布成功后，可以通过以下方式验证：

```bash
# 查看包信息
npm view guap-utils

# 安装测试
npm install guap-utils

# 在项目中测试
const utils = require('guap-utils');
console.log(utils);
```

## 发布后的操作

### 1. 创建 Git 标签（如果使用 Git）

```bash
# 如果 npm version 没有自动创建标签
git tag v1.0.0
git push origin v1.0.0
```

### 2. 推送到 Git 仓库

```bash
git add .
git commit -m "chore: publish v1.0.0"
git push origin main
```

### 3. 更新 README（如果需要）

在 README 中添加安装说明和使用示例。

## 常见问题

### 1. 包名已被占用

**错误信息：**
```
npm ERR! 403 You cannot publish over the previously published versions
```

**解决方法：**
- 修改 `package.json` 中的 `name` 字段
- 使用更独特的包名，如：`@your-username/guap-utils`（作用域包）

### 2. 版本号已存在

**错误信息：**
```
npm ERR! 403 You cannot publish over the previously published versions
```

**解决方法：**
- 更新版本号：`npm version patch`
- 或手动修改 `package.json` 中的 `version` 字段

### 3. 未登录或登录过期

**错误信息：**
```
npm ERR! code ENEEDAUTH
npm ERR! need auth This command requires you to be logged in.
```

**解决方法：**
```bash
npm login
```

### 4. 发布作用域包（Scoped Package）

如果要发布作用域包（如 `@your-username/guap-utils`）：

```bash
# 发布时添加 --access public
npm publish --access public
```

### 5. 撤销发布（24小时内）

如果发布后发现严重问题，可以在24小时内撤销：

```bash
# 撤销指定版本
npm unpublish guap-utils@1.0.0

# 撤销整个包（需要联系 npm 支持）
npm unpublish guap-utils --force
```

**注意：** 撤销后该版本号将无法再次使用。

## 版本管理最佳实践

### 1. 使用 npm version

```bash
# 修复 bug
npm version patch

# 新增功能
npm version minor

# 重大更新
npm version major
```

### 2. 使用 Git 标签

```bash
# 查看所有标签
git tag

# 创建标签
git tag -a v1.0.0 -m "Release version 1.0.0"

# 推送标签
git push origin v1.0.0
```

### 3. 使用 CHANGELOG.md

创建 `CHANGELOG.md` 记录版本变更：

```markdown
# Changelog

## [1.0.0] - 2024-01-01

### Added
- 文件工具模块
- 时间工具模块
- 颜色工具模块
- 数据工具模块
- 验证工具模块
```

## 完整发布流程示例

```bash
# 1. 确保代码已提交
git status

# 2. 运行测试（如果有）
npm test

# 3. 更新版本号
npm version patch

# 4. 发布到 NPM
npm publish

# 5. 创建 Git 标签并推送
git push origin main --tags

# 6. 验证发布
npm view guap-utils
```

## 自动化发布（可选）

可以使用 GitHub Actions 或其他 CI/CD 工具自动化发布流程。

## 注意事项

1. **包名唯一性**: 确保包名在 NPM 上唯一
2. **版本号管理**: 遵循语义化版本规范
3. **代码质量**: 发布前确保代码无错误
4. **文档完善**: 确保 README 清晰完整
5. **许可证**: 明确指定许可证类型
6. **安全性**: 不要发布敏感信息（API密钥等）

## 参考链接

- [NPM 官方文档](https://docs.npmjs.com/)
- [语义化版本规范](https://semver.org/lang/zh-CN/)
- [NPM 包发布指南](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
