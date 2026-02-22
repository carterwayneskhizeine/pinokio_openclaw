#!/bin/bash
# Pinokio + OpenClaw 集成测试脚本

echo "=== Pinokio + OpenClaw 集成测试 ==="
echo ""

# 1. 检查 openclaw 是否已构建
echo "步骤 1: 检查 openclaw 构建..."
cd "D:\Code\goldieopenclaw"
if [ ! -d "dist" ] || [ -z "$(ls -A dist)" ]; then
  echo "  ⚠️  openclaw 未构建，正在构建..."
  pnpm build
else
  echo "  ✓ openclaw 已构建"
fi

# 2. 检查 openclaw 依赖
echo ""
echo "步骤 2: 检查 openclaw 依赖..."
if [ ! -d "node_modules" ]; then
  echo "  ⚠️  未安装依赖，正在安装..."
  pnpm install
else
  echo "  ✓ 依赖已安装"
fi

# 3. 检查 pinokio 状态
echo ""
echo "步骤 3: 检查 pinokio 配置..."
cd "D:\Code\goldieopenclaw\pinokio"
if [ -f "main-standalone.js" ]; then
  echo "  ✓ main-standalone.js 存在"
else
  echo "  ✗ main-standalone.js 不存在"
  exit 1
fi

if [ -f "node_modules/electron/dist/electron.exe" ]; then
  echo "  ✓ electron 已安装"
else
  echo "  ✗ electron 未安装"
  exit 1
fi

echo ""
echo "=== 准备完成 ==="
echo ""
echo "现在可以运行以下命令启动："
echo ""
echo "  cd D:\\Code\\goldieopenclaw\\pinokio"
echo "  npm start"
echo ""
echo "这将会："
echo "  1. 启动 Pinokio Electron 应用"
echo "  2. 3 秒后自动启动 OpenClaw（从源代码）"
echo "  3. 关闭 Pinokio 时自动停止 OpenClaw"
