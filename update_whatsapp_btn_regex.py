import os
import re

html_files = ['about.html', 'product.html']

for file in html_files:
    if not os.path.exists(file): continue
    with open(file, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Regex to match the gold rate button and replace it
    pattern = r'<a href="https://wa\.me/919014659444[^>]+>Lock This Rate[^<]+</a>'
    replacement = '<a href="https://wa.me/919014659444?text=Hi, I want to lock the current gold rate." target="_blank" class="btn btn-whatsapp" style="width: 100%; border-radius: 50px; display: flex; justify-content: center; align-items: center; gap: 8px; position: relative; z-index: 10000;"><i class="fa-brands fa-whatsapp" style="font-size: 1.2rem;"></i> Lock This Rate on WhatsApp</a>'
    
    new_content = re.sub(pattern, replacement, content)
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated WhatsApp button in {file}")

