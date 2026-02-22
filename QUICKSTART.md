# Pinokio + OpenClaw 集成 - 快速开始

## 状态

✅ **已完成配置**，可以直接运行！

## 一键启动

```bash
cd D:\Code\goldieopenclaw\pinokio
npm start
```

## 工作流程

1. Pinokio Electron 应用启动
2. 3 秒后自动启动 OpenClaw（从 `D:\Code\goldieopenclaw` 源代码）
3. 关闭 Pinokio 时自动停止 OpenClaw

## 测试环境

运行集成测试（验证所有组件就绪）：

**Windows:**
```bash
cd D:\Code\goldieopenclaw\pinokio
test-integration.bat
```

**Git Bash / Mac:**
```bash
cd D:\Code\goldieopenclaw\pinokio
bash test-integration.sh
```

## 文件说明

### 核心文件
- `main-standalone.js` - 独立版本的 Pinokio 入口（无需 pinokiod）
- `package.json` - 精简版依赖（仅 electron）

### 备份文件
- `main.js.backup` - 原始 main.js
- `package.json.backup` - 原始 package.json

### 其他版本
- `main-openclaw.js` - 完整版（需要 pinokiod，依赖安装失败）
- `package-openclaw.json` - 完整版配置

## 解决的问题

### 问题 1: 依赖安装失败
**原因**: `@homebridge/node-pty-prebuilt-multiarch` 在 Windows 上编译失败
**解决**: 使用精简版配置，只安装 electron，不依赖 pinokiod

### 问题 2: 路径错误
**原因**: `path.resolve(__dirname, '..', 'openclaw')` 查找不存在的子目录
**解决**: 改为 `path.resolve(__dirname, '..')`，直接指向 `D:\Code\goldieopenclaw`

### 问题 3: Git Bash 问题
**答案**: 不需要使用 Git Bash，普通的 npm install 即可工作

## 当前配置

### package.json（精简版）
```json
{
  "name": "Pinokio-OpenClaw-Minimal",
  "main": "main-standalone.js",
  "dependencies": {
    "electron": "39.2.3"
  }
}
```

### main-standalone.js
- 仅依赖 Electron
- 自动启动 OpenClaw（通过 `pnpm openclaw`）
- 优雅地管理进程生命周期

## 恢复原始版本

如果需要恢复原始 Pinokio：

```bash
cd D:\Code\goldieopenclaw\pinokio
cp package.json.backup package.json
cp main.js.backup main.js
rm -rf node_modules
npm install
```

## 注意事项

1. **不需要 Git Bash** - 普通的 npm install 即可
2. **已经通过集成测试** - 所有组件已就绪
3. **OpenClaw 需要先构建** - 运行 `pnpm build`（已完成）
4. **日志输出** - 启动时会看到 `[Pinokio]` 和 `[OpenClaw]` 前缀的日志

## 自定义

### 修改启动命令

编辑 `main-standalone.js`，找到这一行：

```javascript
openclawProcess = spawn('pnpm', ['openclaw'], {
```

修改为其他命令，例如：
```javascript
openclawProcess = spawn('pnpm', ['gateway:dev'], {  // 开发模式
```

### 修改延迟时间

编辑 `main-standalone.js`，找到这一行：

```javascript
setTimeout(startOpenClaw, 3000)
```

改为其他毫秒数（例如 `5000` = 5 秒）。

## 故障排除

### 问题：OpenClaw 未启动

检查控制台日志：
- 如果看到 `[OpenClaw] Starting from: D:\Code\goldieopenclaw` - 路径正确
- 如果看到 `[OpenClaw] Source path not found` - 路径错误，需要修改代码

### 问题：Electron 启动失败

运行：
```bash
cd D:\Code\goldieopenclaw\pinokio
rm -rf node_modules/electron
npm install
```

### 问题：OpenClaw 进程异常退出

可能原因：
1. 端口被占用
2. 配置文件错误
3. 依赖未安装

检查 OpenClaw 日志或单独运行：
```bash
cd D:\Code\goldieopenclaw
pnpm openclaw
```
