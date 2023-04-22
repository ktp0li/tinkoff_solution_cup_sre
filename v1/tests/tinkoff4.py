import os
from playwright.sync_api import Page, expect
url = os.environ['URL']


def test_status_iframe(page: Page):
    page.goto(url)
    print(page.frames)

    iframe = page.frame_locator("#tinkoff-iframe-form")

    get_button = iframe.locator("button")
    expect(get_button).to_have_attribute("name", "goForward")
