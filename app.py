from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)  

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route('/test', methods=['GET'])
def test_openai():
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": "Say hello"}
            ]
        )
        return jsonify({"message": "OpenAI connection successful", "response": response.choices[0].message.content})
    except Exception as e:
        print(f"OpenAI Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/simplify', methods=['POST'])
def simplify_text():
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that simplifies complex text for those who need help with reading comprehension. Keep the core meaning but use simpler words and shorter sentences."},
                {"role": "user", "content": f"Please simplify this text: {text}"}
            ],
            temperature=0.7
        )
        
        simplified = response.choices[0].message.content
        return jsonify({"simplified": simplified})
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/define', methods=['POST'])
def define_word():
    try:
        data = request.get_json()
        word = data.get('word', '')
        
        if not word:
            return jsonify({'error': 'No word provided'}), 400

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that provides clear, concise definitions for words. Include an example sentence and pronunciation guide if possible."},
                {"role": "user", "content": f"Please define this word and provide a simple example: {word}"}
            ],
            temperature=0.7
        )
        
        definition = response.choices[0].message.content
        return jsonify({"definition": definition})
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
