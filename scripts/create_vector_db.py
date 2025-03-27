from langchain.text_splitter import (
    RecursiveCharacterTextSplitter,
    CharacterTextSplitter,
)
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
from langchain_huggingface import HuggingFaceEmbeddings


pdf_data_path = None
vector_db_path = None


def create_vector_db_from_text():
    text = """"""
    text_splitter = CharacterTextSplitter(
        chunk_size=500, chunk_overlap=100, length_function=len, separator="\n"
    )

    texts = text_splitter.split_text(text)
    embedding = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    db = FAISS.from_texts(texts, embedding)
    db.save_local(vector_db_path)

    return db


def create_vector_db_from_file():
    loader = PyPDFLoader(pdf_data_path)
    documents = loader.load()

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
    texts = text_splitter.split_documents(documents)

    embedding = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    db = FAISS.from_documents(texts, embedding)
    db.save_local(vector_db_path)

    return db


# create_vector_db_from_text()
for i in range(1, 8):
    pdf_data_path = f"data/courses/pdf/{i}.pdf"
    vector_db_path = f"data/vectorstores/dsa/{i}"
    create_vector_db_from_file()
