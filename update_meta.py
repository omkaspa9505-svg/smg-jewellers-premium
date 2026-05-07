import os
import glob

html_files = glob.glob('*.html')

old_meta = '<meta content="width=device-width, initial-scale=1.0" name="viewport" />'
old_meta2 = '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
new_meta = '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />'

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if old_meta in content:
        content = content.replace(old_meta, new_meta)
    elif old_meta2 in content:
        content = content.replace(old_meta2, new_meta)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {file}")
