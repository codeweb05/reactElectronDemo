const { app, BrowserWindow, Menu, ipcMain, Notification, nativeTheme } = require('electron');

const path = require('path');
const isDev = require('electron-is-dev')

function createWindow() {
  const win = new BrowserWindow({
    width: "100%",
    height: "100%",
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  Menu.setApplicationMenu(null)
  win.maximize()

  // Open the DevTools.
  isDev && win.webContents.openDevTools()
}


ipcMain.on('notify', (_, message) => {
  new Notification({ title: 'Notification', body: message }).show();
})

app.on('ready', createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

