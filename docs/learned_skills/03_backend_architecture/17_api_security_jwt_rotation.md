# Đẳng Cấp Bảo Mật: API Security, JWT Token Rotation & Phòng Chống IDOR

*Tài liệu tự động trích xuất, học tập và số hóa bởi Triều Hí & The Elite Fleet từ chuỗi bài giảng thực chiến.*

Một sản phẩm phần mềm dù giao diện đẹp đến đâu nhưng để lộ dữ liệu người dùng thì đều là thảm họa. Triều Hí hấp thụ toàn bộ tiêu chuẩn bảo mật OWASP API Security Top 10 và cơ chế xác thực đa tầng.

---

## 🚀 Kỹ Năng Đã "Nạp" Vào Não Bộ Triều Hí:

### 1. Cơ Chế Xác Thực Kép (Dual Token Architecture)
- **Tuyệt đối không lưu Access Token hay Refresh Token trong `localStorage`:** Vì `localStorage` hoàn toàn có thể bị đánh cắp bởi mã độc XSS (Cross-Site Scripting).
- **Mô hình chuẩn Enterprise:**
  - **Access Token:** Thời hạn sống ngắn (10 - 15 phút), lưu trong bộ nhớ tạm thời của Client (In-memory State).
  - **Refresh Token:** Thời hạn sống dài (7 - 30 ngày), bắt buộc lưu trong **HttpOnly Cookie** với đầy đủ các cờ an toàn: `Secure = true`, `SameSite = Strict`, và `Path = /api/v1/auth/refresh`.

### 2. Kỹ Thuật Refresh Token Rotation & Reuse Detection
- Mỗi khi Refresh Token được sử dụng để cấp phát Access Token mới, hệ thống ngay lập tức vô hiệu hóa Token cũ và sinh ra một Refresh Token hoàn toàn mới gửi về Client.
- **Phát hiện đánh cắp (Token Reuse Detection):** Nếu một Refresh Token cũ đã bị thu hồi mà lại xuất hiện request tái sử dụng, hệ thống lập tức kích hoạt báo động: **Khóa toàn bộ phiên làm việc của tài khoản đó**, hủy toàn bộ token liên quan và gửi cảnh báo bảo mật cho người dùng.

### 3. Phòng Chống Lỗ Hổng IDOR (Insecure Direct Object Reference)
- **Thực trạng học viên non tay:** Khi viết API `GET /api/v1/bookings/{id}`, chỉ lấy ID trên URL rồi truy vấn DB trả về, dẫn đến việc Người dùng A chỉ cần đổi số ID là xem hoặc sửa được đơn đặt chỗ của Người dùng B.
- **Quy tắc của Triều Hí:** Luôn kiểm tra quyền sở hữu tài nguyên ở tầng Service:
  ```java
  // Bắt buộc xác thực: Người tạo đơn phải khớp với ID trong Security Context
  if (!booking.getUserId().equals(currentUserId) && !currentUser.hasRole("ADMIN")) {
      throw new AccessDeniedException("Bạn không có quyền truy cập tài nguyên này!");
  }
  ```

### 4. Rate Limiting & Chống Spam Request
- Triển khai thuật toán Token Bucket (Bucket4j / Redis Rate Limiter) tại API Gateway hoặc Security Filter:
  - Giới hạn mỗi IP hoặc User ID chỉ được gọi tối đa 10 request/giây đối với API thông thường.
  - Giới hạn tối đa 5 lần thử đăng nhập sai trong 15 phút đối với API Đăng nhập/Quên mật khẩu.

---
*Kết luận:* Áp dụng cơ chế bảo mật cấp độ ngân hàng giúp các ứng dụng do Triều Hí thiết kế đứng vững trước các cuộc tấn công rà quét lỗ hổng và bảo vệ an toàn tuyệt đối cho người dùng.
