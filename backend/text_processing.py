import pdfplumber
import faiss
import numpy as np
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter

vector_db = None  # FAISS Vector Store

# Extract text from PDF
def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""  # Handle empty pages
    return text.strip()

# Generate embeddings and store them in FAISS
def generate_embeddings(text):
    global vector_db
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
    text_chunks = text_splitter.split_text(text)

    embeddings = OpenAIEmbeddings()
    vector_db = FAISS.from_texts(text_chunks, embeddings)

    return len(text_chunks)  # Return number of chunks
