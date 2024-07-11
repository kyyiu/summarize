const { app, BrowserWindow, ipcMain, BrowserView, Menu } = require("electron");
const path = require("path");
const s = require("./preload/s1");

const createWindow = () => {
    // 隐藏菜单栏
  Menu.setApplicationMenu(null);
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // 无边框配置
    // frame: false,
    webPreferences: {
      // 提供可访问node环境的配置
    //   nodeIntegration: true,
      preload: path.join(__dirname, "preload", "index.js"),
    },
  });

  win.loadFile("index.html");
    win.webContents.openDevTools();
  return win;
};

app.whenReady().then(() => {
    const mainWindow = createWindow();
  ipcMain.handle("ipc", () => s.g);
  ipcMain.on('setOpacity', (event, arg) => {
    mainWindow.setOpacity(arg)
  });

// 子窗口开始
//   const son = new BrowserView();
//   mainWindow.setBrowserView(son);
//   son.setBounds({
//     x: 0,
//     y: 0,
//     width: mainWindow.getContentSize()[0],
//     height: mainWindow.getContentSize()[1],
//   });
//   son.webContents.loadURL("https://www.baidu.com/");

//   mainWindow.on("resize", () => {
//     const size = mainWindow.getContentSize();
//     son.setBounds({ x: 0, y: 0, width: size[0], height: size[1] });
//   });
//   子窗口结束

  //   mainWindow.resizable = true;
  //   mainWindow.setOpacity(0.1)

  //  打开新窗口
  //   const childWindow = new BrowserWindow({
  //     width: 400,
  //     height: 300,
  //     parent: mainWindow, // 将子窗口与父窗口关联
  //   });

  //   // 在子窗口中加载URL
  //   childWindow.loadURL('https://cloud.tencent.com/developer/article/2196379');
});
