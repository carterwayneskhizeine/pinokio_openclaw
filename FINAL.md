# Pinokio + OpenClaw 启动器 - 最终版本

## ✅ 完全修复！

**问题解决**：正确的启动命令是 `node scripts/run-node.mjs --dev gateway`

## 🚀 快速开始

### Windows
```bash
cd D:\Code\goldieopenclaw\pinokio
launch.bat
```

### Git Bash / Mac / Linux
```bash
cd D:\Code\goldieopenclaw\pinokio
./launch.sh
```

## 🎯 工作模式

1. **启动 Pinokio** - 完整的 Electron 应用（带 UI）
2. **3 秒后启动 OpenClaw Gateway** - 开发模式
   - 端口：19001（不冲突默认端口）
   - 配置：`~/.openclaw-dev/`（独立于生产环境）
   - 跳过频道连接（更快启动）
3. **统一管理** - 关闭任一进程都会停止另一个

## 📊 成功输出示例

```
[Launcher] Starting Pinokio + OpenClaw...
[Launcher] Starting Pinokio...
[Launcher] Pinokio started with PID: XXXXX
[Launcher] Starting OpenClaw...
[Launcher] Using command: node scripts/run-node.mjs --dev gateway
[Launcher] OpenClaw started with PID: XXXXX

[gateway] listening on ws://127.0.0.1:19001
[gateway] log file: \tmp\openclaw\openclaw-YYYY-MM-DD.log
```

## 🔧 配置

### 修改 OpenClaw 模式

编辑 `launch.js`，找到这一行：

```javascript
openclawProcess = spawn('node', ['scripts/run-node.mjs', '--dev', 'gateway'], {
```

可改为：
- `['scripts/run-node.mjs', '--dev', 'gateway']` - Gateway Dev 模式（当前）
- `['scripts/run-node.mjs', 'gateway']` - Gateway 生产模式
- `['scripts/run-node.mjs', '--dev', 'tui']` - TUI Dev 模式

### 修改延迟时间

编辑 `launch.js`，找到这一行：

```javascript
setTimeout(() => {
  startOpenClaw();
}, 3000);
```

改为其他毫秒数。

## 📁 文件说明

- `launch.js` - 启动器核心逻辑
- `launch.bat` - Windows 启动脚本
- `launch.sh` - Unix/Mac 启动脚本

## ✨ 优势

✅ 完整的 Pinokio UI（不丢失任何功能）
✅ OpenClaw Gateway 正常运行（端口 19001）
✅ 开发环境隔离（不干扰生产配置）
✅ 简单可靠（独立启动器，不修改源代码）
✅ 自动管理进程（统一的启动/停止）

## 🎉 成功！

现在可以运行 `launch.bat`，Pinokio 和 OpenClaw Gateway 将会同时运行！

- **Pinokio** - 在浏览器中访问（通常是 localhost:42000）
- **OpenClaw Gateway** - WebSocket 服务器在 localhost:19001
