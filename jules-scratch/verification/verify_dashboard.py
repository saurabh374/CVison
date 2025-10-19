from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:5173/auth/sign-in")
        page.click("text=Sign Up")
        page.fill("input[name='fullname']", "Test User")
        page.fill("input[name='email']", "test@example.com")
        page.fill("input[name='password']", "password")
        page.click("text=Register User")
        page.wait_for_url("http://localhost:5173/dashboard")
        page.screenshot(path="jules-scratch/verification/dashboard_empty.png")
        browser.close()

run()
