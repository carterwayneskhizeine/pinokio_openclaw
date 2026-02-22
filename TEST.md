# 测试说明

## 问题分析

当前问题：`pnpm start` 启动后立即退出（exit code 143 = SIGTERM）

## 可能的原因

1. **需要配置文件** - OpenClaw 可能需要先运行 `openclaw setup` 或 `openclaw configure`
2. **端口冲突** - Gateway 端口可能被占用
3. **需要初始化** - 可能需要先运行 setup 向导

## 测试步骤

### 1. 直接测试 OpenClaw

```bash
cd D:\Code\goldieopenclaw
pnpm start
```

如果失败，尝试：

```bash
cd D:\Code\goldieopenclaw
pnpm gateway:dev
```

### 2. 检查配置

```bash
cd D:\Code\goldieopenclaw
openclaw config list
```

### 3. 运行 setup

```bash
cd D:\Code\goldieopenclaw
pnpm start configure
```

### 4. 测试 TUI 模式

```bash
cd D:\Code\goldieopenclaw
pnpm tui
```

## 启动器测试

运行测试脚本：

```bash
cd D:\Code\goldieopenclaw\pinokio
test-launch.bat
```

这将启动 Pinokio 和 OpenClaw，并显示详细的日志输出。

## 观察

注意以下日志：
- `[Launcher] OpenClaw started with PID: XXXX` - 进程启动成功
- `[Launcher] OpenClaw exited` - 进程退出（查看原因）
- OpenClaw 自身的错误信息
