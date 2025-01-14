from flask import Flask, request, jsonify
from openai import simplify  # You can use OpenAI or any AI-based library for simplification

app = Flask(__name__)

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

