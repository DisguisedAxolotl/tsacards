const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Database } = require('better-sqlite3');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const dbPath = process.env.DB_PATH;

// Connect to the SQLite3 database using better-sqlite3
const db = require('better-sqlite3')(dbPath);
db.pragma('journal_mode = WAL');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', (req, res) => {
  const { name, email } = req.body;

  // Insert the user data into the SQLite3 database (${name}, ${email})
  const insert = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");

  try {
    insert.run(name, email);
    res.redirect('/');
  } catch (error) {
    // Handle the error
    console.error(error.message);
    res.status(500).render('error', { error: error.stack })
  }
});

app.get('/count', (req, res) => {
  res.render('count');
});



app.use((req, res, next) => {
  res.status(404).render('error', { error: 'Page not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: 'Internal server error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});