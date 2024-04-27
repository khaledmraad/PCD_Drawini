import shutil
import os
import zipfile
from io import BytesIO
from flask import send_file
import tempfile

def generate_components(widgets):
    react_code = '''
import React from 'react';

const WidgetContainer = ({ widgets }) => (
  <div>
'''

    for widget in widgets:
        if widget.type == 'input':
            react_code += '    <input type="text"  style={{ position: "absolute", left: "' + str(widget.x) + 'px", top: "' + str(widget.y) + 'px", width: "' + str(widget.width) + 'px", height: "' + str(widget.height) + 'px" }} />\n'
        elif widget.type == 'button':
            react_code += '    <button  style={{ position: "absolute" ,left: "' + str(widget.x) + 'px", top: "' + str(widget.y) + 'px", width: "' + str(widget.width) + 'px", height: "' + str(widget.height) + 'px" }}>'+widget.content+'</button>\n'
        elif widget.type == 'dropdown':
            react_code += '    <select  style={{ position: "absolute", left: "' + str(widget.x) + 'px", top: "' + str(widget.y) + 'px", width: "' + str(widget.width) + 'px", height: "' + str(widget.height) + 'px" }}>\n'
            react_code += '        {/* Add options here */}\n'
            react_code += '    </select>\n'
        elif widget.type == 'checkbox':
            react_code += '    <input type="checkbox"  style={{ position: "absolute", left: "' + str(widget.x) + 'px", top: "' + str(widget.y) + 'px", width: "' + str(widget.width) + 'px", height: "' + str(widget.height) + 'px" }} />\n'
        elif widget.type == 'imagerectangle':
            react_code += '    <img src=""  style={{ position: "absolute", left: "' + str(widget.x) + 'px", top: "' + str(widget.y) + 'px", width: "' + str(widget.width) + 'px", height: "' + str(widget.height) + 'px" }} />\n'
        elif widget.type == 'imagecercle':
            react_code += '    <img src=""  style={{ borderRadius: "50%",overflow: "hidden",border:"2px solid #ccc", position: "absolute", left: "' + str(widget.x) + 'px", top: "' + str(widget.y) + 'px", width: "' + str(widget.width) + 'px", height: "' + str(widget.height) + 'px" }} />\n'
        elif widget.type == 'text':
            react_code += '    <p  style={{ position: "absolute", left: "' + str(widget.x) + 'px", top: "' + str(widget.y) + 'px", width: "' + str(widget.width) + 'px", height: "' + str(widget.height) + 'px" }}>'+widget.content+ '</p>\n'
        elif widget.type == 'textbox':
            react_code += '    <textarea  style={{ position: "absolute", left: "' + str(widget.x) + 'px", top: "' + str(widget.y) + 'px", width: "' + str(widget.width) + 'px", height: "' + str(widget.height) + 'px" }}>' + '</textarea>\n'
        elif widget.type == 'logo':
            react_code += '    <img src=""  style={{ position: "absolute", left: "' + str(widget.x) + 'px", top: "' + str(widget.y) + 'px", width: "' + str(widget.width) + 'px", height: "' + str(widget.height) + 'px" }} />\n'
        elif widget.type == 'line':
            react_code += '    <hr style={{ position: "absolute", left: "' + str(widget.x) + 'px", top: "' + str(widget.y) + 'px", width: "' + str(widget.width) + 'px", height: "' + str(widget.height) + 'px" }} />\n'

    react_code += '''
  </div>
);

export default WidgetContainer;
'''
    return react_code




def generate_code_and_return():
    source_path = './static/react_app_javascript'
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
        download_name='react_js_app.zip'
    )  

def modify_zip_content(react_zip, modified_content):
    temp_dir = tempfile.mkdtemp()
    
    try:
        with zipfile.ZipFile(react_zip, 'r') as zip_ref:
            zip_ref.extractall(temp_dir)
        
        widget_container_path = os.path.join(temp_dir, 'src', 'components', 'WidgetContainer.jsx')
        if os.path.exists(widget_container_path):
            with open(widget_container_path, 'w') as f:
                f.write(modified_content)
        else:
            print("WidgetContainer.jsx not found:", widget_container_path)
        
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