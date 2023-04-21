FROM mcr.microsoft.com/playwright/python
RUN pip install pytest pytest-playwright
ENTRYPOINT pytest -v --video on /tmp
