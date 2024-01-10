const { app, BrowserWindow } = require('electron');
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
        // Créer des tables si nécessaire
        db.run("CREATE TABLE IF NOT EXISTS articles (code TEXT, nom TEXT, unite TEXT, conso REAL)");
    }
});

function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // Il est recommandé d'utiliser contextIsolation pour des raisons de sécurité
            // Si vous devez désactiver contextIsolation, soyez très prudent avec le code exécuté dans le processus de rendu
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    const startUrl = isDev ? 'http://localhost:3000' :
        `file://${path.join(__dirname, '../build/index.html')}`;

    win.loadURL(startUrl);
}

app.whenReady().then(createWindow);

// Exporter db pour y accéder depuis d'autres fichiers
module.exports = db;
