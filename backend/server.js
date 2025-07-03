const express = require('express');
const db = require('./database.js'); // Assuming database.js is in the same directory
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// API Endpoints

// Root path
app.get('/', (req, res) => {
  res.send('Discord Bot Backend is running!');
});

// --- Custom Commands Endpoints ---

// POST /api/commands - Create a new custom command
app.post('/api/commands', (req, res) => {
  const { name, response } = req.body;
  if (!name || !response) {
    return res.status(400).json({ error: 'Name and response are required' });
  }
  const sql = `INSERT INTO commands (name, response) VALUES (?, ?)`;
  db.run(sql, [name, response], function(err) {
    if (err) {
      console.error('Error inserting command:', err.message);
      return res.status(500).json({ error: 'Could not create command', details: err.message });
    }
    res.status(201).json({ id: this.lastID, name, response });
  });
});

// GET /api/commands - Get all custom commands
app.get('/api/commands', (req, res) => {
  const sql = `SELECT * FROM commands ORDER BY createdAt DESC`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching commands:', err.message);
      return res.status(500).json({ error: 'Could not retrieve commands', details: err.message });
    }
    res.json(rows);
  });
});

// PUT /api/commands/:id - Update a custom command
app.put('/api/commands/:id', (req, res) => {
  const { name, response } = req.body;
  const { id } = req.params;
  if (!name || !response) {
    return res.status(400).json({ error: 'Name and response are required' });
  }
  const sql = `UPDATE commands SET name = ?, response = ? WHERE id = ?`;
  db.run(sql, [name, response, id], function(err) {
    if (err) {
      console.error('Error updating command:', err.message);
      return res.status(500).json({ error: 'Could not update command', details: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Command not found' });
    }
    res.json({ message: 'Command updated successfully', id, name, response });
  });
});

// DELETE /api/commands/:id - Delete a custom command
app.delete('/api/commands/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM commands WHERE id = ?`;
  db.run(sql, id, function(err) {
    if (err) {
      console.error('Error deleting command:', err.message);
      return res.status(500).json({ error: 'Could not delete command', details: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Command not found' });
    }
    res.json({ message: 'Command deleted successfully', id });
  });
});

// --- Auto Moderation Settings Endpoints ---

// POST /api/moderation/settings - Configure a moderation setting
app.post('/api/moderation/settings', (req, res) => {
  const { setting_key, setting_value } = req.body;
  if (!setting_key || setting_value === undefined) {
    return res.status(400).json({ error: 'Setting key and value are required' });
  }
  const sql = `INSERT OR REPLACE INTO moderation_settings (setting_key, setting_value, updatedAt) VALUES (?, ?, CURRENT_TIMESTAMP)`;
  db.run(sql, [setting_key, setting_value], function(err) {
    if (err) {
      console.error('Error saving moderation setting:', err.message);
      return res.status(500).json({ error: 'Could not save moderation setting', details: err.message });
    }
    res.status(201).json({ setting_key, setting_value });
  });
});

// GET /api/moderation/settings - Get all moderation settings
app.get('/api/moderation/settings', (req, res) => {
  const sql = `SELECT * FROM moderation_settings`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching moderation settings:', err.message);
      return res.status(500).json({ error: 'Could not retrieve moderation settings', details: err.message });
    }
    // Convert array of settings to an object for easier use on the client
    const settingsObj = rows.reduce((acc, row) => {
      acc[row.setting_key] = row.setting_value;
      return acc;
    }, {});
    res.json(settingsObj);
  });
});

// GET /api/moderation/settings/:key - Get a specific moderation setting
app.get('/api/moderation/settings/:key', (req, res) => {
  const { key } = req.params;
  const sql = `SELECT setting_key, setting_value FROM moderation_settings WHERE setting_key = ?`;
  db.get(sql, [key], (err, row) => {
    if (err) {
      console.error('Error fetching moderation setting by key:', err.message);
      return res.status(500).json({ error: 'Could not retrieve moderation setting', details: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Moderation setting not found' });
    }
    res.json(row);
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Basic error handling for uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  process.exit(1); //mandatory (as per the Node.js docs)
});
