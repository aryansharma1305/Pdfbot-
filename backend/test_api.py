import requests

# API URLs
UPLOAD_URL = "http://127.0.0.1:5000/upload"
ASK_URL = "http://127.0.0.1:5000/ask"

# 1️⃣ Upload a PDF File
pdf_file = {'file': open(r"C:\Users\Dell\Downloads\Underwater_Debris_Detection_Using_Visual_Images_and_YOLOv8n_for_Marine_Pollution_Monitoring.pdf", "rb")}  # Replace with your PDF
upload_response = requests.post(UPLOAD_URL, files=pdf_file)
print("Upload Response:", upload_response.json())

# 2️⃣ Ask a Question
question_payload = {"question": "What is the main topic of the document?"}
ask_response = requests.post(ASK_URL, json=question_payload)
print("Answer:", ask_response.json())
