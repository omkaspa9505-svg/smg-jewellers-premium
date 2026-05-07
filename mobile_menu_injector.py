import os
import re

html_files = ['index.html', 'about.html', 'gallery.html', 'custom-designs.html', 'product.html']

menu_html = '''
    <div class="mobile-menu-toggle" id="mobile-menu-toggle">
        <i class="fa-solid fa-bars"></i>
    </div>
</header>
<div class="mobile-nav-overlay" id="mobile-nav-overlay">
    <div class="mobile-nav-header">
        <a class="logo" href="index.html">SMG<span>JEWELLERS</span></a>
        <button class="close-menu-btn" id="close-menu-btn"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="mobile-nav-body">
        <a href="index.html">Home</a>
        <a href="about.html">Our Story</a>
        <a href="gallery.html">Collections</a>
        <a href="custom-designs.html">Custom Designs</a>
    </div>
</div>
'''

menu_js = '''
<script>
document.addEventListener('DOMContentLoaded', () => {
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
});
</script>
</body>
'''

for file in html_files:
    if not os.path.exists(file): continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'id="mobile-menu-toggle"' not in content:
        content = content.replace('</header>', menu_html)
    
    if 'mobileMenuToggle.addEventListener' not in content:
        content = content.replace('</body>', menu_js)
        
    if 'font-awesome' not in content:
        content = content.replace('</title>', '</title>\n    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
        
css_additions = '''
/* --- MOBILE MENU --- */
.mobile-menu-toggle {
    display: none;
    font-size: 1.8rem;
    color: var(--maroon);
    cursor: pointer;
    margin-left: 15px;
}

.mobile-nav-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    background: rgba(250, 247, 242, 0.95);
    backdrop-filter: blur(10px);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    padding: 20px;
    transform: translateX(100%);
    transition: transform 0.4s cubic-bezier(0.77, 0, 0.175, 1);
}

.mobile-nav-overlay.active {
    transform: translateX(0);
}

.mobile-nav-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
}

.close-menu-btn {
    background: none;
    border: none;
    font-size: 2rem;
    color: var(--maroon);
    cursor: pointer;
}

.mobile-nav-body {
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    margin-top: 50px;
}

.mobile-nav-body a {
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: 600;
    color: var(--maroon);
    text-decoration: none;
    font-family: 'Cinzel', serif;
}

@media (max-width: 768px) {
    .nav-links {
        display: none !important;
    }
    .mobile-menu-toggle {
        display: block;
    }
    
    #open-rates-btn {
        padding: 0.5rem 1rem !important;
        font-size: 0.8rem !important;
        margin-left: auto !important; /* Push it to the right before the hamburger */
    }
    
    .header {
        padding: 15px 5%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
'''

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

if '.mobile-menu-toggle' not in css:
    with open('styles.css', 'a', encoding='utf-8') as f:
        f.write(css_additions)

print("Done")
