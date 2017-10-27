const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron')
var path = require('path')


var window = null
const filePrefix = process.platform === 'darwin' ? 'file://' + __dirname : __dirname

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', function () {
  let newWindow = new BrowserWindow({width: 1200, height: 800, show: false, backgroundColor: '#efefee', webPreferences: {scrollBounce: true}})
  // and load the app.html of the app.
  const entryFile = path.join(filePrefix, 'app.html')
  newWindow.loadURL(entryFile)

  newWindow.once('ready-to-show', function() {
    this.show()
  })

  if (process.env.NODE_ENV === 'dev') {
    // Open the DevTools.
    newWindow.openDevTools()
  }
  window = newWindow
})
