import time
import os
from playwright.sync_api import Page, BrowserContext
url = os.environ['URL']


def test_x_offline(page: Page, context: BrowserContext):
    page.goto(url)
    time.sleep(2)
    context.set_offline(offline=True, )
    page.reload()
    #button = page.get_by_text("For investors")
    #button.click()
    time.sleep(15)
