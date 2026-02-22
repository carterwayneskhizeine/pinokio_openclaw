# Pinokio + OpenClaw 启动器 - 最终版本（已修复）

## ✅ 完美解决！

**关键发现**：
- ✅ OpenClaw 默认端口：**18789**
- ✅ 不需要 `--dev` 参数
- ✅ 同时提供：`ws://127.0.0.1:18789` (WebSocket) 和 `http://127.0.0.1:18789` (HTTP)

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
2. **3 秒后启动 OpenClaw Gateway** - 生产模式
   - **WebSocket**：`ws://127.0.0.1:18789` - 用于实时通信
   - **HTTP**：`http://127.0.0.1:18789` - 用于 webhooks、canvas 等
3. **统一管理** - 关闭任一进程都会停止另一个

## 📊 成功输出示例

```
[Launcher] Starting Pinokio + OpenClaw...
[Launcher] Pinokio started with PID: XXXXX
[Launcher] OpenClaw started with PID: XXXXX

[canvas] host mounted at http://127.0.0.1:18789/__openclaw__/canvas/
[gateway] listening on ws://127.0.0.1:18789, ws://[::1]:18789 (PID XXXXX)
```

## 🌐 端口说明

OpenClaw Gateway 在 18789 端口同时提供：

- **WebSocket 服务**：`ws://127.0.0.1:18789`
  - 用于客户端实时连接
  - 主要协议

- **HTTP 服务**：`http://127.0.0.1:18789`
  - Canvas Host：`http://127.0.0.1:18789/__openclaw__/canvas/`
  - Webhooks：`http://127.0.0.1:18789/hooks/...`
  - 其他 HTTP 端点

## 📁 文件说明

- `launch.js` - 启动器核心逻辑（✅ 已修复）
- `launch.bat` - Windows 启动脚本
- `launch.sh` - Unix/Mac 启动脚本

## ✨ 优势

✅ **正确端口**：使用 18789（不是 dev 模式的 19001）
✅ **双协议支持**：同时提供 WebSocket 和 HTTP
✅ **完整 Pinokio UI**：不丢失任何功能
✅ **生产配置**：使用生产环境配置（不隔离）
✅ **简单可靠**：独立启动器，不修改源代码
✅ **自动管理**：统一的启动/停止

## 🔧 配置

### 修改端口（如果需要）

创建配置文件 `~/.openclaw/openclaw.json`：

```json
{
  "gateway": {
    "port": 18789
  }
}
```

### 修改启动命令

编辑 `launch.js`，找到这一行：

```javascript
openclawProcess = spawn('node', ['openclaw.mjs', 'gateway'], {
```

可改为其他命令：
- `['openclaw.mjs', 'gateway', '--port', '8080']` - 指定端口
- `['openclaw.mjs', 'tui']` - TUI 模式
- `['openclaw.mjs', 'dashboard']` - Dashboard 模式

## 🎉 成功！

现在可以运行 `launch.bat`，将获得：

- **Pinokio** - 完整 UI（访问 localhost:42000）
- **OpenClaw Gateway** - WebSocket + HTTP 在 localhost:18789

两个进程统一管理，关闭任一都会停止另一个！
