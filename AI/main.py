import requests

type = int(input("Nhập loại: "))
# course = str(input("Nhập khoa hoc: "))
if type == 1:
    id = int(input("Nhập id: "))
    question = str(input("Nhập câu hỏi: "))
    url = "http://localhost/ask"

    try:
        response = requests.post(
            url, json={"query": question, "id": id, "course": "dsa"}
        )
        response.raise_for_status()
        result = response.json()
        print(result["result"])
    except requests.exceptions.RequestException as e:
        print(f"error: {e}")

else:
    id = int(input("Nhập id: "))
    system_prompt = str(input("nhap cam xuc: "))
    url = "http://localhost/rewrite-pdf-emotion"

    try:
        response = requests.post(
            url, json={"system_prompt": system_prompt, "id": id, "course": "dsa"}
        )
        response.raise_for_status()
        result = response.json()
        print(result["rewritten_text"])
    except requests.exceptions.RequestException as e:
        print(f"error: {e}")
