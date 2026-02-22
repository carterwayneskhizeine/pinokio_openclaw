# Pinokio + OpenClaw 集成

## 说明

使用启动器同时运行 Pinokio 和 OpenClaw。Pinokio 提供完整的 UI 界面，OpenClaw Gateway 在后台运行提供 WebSocket 和 HTTP 服务。

## 快速开始

### Windows
```bash
cd D:\Code\goldieopenclaw\pinokio
node launch.js
```

### Git Bash / Mac / Linux
```bash
cd D:\Code\goldieopenclaw\pinokio
./launch.sh
```

## 工作模式

1. **启动 Pinokio** - 完整的 Electron 应用（带 UI）
2. **3 秒后启动 OpenClaw Gateway** - 生产模式
3. **统一管理** - 关闭任一进程都会停止另一个

## 端口说明

OpenClaw Gateway 在 **18789** 端口同时提供：

- **WebSocket 服务**：`ws://127.0.0.1:18789` - 用于实时通信
- **HTTP 服务**：`http://127.0.0.1:18789`
  - Canvas Host：`http://127.0.0.1:18789/__openclaw__/canvas/`
  - Webhooks：`http://127.0.0.1:18789/hooks/...`
  - 其他 HTTP 端点

## 成功输出示例

```
[Launcher] Starting Pinokio + OpenClaw...
[Launcher] Pinokio path: D:\Code\goldieopenclaw\pinokio
[Launcher] OpenClaw path: D:\Code\goldieopenclaw
[Launcher] Starting Pinokio...
[Launcher] Pinokio started with PID: XXXXX
[Launcher] Starting OpenClaw...
[Launcher] Using command: node openclaw.mjs gateway
[Launcher] OpenClaw started with PID: XXXXX

[canvas] host mounted at http://127.0.0.1:18789/__openclaw__/canvas/
[gateway] listening on ws://127.0.0.1:18789, ws://[::1]:18789 (PID XXXXX)
```

## 文件说明

- `launch.js` - 启动器核心逻辑
- `launch.bat` - Windows 启动脚本
- `launch.sh` - Unix/Mac 启动脚本

## 配置

### 修改 OpenClaw 模式

编辑 `launch.js`，找到这一行：

```javascript
openclawProcess = spawn('node', ['openclaw.mjs', 'gateway'], {
```

可改为其他命令：
- `['openclaw.mjs', 'gateway']` - Gateway 生产模式（当前）
- `['openclaw.mjs', 'tui']` - TUI 模式
- `['openclaw.mjs', 'dashboard']` - Dashboard 模式

### 修改延迟时间

编辑 `launch.js`，找到这一行：

```javascript
setTimeout(() => {
  startOpenClaw();
}, 3000);
```

改为其他毫秒数（例如 `5000` = 5 秒）。

### 修改端口（如果需要）

创建配置文件 `~/.openclaw/openclaw.json`：

```json
{
  "gateway": {
    "port": 18789
  }
}
```

## 优势

✅ **完整 Pinokio UI** - 不丢失任何功能
✅ **正确的启动命令** - `node openclaw.mjs gateway`
✅ **生产配置** - 使用生产环境配置
✅ **双协议支持** - 同时提供 WebSocket 和 HTTP 服务
✅ **简单可靠** - 独立启动器，不修改 Pinokio 源代码
✅ **自动管理** - 统一的启动/停止

## 故障排除

### 问题：OpenClaw 未启动

检查控制台日志：
- `[Launcher] OpenClaw started with PID: XXXXX` - 进程启动成功
- 如果看到 `[Launcher] OpenClaw exited` - 进程退出，查看错误信息

### 问题：端口被占用

错误信息：`Error: listen EADDRINUSE: address already in use :::18789`

解决方法：
1. 检查是否有其他进程占用了 18789 端口
2. 修改配置文件使用其他端口

### 问题：依赖未安装

如果 OpenClaw 启动失败，运行：

```bash
cd D:\Code\goldieopenclaw
pnpm install
pnpm build
```

## 注意事项

1. 确保 Node.js 22+
2. 确保 pnpm 已安装
3. OpenClaw 源代码路径必须正确
4. 确保 Pinokio 和 OpenClaw 依赖都已安装

## 其他命令

**只启动 Pinokio：**
```bash
cd D:\Code\goldieopenclaw\pinokio
npm start
```

**只启动 OpenClaw：**
```bash
cd D:\Code\goldieopenclaw
node openclaw.mjs gateway
```
