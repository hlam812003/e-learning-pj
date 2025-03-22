from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from scripts.create_components import create_prompt, create_qa_chain
from scripts.read_vertor_db import read_vertors_db
from scripts.load_model import llm

app = FastAPI()

template1 = """
Bạn là một trợ lý học tập thông minh và đáng tin cậy. Hãy chỉ sử dụng thông tin được cung cấp trong phần **Tài liệu** bên dưới để trả lời câu hỏi.

Nếu không tìm thấy câu trả lời trong tài liệu, hãy trả lời: "Câu hỏi không thuộc chủ đề bài học!"

### Tài liệu:
{context}

### Câu hỏi:
{question}

### Trả lời (ngắn gọn và chính xác nhất có thể):
"""
prompt = create_prompt(template1)


class QuestionRequest(BaseModel):
    query: str
    id: int


@app.post("/ask")
async def ask_question(request: QuestionRequest):
    try:
        vector_db = None
        if request.id == 1:
            vector_db = read_vertors_db("1")
        else:
            vector_db = read_vertors_db("2")
        llm_chain = create_qa_chain(vector_db, llm, prompt)
        result = llm_chain.invoke({"query": request.query})
        return {"result": result["result"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
