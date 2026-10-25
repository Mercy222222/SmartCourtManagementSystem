# Đẳng Cấp Kiểm Thử: QA Automation, Unit Test 90% & Load Testing k6

*Tài liệu tự động trích xuất, học tập và số hóa bởi Triều Hí & The Elite Fleet từ chuỗi bài giảng thực chiến.*

Châm ngôn của Triều Hí: *"Code chưa có test là code bị hỏng"*. Để đảm bảo một hệ thống chạy mượt mà trên môi trường Production, quy trình kiểm thử tự động (Automation Testing) và kiểm thử hiệu năng (Performance Benchmark) là bắt buộc.

---

## 🚀 Kỹ Năng Đã "Nạp" Vào Não Bộ Triều Hí:

### 1. Ma Trận Test Case Toàn Diện (Boundary Value Analysis)
Triều Hí không chỉ test "Happy Path" (trường hợp nhập đúng). 70% ca kiểm thử tập trung vào:
- **Phân tích giá trị biên (BVA):** Kiểm tra giới hạn 0, 1, n-1, n, n+1. (Ví dụ: Đặt sân lúc 23:59 so với 00:00, voucher hết hạn đúng 00:00:01).
- **Phân vùng tương đương (Equivalence Partitioning):** Phân loại đầu vào hợp lệ và không hợp lệ để giảm thiểu số lượng test case nhưng tối đa hóa độ bao phủ.
- **Negative & Injection Testing:** Ký tự Unicode đặc biệt, SQL Injection payload, chuỗi dài 10.000 ký tự.

### 2. Kỹ Thuật Viết Unit Test & Integration Test Đạt Coverage > 90%
- Áp dụng cấu trúc chuẩn **AAA (Arrange - Act - Assert)** hoặc **Given - When - Then**.
- **Mocking thông minh:** Dùng Mockito (Java) hoặc Jest Mocks (TypeScript) để cô lập hoàn toàn tầng Database và External Services, đảm bảo Unit Test chạy với tốc độ miligiây.
- Kiểm tra tính bất biến của nghiệp vụ: Bắt buộc test các ngoại lệ bắn ra (`assertThrows`), kiểm tra số lần gọi hàm phụ thuộc (`verify(mock, times(1))`).

### 3. Tự Động Hóa Kiểm Thử Chịu Tải Với k6 (Load & Stress Testing)
Thay vì dùng Apache JMeter nặng nề, Triều Hí làm chủ công cụ hiện đại **k6** viết bằng JavaScript:
- **Mô hình tải thực tế:**
  - *Ramp-up:* Tăng từ 0 lên 200 Virtual Users (VUs) trong 30 giây.
  - *Spike Test:* Đột ngột tăng vọt lên 500 VUs trong 1 phút để kiểm tra khả năng phục hồi của hệ thống.
  - *Cooldown:* Hạ dần về 0.
- **Ngưỡng chấp nhận (SLA Thresholds):**
  ```javascript
  export const options = {
    thresholds: {
      http_req_duration: ['p(95)<400'], // 95% request phải phản hồi dưới 400ms
      http_req_failed: ['rate<0.01'],   // Tỷ lệ lỗi dưới 1%
    },
  };
  ```

---
*Kết luận:* Bộ quy chuẩn kiểm thử tự động giúp Triều Hí tự tin bàn giao các bản release phần mềm cho Sếp mà không bao giờ lo lắng về lỗi hồi quy (Regression Bugs).
