# 📱 BẢN KẾ HOẠCH DỰ ÁN PHÁT TRIỂN ỨNG DỤNG MOBILE THỰC CHIẾN (SMARTCOURT & E-COMMERCE MOBILE APP)

**Người lập kế hoạch:** Triều Hí (Hoàng Minh Triều) & Biệt đội 10 chuyên gia Fullstack (The Elite Fleet)  
**Mục tiêu:** Xây dựng ứng dụng di động hoàn chỉnh (iOS & Android) phục vụ Đồ án Chuyên ngành đạt điểm A+ (10/10), kết nối trực tiếp hệ thống Backend RESTful API hiện có.

---

## PHẦN 1: BÁO CÁO PHÂN TÍCH HỆ THỐNG RESTful API HIỆN HỮU

Qua rà soát mã nguồn tại [`app/controllers/`](file:///c:/Users/pc/.gemini/antigravity-ide/scratch/SmartCourtManagementSystem/app/controllers/) và bộ test [`api-tests/GearVN_API.postman_collection.json`](file:///c:/Users/pc/.gemini/antigravity-ide/scratch/SmartCourtManagementSystem/api-tests/GearVN_API.postman_collection.json), hệ thống backend đã sẵn sàng các endpoints cốt lõi:

| Nhóm API | Endpoint | Phương thức | Mô tả & Input | Output dữ liệu |
|---|---|:---:|---|---|
| **Xác thực** | `index.php?url=api/auth/login` | `POST` | Body JSON: `email`, `password` | Trả về `token` (JWT) + thông tin `user` (id, name, role) |
| **Danh mục** | `index.php?url=api/categories` | `GET` | Không cần auth | Danh sách danh mục (id, name, description) |
| **Sản phẩm / Dịch vụ** | `index.php?url=api/products` | `GET` | Query params: `page`, `limit`, `search`, `category_id` | Mảng danh sách sản phẩm, phân trang, hình ảnh, giá |
| **Chi tiết** | `index.php?url=api/products/{id}` | `GET` | Path param: `id` | Chi tiết mặt hàng, số lượng tồn, mô tả, ảnh |
| **Đơn hàng / Đặt chỗ** | `index.php?url=api/orders` | `GET` | Headers: `Authorization: Bearer <token>` | Lịch sử đơn hàng / đặt sân của người dùng |
| **Chi tiết đơn** | `index.php?url=api/orderDetail/{id}` | `GET` | Headers: `Authorization: Bearer <token>` | Chi tiết danh sách món/sân, tổng tiền, địa chỉ, trạng thái |
| **Thống kê** | `index.php?url=api/stats` | `GET` | Headers: `Authorization: Bearer <admin_token>` | Doanh thu, số lượng đơn, tỷ lệ theo trạng thái |
| **Đánh giá** | `index.php?url=api/reviews` | `GET/POST`| Path: `product_id`, `rating`, `comment` | Danh sách review của người dùng |

---

## PHẦN 2: KIẾN TRÚC ỨNG DỤNG MOBILE CHUẨN DOANH NGHIỆP

```text
┌─────────────────────────────────────────────────────────────┐
│  SmartCourt Mobile App (React Native - Expo SDK 52/53)      │
│  - Architecture: New Architecture (Bridgeless + JSI Fabric) │
│  - Language: TypeScript 100% Strict Mode                    │
│  - Navigation: Expo Router (File-based Typed Routing)       │
│  - Styling: NativeWind v4 (Tailwind CSS Mobile)             │
└──────────────────────────────┬──────────────────────────────┘
                               │
       ┌───────────────────────┴───────────────────────┐
       ▼                                               ▼
┌──────────────────────────────┐       ┌──────────────────────────────┐
│  Presentation & State        │       │  Offline-First Sync Engine   │
│  - Zustand: User Auth & Cart │       │  - TanStack Query (Caching)  │
│  - Reanimated 3: 60FPS UI    │       │  - MMKV: Fast local storage  │
│  - Expo Haptics: Rung phản hồi│      │  - SQLite: Caching đơn hàng  │
└──────────────┬───────────────┘       └───────────────┬──────────────┘
               │                                       │
               └───────────────────┬───────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────┐
│  API Gateway & Security Layer (Axios Interceptors)          │
│  - Tự động gắn Bearer Token vào Headers                     │
│  - Refresh Token & Auto-retry khi mạng chập chờn             │
│  - Mã hóa lưu trữ Token: Expo SecureStore (Keychain/Keystore)│
└──────────────────────────────┬──────────────────────────────┘
                               │
       ┌───────────────────────┴───────────────────────┐
       ▼                                               ▼
┌──────────────────────────────┐       ┌──────────────────────────────┐
│  Backend RESTful API (PHP)   │       │  Cổng Thanh Toán & Dịch Vụ  │
│  http://localhost:8080/api   │       │  - VNPay / MoMo Sandbox      │
│  (Hoặc VPS / Ngrok Tunnel)   │       │  - Expo Push Notifications   │
└──────────────────────────────┘       └──────────────────────────────┘
```

---

## PHẦN 3: SƠ ĐỒ LUỒNG MÀN HÌNH (SCREEN FLOW & USER JOURNEY)

```text
[ Splash Screen ] ──► [ Onboarding / Welcome ]
                            │
                            ├── (Chưa đăng nhập) ──► [ Login / Register Screen ]
                            │                               │ (JWT Token)
                            ▼                               ▼
                 [ (tabs) / Main Bottom Tabs ]
                 ├── 🏠 Tab 1: Khám Phá (Home & Banner Slider & Sân/Sản phẩm hot)
                 ├── 🏟️ Tab 2: Danh Mục / Đặt Sân (Categories & Real-time Slots)
                 │         └──► [ Chi Tiết Sân / Chi Tiết Sản Phẩm ]
                 │                    └──► [ Chọn Giờ / Thêm Vào Giỏ Hàng ]
                 ├── 🛒 Tab 3: Giỏ Hàng & Thanh Toán (Cart & Checkout)
                 │         └──► [ Chọn phương thức: VNPay / MoMo / Tiền mặt ]
                 │                    └──► [ Mở Gateway Deep Link ]
                 │                              └──► [ Màn hình Hoá Đơn Thành Công 🎉 ]
                 └── 👤 Tab 4: Cá Nhân & Đơn Hàng (Profile & Order History)
```

---

## PHẦN 4: LỘ TRÌNH 4 GIAI ĐOẠN THỰC THI (PROJECT EXECUTION ROADMAP)

### 🚀 Giai Đoạn 1: Khởi Tạo Bộ Khung & Tầng API Client (Ngày 1 - 2)
* **Khởi tạo:** `npx create-expo-app@latest mobile-app --template tabs`.
* **Cấu hình môi trường:** NativeWind (Tailwind), Axios Instance với BaseURL linh hoạt (`.env`), Expo SecureStore.
* **Xây dựng module Auth:** Màn hình Login/Register, validate form với Zod, lưu JWT token, bảo vệ Route Guards.

### ⚡ Giai Đoạn 2: Danh Mục, Tìm Kiếm & Chi Tiết (Ngày 3 - 4)
* **Tích hợp API Categories & Products:** Render danh sách với FlatList tối ưu virtualization, Skeleton loading khi đang tải.
* **Bộ lọc & Tìm kiếm:** Debounce search 300ms, lọc theo danh mục, sắp xếp giá tăng/giảm.
* **Màn hình Chi tiết (Product/Court Detail):** Image Carousel, thông tin chi tiết, trạng thái còn/hết hàng hoặc khung giờ đặt sân.

### 💳 Giai Đoạn 3: Giỏ Hàng, Đặt Đơn & Tích Hợp Thanh Toán VNPay/MoMo (Ngày 5 - 6)
* **Quản lý Giỏ hàng:** Zustand Store đồng bộ với bộ nhớ cục bộ MMKV (tắt app mở lại không mất giỏ).
* **Luồng Thanh toán:** Form nhập thông tin nhận hàng/giờ đặt sân.
* **Tích hợp Sandbox Payment:** Kết nối VNPay / MoMo URL, xử lý Deep Link trả kết quả về app (`expo-linking`).
* **Offline Fallback:** Cho phép xem lịch sử đơn hàng offline từ cache SQLite/TanStack Query.

### 🏆 Giai Đoạn 4: Push Notification, Polish UI & Đóng Gói Bảo Vệ Đồ Án (Ngày 7)
* **Thông báo:** Tích hợp `expo-notifications`, kích hoạt âm thanh và thông báo khi đơn được duyệt.
* **Chăm chút UI/UX:** Thêm Haptic feedback khi bấm nút, Dark mode đồng bộ hệ thống, hiệu ứng chuyển cảnh Shared Element Transition.
* **Hồ sơ báo cáo đồ án:** Xuất file tài liệu PDF thuyết minh, vẽ sơ đồ Use Case, Sequence Diagram và xuất video demo 4K để hội đồng chấm điểm tuyệt đối A+!
