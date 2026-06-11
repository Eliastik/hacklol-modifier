const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
    if(!window.location.pathname.startsWith("/hacklol-modifier/index.php") && window.location.pathname !== "/") {
        return;
    }

    const data = ipcRenderer.sendSync("get-localstorage");

    for(const [key, value] of Object.entries(data)) {
        localStorage.setItem(key, value);
    }
});