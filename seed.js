const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'scrap_portal.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
        return;
    }
    
    console.log('Seeding initial data...');

    db.serialize(() => {
        // Insert Admin (ID: 1, Username: admin, Password: admin123)
        // Note: For a real app, passwords should be hashed with bcrypt. 
        // We use plain text here temporarily to match the simple static login form.
        db.run(`INSERT OR IGNORE INTO tbladmin (ID, AdminName, AdminUserName, Password) VALUES (1, 'Super Admin', 'admin', 'admin123')`, (err) => {
            if (err) console.error(err);
            else console.log('Admin account created: admin / admin123');
        });

        // Insert Staff / Scrap Agent (ID: 1, Username: staff, Password: staff123)
        db.run(`INSERT OR IGNORE INTO tblscrapagents (ID, FullName, Username, Password) VALUES (1, 'Test Agent', 'staff', 'staff123')`, (err) => {
            if (err) console.error(err);
            else console.log('Staff account created: staff / staff123');
        });
    });

    setTimeout(() => {
        db.close();
    }, 1000);
});
