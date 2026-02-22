# OpenClaw 嵌入 Pinokio 项目需求

## 项目目标

将 OpenClaw 深度嵌入 Pinokio，打造一个统一的客户端体验：
- 默认显示 OpenClaw 界面
- 通过按钮可切换到 Pinokio 原生界面
- 实现每日自动更新

---

## 1. 打包与安装

### 1.1 嵌入方式
- 将 OpenClaw 构建产物（`dist/`、`openclaw.mjs`、`node_modules/`）打包成压缩包
- 在 Pinokio 安装时解压到 `C:\pinokio\bin\npm\node_modules\openclaw\`
- 不使用 npm install，直接解压复制（因为是本地源代码）

---

## 2. 界面设计

### 2.1 默认界面
- 启动后默认显示 OpenClaw Control UI
- 地址：`http://127.0.0.1:18789/__control__/`

### 2.2 切换按钮
- 在右下角添加一个悬浮按钮（HTML/CSS Overlay）
- 点击后切换到 Pinokio 原生界面
- 再次点击可切换回 OpenClaw

### 2.3 界面架构
```
┌─────────────────────────────────────────────────────┐
│  Pinokio App (Electron)                             │
│  ┌───────────────────────────────────────────────┐  │
│  │  默认显示 OpenClaw Control UI                 │  │
│  │  http://127.0.0.1:18789/__control__/      │  │
│  │                                               │  │
│  │                                    [🔄按钮]   │  │  ← 右下角切换按钮
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  后台: OpenClaw Gateway 子进程                     │
└─────────────────────────────────────────────────────┘
```

---

## 3. 更新机制

### 3.1 更新方式
- 使用 NPM 包方式更新（类似 clawdbot）
- 使用 Pinokio 自带的 Miniconda npm，无需配置 PATH
- 更新命令：
  ```cmd
  C:\pinokio\bin\miniconda\Scripts\conda.exe run -n base npm install -g openclaw@latest
  ```

### 3.2 更新流程
```
用户打开 Pinokio
    ↓
Electron 后台检查 npm view openclaw version
    ↓
有新版 → 通知用户"OpenClaw 可用更新"
    ↓
用户确认 → 执行 npm install -g openclaw@latest
    ↓
重启 Gateway 子进程
```

### 3.3 更新频率
- 每天检查更新
- 用户手动确认后更新

---

## 4. Gateway 管理

### 4.1 启动方式
- Electron 主进程启动时同时启动 OpenClaw Gateway 子进程
- 使用子进程方式运行（而非系统服务）
- 启动命令：
  ```cmd
  C:\pinokio\bin\miniconda\node.exe C:\pinokio\bin\npm\node_modules\openclaw\openclaw.mjs gateway
  ```

### 4.2 进程管理
- Gateway 进程跟随 Pinokio 主进程
- Pinokio 退出时自动 kill Gateway
- 更新后重启 Gateway

### 4.3 端口
- 默认使用 18789 端口

---

## 5. 技术实现要点

### 5.1 Electron 主进程修改
- 修改 `pinokio/main.js` 或创建新的入口文件
- 添加 OpenClaw 启动/停止逻辑
- 添加更新检查和安装逻辑

### 5.2 UI 切换实现
- 在 BrowserWindow 中添加 HTML/CSS Overlay 按钮
- 点击按钮切换加载的 URL
- OpenClaw URL: `http://127.0.0.1:18789/__control__/`
- Pinokio URL: 通过 Pinokio 原有方式加载

### 5.3 Miniconda npm 调用
- 使用完整路径调用 conda 和 npm
- 不依赖系统 PATH 环境变量
- conda 路径：`C:\pinokio\bin\miniconda\Scripts\conda.exe`

---

## 6. 待确认问题

### 6.1 更新检查方式
- A: 每次启动都检查
- B: 每天检查一次（本地记录上次检查时间）
- C: 用户手动检查

### 6.2 更新通知 UI
- A: 右下角 Toast 通知
- B: 顶部横幅
- C: 设置页面显示版本号

### 6.3 重启策略
- A: 立即重启
- B: 提示用户手动重启
- C: 等待下次启动时生效

---

## 7. 相关参考

- clawdbot 包结构：`D:\Code\goldieopenclaw\packages\clawdbot\package.json`
- Pinokio 安装的 openclaw：`C:\pinokio\bin\npm\node_modules\openclaw\`
- 当前 launch 脚本：`D:\Code\goldieopenclaw\pinokio\launch.js`
- OpenClaw Control UI 路径：`/__control__/`
