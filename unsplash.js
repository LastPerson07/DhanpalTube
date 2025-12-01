const fs = require("fs");
const path = require("path");
const https = require("https");

const wallpaperDir = path.join(__dirname, "assets", "wallpapers");
const wallpaperPath = path.join(wallpaperDir, "background.jpg");

// Create folder if it doesn't exist
if (!fs.existsSync(wallpaperDir)) {
  fs.mkdirSync(wallpaperDir, { recursive: true });
}

// Download wallpaper from Unsplash
const downloadWallpaper = () => {
  const file = fs.createWriteStream(wallpaperPath);
  https
    .get("https://source.unsplash.com/random/1920x1080", (response) => {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log("✅ New wallpaper downloaded!");
      });
    })
    .on("error", (err) => {
      console.error("❌ Wallpaper download error:", err.message);
    });
};

// Run once and every hour
downloadWallpaper();
setInterval(downloadWallpaper, 1000 * 60 * 60); // every hour
