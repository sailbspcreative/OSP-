const fs = require('fs');
const files = [
    'admin-add-agent.html',
    'admin-add-category.html',
    'admin-add-subcategory.html',
    'admin-add-subadmin.html',
    'admin-bw-dates.html',
    'admin-profile.html'
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf-8');
        // Replace form tags to add action
        // Handle `<form>` or `<form action="">`
        let newContent = content.replace(/<form[^>]*>/i, match => {
            // Keep existing classes or IDs, but overwrite action
            if (match.includes('action=')) {
                return match.replace(/action="[^"]*"/, 'action="admin-action-success.html"');
            } else {
                return match.replace('<form', '<form action="admin-action-success.html"');
            }
        });
        
        // Also ensure submit buttons are actually type="submit"
        newContent = newContent.replace(/<button type="button" class="btn btn-primary"([^>]*)>(SUBMIT|ADD|UPDATE)<\/button>/gi, '<button type="submit" class="btn btn-primary"$1>$2</button>');
        
        fs.writeFileSync(file, newContent);
        console.log('Updated ' + file);
    }
});
