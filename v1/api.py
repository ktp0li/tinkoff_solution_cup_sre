from fastapi import FastAPI, File, UploadFile, WebSocket
from fastapi.responses import FileResponse
import uvicorn
import docker
import os
import time
import json
app = FastAPI()


@app.post("/uploadfiles/")
async def create_upload_files(files: list[UploadFile]):
    return {"filenames": [file.filename for file in files]}


@app.websocket("/logs")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    output = json.loads((await websocket.receive())["text"])
    client = docker.from_env()
    url = output["url"] if output["url"] != "" else "https://google.com"
    dir = os.getcwd() + "/" + output["username"] + "-" + str(time.time())
    os.makedirs(dir)

    container = client.containers.run("puk",
                                      volumes=[f'{os.getcwd()}/tests:/home'],
                                      detach=True,
                                      environment=["URL=" + url])
    for _ in range(60):
        if ("short test summary info" in
            (logs := container.logs().decode("utf-8"))) or \
             ("no tests run" in logs):
            break
        await websocket.send_text(f"container status: {container.status}")
        time.sleep(2)
    else:
        print("container status: timeout")
    await websocket.send_text(logs)

    f = open(dir + '/video.tar', 'wb')
    bits, stat = container.get_archive('/test-results/')
    print(stat)
    for chunk in bits:
        f.write(chunk)
    f.close()

    container.remove(force=True)
    await websocket.close()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000, log_level="info")
