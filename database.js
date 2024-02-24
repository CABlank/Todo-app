const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./myapp.db', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Database connected.');
  }
});

db.serialize(() => {

    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS Users (
        GoogleUserID TEXT PRIMARY KEY,
        Email TEXT NOT NULL UNIQUE,
        Name TEXT NOT NULL,
        ProfilePictureURL TEXT,
        CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Tasks Table
    db.run(`CREATE TABLE IF NOT EXISTS Tasks (
        TaskID TEXT PRIMARY KEY,
        GoogleUserID TEXT NOT NULL,
        Title TEXT NOT NULL,
        Description TEXT,
        DueDate DATE,
        Priority TEXT CHECK(Priority IN ('High', 'Medium', 'Low')),
        CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (GoogleUserID) REFERENCES Users(GoogleUserID) ON DELETE CASCADE
    )`);

    // Categories/Tags Table
    db.run(`CREATE TABLE IF NOT EXISTS Categories (
        CategoryID TEXT PRIMARY KEY,
        Name TEXT NOT NULL UNIQUE
    )`);
        
    db.run(`CREATE TABLE IF NOT EXISTS TaskCategories (
        TaskID TEXT NOT NULL,
        CategoryID TEXT NOT NULL,
        PRIMARY KEY (TaskID, CategoryID),
        FOREIGN KEY (TaskID) REFERENCES Tasks(TaskID) ON DELETE CASCADE,
        FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID) ON DELETE CASCADE
    )`);

});


module.exports = db;
