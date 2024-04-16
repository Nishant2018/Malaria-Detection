from flask import Flask, render_template, request, jsonify
from PIL import Image
import numpy as np
import tensorflow
import keras

app = Flask(__name__)

def load_model_without_batch_shape(model_path):
    # Load the model without custom objects
    model = keras.models.load_model(model_path)
    # Remove the batch_shape attribute from all layers
    for layer in model.layers:
        if hasattr(layer, 'batch_input_shape'):
            layer.batch_input_shape = None
    return model

# Load the model using the modified loading function
model = load_model_without_batch_shape('saved_model.h5')

def preprocess_image(image):
    # Resize the image to match model input shape
    image = image.resize((100, 100))
    # Convert image to numpy array
    image = np.array(image)
    # Normalize pixel values
    image = image / 255.0
    # Expand dimensions to match model input shape
    image = np.expand_dims(image, axis=0)
    return image

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Get uploaded file
        file = request.files['file']
        # Read and preprocess the image
        img = Image.open(file)
        img = preprocess_image(img)
        # Make prediction
        class_mapping = {0: "Parasitized", 1: "Uninfected"}
        predictions = model.predict(img)    
        predicted_labels = (predictions > 0.5).astype("int32")

        # Mapping predicted labels to their corresponding class names
        predicted_class_names = [class_mapping[label] for label in predicted_labels.flatten()]

        # Returning prediction result as JSON
        return jsonify({'prediction': predicted_class_names[0]})
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
