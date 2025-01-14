from flask import Flask, request, jsonify
import openai
from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/simplify', methods=['POST'])
def simplify_text():
    data = request.get_json()
    text = data.get('text', '')
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    try:
        # Call OpenAI API to simplify the text
        response = openai.Completion.create(
            engine="text-davinci-003",  # Adjust according to the model you're using
            prompt=f"Simplify this text for someone with dyslexia or language impairment: {text}",
            max_tokens=150
        )
        simplified_text = response.choices[0].text.strip()
        return jsonify({"simplified": simplified_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
