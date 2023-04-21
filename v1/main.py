import docker
import os
import time
client = docker.from_env()
url = "https://google.com"
container = client.containers.run("puk", volumes=[f'{os.getcwd()}/tests:/tmp'],
                                  detach=True, environment=[f"URL={url}"])
while not ("short test summary info" in
           (logs := container.logs().decode("utf-8"))):
    print(container.status)
    logs = container.logs()
    time.sleep(2)

print(container.status)
print(logs)
container.remove(force=True)
