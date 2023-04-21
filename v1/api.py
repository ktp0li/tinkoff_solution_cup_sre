from fastapi import FastAPI, File, UploadFile, WebSocket
from fastapi.responses import FileResponse
import uvicorn
import docker
import os
import time

from endpoint.users.page import router as users

app = FastAPI()
app.include_router(users)

url = "https://google.com"


@app.post("/uploadfiles/")
async def create_upload_files(files: list[UploadFile]):
    return {"filenames": [file.filename for file in files]}


@app.websocket("/logs")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    client = docker.from_env()
    container = client.containers.run("puk",
                                      volumes=[f'{os.getcwd()}/tests:/tmp'],
                                      detach=True, environment=[f"URL={url}"])
    while not ("short test summary info" in
               (logs := container.logs().decode("utf-8"))):
        time.sleep(1)
    await websocket.send_text(logs)
    await websocket.close()


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000, log_level="info")
