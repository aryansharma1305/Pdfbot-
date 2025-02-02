from langchain.chains import RetrievalQA
from langchain.llms import OpenAI
from text_processing import vector_db
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# OpenAI API Key
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Function to answer questions
def ask_question(question):
    if vector_db is None:
        return "No PDF uploaded yet! Please upload a PDF first."

    qa_chain = RetrievalQA.from_chain_type(llm=OpenAI(api_key=OPENAI_API_KEY), retriever=vector_db.as_retriever())
    return qa_chain.run(question)
