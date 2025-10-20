from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Register a new user
    page.goto("http://localhost:5173/register")
    page.get_by_label("Username").fill("testuser")
    page.get_by_label("Password").fill("password")
    page.get_by_role("button", name="Create Account").click()
    expect(page.get_by_text("Registration successful! Please login.")).to_be_visible()

    # Login
    page.goto("http://localhost:5173/login")
    page.get_by_label("Username").fill("testuser")
    page.get_by_label("Password").fill("password")
    page.get_by_role("button", name="Login").click()
    page.wait_for_url("http://localhost:5173/dashboard")

    # Create a new resume
    page.get_by_role("link", name="Create New Resume").click()
    page.wait_for_url("http://localhost:5173/resume/new")

    # Take a screenshot of the editor
    page.screenshot(path="jules-scratch/verification/editor.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
