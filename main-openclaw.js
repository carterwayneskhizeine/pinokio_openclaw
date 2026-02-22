const { app } = require('electron')
const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs')

const Pinokiod = require("pinokiod")
const config = require('./config')
const pinokiod = new Pinokiod(config)

let openclawProcess = null

const startOpenClaw = () => {
  if (openclawProcess) {
    console.log('[OpenClaw] Already running')
    return
  }

  const OPENCLAW_PATH = path.resolve(__dirname, '..', 'openclaw')

  if (!fs.existsSync(OPENCLAW_PATH)) {
    console.log('[OpenClaw] Source path not found:', OPENCLAW_PATH)
    console.log('[OpenClaw] Skipping auto-start')
    return
  }

  console.log('[OpenClaw] Starting from:', OPENCLAW_PATH)

  openclawProcess = spawn('pnpm', ['openclaw'], {
    cwd: OPENCLAW_PATH,
    stdio: 'inherit',
    shell: true
  })

  openclawProcess.on('error', (err) => {
    console.error('[OpenClaw] Failed to start:', err)
    openclawProcess = null
  })

  openclawProcess.on('close', (code) => {
    console.log('[OpenClaw] Process exited with code:', code)
    openclawProcess = null
  })

  console.log('[OpenClaw] Started with PID:', openclawProcess.pid)
}

const stopOpenClaw = () => {
  if (openclawProcess) {
    console.log('[OpenClaw] Stopping...')
    openclawProcess.kill('SIGTERM')
    setTimeout(() => {
      if (openclawProcess && !openclawProcess.killed) {
        openclawProcess.kill('SIGKILL')
      }
      openclawProcess = null
    }, 5000)
  }
}

app.on('ready', () => {
  setTimeout(startOpenClaw, 3000)
})

app.on('before-quit', () => {
  stopOpenClaw()
})

if (process.platform === 'linux') {
  console.log('[PINOKIO DEBUG] Linux startup')
  console.log('[PINOKIO DEBUG] ELECTRON_OZONE_PLATFORM_HINT:', process.env.ELECTRON_OZONE_PLATFORM_HINT || '<unset>')
  console.log('[PINOKIO DEBUG] ELECTRON_DISABLE_GPU:', process.env.ELECTRON_DISABLE_GPU || '<unset>')
  console.log('[PINOKIO DEBUG] DISPLAY:', process.env.DISPLAY || '<unset>')
  console.log('[PINOKIO DEBUG] WAYLAND_DISPLAY:', process.env.WAYLAND_DISPLAY || '<unset>')
  console.log('[PINOKIO DEBUG] argv:', process.argv.join(' '))
  app.disableHardwareAcceleration()
}

let mode = pinokiod.kernel.store.get("mode") || "full"
if (mode === 'minimal' || mode === 'background') {
  require('./minimal');
} else {
  require('./full');
}
