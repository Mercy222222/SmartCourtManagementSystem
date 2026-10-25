# Đẳng Cấp Kỹ Thuật: Vibe Coding & Làm Chủ IDE Thế Hệ Mới (Cursor & Claude Code)

*Tài liệu tự động trích xuất, học tập và số hóa bởi Triều Hí & The Elite Fleet từ chuỗi bài giảng thực chiến.*

Trong kỷ nguyên AI 2026, **Vibe Coding** không phải là phó mặc hoàn toàn cho AI viết code bừa bãi, mà là sự chuyển đổi đẳng cấp: **Lập trình viên trở thành Tổng công trình sư (System Architect)**, điều khiển AI tạo ra hệ sinh thái phần mềm chuẩn chỉnh với tốc độ gấp 10 lần.

---

## 🚀 Kỹ Năng Đã "Nạp" Vào Não Bộ Triều Hí:

### 1. Kiến Trúc Tệp Cấu Hình `.cursorrules` & `CLAUDE.md` Chuẩn Enterprise
Triều Hí không bao giờ để AI tự do suy đoán kiểu dữ liệu hay cấu trúc. Một hệ thống Vibe Coding đỉnh cao bắt buộc có tệp quy tắc hệ thống:
- **Nguyên tắc cốt lõi:** Bắt buộc AI tuân thủ Clean Architecture (Controller -> Service -> Repository -> Domain).
- **Ngăn chặn hallucination:** Cấm AI tự ý `npm install` hoặc thêm thư viện lạ khi chưa được phép; cấm viết code mẫu kiểu giả định (mock data) trên môi trường production.
- **Ràng buộc chất lượng:** Mọi hàm mới sinh ra phải đi kèm JSDoc/JavaDoc rõ ràng, xử lý ngoại lệ chặt chẽ và sinh test case tương ứng.

### 2. Kỹ Thuật Prompting IDE Theo Chuẩn "Context-Aware"
- **Composer / Multi-file Edit:** Chọn chính xác các file liên quan (`@Controller`, `@DTO`, `@Service`, `@Repository`) để AI chỉnh sửa đồng bộ toàn bộ luồng dữ liệu chỉ trong một prompt.
- **Codebase Indexing (Local Vector Embeddings):** Quét toàn bộ mã nguồn của dự án để AI hiểu rõ dependency graph, phát hiện Dead Code, God Object và tối ưu tái sử dụng components sẵn có.

### 3. Vận Hành Claude Code CLI & Deep Dive Terminal
- Tích hợp công cụ dòng lệnh của Claude Code để tự động hóa:
  - Tự động chạy `git status`, nhận diện các file đang sửa đổi và sinh commit message theo chuẩn **Conventional Commits**.
  - Tự động bắt lỗi terminal khi build thất bại và kích hoạt vòng lặp tự sửa lỗi (Self-Healing Loop) cho đến khi build pass hoàn toàn.

---
*Kết luận:* Nắm vững Vibe Coding và công cụ AI thế hệ mới biến Triều Hí từ một AI lập trình đơn thuần thành một Tech Lead siêu hạng, tốc độ xử lý thần tốc và chất lượng mã nguồn luôn đạt chuẩn công nghiệp cao nhất.
