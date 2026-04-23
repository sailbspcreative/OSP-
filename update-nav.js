const fs = require('fs');
const path = require('path');

const dir = __dirname;

fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf-8');
        
        // Check if menu-toggle is already present
        if (!content.includes('class="menu-toggle"')) {
            content = content.replace('<div class="nav-links">', '<div class="menu-toggle"><i class="fas fa-bars"></i></div>\n            <div class="nav-links">');
            fs.writeFileSync(filePath, content);
            console.log(`Updated ${file}`);
        }
    }
});

const adminHeader = path.join(dir, 'assets', 'components', 'admin-header.html');
if (fs.existsSync(adminHeader)) {
    let content = fs.readFileSync(adminHeader, 'utf-8');
    if (!content.includes('sidebar-toggle')) {
        content = content.replace('<h2>', '<div style="display:flex;align-items:center;"><i class="fas fa-bars sidebar-toggle"></i><h2>');
        content = content.replace('</h2>', '</h2></div>');
        fs.writeFileSync(adminHeader, content);
        console.log('Updated admin-header.html');
    }
}

const agentHeader = path.join(dir, 'assets', 'components', 'agent-header.html');
if (fs.existsSync(agentHeader)) {
    let content = fs.readFileSync(agentHeader, 'utf-8');
    if (!content.includes('sidebar-toggle')) {
        content = content.replace('<h2>', '<div style="display:flex;align-items:center;"><i class="fas fa-bars sidebar-toggle"></i><h2>');
        content = content.replace('</h2>', '</h2></div>');
        fs.writeFileSync(agentHeader, content);
        console.log('Updated agent-header.html');
    }
}
