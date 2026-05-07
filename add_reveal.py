import os
import re

html_files = ['index.html', 'about.html', 'gallery.html', 'custom-designs.html', 'product.html']

for file in html_files:
    if not os.path.exists(file): continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace <section class="section"> with <section class="section reveal">
    content = content.replace('class="section"', 'class="section reveal"')
    # Avoid duplicate reveals
    content = content.replace('reveal reveal', 'reveal')
    
    # Add reveal to some specific elements
    content = content.replace('class="container"', 'class="container reveal"')
    content = content.replace('reveal reveal', 'reveal')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
print("Reveal added")
