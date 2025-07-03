from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import os
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array

app = Flask(__name__)
CORS(app)

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model_mobilenetv2.h5")
model = load_model(MODEL_PATH)

class_names = ['APPLES', 'BANANA', 'ORANGE', 'PINEAPPLE', 'WATERMELON']

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image file found"}), 400

    file = request.files["image"]

    try:
        img = load_img(file, target_size=(100, 100))
        img_array = img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        preds = model.predict(img_array)[0]
        pred_class_index = np.argmax(preds)
        pred_class = class_names[pred_class_index]
        confidence = float(preds[pred_class_index])

        return jsonify({
            "class": pred_class,
            "confidence": confidence
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 4000))
    app.run(host="0.0.0.0", port=port, debug=False)
