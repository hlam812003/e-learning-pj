from fastapi import FastAPI
from app.api import ask, rewrite

app = FastAPI()

app.include_router(ask.router)
app.include_router(rewrite.router)
