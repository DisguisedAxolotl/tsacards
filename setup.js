// Run this file once after 'git pull'


// Specify the path to your .db file in .env as DB_PATH
const dbPath = process.env.DB_PATH;
const db = require('better-sqlite3')(dbPath);



// SQL command to create the users table
const createTableSQL = db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL
  );
`);

// Execute the SQL command to create the table

try {
    createTableSQL.run()
    console.log("'users' table created successfully")
} catch (error) {
    console.error(error.message);
}

const insertTestSQL = db.prepare("INSERT INTO users (name, email) VALUES ('John Smith', 'test@example.com')")

try {
    insertTestSQL.run()
    console.log("test completed successfully")
} catch (error) {
    console.error(error.message);
}


db.close()



