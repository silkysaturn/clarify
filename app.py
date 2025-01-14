from flask import Flask, request, jsonify
<<<<<<< HEAD
import openai
from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

=======
from openai import simplify  # You can use OpenAI or any AI-based library for simplification

app = Flask(__name__)

>>>>>>> parent of 6dbfd1a (Update app.py)
@app.route('/simplify', methods=['POST'])
def simplify_text():
    data = request.get_json()
    text = data.get('text', '')
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    simplified_text = simplify(text)  # Simplify text using AI or algorithm
    return jsonify({"simplified": simplified_text})

if __name__ == '__main__':
    app.run(debug=True)

