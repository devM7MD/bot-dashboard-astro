const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database. If the file does not exist, it will be created.
const db = new sqlite3.Database('./mydiscordbot.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error when creating the database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    // Create tables if they don't exist
    db.serialize(() => {
      // Table for custom commands
      db.run(`CREATE TABLE IF NOT EXISTS commands (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        response TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )`, (err) => {
        if (err) {
          console.error('Error creating commands table', err.message);
        } else {
          console.log('Commands table created or already exists.');
        }
      });

      // Table for moderation settings
      // For simplicity, storing settings as key-value pairs.
      // A more structured approach might be needed for complex settings.
      db.run(`CREATE TABLE IF NOT EXISTS moderation_settings (
        setting_key TEXT PRIMARY KEY,
        setting_value TEXT,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )`, (err) => {
        if (err) {
          console.error('Error creating moderation_settings table', err.message);
        } else {
          console.log('Moderation settings table created or already exists.');
          // Example: Initialize a default setting if not present
          db.run(`INSERT OR IGNORE INTO moderation_settings (setting_key, setting_value) VALUES (?, ?)`,
            ['auto_kick_bots', 'false'],
            (err) => {
              if (err) {
                console.error('Error initializing default moderation setting', err.message);
              }
            }
          );
        }
      });
    });
  }
});

module.exports = db;
