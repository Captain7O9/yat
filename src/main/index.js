import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';

import icon from '../../resources/icon.png?asset';
import db from './database';

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on('ping', () => console.log('pong'));

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Close db
app.on('before-quit', () => {
  db.close();
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

// db init
db.serialize(() => {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS times ( 
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      time INTEGER,
      date TEXT NOT NULL,
      type TEXT CHECK (type IN ( '2x2', '3x3', '4x4', '5x5', '6x6', '7x7', 'square1', 'megaminx', 'pyraminx', 'skewb', 'clock')),
      scramble TEXT NOT NULL
    );
  `;
  db.run(createTableSQL);

  // defula values
  const createDefaultValue = `
  INSERT INTO times (time, date, type, scramble) VALUES
  (?, ?, ?, ?)
  `;
  db.run(createDefaultValue, [
    12345,
    Date.now(),
    '3x3',
    'U R2 F B R B2 R U2 L B2 R U L2 U2 F2',
  ]);
});

ipcMain.handle('fetch-times', (event) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM times', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
});

ipcMain.handle('create-time', (event, time, date, type, scramble) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO times (time, date, type, scramble)
       VALUES (?, ?, ?, ?)`,
      [time, date, type, scramble],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
});
