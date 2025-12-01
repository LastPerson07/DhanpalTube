const { contextBridge, ipcRenderer } = require("electron");

// Currently unused, but can be used to expose secure APIs to renderer
contextBridge.exposeInMainWorld("electronAPI", {
  // You can add custom APIs here
});
