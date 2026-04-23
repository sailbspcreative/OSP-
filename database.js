const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or open the SQLite database file
const dbPath = path.resolve(__dirname, 'scrap_portal.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        // Initialize tables based on ER Diagram
        db.serialize(() => {
            // Admin / Sub-admin Table
            db.run(`CREATE TABLE IF NOT EXISTS tbladmin (
                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                AdminName TEXT NOT NULL,
                AdminUserName TEXT UNIQUE NOT NULL,
                MobileNumber TEXT,
                Email TEXT,
                Password TEXT NOT NULL,
                AdminRegdate DATETIME DEFAULT CURRENT_TIMESTAMP,
                UserType INTEGER DEFAULT 1
            )`);

            // Users Table
            db.run(`CREATE TABLE IF NOT EXISTS users (
                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                FullName TEXT NOT NULL,
                Email TEXT UNIQUE NOT NULL,
                MobileNumber TEXT,
                Password TEXT NOT NULL,
                RegDate DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);

            // Scrap Categories
            db.run(`CREATE TABLE IF NOT EXISTS tblscrapcategories (
                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                CategoryName TEXT NOT NULL,
                Description TEXT,
                CreationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
                AddedBy INTEGER
            )`);

            // Scrap Sub-Categories
            db.run(`CREATE TABLE IF NOT EXISTS tblscrapsubcategories (
                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                SubcategoryName TEXT NOT NULL,
                CategoryID INTEGER,
                Description TEXT,
                Price DECIMAL(10,2),
                Status TEXT DEFAULT 'Active',
                Image TEXT,
                AddedBy INTEGER,
                CreationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (CategoryID) REFERENCES tblscrapcategories(ID)
            )`);

            // Scrap Agents
            db.run(`CREATE TABLE IF NOT EXISTS tblscrapagents (
                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                Profilepic TEXT,
                FullName TEXT NOT NULL,
                Emailid TEXT UNIQUE,
                Mobilenumber TEXT,
                Address TEXT,
                Username TEXT UNIQUE NOT NULL,
                Password TEXT NOT NULL,
                AddedBy INTEGER,
                JoiningDate DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);

            // Bookings
            db.run(`CREATE TABLE IF NOT EXISTS tblscrapbooking (
                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                UserID INTEGER,
                BookingDate DATETIME,
                Status TEXT DEFAULT 'Pending',
                AgentID INTEGER,
                Remark TEXT,
                PreferredDateTime DATETIME,
                PickupAddress TEXT,
                FOREIGN KEY (UserID) REFERENCES users(ID),
                FOREIGN KEY (AgentID) REFERENCES tblscrapagents(ID)
            )`);

            console.log('Database tables verified/created successfully.');
        });
    }
});

module.exports = db;
