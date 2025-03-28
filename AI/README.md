## build dockerfile
```bash
docker build -t my-fastapi .
``` 

## run container
```bash
docker run -p 8000:8000 -it -v /e/learn/oose/ai:/app --name api-ai my-fastapi bash
```

**change folder you want association  
/e/learn/oose/ai**

## run api
```bash 
uvicorn server:app --host 0.0.0.0 --port 8000 
```
## run the file python main.py for call api
- run file 
```bash 
python main.py
```
- enter type: 1, id: (1 - 8) int, question: string
- enter type: 2, id: (1 - 8) int, style: string (vui ve, truyen cam hung, ...)
  