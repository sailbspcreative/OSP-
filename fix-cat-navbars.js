const fs = require('fs');
const path = require('path');

const dir = __dirname;
const targetFiles = [
    'cat-paper.html',
    'cat-plastics.html',
    'cat-metals.html',
    'cat-ewaste.html',
    'cat-glass.html',
    'cat-auto.html'
];

const fullNavbar = `
    <nav class="navbar">
        <div class="container">
            <a href="index.html" class="logo">Online Scrap Portal</a>
            <div class="menu-toggle"><i class="fas fa-bars"></i></div>
            <div class="nav-links">
                <a href="index.html">HOME</a>
                <a href="admin-login.html">ADMIN</a>
                <a href="agent-login.html">STAFF</a>
                <a href="categories.html" class="active">CATEGORY</a>
                <a href="contact.html">CONTACT</a>
            </div>
            <div class="auth-buttons">
                <a href="cart.html" style="color: var(--primary); font-size: 1.2rem; margin-right: 15px;"><i class="fas fa-shopping-cart"></i></a>
                <a href="register.html" class="btn btn-primary">SIGNUP</a>
                <a href="login.html" class="btn btn-primary" style="background-color: var(--secondary);">LOGIN</a>
            </div>
        </div>
    </nav>
`;

targetFiles.forEach(file => {
    let filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) {
        console.log(`Skipping ${file}, does not exist.`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf-8');

    // Regex to match the entire <nav class="navbar">...</nav> tag
    const navRegex = /<nav class="navbar">[\s\S]*?<\/nav>/;
    
    if (navRegex.test(content)) {
        content = content.replace(navRegex, fullNavbar.trim());
    } else {
        console.log(`Could not find navbar in ${file}`);
    }

    // Check if main.js is included
    if (!content.includes('assets/js/main.js')) {
        content = content.replace('</body>', '    <script src="assets/js/main.js"></script>\n</body>');
    }

    fs.writeFileSync(filePath, content);
    console.log(`Fixed navbar and main.js in ${file}`);
});
