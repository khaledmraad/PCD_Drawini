from flask import Flask, request, jsonify
from flask_cors import CORS
import importlib
import json
from AI import widget_detector

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], methods=["POST", "GET"], supports_credentials=True)

class Widget:
    def __init__(self, type, x, y, width, height, content=" "):
        self.type = type
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.content = content or " "

    def display_attributes(self):
        print(f"Widget Attributes:\nType: {self.type}\nPosition: ({self.x}, {self.y})\nDimensions: {self.width}x{self.height}\nContent: {self.content}")

def create_widget_objects(widgets):
    return [Widget(**widget_data) for widget_data in widgets]

def get_module(module_name):
    return importlib.import_module(f'views.{module_name}')

@app.route('/api/downloads', methods=['POST','GET'])
def get_widgets():
    if 'img' not in request.files:
        return jsonify({"error": "No image part"}), 400
    
    img_file = request.files['img']
    if img_file.filename == '':
        return jsonify({"error": "No selected image"}), 400
    
    img_data = img_file.read()
    widgets_info = widget_detector.detect_widgets(img_data)
    
    technology = request.form.get('technology')
    if not technology:
        return jsonify({"error": "Technology not specified"}), 400
    
    module_name = {
        'html': 'html',
        'angular': 'angular',
        'react_js': 'react_js',
        'react_ts': 'react_ts'
    }.get(technology, None)
    
    if not module_name:
        return jsonify({"error": "Invalid technology selected"}), 400
    
    module = get_module(module_name)
    
    widgets_data = json.loads(widgets_info)
    widget_objects = create_widget_objects(widgets_data)
    
    code = module.generate_components(widget_objects)
    return module.download_code(code)

@app.route('/api/change', methods=['POST'])
def change_widgets():
    if 'img' not in request.files:
        return jsonify({"error": "No image part"}), 400
    
    img_file = request.files['img']
    if img_file.filename == '':
        return jsonify({"error": "No selected image"}), 400
    
    img_data = img_file.read()
    widgets_info = widget_detector.detect_widgets(img_data)
    
    technology = request.form.get('technology')
    if not technology:
        return jsonify({"error": "Technology not specified"}), 400
    
    module_name = {
        'html': 'html',
        'angular': 'angular',
        'react_js': 'react_js',
        'react_ts': 'react_ts'
    }.get(technology, None)
    
    if not module_name:
        return jsonify({"error": "Invalid technology selected"}), 400
    
    module = get_module(module_name)
    
    return  widgets_info

@app.route('/')
def hello_world():
    return jsonify({"message": "Hello from backend"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
