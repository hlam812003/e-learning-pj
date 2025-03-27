# from docx2pdf import convert

# convert("data/courses/word")

import requests

id = int(input("Nhập id: "))
system_prompt = str(input("nhap cam xuc: "))
url = "http://localhost:8000/rewrite-pdf-emotion"

try:
    response = requests.post(
        url, json={"system_prompt": system_prompt, "id": id, "course": "dsa"}
    )
    response.raise_for_status()
    result = response.json()
    print(result["rewritten_text"])
except requests.exceptions.RequestException as e:
    print(f"error: {e}")
