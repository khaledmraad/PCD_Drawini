import shutil
import os
import tempfile
import zipfile
from io import BytesIO
from flask import send_file

def generate_components(widgets):
    angular_code = '''
<div >
  <div >
'''

    for widget in widgets:
        if widget.type == 'input':
            angular_code += f'    <input [style.position]="\'absolute\'" type="text"   [style.left.px]="{widget.x}" [style.top.px]="{widget.y}" [style.width.px]="{widget.width}" [style.height.px]="{widget.height}">\n'
        elif widget.type == 'button':
            angular_code += f'    <button [style.position]="\'absolute\'"  [style.left.px]="{widget.x}" [style.top.px]="{widget.y}" [style.width.px]="{widget.width}" [style.height.px]="{widget.height}">'+widget.content+'</button>\n'
        elif widget.type == 'dropdown':
            angular_code += f'    <select [style.position]="\'absolute\'"  [style.left.px]="{widget.x}" [style.top.px]="{widget.y}" [style.width.px]="{widget.width}" [style.height.px]="{widget.height}">\n'
            angular_code += '        <!-- Add options here -->\n'
            angular_code += '    </select>\n'
        elif widget.type == 'checkbox':
            angular_code += f'    <input [style.position]="\'absolute\'" type="checkbox"  [style.left.px]="{widget.x}" [style.top.px]="{widget.y}" [style.width.px]="{widget.width}" [style.height.px]="{widget.height}">\n'
        elif widget.type == 'imagerectangle':
            angular_code += f'    <img [style.position]="\'absolute\'" src=""  [style.left.px]="{widget.x}" [style.top.px]="{widget.y}" [style.width.px]="{widget.width}" [style.height.px]="{widget.height}">\n'
        elif widget.type == 'imagecercle':
            angular_code += f'    <img [style.position]="\'absolute\'" src="" [style.left.px]="{widget.x}" [style.top.px]="{widget.y}" [style.width.px]="{widget.width}" [style.height.px]="{widget.height}" [style.borderRadius.px]="50" [style.overflow]="\'hidden\'" [style.border]="\'2px solid #ccc\'">\n'
        elif widget.type == 'text':
            angular_code += f'    <p [style.position]="\'absolute\'"  [style.left.px]="{widget.x}" [style.top.px]="{widget.y}" [style.width.px]="{widget.width}" [style.height.px]="{widget.height}">'+ widget.content +'</p>\n'
        elif widget.type == 'textbox':
            angular_code += f'    <textarea  [style.left.px]="{widget.x}" [style.top.px]="{widget.y}" [style.width.px]="{widget.width}" [style.height.px]="{widget.height}"></textarea>\n'
        elif widget.type == 'logo':
            angular_code += f'    <img [style.position]="\'absolute\'" src=""  [style.left.px]="{widget.x}" [style.top.px]="{widget.y}" [style.width.px]="{widget.width}" [style.height.px]="{widget.height}">\n'
        elif widget.type == 'line':
            angular_code += f'    <hr [style.position]="\'absolute\'"  [style.left.px]="{widget.x}" [style.top.px]="{widget.y}" [style.width.px]="{widget.width}" [style.height.px]="{widget.height}">\n'

    angular_code += '''
  </div>
</div>
'''
    return angular_code


def generate_code_and_return():
    source_path = './static/angular_app'
    output_zip = BytesIO()
    
    try:
        with zipfile.ZipFile(output_zip, "w", zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(source_path):
                for file in files:
                    file_path = os.path.join(root, file)
                    with open(file_path, 'rb') as f:
                        content = f.read()
                    
                    relative_path = os.path.relpath(file_path, source_path)
                    zipf.writestr(relative_path, content)
    
        output_zip.seek(0)
        
        return output_zip

    except Exception as e:
        print(f"An error occurred: {e}")
        return None    

def download_code(code):
    out = generate_code_and_return()
    zip_bytes = modify_zip_content(out,code)
    return send_file(
        zip_bytes,
        as_attachment=True,
        download_name='angular_app.zip'
    )  

def modify_zip_content(react_zip, modified_content):
    temp_dir = tempfile.mkdtemp()
    
    try:
        with zipfile.ZipFile(react_zip, 'r') as zip_ref:
            zip_ref.extractall(temp_dir)
        
        widget_container_path = os.path.join(temp_dir, 'src','app', 'components','widgetcontainer', 'widgetcontainer.component.html')
        if os.path.exists(widget_container_path):
            with open(widget_container_path, 'w') as f:
                f.write(modified_content)
        else:
            print("widgetcontainer.component.html not found:", widget_container_path)
        
        output_zip = BytesIO()
        with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as new_zip:
            for root, _, files in os.walk(temp_dir):
                for file in files:
                    file_path = os.path.join(root, file)
                    relative_path = os.path.relpath(file_path, temp_dir)
                    new_zip.write(file_path, relative_path)
        
        output_zip.seek(0)
        return output_zip
    
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)