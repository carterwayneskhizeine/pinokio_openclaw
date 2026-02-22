# Pinokio + OpenClaw 启动器（已修复）

## 更新日志

- ✅ 修复了启动命令：`pnpm openclaw` → `pnpm gateway:dev`
- ✅ 添加了详细的日志输出
- ✅ 改进了错误处理

## 快速开始

```bash
cd D:\Code\goldieopenclaw\pinokio
launch.bat
```

## 工作模式

当前配置使用 **Gateway Dev 模式**：
- 跳过频道连接（OPENCLAW_SKIP_CHANNELS=1）
- 使用开发配置（OPENCLAW_PROFILE=dev）
- 在端口 19001 运行

## 如果 OpenClaw 仍然退出

### 方案 1：先运行 Setup

```bash
cd D:\Code\goldieopenclaw
pnpm start configure
```

按照向导完成配置后，再运行启动器。

### 方案 2：检查配置

```bash
cd D:\Code\goldieopenclaw
openclaw config list
```

### 方案 3：使用 TUI 模式

如果不想用 Gateway 模式，可以改用 TUI：

修改 `launch.js`，将：
```javascript
openclawProcess = spawn('pnpm', ['gateway:dev'], {
```

改为：
```javascript
openclawProcess = spawn('pnpm', ['tui'], {
```

### 方案 4：仅启动 Pinokio

如果 OpenClaw 暂时不需要，可以只启动 Pinokio：

```bash
cd D:\Code\goldieopenclaw\pinokio
npm start
```

## 日志说明

启动器会显示：

```
[Launcher] Starting Pinokio + OpenClaw...
[Launcher] Pinokio path: D:\Code\goldieopenclaw\pinokio
[Launcher] OpenClaw path: D:\Code\goldieopenclaw
[Launcher] Starting Pinokio...
[Launcher] Pinokio started with PID: XXXXX
[Launcher] Starting OpenClaw...
[Launcher] Working directory: D:\Code\goldieopenclaw
[Launcher] Using command: pnpm gateway:dev
[Launcher] OpenClaw started with PID: XXXXX
```

如果看到：
- `Error: EADDRINUSE` - 端口被占用
- `exit code: 1` - 其他错误，查看 OpenClaw 的完整错误信息

## 其他命令

查看详细测试步骤：`TEST.md`
