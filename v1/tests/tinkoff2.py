import os
import requests
from playwright.sync_api import Page, expect
url = os.environ['URL']


def test_x_frame_options(page: Page):
    page.goto(url)
    response = requests.get(url)
    x_frame_options = response.headers.get("x-frame-options")
    assert x_frame_options == "sameorigin"
