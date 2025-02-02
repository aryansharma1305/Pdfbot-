import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from text_processing import extract_text_from_pdf, generate_embeddings
from chatbot import ask_question

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/upload", methods=["POST"])
def upload_pdf():
    """Handles PDF upload, extracts text, and generates embeddings."""
    try:
        # ✅ Check if a file was uploaded
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]

        # ✅ Validate file type
        if not file.filename.lower().endswith(".pdf"):
            return jsonify({"error": "Invalid file format. Please upload a PDF."}), 400

        filename = file.filename
        file_path = os.path.join(UPLOAD_FOLDER, filename)

        file.save(file_path)

        # Extract text from the uploaded PDF
        extracted_text = extract_text_from_pdf(file_path)
        if not extracted_text:
            return jsonify({"error": "Failed to extract text from PDF"}), 400

        # Generate embeddings for retrieval
        num_chunks = generate_embeddings(extracted_text)

        return jsonify({"message": "PDF processed successfully!", "num_chunks": num_chunks})

    except Exception as e:
        return jsonify({"error": str(e)}), 500  # ✅ Log actual error

@app.route("/ask", methods=["POST"])
def ask():
    """Handles user questions and returns AI-generated answers."""
    try:
        data = request.json
        question = data.get("question")

        if not question:
            return jsonify({"error": "No question provided"}), 400

        answer = ask_question(question)
        return jsonify({"answer": answer})

    except Exception as e:
        return jsonify({"error": str(e)}), 500  # ✅ Log actual error

if __name__ == "__main__":
    app.run(debug=True)
