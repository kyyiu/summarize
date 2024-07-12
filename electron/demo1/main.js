const {
  app,
  BrowserWindow,
  ipcMain,
  BrowserView,
  Menu,
  shell,
} = require("electron");
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
  // win.setOpacity(0.15)
  // win.webContents.openDevTools();
  return win;
};

app.whenReady().then(() => {
  const stack = [];
  let current = null;
  const mainWindow = createWindow();
  ipcMain.handle("ipc", () => s.g);
  ipcMain.on("setOpacity", (event, arg) => {
    mainWindow.setOpacity(arg);
  });
  ipcMain.on("back", () => {
    if (stack.length > 1) {
      const cur = stack.pop();
      mainWindow.removeBrowserView(cur)
    }
  });

  // 子窗口开始
  const son = new BrowserView();
  stack.push(son);
  mainWindow.addBrowserView(son);
  son.setBounds({
    x: 0,
    y: 50,
    width: mainWindow.getContentSize()[0],
    height: mainWindow.getContentSize()[1],
  });
  // https://www.bilibili.com/
  // son.webContents.loadURL("https://www.bilibili.com/");
  son.webContents.setWindowOpenHandler((newWindowInfo) => {
    const next = new BrowserView();
    stack.push(next);
    mainWindow.addBrowserView(next);
    next.setBounds({
      x: 0,
      y: 50,
      width: mainWindow.getContentSize()[0],
      height: mainWindow.getContentSize()[1],
    });
    next.webContents.loadURL(newWindowInfo.url);
    return { action: "deny" };
  });
  son.webContents.loadURL("https://www.baidu.com/");

  mainWindow.on("resize", () => {
    const size = mainWindow.getContentSize();
    for (const s of stack) {
      s.setBounds({ x: 0, y: 50, width: size[0], height: size[1] });
    }
  });
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
// 处理新窗口
// app.on('web-contents-created', function(event, web) {
//   console.log("WW", web)
//   web.setWindowOpenHandler(newWindowInfo => {
//     console.log("OOO", newWindowInfo.url)
//     return {action: 'deny'}
//   })
// })
