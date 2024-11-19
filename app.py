from flask import Flask, request, jsonify
from flask_cors import CORS
from google.generativeai import GenerativeModel, configure
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure Google AI
configure(api_key=os.getenv('API_KEY'))

@app.route('/chat', methods=['POST'])
def chat():
    try:
        # Get prompt from request
        prompt = request.json.get('prompt')
        
        # Initialize the model
        model = GenerativeModel('gemini-1.5-flash')
        
        # Generate response
        response = model.generate_content(prompt)
        
        # Return response
        return jsonify({'response': response.text})
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': 'Error processing request'}), 500

if __name__ == '__main__':
    app.run(port=5000)
