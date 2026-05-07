import os
import re

html_files = ['index.html', 'about.html', 'gallery.html', 'custom-designs.html', 'product.html']

whatsapp_float = '''
<!-- WhatsApp Float Button -->
<a href="https://wa.me/919014659444?text=Hi, I have an inquiry about SMG Jewellers." target="_blank" class="wa-float" style="position: fixed; bottom: 20px; right: 20px; background: #25D366; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 30px; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4); z-index: 9999; text-decoration: none; transition: transform 0.3s ease;">
    <i class="fa-brands fa-whatsapp"></i>
</a>
</body>
'''

for file in html_files:
    if not os.path.exists(file): continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'class="wa-float"' not in content:
        content = content.replace('</body>', whatsapp_float)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Added WhatsApp float to {file}")

