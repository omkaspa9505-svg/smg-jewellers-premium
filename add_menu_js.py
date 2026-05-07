import os

file_path = 'script.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

menu_js = '''
    // Mobile Menu Logic (Global)
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const closeMenuBtn = document.getElementById('close-menu-btn');

    if(mobileMenuToggle && mobileNavOverlay && closeMenuBtn) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileNavOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeMenuBtn.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
'''

if "mobileMenuToggle" not in content:
    # Add inside DOMContentLoaded
    content = content.replace("document.addEventListener('DOMContentLoaded', () => {", "document.addEventListener('DOMContentLoaded', () => {" + menu_js)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Mobile menu JS added to script.js")
else:
    print("Mobile menu JS already in script.js")

