from langchain_together import Together
from app.config import TOGETHER_API_KEY

llm = Together(
    model="meta-llama/Llama-3.3-70B-Instruct-Turbo",
    temperature=0.0,
    together_api_key=TOGETHER_API_KEY,
    max_tokens=512,
)
