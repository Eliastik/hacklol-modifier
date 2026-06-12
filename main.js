const { app, BrowserWindow, shell, session, ipcMain } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const http = require("http");
const kill = require("tree-kill");
const net = require("net");
const fs = require("fs");

let PHP_PROCESS = null;
let PHP_PORT = null;
let mainWindow = null;

const isWindows = process.platform === "win32";
const isMac = process.platform === "darwin";
const isPackaged = app.isPackaged;

const LOCAL_STORAGE_PATH = path.join(app.getPath("userData"), "localstorage.json");

function getBasePath() {
  if (app.isPackaged) {
    return process.resourcesPath;
  }

  return __dirname;
}

function getPhpBinary() {
  if (isWindows) {
    return path.join(getBasePath(), ".electron", "binary", "windows", "php.exe");
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

function getServerAddress() {
  return `127.0.0.1:${PHP_PORT}`;
}

function getServerHTTPAddress() {
  return `http://${getServerAddress()}`;
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
      getServerAddress(),
      "-t",
      wwwPath,
    ],
    {
      stdio: "inherit",
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
          if(Date.now() - start > timeout) {
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
  const ses = session.fromPartition("persist:main");

  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      session: ses,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.setMenu(null);
  mainWindow.loadURL(getServerHTTPAddress());

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  mainWindow.webContents.on("new-window", (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  ses.webRequest.onHeadersReceived((details, callback) => {
    if(details.url.startsWith(getServerHTTPAddress())) {
      return callback({ responseHeaders: details.responseHeaders });
    }

    const headers = { ...details.responseHeaders };
    const xFrameOptionsKey = Object.keys(headers).find(header => header.toLowerCase() === "x-frame-options");

    if(xFrameOptionsKey) {
      delete headers[xFrameOptionsKey];
    }

    const contentSecurityPolicyKey = Object.keys(headers).find(header => header.toLowerCase() === "content-security-policy");

    if(contentSecurityPolicyKey) {
      headers[contentSecurityPolicyKey] = headers[contentSecurityPolicyKey].map(headerValue => {
        if(!headerValue) {
          return headerValue;
        }

        return headerValue.split(";")
          .filter(part => !part.trim().toLowerCase().startsWith("frame-ancestors"))
          .join(";");
      });
    }

    callback({ responseHeaders: headers });
  });
}

function readLocalStorage() {
  try {
    if(fs.existsSync(LOCAL_STORAGE_PATH)) {
      const raw = fs.readFileSync(LOCAL_STORAGE_PATH, "utf-8");
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Failed to read localStorage file:", e);
  }
  
  return {};
}

function writeLocalStorage(data) {
  try {
    fs.writeFileSync(LOCAL_STORAGE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write localStorage file:", e);
  }
}

ipcMain.on('save-localstorage', (event, data) => {
  writeLocalStorage(data);
});

ipcMain.on("get-localstorage", (event) => {
  event.returnValue = readLocalStorage();
});

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
    await session.fromPartition("persist:main").flushStorageData();
    await killServer();
    app.quit();
  }
}

app.whenReady().then(async () => {
  await startPHP();

  try {
    await waitForServer(getServerHTTPAddress());
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