import xml.etree.ElementTree as ET

tree = ET.parse('window_dump.xml')
root = tree.getroot()

def print_node(node, depth=0):
    text = node.attrib.get('text', '')
    content_desc = node.attrib.get('content-desc', '')
    bounds = node.attrib.get('bounds', '')
    class_name = node.attrib.get('class', '')
    
    if text or content_desc or 'WebView' in class_name or 'View' in class_name:
        if text.strip() or content_desc.strip():
            print(('  ' * depth + f"{class_name} | text: '{text}' | desc: '{content_desc}' | bounds: {bounds}").encode('ascii', 'ignore').decode())
    
    for child in node:
        print_node(child, depth + 1)

print_node(root)
