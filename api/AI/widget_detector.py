import cv2
import numpy as np
from tensorflow.keras.models import load_model
from imutils import contours, perspective
import imutils
import easyocr
import json

def check_overlap(bbox1, bbox2):
    x1_min, y1_min, x1_max, y1_max = bbox1
    x2_min, y2_min, x2_max, y2_max = bbox2
    return x1_max > x2_min and x1_min < x2_max and y1_max > y2_min and y1_min < y2_max

def detect_widgets(img_bytes):
    model = load_model('/home/ss/work/dev/devweb/flask/wbscr/prj1/crtuto/pcd/ex1/backend/AI/CNN.keras')
    classes = ['button', 'imagecercle', 'imagerectangle', 'input', 'logo', 'text']

    # Decode image
    image = cv2.imdecode(np.frombuffer(img_bytes, np.uint8), cv2.IMREAD_COLOR)

    # Detect text
    reader = easyocr.Reader(['en'], gpu=False)
    text_results = reader.readtext(image)

    # Store text positions and sizes
    text_data = []

    for bbox, text, _ in text_results:
      
        x_min, y_min = bbox[0]
        x_max, y_max = bbox[2]
        width = x_max - x_min
        height = y_max - y_min
        text_data.append({
            'text': text,
            'x': int(x_min),
            'y': int(y_min),
            'width': int(width),
            'height': int(height)
        })
    threshold = 0.25
    # Replace text regions with white pixels
    for t_, t in enumerate(text_results):
        bbox, _, score = t
        if score > threshold:
          x_min, y_min = bbox[0]
          x_max, y_max = bbox[2]
          image[y_min:y_max, x_min:x_max] = [255, 255, 255]
    # Preprocess image for widget detection
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (9, 9), 0)
    edged = cv2.Canny(blur, 50, 100)
    edged = cv2.dilate(edged, None, iterations=1)
    edged = cv2.erode(edged, None, iterations=1)

    cnts = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)
    (cnts, _) = contours.sort_contours(cnts)
    cnts = [x for x in cnts if cv2.contourArea(x) > 100]

    widgets = []

    for cnt in cnts:
        x, y, w, h = cv2.boundingRect(cnt)
        widgets.append({
            'x': int(x),
            'y': int(y),
            'width': int(w),
            'height': int(h),
            'type': classes[np.argmax(model.predict(np.expand_dims(cv2.resize(image[y:y+h, x:x+w], (224, 224)), axis=0) / 255.0)[0])]
        })

    # Associate text with widgets
    for text_item in text_data:
        text_x, text_y = text_item['x'], text_item['y']
        text_width, text_height = text_item['width'], text_item['height']

        closest_widget = None

        for widget in widgets:
            widget_x, widget_y = widget['x'], widget['y']
            widget_width, widget_height = widget['width'], widget['height']

            if check_overlap((text_x, text_y, text_x + text_width, text_y + text_height),
                             (widget_x, widget_y, widget_x + widget_width, widget_y + widget_height)):
                closest_widget = widget
                break

        if closest_widget:
            closest_widget['content'] = text_item['text']
        else:
            widgets.append({
                'x': text_x,
                'y': text_y,
                'width': text_width,
                'height': text_height,
                'type': 'text',
                'content': text_item['text']
            })

    for widget in widgets:
        if widget['type'] == 'input' and widget.get('content'):
            widget['type'] = 'button'
        elif widget['type'] == 'text':
          if not widget.get('content') or not widget['content'].strip():  # Check if content doesn't exist or is empty
            widget['content'] = 'Text'


    widgets_json = json.dumps(widgets)
    return widgets_json
