# Pinokio + OpenClaw 集成

## 说明

这是一个修改版的 Pinokio，启动时会自动运行 OpenClaw 源代码。

## 文件说明

- `main-openclaw.js` - 修改版主入口文件，在 Pinokio 启动后自动启动 OpenClaw
- `package-openclaw.json` - 修改版 package.json，使用新的入口文件
- `package.json` - 原始文件（未修改）
- `main.js` - 原始文件（未修改）

## 目录结构

```
D:\Code\goldieopenclaw\
├── openclaw\          # OpenClaw 源代码
├── pinokio\           # Pinokio 源代码
│   ├── main.js        # 原始入口
│   ├── main-openclaw.js  # 集成 OpenClaw 的入口
│   ├── package.json   # 原始配置
│   └── package-openclaw.json  # 集成 OpenClaw 的配置
```

## 使用方法

### 方法 1：使用修改版文件（推荐）

1. 备份原始文件：
```bash
cd D:\Code\goldieopenclaw\pinokio
cp package.json package.json.backup
cp main.js main.js.backup
```

2. 使用修改版文件：
```bash
cd D:\Code\goldieopenclaw\pinokio
cp package-openclaw.json package.json
cp main-openclaw.js main.js
```

3. 安装依赖：
```bash
npm install
```

4. 开发运行：
```bash
npm start
```

5. 编译打包：
```bash
npm run mw  # Mac/Windows
npm run l   # Linux
```

### 方法 2：手动替换（恢复原始文件）

如果需要恢复原始 Pinokio：
```bash
cd D:\Code\goldieopenclaw\pinokio
cp package.json.backup package.json
cp main.js.backup main.js
```

## 工作原理

1. Pinokio 启动时，`main-openclaw.js` 被加载
2. 在 `app.ready` 事件后，延迟 3 秒启动 OpenClaw
3. OpenClaw 通过 `pnpm openclaw` 命令从源代码运行
4. 当 Pinokio 退出时，自动停止 OpenClaw 进程

## 配置

在 `main-openclaw.js` 中可以修改：

- `OPENCLAW_PATH` - OpenClaw 源代码路径
- 延迟时间 - 当前为 3000ms (3秒)

## 注意事项

1. 确保已安装 Node.js 22+
2. 确保已安装 pnpm
3. OpenClaw 源代码路径必须正确
4. 首次运行需要安装 OpenClaw 依赖（通过 pnpm）

## 故障排除

### OpenClaw 未启动

检查日志输出：
```
[OpenClaw] Starting from: D:\Code\goldieopenclaw
```

如果看到：
```
[OpenClaw] Source path not found: D:\Code\goldieopenclaw
```

说明路径不正确，请修改 `main-openclaw.js` 中的 `OPENCLAW_PATH`。

### 依赖未安装

如果 OpenClaw 启动失败，可能需要先安装依赖：
```bash
cd D:\Code\goldieopenclaw
pnpm install
pnpm build
```

## 优势

1. 一键启动：打开 Pinokio 就自动运行 OpenClaw
2. 源代码运行：直接从源代码运行，便于开发调试
3. 统一管理：Pinokio 和 OpenClaw 在同一进程管理下
4. 自动关闭：关闭 Pinokio 时自动停止 OpenClaw

## 自定义

如果需要不同的启动命令，修改 `main-openclaw.js` 中的：
```javascript
openclawProcess = spawn('pnpm', ['openclaw'], {
  cwd: OPENCLAW_PATH,
  stdio: 'inherit',
  shell: true
})
```

例如运行开发版本的 gateway：
```javascript
openclawProcess = spawn('pnpm', ['gateway:dev'], {
  cwd: OPENCLAW_PATH,
  stdio: 'inherit',
  shell: true
})
```
