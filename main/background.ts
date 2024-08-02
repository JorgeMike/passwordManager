import path from "path";
import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { insertConfiguration, isThereUsers } from "./database";

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isProd) {
    await mainWindow.loadURL("app://./");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/`);
    /*     mainWindow.webContents.openDevTools({
      mode: "bottom",
    }); */
    mainWindow.setMenuBarVisibility(false);
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});

/*  */

ipcMain.on("is-there-users", async (event, arg) => {
  const res = await isThereUsers();
  event.reply("is-there-users", res);
});

ipcMain.on("insert-configuration", async (event, arg) => {
  console.log("ARGS", arg);
  const res = await insertConfiguration(arg.name, arg.description);
  event.reply("insert-configuration", arg);
});
