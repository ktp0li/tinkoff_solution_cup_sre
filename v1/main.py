import docker
import os
import time
client = docker.from_env()
url = "https://google.com"
container = client.containers.run("puk", volumes=[f'{os.getcwd()}/tests:/home'],
                                  detach=True, environment=[f"URL={url}"])
for _ in range(999):
    if ("short test summary info" in
        (logs := container.logs().decode("utf-8"))) or \
         ("no tests run" in logs):
        break
    print(container.status)
    time.sleep(2)
else:
    print("timeout")

print(logs)

f = open('./video.tar', 'wb')
bits, stat = container.get_archive('/test-results/')
print(stat)
for chunk in bits:
    f.write(chunk)
f.close()

container.remove(force=True)
