from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from scripts.create_components import create_prompt, create_qa_chain
from scripts.read_vertor_db import read_vertors_db
from scripts.load_model import llm

app = FastAPI()

template1 = """
Bạn là một trợ lý học tập thông minh. Chỉ sử dụng thông tin trong phần **Tài liệu** để trả lời.

Nếu không có thông tin phù hợp, hãy trả lời: "Câu hỏi không thuộc chủ đề bài học!"

- Tránh lặp lại câu hỏi.
- Trả lời ngắn gọn, đúng trọng tâm.

### Tài liệu:
{context}

### Câu hỏi:
{question}

### Trả lời:
"""

prompt = create_prompt(template1)


class QuestionRequest(BaseModel):
    query: str
    id: int
    course: str


@app.post("/ask")
async def ask_question(request: QuestionRequest):
    try:
        vector_db = read_vertors_db(request.course + "/" + str(request.id))
        llm_chain = create_qa_chain(vector_db, llm, prompt)
        result = llm_chain.invoke({"query": request.query})
        return {"result": result["result"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
