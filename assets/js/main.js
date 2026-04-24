document.addEventListener("DOMContentLoaded", function() {
    // Utility to load HTML components
    function loadComponent(url, elementId, callback) {
        const container = document.getElementById(elementId);
        if (!container) return;

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
                if (callback) callback();
            })
            .catch(error => console.error('Error loading component:', error));
    }

    // Load Admin Sidebar and Header if containers exist
    loadComponent('assets/components/admin-sidebar.html', 'admin-sidebar-container', initializeSidebar);
    loadComponent('assets/components/admin-header.html', 'admin-header-container');

    // Load Agent Sidebar and Header if containers exist
    loadComponent('assets/components/agent-sidebar.html', 'agent-sidebar-container', initializeSidebar);
    loadComponent('assets/components/agent-header.html', 'agent-header-container');

    function initializeSidebar() {
        // Highlight active link based on current URL or a specific ID set in the body
        const activeNavId = document.body.getAttribute('data-active-nav');
        if (activeNavId) {
            const activeLink = document.getElementById(activeNavId);
            if (activeLink) {
                // Remove active from dashboard
                const dashboardLink = document.getElementById('nav-dashboard') || document.getElementById('nav-agent-dashboard');
                if (dashboardLink) dashboardLink.classList.remove('active');
                activeLink.classList.add('active');
                activeLink.style.color = "white";
                
                // Open parent dropdown if it exists
                const parentDropdown = activeLink.closest('.dropdown-menu');
                if (parentDropdown) {
                    parentDropdown.style.display = 'block';
                    parentDropdown.previousElementSibling.querySelector('.right-icon').classList.replace('fa-angle-left', 'fa-angle-down');
                }
            }
        }

        // Handle Dropdown toggles
        const toggles = document.querySelectorAll('.dropdown-toggle');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                const menu = this.nextElementSibling;
                const icon = this.querySelector('.right-icon');
                
                if (menu.style.display === 'block') {
                    menu.style.display = 'none';
                    icon.classList.replace('fa-angle-down', 'fa-angle-left');
                } else {
                    // Close others
                    document.querySelectorAll('.dropdown-menu').forEach(m => {
                        m.style.display = 'none';
                        m.previousElementSibling.querySelector('.right-icon').classList.replace('fa-angle-down', 'fa-angle-left');
                    });
                    menu.style.display = 'block';
                    icon.classList.replace('fa-angle-left', 'fa-angle-down');
                }
            });
        });
    }

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }

    // Dashboard Sidebar Toggle
    document.body.addEventListener('click', function(e) {
        if (e.target.closest('#sidebar-toggle') || e.target.closest('#agent-sidebar-toggle') || e.target.closest('.sidebar-toggle')) {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) sidebar.classList.toggle('show');
        }
    });

    // Global Auth State Toggle for Public Navbar
    const authButtonsContainer = document.querySelector('.auth-buttons');
    if (authButtonsContainer && localStorage.getItem('userLoggedIn') === 'true') {
        authButtonsContainer.innerHTML = `
            <a href="cart.html" style="color: var(--primary); font-size: 1.2rem; margin-right: 15px;"><i class="fas fa-shopping-cart"></i></a>
            <a href="user-dashboard.html" class="btn btn-primary" style="background-color: var(--secondary); border-color: var(--secondary);">MY ACCOUNT</a>
            <a href="#" id="logout-btn" class="btn btn-danger" style="background-color: #dc3545; color: white; padding: 10px 25px; border-radius: 4px; font-weight: bold; text-decoration: none;">LOGOUT</a>
        `;
        
        document.getElementById('logout-btn').addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('userLoggedIn');
            window.location.href = 'index.html';
        });
    }

});
