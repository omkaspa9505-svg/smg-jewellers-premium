import os
import re

html_files = ['index.html', 'about.html', 'gallery.html', 'custom-designs.html', 'product.html']

for file in html_files:
    if not os.path.exists(file): continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the old gold button with the new whatsapp button
    target = 'class="btn btn-primary" style="width: 100%; border-radius: 50px;">Lock This Rate &rarr;</a>'
    replacement = 'class="btn btn-whatsapp" style="width: 100%; border-radius: 50px; display: flex; justify-content: center; align-items: center; gap: 8px; position: relative; z-index: 10000;"><i class="fa-brands fa-whatsapp" style="font-size: 1.2rem;"></i> Lock This Rate on WhatsApp</a>'
    
    if target in content:
        content = content.replace(target, replacement)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated WhatsApp button in {file}")

