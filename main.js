const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');

const SCORES_PATH = path.join(app.getPath('userData'), 'scores.json');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 760,
    height: 860,
    minWidth: 560,
    minHeight: 620,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false, // Allow EDHREC + Scryfall cross-origin requests
    },
    backgroundColor: '#0d0d1a',
    titleBarStyle: 'hiddenInset',
    title: 'MTG Cascade',
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.handle('load-scores', () => {
  if (fs.existsSync(SCORES_PATH)) {
    return JSON.parse(fs.readFileSync(SCORES_PATH, 'utf8'));
  }
  return { bestStreak: 0, commanderName: '' };
});

ipcMain.handle('save-scores', (_event, data) => {
  fs.writeFileSync(SCORES_PATH, JSON.stringify(data, null, 2));
});

ipcMain.handle('open-url', (_event, url) => {
  shell.openExternal(url);
});
