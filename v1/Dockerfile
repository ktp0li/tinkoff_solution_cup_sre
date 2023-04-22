FROM mcr.microsoft.com/playwright/python
RUN pip install pytest pytest-playwright
RUN mkdir /test-results
ENTRYPOINT pytest -v --video on --tb=line /home
