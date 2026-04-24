const fs = require('fs');

// Mapping for edit files
const editMap = {
    'admin-add-agent.html': { target: 'admin-edit-agent.html', entity: 'Scrap Agent' },
    'admin-add-subadmin.html': { target: 'admin-edit-subadmin.html', entity: 'Sub-Admin' },
    'admin-add-category.html': { target: 'admin-edit-category.html', entity: 'Category' },
    'admin-add-subcategory.html': { target: 'admin-edit-subcategory.html', entity: 'Subcategory' }
};

// 1. Create Edit Pages
for (const [source, config] of Object.entries(editMap)) {
    if (fs.existsSync(source)) {
        let content = fs.readFileSync(source, 'utf-8');
        
        // Update Title & Heading
        content = content.replace(/Add Scrap Agent/gi, 'Edit Scrap Agent');
        content = content.replace(/Add Sub Admin/gi, 'Edit Sub Admin');
        content = content.replace(/Add Scrap Category/gi, 'Edit Scrap Category');
        content = content.replace(/Add Scrap Subcategory/gi, 'Edit Scrap Subcategory');
        
        // Ensure form still points to success page
        if (!content.includes('admin-action-success.html')) {
            content = content.replace(/<form[^>]*>/, '<form action="admin-action-success.html">');
            content = content.replace(/<button type="button" class="btn btn-primary"([^>]*)>(SUBMIT|ADD|UPDATE)<\/button>/gi, '<button type="submit" class="btn btn-primary"$1>UPDATE</button>');
        }
        
        // Change submit buttons to say UPDATE
        content = content.replace(/>SUBMIT</g, '>UPDATE<');
        content = content.replace(/>ADD</g, '>UPDATE<');

        fs.writeFileSync(config.target, content);
        console.log(`Created ${config.target}`);
    }
}

// 2. Update Manage Pages
const manageFiles = [
    { file: 'admin-manage-agents.html', editTarget: 'admin-edit-agent.html' },
    { file: 'admin-manage-subadmin.html', editTarget: 'admin-edit-subadmin.html' },
    { file: 'admin-manage-categories.html', editTarget: 'admin-edit-category.html' },
    { file: 'admin-manage-subcategories.html', editTarget: 'admin-edit-subcategory.html' }
];

manageFiles.forEach(config => {
    if (fs.existsSync(config.file)) {
        let content = fs.readFileSync(config.file, 'utf-8');

        // Target <a> tags that have fa-edit and fa-trash
        // This regex looks for `<a href="#">` containing `<i class="fas fa-edit"></i>`
        content = content.replace(/<a[^>]*href="[^"]*"[^>]*>\s*<i[^>]*class="[^"]*fa-edit[^"]*"[^>]*><\/i>\s*<\/a>/gi, match => {
            return match.replace(/href="[^"]*"/, `href="${config.editTarget}"`);
        });

        // Target `<a href="#">` containing `<i class="fas fa-trash"></i>`
        content = content.replace(/<a[^>]*href="[^"]*"[^>]*>\s*<i[^>]*class="[^"]*fa-trash[^"]*"[^>]*><\/i>\s*<\/a>/gi, match => {
            return match.replace(/href="[^"]*"/, `href="#" onclick="if(confirm('Are you sure you want to delete this record?')) { window.location.href='admin-action-success.html'; }"`);
        });

        fs.writeFileSync(config.file, content);
        console.log(`Updated action links in ${config.file}`);
    }
});
