import os
import re

html_files = ['index.html', 'about.html', 'gallery.html', 'custom-designs.html', 'product.html']

for file in html_files:
    if not os.path.exists(file): continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    def replacer(match):
        img_tag = match.group(0)
        if 'loading="lazy"' in img_tag or 'hero-bg' in img_tag or 'logo' in img_tag.lower():
            return img_tag
        return img_tag.replace('<img ', '<img loading="lazy" ')
        
    content = re.sub(r'<img [^>]+>', replacer, content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Lazy loading applied")
