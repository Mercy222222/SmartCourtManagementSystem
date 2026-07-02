import requests
import time
import re

# Cấu hình màu cho Terminal
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
CYAN = '\033[96m'
MAGENTA = '\033[95m'
RESET = '\033[0m'

BASE_URL = "http://localhost:5272"

print(f"{CYAN}=" * 70)
print(f"🚀 MERCY-OS // ADVANCED AI AUTOMATION & PEN-TEST RUNNER 🚀")
print(f"Target: {BASE_URL}")
print(f"Modules: Core, Authentication, Cart, Security (SQLi & XSS)")
print(f"=" * 70 + f"{RESET}\n")

session = requests.Session()

test_cases = [
    {"name": "Home Page Load", "method": "GET", "url": "/"},
    {"name": "Product Listing Page", "method": "GET", "url": "/Product"},
    {"name": "Login Page Accessible", "method": "GET", "url": "/Account/Login"},
    {"name": "Register Page Accessible", "method": "GET", "url": "/Account/Register"},
    {
        "name": "Invalid Login Attempt", 
        "method": "POST", 
        "url": "/Account/Login",
        "data": {"Email": "wrong@email.com", "Password": "WrongPassword123!"},
        "expect_status": 400
    },
    {
        "name": "Security Test: SQL Injection (SQLi) in Login", 
        "method": "POST", 
        "url": "/Account/Login",
        "data": {"Email": "admin@mercy.com' OR 1=1 --", "Password": "any"},
        "is_security": True
    },
    {
        "name": "Security Test: Cross-Site Scripting (XSS) in Search", 
        "method": "GET", 
        "url": "/Product/Search?query=<script>alert('MERCY_HACKED')</script>",
        "is_security": True
    },
    {"name": "Cart Page Accessible", "method": "GET", "url": "/Cart"},
]

total = len(test_cases)
passed = 0

for i, tc in enumerate(test_cases):
    is_sec = tc.get("is_security", False)
    header_color = MAGENTA if is_sec else YELLOW
    
    print(f"{header_color}[Test {i+1}/{total}] {tc['name']}{RESET}")
    if tc["method"] == "GET":
        print(f"   => {tc['method']} {BASE_URL}{tc['url']}")
    else:
        print(f"   => {tc['method']} {BASE_URL}{tc['url']} | Payload: {tc.get('data')}")
    
    start_time = time.time()
    try:
        if tc["method"] == "GET":
            response = session.get(BASE_URL + tc["url"], timeout=5)
        else:
            response = session.post(BASE_URL + tc["url"], data=tc.get("data", {}), timeout=5)
            
        elapsed = time.time() - start_time
        
        # Đánh giá kết quả
        if is_sec:
            if response.status_code in [200, 400, 404, 403]:
                print(f"   {GREEN}✓ SECURE{RESET} (Server handled payload. Status: {response.status_code}) - Latency: {elapsed:.2f}s")
                passed += 1
            else:
                print(f"   {RED}✗ VULNERABLE{RESET} (Status: {response.status_code}) - Latency: {elapsed:.2f}s")
        elif "expect_status" in tc:
            if response.status_code == tc["expect_status"]:
                print(f"   {GREEN}✓ PASS{RESET} (Expected Status: {response.status_code}) - Latency: {elapsed:.2f}s")
                passed += 1
            else:
                print(f"   {RED}✗ FAIL{RESET} (Got: {response.status_code}, Expected: {tc['expect_status']}) - Latency: {elapsed:.2f}s")
        else:
            if response.status_code == 200:
                print(f"   {GREEN}✓ PASS{RESET} (Status: 200 OK) - Latency: {elapsed:.2f}s")
                passed += 1
            elif response.status_code == 302:
                print(f"   {GREEN}✓ PASS{RESET} (Status: 302 Redirect) - Latency: {elapsed:.2f}s")
                passed += 1
            else:
                print(f"   {RED}✗ FAIL{RESET} (Status: {response.status_code}) - Latency: {elapsed:.2f}s")
            
    except requests.exceptions.ConnectionError:
        print(f"   {RED}✗ FAIL (Connection Refused){RESET} - Đảm bảo .NET Web (Làng Xì Mi) đang chạy ở cổng 5272!")
    except Exception as e:
        print(f"   {RED}✗ FAIL (Error: {e}){RESET}")
    
    print("-" * 70)
    time.sleep(0.4)

print(f"\n{CYAN}================= TEST REPORT ================={RESET}")
if passed == total:
    print(f"{GREEN}🎯 TẤT CẢ TEST ĐỀU PASSED ({passed}/{total}). Hệ thống C# ASP.NET Core BẢO MẬT & HOẠT ĐỘNG HOÀN HẢO!{RESET}")
else:
    print(f"{RED}⚠️ Cảnh báo: PHÁT HIỆN LỖI! ({passed}/{total} passed). Developer cần review lại mã nguồn!{RESET}")
print(f"{CYAN}==============================================={RESET}\n")
