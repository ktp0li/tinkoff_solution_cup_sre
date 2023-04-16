import docker
import os
client = docker.from_env()
container = client.containers.run("puk",
        "pytest -v --video on /tmp && mv test-results/*/* /tmp",
        remove=True, volumes=[f'{os.getcwd()}/tests:/tmp'])
print(container)
