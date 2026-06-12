const { ipcRenderer } = require("electron");

let lastSnapshot = null;

function getSnapshot() {
    const current = {};

    for(let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        current[key] = localStorage.getItem(key);
    }

    return JSON.stringify(current);
}

setInterval(() => {
    if(!window.location.pathname.startsWith("/hacklol-modifier/index.php") && window.location.pathname !== "/") {
        return;
    }

    if(lastSnapshot === null) {
        return;
    }

    const snapshot = getSnapshot();

    if(snapshot !== lastSnapshot) {
        lastSnapshot = snapshot;
        ipcRenderer.send("save-localstorage", JSON.parse(snapshot));
    }
}, 500);

const data = ipcRenderer.sendSync("get-localstorage");

window.addEventListener("DOMContentLoaded", () => {
    if(!window.location.pathname.startsWith("/hacklol-modifier/index.php") && window.location.pathname !== "/") {
        return;
    }

    for(const [key, value] of Object.entries(data)) {
        localStorage.setItem(key, value);
    }

    lastSnapshot = getSnapshot();
});