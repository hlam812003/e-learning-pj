import requests

id = int(input("Nhập id: "))
question = str(input("Nhập câu hỏi: "))
url = "http://localhost:8000/ask"

try:
    response = requests.post(url, json={"query": question, "id": id})
    response.raise_for_status()
    result = response.json()
    print(result["result"])
except requests.exceptions.RequestException as e:
    print(f"Lỗi khi gọi API: {e}")
