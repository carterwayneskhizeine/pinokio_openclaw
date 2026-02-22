const { spawn } = require('child_process');
const path = require('path');

const PINOKIO_PATH = __dirname;
const OPENCLAW_PATH = path.resolve(__dirname, '..');

let pinokioProcess = null;
let openclawProcess = null;

const startPinokio = () => {
  console.log('[Launcher] Starting Pinokio...');
  console.log('[Launcher] Working directory:', PINOKIO_PATH);

  pinokioProcess = spawn('npm', ['start'], {
    cwd: PINOKIO_PATH,
    stdio: 'inherit',
    shell: true,
    detached: false
  });

  pinokioProcess.on('error', (err) => {
    console.error('[Launcher] Pinokio failed to start:', err);
    stopAll();
  });

  pinokioProcess.on('close', (code, signal) => {
    console.log('[Launcher] Pinokio exited');
    console.log('[Launcher]   Code:', code);
    console.log('[Launcher]   Signal:', signal);
    stopAll();
  });

  console.log('[Launcher] Pinokio started with PID:', pinokioProcess.pid);
};

const startOpenClaw = () => {
  console.log('[Launcher] Starting OpenClaw...');
  console.log('[Launcher] Working directory:', OPENCLAW_PATH);
  console.log('[Launcher] Using command: node openclaw.mjs gateway');

  openclawProcess = spawn('node', ['openclaw.mjs', 'gateway'], {
    cwd: OPENCLAW_PATH,
    stdio: 'inherit',
    shell: false,
    detached: false
  });

  openclawProcess.on('error', (err) => {
    console.error('[Launcher] OpenClaw failed to start:', err);
  });

  openclawProcess.on('close', (code, signal) => {
    console.log('[Launcher] OpenClaw exited');
    console.log('[Launcher]   Code:', code);
    console.log('[Launcher]   Signal:', signal);
  });

  console.log('[Launcher] OpenClaw started with PID:', openclawProcess.pid);
};

const stopAll = () => {
  console.log('[Launcher] Stopping all processes...');

  if (openclawProcess) {
    console.log('[Launcher] Stopping OpenClaw...');
    openclawProcess.kill('SIGTERM');
    setTimeout(() => {
      if (openclawProcess && !openclawProcess.killed) {
        openclawProcess.kill('SIGKILL');
      }
    }, 5000);
  }

  if (pinokioProcess) {
    console.log('[Launcher] Stopping Pinokio...');
    pinokioProcess.kill('SIGTERM');
    setTimeout(() => {
      if (pinokioProcess && !pinokioProcess.killed) {
        pinokioProcess.kill('SIGKILL');
      }
    }, 5000);
  }

  process.exit(0);
};

process.on('SIGINT', () => {
  console.log('\n[Launcher] Received SIGINT');
  stopAll();
});

process.on('SIGTERM', () => {
  console.log('\n[Launcher] Received SIGTERM');
  stopAll();
});

console.log('[Launcher] Starting Pinokio + OpenClaw...');
console.log('[Launcher] Pinokio path:', PINOKIO_PATH);
console.log('[Launcher] OpenClaw path:', OPENCLAW_PATH);
console.log('');

startPinokio();

setTimeout(() => {
  startOpenClaw();
}, 3000);
