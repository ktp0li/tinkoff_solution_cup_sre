import docker
import os
import time
client = docker.from_env()
container = client.containers.run("puk",
        "pytest -v --video on /tmp && mv test-results/*/* /tmp",
        remove=True, volumes=[f'{os.getcwd()}/tests:/tmp'])
while (logs := container.logs().decode("utf8") == ""):
    time.sleep(2)

print(logs)
