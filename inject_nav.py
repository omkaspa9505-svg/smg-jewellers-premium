import os
import glob

nav_html = """
<!-- Mobile Sticky Nav -->
<nav class="mobile-sticky-nav">
    <a href="index.html" class="nav-item" id="nav-home">
        <i class="fa-solid fa-house"></i>
        <span>Home</span>
    </a>
    <a href="gallery.html" class="nav-item" id="nav-collections">
        <i class="fa-solid fa-gem"></i>
        <span>Collections</span>
    </a>
    <a href="custom-designs.html" class="nav-item" id="nav-custom">
        <i class="fa-solid fa-wand-magic-sparkles"></i>
        <span>Custom</span>
    </a>
    <a href="https://wa.me/919014659444" class="nav-item" target="_blank">
        <i class="fa-brands fa-whatsapp"></i>
        <span>Chat</span>
    </a>
</nav>
<script>
    // Highlight active nav item
    document.addEventListener("DOMContentLoaded", () => {
        const path = window.location.pathname;
        if(path.includes('gallery') || path.includes('product')) {
            document.getElementById('nav-collections')?.classList.add('active');
        } else if(path.includes('custom')) {
            document.getElementById('nav-custom')?.classList.add('active');
        } else {
            document.getElementById('nav-home')?.classList.add('active');
        }
    });
</script>
"""

html_files = glob.glob('*.html')
for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if 'mobile-sticky-nav' not in content:
        # Add before </body>
        content = content.replace('</body>', nav_html + '\n</body>')
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f'Updated {f}')
