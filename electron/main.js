const {app, BrowserWindow, Tray, Menu} = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;
let tray;

app.on('ready', createWindow);

function createWindow() {
  process.platform === 'darwin' && app.dock.hide();
  console.log(process.env.ELECTRON_START_URL);
  const startURL =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true,
    });
  mainWindow = new BrowserWindow({
    height: 800,
    width: 500,
    frame: false,
    resizeable: false,
    show: false,
    webPreferences: {backgroundThrottling: false},
    skipTaskbar: true,
  });
  mainWindow.loadURL(startURL);
  mainWindow.on('closed', () => (mainWindow = null));
  mainWindow.on('blur', () => mainWindow.hide());

  tray = new Tray(path.join(__dirname, '../public/logo192.png'));
  tray.setToolTip('Covid Analytics India - Lite!');
  tray.on('click', (event, bounds) => {
    const {x, y} = bounds;
    const {height, width} = mainWindow.getBounds();
    const yPos = process.platform === 'darwin' ? y : y - height;

    if (mainWindow.isVisible()) mainWindow.hide();
    else {
      mainWindow.setBounds({
        x: x - width / 2,
        y: yPos,
        height,
        width,
      });
      mainWindow.show();
    }
  });
  tray.on('right-click', () => {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        },
      },
    ]);
    tray.popUpContextMenu(menuConfig);
  });
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
