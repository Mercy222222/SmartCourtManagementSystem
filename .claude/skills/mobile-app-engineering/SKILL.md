---
name: mobile-app-engineering
description: "Production-grade Mobile App Development Guide covering React Native (Expo New Architecture), Flutter 3.x, Kotlin Multiplatform, Clean Architecture + MVI, Offline-First Sync Engines, Vietnamese Payment Gateways (VNPay, MoMo), Push Notifications, and Capstone Project Blueprints."
---

# 📱 Mobile App Engineering & Capstone Project Mastery (2025 - 2026)

Tài liệu hướng dẫn chuyên sâu cấp Giáo sư/Tiến sĩ dành cho việc phát triển ứng dụng di động chuẩn doanh nghiệp và đạt điểm tuyệt đối (A+ / 10 điểm) cho Đồ án Chuyên ngành / Đồ án Tốt nghiệp.

---

## 1. 🏗️ Kiến Trúc Tiêu Chuẩn Doanh Nghiệp (Clean Architecture + MVI)

Mô hình kiến trúc khuyến nghị cho mọi đồ án di động quy mô lớn:

```text
┌─────────────────────────────────────────────────────────────┐
│  Presentation Layer (MVI - Unidirectional Data Flow)        │
│  - Views: React Native (Fabric) / Flutter Widgets / Compose │
│  - State Container: Zustand / BLoC / Riverpod / StateFlow   │
│  - Intents: User Actions, Lifecycle Events                  │
│  - State: Single Source of Truth (SSoT), Immutable State    │
└──────────────────────────────┬──────────────────────────────┘
                               │ Dispatches Intents / Observes State
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  Domain Layer (Pure Business Logic - Zero Framework)        │
│  - Use Cases / Interactors (e.g., BookCourtUseCase, Pay)     │
│  - Domain Models & Entities                                 │
│  - Repository Interfaces (Dependency Inversion)             │
└──────────────────────────────┬──────────────────────────────┘
                               │ Implements Interfaces
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  Data Layer (Offline-First Repository Pattern)              │
│  - Repository Implementations                               │
│  - Local Data Source (SSoT): WatermelonDB / Expo SQLite     │
│  - Remote Data Source: REST / GraphQL / Supabase Realtime    │
│  - Sync Engine: Background Worker, Conflict Resolution      │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. ⚡ Các Hệ Sinh Thái Công Nghệ Hàng Đầu

### A. React Native & Expo (Lựa chọn #1 cho Web Fullstack sang Mobile)
* **New Architecture:** Kích hoạt mặc định Bridgeless Mode, JSI (JavaScript Interface) và Fabric UI Renderer.
* **Routing:** `expo-router` với File-based Routing (`app/(tabs)/index.tsx`, `app/booking/[id].tsx`).
* **UI & Styling:** NativeWind (Tailwind CSS cho React Native) hoặc React Native Reanimated 3 (60-120 FPS animations).
* **Local DB & Caching:** `expo-sqlite` + `drizzle-orm` hoặc `@tanstack/react-query` + `react-native-mmkv`.

### B. Flutter & Dart (Lựa chọn #1 cho Đồ họa & Hiệu năng cao)
* **Rendering Engine:** Impeller Engine loại bỏ hoàn toàn hiện tượng Shader Compilation Jank trên cả iOS và Android.
* **State Management:** BLoC (Business Logic Component) hoặc Riverpod kết hợp Freezed sinh Immutable State.
* **Routing:** GoRouter với route guards, dynamic parameters và deep linking.

### C. Kotlin Multiplatform (KMP) & Compose Multiplatform (CMP)
* Dùng chung 100% logic Domain & Data (Ktor Client + SQLDelight) giữa Android và iOS, render UI bằng Jetpack Compose.

---

## 3. 📶 Offline-First & Sync Engine Architecture

Xử lý các tình huống người dùng mất mạng trong lúc thao tác (ví dụ: đang ở trong sân bóng tầng hầm hoặc vùng sóng yếu):

1. **Local-First Write:** Mọi thao tác ghi (tạo đơn, đặt sân, ghi chú) lưu ngay vào Local DB với trạng thái `sync_status = 'pending'`.
2. **Optimistic UI:** Cập nhật màn hình ngay lập tức mà không cần chờ mạng phản hồi (độ trễ 0ms).
3. **Mutation Queue:** Khi có kết nối mạng (`@react-native-community/netinfo`), engine chạy nền gửi tuần tự các thao tác lên server.
4. **Conflict Resolution:** Áp dụng chiến lược *Last-Write-Wins (LWW)* dựa trên server timestamp hoặc cảnh báo người dùng khi phát hiện xung đột dữ liệu.

---

## 4. 💳 Tích Hợp Cổng Thanh Toán Việt Nam (VNPay, MoMo, ZaloPay, Stripe)

### Quy Tắc An Ninh Sống Còn:
* **KHÔNG BAO GIỜ** nhúng `vnp_HashSecret`, `momo_SecretKey`, hay Private Key vào mã nguồn client mobile (tránh dịch ngược APK/IPA).

### Chuẩn Quy Trình Thanh Toán Serverless Edge:
```text
Mobile App (Expo)           Supabase Edge Functions             VNPay / MoMo Gateway
      │                               │                                  │
      ├─── 1. POST /create-payment ──►│                                  │
      │    (orderId, amount)          ├── 2. Tạo HMAC-SHA512 hash ──────►│
      │                               │   với Secret Key an toàn         │
      │◄── 3. Trả về payUrl ──────────┤                                  │
      │                               │                                  │
      ├─── 4. Mở In-App Browser ────────────────────────────────────────►│
      │    hoặc Deep Link             │                                  │
      │                               │                                  │
      │                               │◄── 5. IPN Webhook Server-to-Server
      │                               │    (Xác thực chữ ký, đổi         │
      │                               │     trạng thái order: 'PAID')    │
      │                               │                                  │
      │◄── 6. Deep Link Trở Về App ───┴──────────────────────────────────┘
      │    (myapp://payment-result?status=success)
      │
      ▼
Hiển thị màn hình thành công & Bắn Push Notification!
```

---

## 5. 🔔 Hệ Thống Thông Báo Thời Gian Thực (Push Notifications)
* **Client:** Lấy Expo Push Token thông qua `expo-notifications`, lưu vào bảng `devices (user_id, push_token, platform)` trên Supabase PostgreSQL.
* **Server/Trigger:** Sử dụng Database Triggers hoặc Webhook gọi `expo-server-sdk` bắn thông báo khi:
  * Trạng thái đơn đặt sân thay đổi (Xác nhận / Hủy / Sắp đến giờ).
  * Khách hàng được nạp tiền hoặc hoàn tiền thành công.
* **Deep Linking từ Notification:** Nhấn vào thông báo sẽ tự động chuyển hướng chính xác đến màn hình chi tiết đơn (`/orders/123`).

---

## 6. 🎓 Bộ Tiêu Chí Giúp Đồ Án Chuyên Ngành Đạt Điểm A+ (10/10)

Hội đồng chấm đồ án công nghệ thông tin luôn đánh giá cao các dự án có:

1. **Kiến trúc mạch lạc:** Áp dụng Clean Architecture, tách tầng rõ ràng, không viết logic vào UI Component.
2. **Trải nghiệm thực chiến (UX):** Có Skeleton Loader, Haptic Feedback (rung phản hồi), Dark Mode, Offline Banner khi mất mạng.
3. **Bảo mật chuẩn OWASP Mobile:** Lưu token trong Keychain/Keystore (dùng `expo-secure-store`), xác thực sinh trắc học vân tay / Face ID (`expo-local-authentication`).
4. **Kiểm thử tự động:** Có ít nhất bộ Unit Test kiểm tra Use Cases và E2E Test luồng chính (Login -> Booking -> Payment).
5. **Tài liệu hoàn chỉnh:** Sơ đồ Use Case, Activity Diagram, Sequence Diagram cho luồng thanh toán và đồng bộ dữ liệu.
