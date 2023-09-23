const express = require('express');
require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = process.env.PORT;
const pug = require('pug');


const dbPath = process.env.DB_PATH;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const db = new sqlite3.Database(dbPath);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index')
});

app.use((req, res, next) => {
  res.status(404).render('error', { error: 'Page not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
