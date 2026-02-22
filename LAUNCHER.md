# Pinokio + OpenClaw 启动器

## 快速开始

### Windows

双击运行 `launch.bat` 或在终端运行：

```bash
cd D:\Code\goldieopenclaw\pinokio
launch.bat
```

### Git Bash / Mac / Linux

```bash
cd D:\Code\goldieopenclaw\pinokio
./launch.sh
```

## 工作原理

1. **启动 Pinokio** - 完整的 Pinokio Electron 应用（带 UI）
2. **3 秒后启动 OpenClaw** - 从 `D:\Code\goldieopenclaw` 源代码运行
3. **统一管理** - 关闭任一进程都会停止另一个

## 优势

✅ **完整的 Pinokio UI** - 不丢失任何功能
✅ **自动启动 OpenClaw** - 无需手动运行
✅ **简单可靠** - 使用独立的启动脚本，不修改 Pinokio 源代码
✅ **易于调试** - 可以看到两个进程的输出

## 故障排除

### 问题：Pinokio 窗口空白

如果 Pinokio 窗口打开后是空白的，可能是 pinokiod 未正常启动。检查控制台输出。

### 问题：OpenClaw 未启动

检查控制台是否有 `[Launcher] OpenClaw started with PID: XXXX` 输出。

### 问题：端口冲突

OpenClaw 或 Pinokio 可能需要特定端口。如果有端口冲突，检查错误信息。

## 其他命令

**只启动 Pinokio：**
```bash
cd D:\Code\goldieopenclaw\pinokio
npm start
```

**只启动 OpenClaw：**
```bash
cd D:\Code\goldieopenclaw
pnpm start
```

## 文件说明

- `launch.js` - 启动器脚本（核心逻辑）
- `launch.bat` - Windows 启动脚本
- `launch.sh` - Unix/Mac 启动脚本
- `launch-package.json` - 启动器的 package.json

## 注意事项

1. 确保 Pinokio 和 OpenClaw 的依赖都已安装
2. 如果 OpenClaw 未构建，先运行 `cd D:\Code\goldieopenclaw && pnpm build`
3. 终端会显示两个进程的输出，方便调试
