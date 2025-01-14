from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load environment variables
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/simplify', methods=['POST'])
def simplify_text():
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400

        # Call OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that simplifies complex text. Keep the core meaning but use simpler words and shorter sentences."},
                {"role": "user", "content": f"Please simplify this text: {text}"}
            ],
            temperature=0.7
        )
        
        simplified = response.choices[0].message['content']
        return jsonify({"simplified": simplified})
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
