const { ipcRenderer } = require("electron");

const downloadBtn = document.getElementById("downloadBtn");
const urlInput = document.getElementById("urlInput");
const qualitySelect = document.getElementById("qualitySelect");
const statusText = document.getElementById("statusText");

downloadBtn.addEventListener("click", () => {
  const url = urlInput.value.trim();
  const quality = qualitySelect.value;

  if (!url || !url.startsWith("http")) {
    statusText.innerText = "❌ Please enter a valid YouTube URL.";
    return;
  }

  statusText.innerText = "⏳ Downloading...";
  ipcRenderer.send("download-video", { url, quality });
});

ipcRenderer.on("download-complete", (_, message) => {
  statusText.innerText = `✅ Download complete: ${message}`;
});

ipcRenderer.on("download-error", (_, error) => {
  statusText.innerText = `❌ Error: ${error}`;
});
