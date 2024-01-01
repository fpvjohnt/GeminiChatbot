from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Create the Flask app
app = Flask(__name__)
CORS(app)

# Configure the Google Generative AI Platform with the API key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))  # Use the environment variable name
model = genai.GenerativeModel("gemini-pro")

# Test route
@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Hello, World!"})

# Route to get a response from Gemini Pro model
@app.route('/get-gemini-response', methods=['POST'])
def get_gemini_response():
    data = request.json
    user_input = data['user_input']
    file_content = data.get('file_content', '')
    try:
        combined_input = user_input + "\n\n" + file_content if file_content else user_input
        response = model.generate_content(combined_input)
        return jsonify({'response': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Test route for Gemini Pro API
@app.route('/test-gemini-api', methods=['GET'])
def test_gemini_api():
    test_input = "What is the capital of France?"
    try:
        response = model.generate_content(test_input)
        return jsonify({'response': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
