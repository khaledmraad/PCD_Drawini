from flask import send_file
import tempfile
import zipfile
import io

def generate_components(widgets):
    html_code = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
'''

    for widget in widgets:
        if widget.type == 'input':
            html_code += f'<input type="text"  style="position: absolute; left: {widget.x}px; top: {widget.y}px; width: {widget.width}px; height: {widget.height}px;">\n'
        elif widget.type == 'button':
            html_code += f'<button  style="position: absolute; left: {widget.x}px; top: {widget.y}px; width: {widget.width}px; height: {widget.height}px;">'+widget.content+'</button>\n'
        elif widget.type == 'dropdown':
            html_code += f'<select  style="position: absolute; left: {widget.x}px; top: {widget.y}px; width: {widget.width}px; height: {widget.height}px;">\n'
            html_code += '</select>\n'
        elif widget.type == 'checkbox':
            html_code += f'<input type="checkbox"  style="position: absolute; left: {widget.x}px; top: {widget.y}px; width: {widget.width}px; height: {widget.height}px;">\n'
        elif widget.type == 'imagerectangle':
            html_code += f'<img src=""  style="position: absolute; left: {widget.x}px; top: {widget.y}px; width: {widget.width}px; height: {widget.height}px;">\n'
        elif widget.type == 'imagecercle':
            html_code += f'<img src=""  style="position: absolute;border-radius: 50%; overflow: hidden; border: 2px solid #ccc; left: {widget.x}px; top: {widget.y}px; width: {widget.width}px; height: {widget.height}px;">\n'
        elif widget.type == 'text':
            html_code += f'<p  style="position: absolute; left: {widget.x}px; top: {widget.y}px; width: {widget.width}px; height: {widget.height}px;">'+widget.content+'</p>\n'
        elif widget.type == 'textbox':
            html_code += f'<textarea  style="position: absolute; left: {widget.x}px; top: {widget.y}px; width: {widget.width}px; height: {widget.height}px;"></textarea>\n'
        elif widget.type == 'logo':
            html_code += f'<img src=""  style="position: absolute; left: {widget.x}px; top: {widget.y}px; width: {widget.width}px; height: {widget.height}px;">\n'
        elif widget.type == 'line':
            html_code += f'<hr  style="position: absolute; left: {widget.x}px; top: {widget.y}px; width: {widget.width}px; height: {widget.height}px;">\n'
    return html_code

def generate_code_and_return(code):
     # Create an in-memory zip file
    output_zip = io.BytesIO()

    # Create a zip file containing the HTML content
    with zipfile.ZipFile(output_zip, "w", zipfile.ZIP_DEFLATED) as zipf:
        zipf.writestr("file.html", code)

    # Move to the beginning of the in-memory zip file
    output_zip.seek(0)
    return output_zip


def download_code(code):
    output_zip = generate_code_and_return(code)
    return send_file(output_zip, as_attachment=True, download_name='generated_files.zip')

