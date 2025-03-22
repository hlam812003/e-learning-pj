from langchain.text_splitter import (
    RecursiveCharacterTextSplitter,
    CharacterTextSplitter,
)
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
from langchain_huggingface import HuggingFaceEmbeddings


pdf_data_path = "data/courses/1.pdf"
vector_db_path = "data/vectorstores/db_faiss"


def create_vector_db_from_text():
    text = """🔹 1. Cơ học
Vận tốc (v): Mức độ thay đổi vị trí theo thời gian.

Gia tốc (a): Mức độ thay đổi vận tốc theo thời gian.

Lực (F): Tác động làm thay đổi trạng thái chuyển động (F = ma).

Khối lượng (m): Độ đo mức quán tính của vật.

Động lượng (p): Tích của khối lượng và vận tốc (p = mv).

Công (W): Lực tác dụng gây ra sự chuyển động (W = F·d).

Cơ năng: Tổng động năng và thế năng.

🔹 2. Nhiệt học
Nhiệt độ (T): Độ đo năng lượng trung bình của các phân tử.

Nhiệt năng (Q): Tổng động năng của các phân tử trong vật.

Nhiệt dung riêng (c): Lượng nhiệt cần để tăng 1kg chất lên 1°C.

Truyền nhiệt: Dẫn nhiệt, đối lưu, bức xạ.

🔹 3. Điện học
Điện tích (q): Tính chất vật lý tạo ra lực điện.

Cường độ dòng điện (I): Lượng điện tích qua tiết diện trong 1s.

Hiệu điện thế (U): Độ chênh lệch điện thế giữa hai điểm.

Điện trở (R): Mức cản trở dòng điện (R = U/I).

Định luật Ohm: U = IR.

Công suất điện (P): P = UI.

🔹 4. Quang học
Tia sáng: Đường truyền của ánh sáng.

Phản xạ ánh sáng: Ánh sáng dội ngược lại.

Khúc xạ ánh sáng: Ánh sáng đổi hướng khi qua môi trường khác.

Thấu kính: Dụng cụ hội tụ hoặc phân kỳ ánh sáng.

Giao thoa, nhiễu xạ ánh sáng: Hiện tượng sóng.

🔹 5. Vật lý hiện đại
Photon: Hạt ánh sáng.

Hạt nhân nguyên tử: Proton và neutron.

Phóng xạ: Sự phân rã của hạt nhân không bền.

Hiệu ứng quang điện: Ánh sáng làm bật electron ra khỏi kim loại.

Thuyết tương đối: Không gian – thời gian bị ảnh hưởng bởi vận tốc.

"""
    text_splitter = CharacterTextSplitter(
        chunk_size=500, chunk_overlap=100, length_function=len, separator="\n"
    )

    texts = text_splitter.split_text(text)
    embedding = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    db = FAISS.from_texts(texts, embedding)
    db.save_local(vector_db_path + "1")

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
    db.save_local(vector_db_path + "2")

    return db


create_vector_db_from_text()
create_vector_db_from_file()
