const { app, screen, shell, BrowserWindow, BrowserView, ipcMain, dialog, clipboard, session, desktopCapturer } = require('electron')
const windowStateKeeper = require('electron-window-state');
const fs = require('fs')
const path = require("path")
const Pinokiod = require("pinokiod")
const os = require('os')
const Updater = require('./updater')
const is_mac = process.platform.startsWith("darwin")
const platform = os.platform()
const { spawn } = require('child_process')

var mainWindow;
var root_url;
var wins = {}
var pinned = {}
var launched
var theme
var colors
var splashWindow
var splashIcon

// OpenClaw integration
let openclawProcess = null
const OPENCLAW_PATH = path.resolve(__dirname, '..', 'openclaw')

const startOpenClaw = () => {
  if (openclawProcess) {
    console.log('[OpenClaw] Already running')
    return
  }

  console.log('[OpenClaw] Starting from:', OPENCLAW_PATH)

  // Check if openclaw source exists
  if (!fs.existsSync(OPENCLAW_PATH)) {
    console.warn('[OpenClaw] Path not found:', OPENCLAW_PATH)
    return
  }

  // Start openclaw using pnpm
  openclawProcess = spawn('pnpm', ['openclaw'], {
    cwd: OPENCLAW_PATH,
    stdio: 'inherit',
    shell: true
  })

  openclawProcess.on('error', (err) => {
    console.error('[OpenClaw] Failed to start:', err)
  })

  openclawProcess.on('close', (code) => {
    console.log('[OpenClaw] Process exited with code:', code)
    openclawProcess = null
  })

  console.log('[OpenClaw] Started with PID:', openclawProcess.pid)
}

const stopOpenClaw = () => {
  if (openclawProcess) {
    console.log('[OpenClaw] Stopping process...')
    openclawProcess.kill('SIGTERM')
    setTimeout(() => {
      if (openclawProcess && !openclawProcess.killed) {
        openclawProcess.kill('SIGKILL')
      }
    }, 5000)
    openclawProcess = null
  }
}
