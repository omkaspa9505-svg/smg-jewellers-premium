import os

file_path = 'custom-designs.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

js_code = '''
<script>
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('image-upload');
    const uploadText = document.getElementById('upload-text');
    const removeBtn = document.getElementById('remove-image-btn');

    if (fileInput && uploadText && removeBtn) {
        fileInput.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                uploadText.textContent = "1 File Selected: " + this.files[0].name;
                removeBtn.style.display = 'block';
            } else {
                uploadText.textContent = "Click to Browse or Drag Photo Here";
                removeBtn.style.display = 'none';
            }
        });

        removeBtn.addEventListener('click', function() {
            fileInput.value = '';
            uploadText.textContent = "Click to Browse or Drag Photo Here";
            removeBtn.style.display = 'none';
        });
    }
});
</script>
</body>
'''

if "uploadText.textContent" not in content:
    content = content.replace('</body>', js_code)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("JS added")
