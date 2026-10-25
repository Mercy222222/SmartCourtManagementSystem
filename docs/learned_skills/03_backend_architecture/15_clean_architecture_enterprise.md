# Đẳng Cấp Kiến Trúc: Clean Architecture, DDD & Naming Conventions

*Tài liệu tự động trích xuất, học tập và số hóa bởi Triều Hí & The Elite Fleet từ chuỗi bài giảng thực chiến.*

Sự khác biệt giữa một "Junior gõ code dạo" và một "Senior Software Engineer" nằm ở tư duy kiến trúc. Triều Hí hấp thụ toàn bộ tinh hoa của Clean Architecture, Domain-Driven Design (DDD) và chuẩn mực Clean Code quốc tế.

---

## 🚀 Kỹ Năng Đã "Nạp" Vào Não Bộ Triều Hí:

### 1. Phân Tách Tầng Nghiêm Ngặt trong Clean Architecture
- **Domain Layer (Core):**
  - Chứa Entities, Value Objects và Domain Logic thuần túy.
  - **Quy tắc bất di bất dịch:** Domain Layer không chứa bất kỳ annotation hay import nào từ Spring, Entity Framework, hay thư viện ORM bên ngoài (Zero Framework Dependency).
- **Application / Use Case Layer:**
  - Điều phối các luồng nghiệp vụ (`CreateBookingUseCase`, `CancelOrderUseCase`).
  - Định nghĩa các Ports / Interfaces cho Repository và External Services.
- **Infrastructure Layer:**
  - Triển khai cụ thể các Adapter: Database Persistence (JPA, EF Core, Prisma), Mail Sender, Payment Gateway.
- **Presentation / API Layer:**
  - Controller chỉ nhận DTO, validate sơ bộ đầu vào và ủy thác thực thi cho Use Case.

### 2. Tiêu Chuẩn Naming Conventions Quốc Tế
- **Phương thức / Hàm:** Bắt buộc là cụm động từ miêu tả chính xác hành vi: `calculateDynamicPricing()`, `validateBookingTimeSlot()`. Tuyệt đối cấm đặt tên mơ hồ như `process()`, `handle()`, `doSomething()`.
- **Biến Boolean:** Phải có tiền tố câu hỏi hoặc trạng thái rõ ràng: `isCourtAvailable`, `hasVoucherDiscount`, `canRefundDeposit`.
- **Eliminate Deep Nesting bằng Guard Clauses:**
  - Luôn kiểm tra điều kiện lỗi trước và `return` sớm.
  - Không bao giờ để mã nguồn lồng nhau quá 2 tầng `if-else`.

### 3. Nguyên Lý SOLID Ứng Dụng Trong Thực Chiến
- **Single Responsibility (SRP):** Tách biệt DTO Request, DTO Response, Entity và Domain Model.
- **Open/Closed (OCP):** Mở rộng tính năng thanh toán (VNPAY, MoMo, PayOS) thông qua Strategy Pattern thay vì sửa đổi câu lệnh `switch-case`.
- **Dependency Inversion (DIP):** Tầng cao luôn phụ thuộc vào Interface trừu tượng, không bao giờ phụ thuộc vào triển khai cụ thể.

---
*Kết luận:* Áp dụng Clean Architecture và chuẩn đặt tên nghiêm ngặt đảm bảo hệ sinh thái mã nguồn của Sếp luôn sẵn sàng scale lên hàng triệu người dùng mà không bao giờ trở thành "núi nợ kỹ thuật" (Technical Debt).
