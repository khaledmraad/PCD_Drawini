# widget_detector.pyx
import cv2
cimport numpy as np
import numpy as np
from numpy import ndarray, argmax 
from tensorflow.keras.models import load_model
from scipy.spatial.distance import euclidean
from imutils import perspective
from imutils import contours
import imutils
import json

cdef class CythonWidgetDetector:
    cdef public object model
    cdef public list classes

    def __cinit__(self, str model_path):
        self.model = load_model(model_path)
        self.classes = ['button', 'image', 'input', 'line', 'logo', 'text']

    def detect_widgets(self, bytes image_data):
        cdef np.ndarray[np.uint8_t, ndim=1] nparr = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        cdef np.ndarray[np.uint8_t, ndim=2] gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        cdef np.ndarray[np.float64_t, ndim=2] blur = cv2.GaussianBlur(gray, (9, 9), 0)
        cdef np.ndarray[np.uint8_t, ndim=2] edged = cv2.Canny(blur, 50, 100)
        edged = cv2.dilate(edged, None, iterations=1)
        edged = cv2.erode(edged, None, iterations=1)

        cnts = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        cnts = imutils.grab_contours(cnts)
        (cnts, _) = contours.sort_contours(cnts)
        cnts = [x for x in cnts if cv2.contourArea(x) > 100]

        widgets_info = []

        for cnt in cnts:
            box = cv2.minAreaRect(cnt)
            box = cv2.boxPoints(box)
            box = np.array(box, dtype="int")
            box = perspective.order_points(box)
            (tl, tr, br, bl) = box
            dist_in_pixel = euclidean(tl, tr)
            dist_in_cm = 2
            pixel_per_cm = dist_in_pixel / dist_in_cm

            x, y, w, h = cv2.boundingRect(cnt)
            roi = image[y:y + h, x:x + w]
            roi_resized = cv2.resize(roi, (224, 224))
            
            # Moved the cdef statement to a different location
            roi_preprocessed = roi_resized / 255.0
            roi_preprocessed = np.expand_dims(roi_preprocessed, axis=0)

            prediction = self.model.predict(roi_preprocessed)
            predicted_class = argmax(prediction)
            confidence = prediction[0][predicted_class]

            class_name = self.classes[predicted_class]
            widgets_info.append({
                    "type": class_name,
                    "x": x,
                    "y": y,
                    "width": w,
                    "height": h,
                })

        widgets_json = json.dumps(widgets_info)

        return widgets_json
