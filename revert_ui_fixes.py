import glob
import os

target_html = """    <a href="https://wa.me/919014659444" class="nav-item" target="_blank">
        <i class="fa-brands fa-whatsapp"></i>
        <span>Chat</span>
    </a>"""

for f in glob.glob('*.html'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    if target_html in content:
        content = content.replace(target_html, '')
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Removed Chat from {f}")

# Fix styles.css (unhide WhatsApp float, restore hero blur)
css_path = 'styles.css'
with open(css_path, 'r', encoding='utf-8') as file:
    css_content = file.read()

# 1. Unhide WhatsApp float
hide_wa_block = """    /* Hide floating WhatsApp — sticky nav already has Chat */
    .whatsapp-float,
    .wa-float,
    a[class*='whatsapp-float'],
    a[class*='wa-float'],
    .wa-tooltip {
        display: none !important;
    }"""
if hide_wa_block in css_content:
    css_content = css_content.replace(hide_wa_block, '')
    print("Unhid WA float block 1")

hide_wa_block_2 = "    .wa-tooltip { display: none !important; }"
if hide_wa_block_2 in css_content:
    css_content = css_content.replace(hide_wa_block_2, '')
    print("Unhid WA float block 2")

# 2. Restore Hero Blur
gradient_target = "background: linear-gradient(to top, rgba(250, 247, 242, 0.95) 0%, rgba(250, 247, 242, 0.7) 40%, rgba(250, 247, 242, 0.3) 100%) !important;"
blur_replacement = "backdrop-filter: blur(5px);\n    transition: all 0.4s ease;"

if gradient_target in css_content:
    css_content = css_content.replace(gradient_target, blur_replacement)
    print("Restored hero blur")

with open(css_path, 'w', encoding='utf-8') as file:
    file.write(css_content)
