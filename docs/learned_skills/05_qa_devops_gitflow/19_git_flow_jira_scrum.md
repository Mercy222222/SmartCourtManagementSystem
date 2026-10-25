# Đẳng Cấp Quy Trình: Git Flow, Code Review Khắt Khe & Agile/Scrum Jira

*Tài liệu tự động trích xuất, học tập và số hóa bởi Triều Hí & The Elite Fleet từ chuỗi bài giảng thực chiến.*

Sự khác biệt giữa lập trình cá nhân và môi trường Software House chuyên nghiệp là **kỷ luật quy trình**. Triều Hí vận hành toàn bộ luồng công việc theo chuẩn Git Flow quốc tế và mô hình Agile/Scrum trên Jira.

---

## 🚀 Kỹ Năng Đã "Nạp" Vào Não Bộ Triều Hí:

### 1. Chuẩn Hóa Lịch Sử Commit (Conventional Commits)
Tuyệt đối không commit những thông điệp vô nghĩa như "fix bug", "update", "ok". Mọi commit đều theo chuẩn:
- `feat(booking): add dynamic time slot pricing calculation`
- `fix(auth): resolve null pointer exception when refresh token expires`
- `refactor(db): optimize N+1 query using entity graph on CourtRepository`
- `test(payment): add unit test coverage for refund transaction logic`

### 2. Chiến Lược Phân Nhánh Git Flow Chuyên Nghiệp
- `main` / `master`: Nhánh production ổn định tuyệt đối, chỉ nhận code từ `release` hoặc `hotfix`.
- `develop`: Nhánh tích hợp chính của toàn bộ team dự án.
- `feature/[ticket-id]-[short-desc]`: Nhánh tính năng riêng lẻ (ví dụ: `feature/OJT-42-court-booking`).
- **Quy tắc vàng:** Không bao giờ push code trực tiếp lên `develop` hoặc `main`. Bắt buộc phải thông qua **Pull Request (PR)** có tối thiểu 1 Tech Lead phê duyệt (Approved) và toàn bộ CI check đều xanh.

### 3. Kỹ Thuật Xử Lý Git Conflict Đẳng Cấp Với Rebase
- **Thay vì dùng `git merge` làm rối tung lịch sử commit**, Triều Hí hướng dẫn dùng `git rebase`:
  ```bash
  git checkout feature/OJT-42
  git fetch origin
  git rebase origin/develop
  # Xử lý conflict từng commit nếu có -> git add . -> git rebase --continue
  ```
- **Phao cứu sinh `git reflog`:** Bất kỳ khi nào lỡ tay gõ lệnh xóa nhầm commit hoặc rebase hỏng, sử dụng `git reflog` để tìm lại mã SHA gốc và khôi phục 100% mã nguồn trong vài giây.

### 4. Vận Hành Dự Án Trên Jira Board Chuẩn Scrum
- **Phân bổ Sprint 2 tuần:** Tổ chức Sprint Backlog, ước lượng Story Point theo dãy Fibonacci (1, 2, 3, 5, 8).
- **Definition of Done (DoD) nghiêm ngặt:** Một User Story chỉ được kéo sang cột **DONE** khi:
  1. Đã hoàn thành 100% Acceptance Criteria trong SRS.
  2. Đã có Unit Test pass với coverage > 85%.
  3. Đã được Tech Lead review và merge vào nhánh `develop`.
  4. Đã được QA kiểm thử pass trên môi trường Staging.

---
*Kết luận:* Áp dụng chuẩn Git Flow và Agile/Scrum giúp mọi dự án do Triều Hí phụ trách vận hành nhịp nhàng như một cỗ máy Thụy Sĩ, minh bạch tiến độ và triệt tiêu rủi ro trễ hạn.
