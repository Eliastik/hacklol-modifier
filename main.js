const { app, BrowserWindow, shell } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const http = require("http");
const kill = require("tree-kill");
const net = require("net");

let PHP_PROCESS = null;
let PHP_PORT = null;

const isWindows = process.platform === "win32";
const isMac = process.platform === "darwin";
const isPackaged = app.isPackaged;

function getBasePath() {
  if (app.isPackaged) {
    return process.resourcesPath;
  }

  return __dirname;
}

function getPhpBinary() {
  if (isWindows) {
    return path.join(
      getBasePath(),
      ".electron",
      "binary",
      "windows",
      "php.exe",
    );
  }

  if (isMac) {
    return path.join(getBasePath(), ".electron", "binary", "mac", "php");
  }

  // Linux
  return path.join(getBasePath(), ".electron", "binary", "linux", "php");
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.listen(0, () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });

    server.on("error", reject);
  });
}

async function startPHP() {
  const phpPath = getPhpBinary();
  const wwwPath = path.join(getBasePath(), "www");

  PHP_PORT = await getFreePort();

  PHP_PROCESS = spawn(
    phpPath,
    [
      "-c",
      path.join(getBasePath(), ".electron", "config", "php.ini"),
      "-S",
      `127.0.0.1:${PHP_PORT}`,
      "-t",
      wwwPath,
    ],
    {
      stdio: "inherit", // IMPORTANT pour debug MVP
    },
  );

  PHP_PROCESS.on("error", (err) => {
    console.error("Failed to start PHP:", err);
  });

  PHP_PROCESS.on("exit", (code) => {
    console.log("PHP exited with code:", code);
  });
}

function waitForServer(url, timeout = 5000) {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const check = () => {
      http
        .get(url, () => resolve())
        .on("error", () => {
          if (Date.now() - start > timeout) {
            reject(new Error("PHP server not ready"));
          } else {
            setTimeout(check, 100);
          }
        });
    };

    check();
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
  });

  win.setMenu(null);
  win.loadURL(`http://127.0.0.1:${PHP_PORT}`);

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  win.webContents.on("new-window", (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });
}

function killServer() {
  return new Promise((resolve, reject) => {
    if (PHP_PROCESS) {
      kill(PHP_PROCESS.pid, "SIGKILL", (err) => {
        if (err) {
          console.error("Failed to kill PHP process:", err);
          reject(err);
        } else {
          console.log("PHP process killed successfully");
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
}

async function exitGracefully() {
  if (PHP_PROCESS) {
    await killServer();
    app.quit();
  }
}

app.whenReady().then(async () => {
  await startPHP();

  try {
    await waitForServer(`http://127.0.0.1:${PHP_PORT}`);
    createWindow();
  } catch (e) {
    console.error(e);
    app.quit();
  }
});

app.on("window-all-closed", async () => {
  await exitGracefully();
});

app.on("before-quit", async () => {
  await exitGracefully();
});
