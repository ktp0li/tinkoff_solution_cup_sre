import os
from playwright.sync_api import Page, expect
url = os.environ['URL']


def test_status_200(page: Page):
    response = page.request.get(url)
    expect(response).to_be_ok()
