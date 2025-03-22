from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

vector_db_path = "data/vectorstores/db_faiss"


def read_vertors_db(path):
    embedding = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    db = FAISS.load_local(
        vector_db_path + path, embedding, allow_dangerous_deserialization=True
    )
    return db
