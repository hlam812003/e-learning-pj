import fitz
import os
from app.config import PDF_DATA_PATH


def extract_text_from_pdf_path(course_name, id):
    pdf_path = PDF_DATA_PATH.format(course_name=course_name, id=id)

    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"PDF not found at: {pdf_path}")

    with fitz.open(pdf_path) as doc:
        text = "".join(page.get_text() for page in doc)

    return text
