from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Navigate to the register page
    page.goto("http://localhost:5173/register")

    # Fill in the registration form
    page.get_by_label("Username").fill("testuser")
    page.get_by_label("Password").fill("password")
    page.get_by_role("button", name="Register").click()

    # Wait for the success message
    expect(page.get_by_text("Registration successful! Please login.")).to_be_visible()

    # Navigate to the login page
    page.goto("http://localhost:5173/login")

    # Fill in the login form
    page.get_by_label("Username").fill("testuser")
    page.get_by_label("Password").fill("password")
    page.get_by_role("button", name="Login").click()

    # Wait for navigation to the dashboard
    page.wait_for_url("http://localhost:5173/dashboard")

    # Take a screenshot of the dashboard
    page.screenshot(path="jules-scratch/verification/dashboard.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
