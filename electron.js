const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const sqlite3 = require('sqlite3').verbose();
//
const dbPath = path.join(app.getPath('userData'), 'database.sqlite');
let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        console.log('Database opened successfully');
        db.run("CREATE TABLE IF NOT EXISTS articles (code TEXT, nom TEXT, unite TEXT, conso REAL)");
    }
});

function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    const startUrl = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
    win.loadURL(startUrl);
}

app.whenReady().then(createWindow);

function saveArticles(articles) {
    articles.forEach(article => {
        db.run('INSERT INTO articles (code, nom, unite, conso) VALUES (?, ?, ?, ?)', 
        [article.codeInterneProduit, article.nomProduit, article.uniteDeStock, article.consoReelleQuantite]);
    });
}

ipcMain.handle('save-articles', async (event, articles) => {
    saveArticles(articles);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
