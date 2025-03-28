from langchain_together import Together

llm1 = Together(
    model="meta-llama/Llama-3.3-70B-Instruct-Turbo",
    temperature=0.0,
    together_api_key="96a333ce4132218457ff6840c5a7a6a6d5ebf6eb2d3125e87ef46f5e74e44303",
    max_tokens=512,
)

llm2 = Together(
    model="NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO",
    temperature=0.8,
    together_api_key="96a333ce4132218457ff6840c5a7a6a6d5ebf6eb2d3125e87ef46f5e74e44303",
    max_tokens=1024,
)
