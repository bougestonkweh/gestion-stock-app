const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const sqlite3 = require('sqlite3').verbose();

// Définition du chemin de la base de données SQLite
const dbPath = path.join(app.getPath('userData'), 'database.sqlite');

// Initialisation de la base de données SQLite
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
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    const startUrl = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
    win.loadURL(startUrl);
}

app.whenReady().then(createWindow);

// Fonction pour enregistrer les articles
function saveArticles(articles) {
    articles.forEach(article => {
        db.run('INSERT INTO articles (code, nom, unite, conso) VALUES (?, ?, ?, ?)', 
        [article.codeInterneProduit, article.nomProduit, article.uniteDeStock, article.consoReelleQuantite]);
    });
}

// Exposer la fonction via IPC
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
