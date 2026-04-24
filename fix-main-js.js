const fs = require('fs');

const files = [
    'admin-login.html',
    'agent-login.html',
    'cart.html',
    'login.html',
    'register.html',
    'user-bookings.html',
    'user-change-password.html',
    'user-dashboard.html'
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf-8');
        if (!content.includes('assets/js/main.js')) {
            content = content.replace('</body>', '    <script src="assets/js/main.js"></script>\n</body>');
            fs.writeFileSync(file, content);
            console.log('Added main.js to ' + file);
        }
    }
});
