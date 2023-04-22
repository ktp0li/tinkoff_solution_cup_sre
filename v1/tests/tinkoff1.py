import os
from playwright.sync_api import Page, expect
url = os.environ['URL']


def test_status_200(page: Page):
    page.goto(url)
    response = page.request.get(url)
    expect(response).to_be_ok()
