from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from scripts.templates import templates
import fitz


def create_prompt(template):
    prompt = PromptTemplate(template=template, input_variables=["context", "question"])
    return prompt


def create_prompt_emotion():
    prompt = PromptTemplate(
        input_variables=["style", "content"],
        template=templates[4],
    )
    return prompt


def create_qa_chain(vector_db, llm, prompt):
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=vector_db.as_retriever(search_kwargs={"k": 3}),
        return_source_documents=False,
        chain_type_kwargs={"prompt": prompt},
    )
    return qa_chain


def extract_text_from_pdf_path(course, id):
    pdf_path = f"data/courses/{course}/pdf/{id}.pdf"
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    doc.close()
    return text
