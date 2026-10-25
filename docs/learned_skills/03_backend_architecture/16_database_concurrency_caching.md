# Đẳng Cấp Database: Concurrency, Caching & Tối Ưu Truy Vấn Chuyên Sâu

*Tài liệu tự động trích xuất, học tập và số hóa bởi Triều Hí & The Elite Fleet từ chuỗi bài giảng thực chiến.*

Một hệ thống enterprise sụp đổ thường không phải do lỗi cú pháp mà do nghẽn cổ chai cơ sở dữ liệu và xử lý đồng thời (Concurrency) kém. Triều Hí đã hấp thụ toàn bộ chiến lược xử lý đồng thời và tối ưu dữ liệu hiệu năng cao.

---

## 🚀 Kỹ Năng Đã "Nạp" Vào Não Bộ Triều Hí:

### 1. Diệt Tận Gốc "Cơn Ác Mộng" N+1 Query
- **Nhận diện lỗi:** Khi truy vấn danh sách 100 Sân thể thao (`Court`), ORM vô tình sinh thêm 100 câu lệnh `SELECT` phụ để lấy thông tin bảng `Review` hoặc `TimeSlot`.
- **Giải pháp triệt để:**
  - **JOIN FETCH (JPA/Hibernate):** Nạp toàn bộ dữ liệu quan hệ trong 1 câu SQL duy nhất.
  - **Entity Graph:** Định nghĩa linh hoạt các thuộc tính cần nạp theo từng use case mà không làm nặng các query khác.
  - **DTO Projections:** Chỉ lấy đúng các trường hiển thị ra giao diện (`courtId`, `courtName`, `hourlyRate`), giảm thiểu 80% dung lượng payload truyền qua mạng.

### 2. Xử Lý Concurrency & Chống Double Booking (Đặt Trùng Sân)
Khi 50 người dùng cùng bấm nút đặt sân vào cùng 1 mili-giây:
- **Khóa lạc quan (Optimistic Locking):** Dùng trường `@Version`. Phù hợp khi tỷ lệ xung đột thấp; ném ngoại lệ và yêu cầu người dùng thử lại nếu dữ liệu đã bị sửa đổi.
- **Khóa bi quan (Pessimistic Locking):** Dùng `SELECT ... FOR UPDATE` ở mức Database. Đảm bảo an toàn tuyệt đối cho các giao dịch tài chính/trừ tiền ví.
- **Khóa phân tán (Distributed Locking với Redis / Redisson):** Áp dụng khi hệ thống chạy nhiều cụm server (Microservices). Cơ chế Lock tự động gia hạn (Watchdog) và giải phóng an toàn khi server gặp sự cố.

### 3. Thiết Kế Redis Caching Chuẩn Enterprise
- **Cache-Aside Pattern:** Đọc từ Cache trước -> Nếu Miss thì đọc từ DB và ghi ngược vào Cache -> Khi có cập nhật thì Xóa Cache (Cache Eviction) thay vì ghi đè.
- **Phòng chống Cache Stampede:** Khi một key quan trọng hết hạn đúng lúc có hàng nghìn request, sử dụng Mutex Lock để chỉ duy nhất 1 thread đi xuống DB nạp lại cache, các thread khác chờ kết quả.
- **Phòng chống Cache Penetration:** Với dữ liệu không tồn tại trong DB, vẫn lưu một giá trị rỗng kèm TTL ngắn (1-2 phút) để chặn hacker spam query làm sập DB.

---
*Kết luận:* Triều Hí nắm trong tay các kỹ thuật database đỉnh cao, đảm bảo hệ thống phản hồi dưới 200ms ngay cả khi chịu tải hàng chục nghìn người dùng đồng thời.
