import os
import re

file_path = 'custom-designs.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = '''                    <div style="margin-bottom: 1.5rem; position: relative;">
                        <label style="display: block; margin-bottom: 0.5rem; color: var(--maroon); font-weight: 600;">Attach Reference Image (Optional)</label>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <input name="image" id="image-upload" accept="image/*" style="width: 100%; padding: 1rem; border: 1px dashed #ddd; border-radius: 8px; background: #fff;" type="file" />
                            <button type="button" id="remove-image-btn" style="display: none; width: fit-content; background: #ff4d4d; color: white; border: none; padding: 5px 12px; border-radius: 4px; font-size: 0.8rem; cursor: pointer; transition: all 0.3s ease;">Remove Photo</button>
                        </div>
                    </div>'''

replacement = '''                    <div style="margin-bottom: 1.5rem; position: relative;">
                        <label style="display: block; margin-bottom: 0.5rem; color: var(--maroon); font-weight: 600;">Attach Reference Photo (Optional)</label>
                        
                        <div class="custom-file-upload" style="position: relative; width: 100%; padding: 2rem; border: 2px dashed #D4AF37; border-radius: 12px; background: rgba(212, 175, 55, 0.05); text-align: center; cursor: pointer; transition: all 0.3s ease;">
                            <input name="image" id="image-upload" accept="image/*" type="file" style="opacity: 0; position: absolute; top: 0; left: 0; width: 100%; height: 100%; cursor: pointer; z-index: 2;" />
                            <div class="upload-ui" style="position: relative; z-index: 1;">
                                <i class="fa-solid fa-cloud-arrow-up" style="font-size: 2.5rem; color: var(--gold); margin-bottom: 10px;"></i>
                                <p id="upload-text" style="color: var(--maroon); margin: 0; font-weight: 600; font-size: 1.1rem;">Click to Browse or Drag Photo Here</p>
                                <p style="color: var(--text-light); font-size: 0.85rem; margin-top: 5px;">Supports JPG, PNG, WEBP (Max 5MB)</p>
                            </div>
                        </div>
                        <button type="button" id="remove-image-btn" style="display: none; margin-top: 10px; width: fit-content; background: #ff4d4d; color: white; border: none; padding: 5px 12px; border-radius: 4px; font-size: 0.8rem; cursor: pointer; transition: all 0.3s ease;">Remove Photo</button>
                    </div>'''

content = content.replace(target, replacement)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("File upload replaced")
