from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.rag_chain import create_qa_chain
from app.services.read_vertor_db import read_vertors_db
from app.models.load_response_model import llm
from app.services.create_prompt import create_prompt
from app.services.templates import templates

router = APIRouter()


class QuestionRequest(BaseModel):
    query: str
    id: int
    course: str


@router.post("/ask")
async def ask_question(request: QuestionRequest):
    try:
        prompt = create_prompt(templates[0])
        vector_db = read_vertors_db(request.course, request.id)
        llm_chain = create_qa_chain(vector_db, llm, prompt)
        result = llm_chain.invoke({"query": request.query})
        return {"result": result["result"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
