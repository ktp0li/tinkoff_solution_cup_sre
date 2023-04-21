FROM mcr.microsoft.com/playwright/python
COPY ./tests/* /tmp/
RUN pip install pytest pytest-playwright
ENTRYPOINT pytest -v --video on /tmp
