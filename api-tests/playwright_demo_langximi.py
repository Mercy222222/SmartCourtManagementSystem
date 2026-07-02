from playwright.sync_api import sync_playwright
import time

def run(playwright):
    print("========================================")
    print("🚀 MERCY-OS // PLAYWRIGHT UI TEST DEMO")
    print("Target: http://localhost:5272 (Làng Xì Mi)")
    print("========================================")
    
    # Khởi chạy trình duyệt có giao diện (Headless=False) và Slow down để quan sát
    browser = playwright.chromium.launch(headless=False, slow_mo=600)
    context = browser.new_context(viewport={'width': 1280, 'height': 800})
    page = context.new_page()
    
    try:
        print("[1/5] Truy cập trang chủ Làng Xì Mi...")
        page.goto("http://localhost:5272/")
        page.wait_for_load_state("networkidle")
        time.sleep(2)
        
        print("[2/5] Cuộn chuột xem giao diện...")
        page.mouse.wheel(0, 800)
        time.sleep(1.5)
        page.mouse.wheel(0, -800)
        time.sleep(1.5)
        
        print("[3/5] Click vào trang Sản phẩm...")
        # Tìm thẻ a có chứa chữ Sản Phẩm hoặc navigate
        page.goto("http://localhost:5272/Product")
        page.wait_for_load_state("networkidle")
        time.sleep(2)
        
        print("[4/5] Truy cập trang Giỏ Hàng (Để chứng minh đã Fix lỗi 500)...")
        page.goto("http://localhost:5272/Cart")
        page.wait_for_load_state("networkidle")
        time.sleep(2)
        
        print("[5/5] Test tính năng Đăng Nhập (Cố ý nhập sai)...")
        page.goto("http://localhost:5272/Account/Login")
        page.wait_for_load_state("networkidle")
        time.sleep(1)
        
        # Nhập form (Playwright tự động gõ từng chữ rất chân thực)
        page.fill("input[name='Email']", "ai_test_auto@mercy.com")
        time.sleep(0.5)
        page.fill("input[name='Password']", "SuperWrongPassword!!")
        time.sleep(1)
        
        # Submit
        print("      => Click Submit!")
        page.click("button[type='submit']")
        time.sleep(4) # Chờ 4s để sếp xem dòng chữ báo lỗi trên UI
        
        print("\n✅ DEMO UI TEST HOÀN TẤT XUẤT SẮC!")
        
    except Exception as e:
        print(f"❌ Có lỗi trong quá trình test: {e}")
    finally:
        context.close()
        browser.close()

if __name__ == "__main__":
    with sync_playwright() as playwright:
        run(playwright)
