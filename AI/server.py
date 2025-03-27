from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from scripts.create_components import (
    create_prompt,
    create_qa_chain,
    extract_text_from_pdf_path,
    create_prompt_emotion,
    templates,
)
from scripts.read_vertor_db import read_vertors_db
from scripts.load_model import llm1, llm2


app = FastAPI()


class QuestionRequest(BaseModel):
    query: str
    id: int
    course: str


class PdfRequest(BaseModel):
    system_prompt: str
    id: int
    course: str


@app.post("/ask")
async def ask_question(request: QuestionRequest):
    try:
        prompt = create_prompt(templates[0])
        vector_db = read_vertors_db(request.course + "/" + str(request.id))
        llm_chain = create_qa_chain(vector_db, llm1, prompt)
        result = llm_chain.invoke({"query": request.query})
        return {"result": result["result"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/rewrite-pdf-emotion")
async def rewrite_pdf_emotion(request: PdfRequest):
    try:

        prompt = create_prompt_emotion()
        text = extract_text_from_pdf_path(request.course, request.id)
        chain = prompt | llm2
        rewritten_text = chain.invoke({"style": request.system_prompt, "content": text})
        return {"rewritten_text": rewritten_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
