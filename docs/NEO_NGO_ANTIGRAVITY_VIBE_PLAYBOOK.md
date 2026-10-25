# CẨM NANG TOÀN TẬP NEO NGÔ: ANTIGRAVITY COOKING, VIBECODING & SIÊU WORKFLOW AI AGENT

> **Đơn vị tiếp nhận & chuẩn hóa:** Triều Hí (Hoàng Minh Triều) & Biệt đội 10 Chuyên gia Fullstack (The Elite Fleet)  
> **Nguồn trích xuất:** Kênh công nghệ & AI Creator **Neo Ngô** (`iamneongo` / `@iamneongo`) - Hệ sinh thái `antigravity-cooking`  
> **Phiên bản:** 2026 Ultimate Antigravity & Agentic Edition  

---

## TỔNG QUAN VỀ HỆ TƯ TƯỞNG CỦA NEO NGÔ (`iamneongo`)

**Neo Ngô** là một trong những nhà sáng tạo nội dung và kỹ sư tiên phong tại Việt Nam tập trung vào:
1. **Google Antigravity & agy CLI:** Làm chủ môi trường phát triển định hướng Agent (Agent-First IDE), biến AI thành lập trình viên cộng tác thực thụ thay vì chatbot thông thường.
2. **Triết lý Vibecoding Đỉnh Cao:** *"Automation is not about being lazy, it's about being efficient."* (Tự động hóa không phải là lười biếng, mà là tối ưu hiệu suất). Không gõ code thủ công từng dòng mà đóng vai trò Kiến trúc sư điều phối luồng làm việc.
3. **Bộ công cụ Antigravity-Cooking:** Kho lưu trữ mở các automation scripts, custom skills, workflows và quy trình quản trị tài khoản GitHub tự động cho lập trình viên.

```
                          ┌────────────────────────────────────────────────────────┐
                          │     HỆ SINH THÁI ANTIGRAVITY-COOKING CỦA NEO NGÔ      │
                          └──────────────────────────┬─────────────────────────────┘
             ┌───────────────────────┬───────────────┴───────────────┬──────────────────────┐
             ▼                       ▼                               ▼                      ▼
    [1. Antigravity Workflows] [2. Git Multi-Account]       [3. Custom Skills &]    [4. Vibecoding to]
    (.agent/workflows tự động  (gh-switch.ps1 tự động       Rules Architecture      SaaS Production
    SaaS MVP, QA, Refactor)     chuyển SSH, Name, Email)    (SKILL.md, MCP, Hooks)  Zero-to-Live Product)
```

---

## PHẦN 1: BỘ WORKFLOWS TỰ ĐỘNG HÓA `.agent/workflows` CỦA NEO NGÔ

Neo Ngô tiên phong việc đóng gói các quy trình kỹ thuật lặp đi lặp lại thành các **Workflows chuẩn `.agent/workflows/*.md`** để AI Agent tự hành thực thi 100% không cần con người can thiệp:

### 1. Workflow: Đóng gói SaaS MVP Tốc Độ Thần Tốc (SaaS Delivery Pipeline)
- **Bước 1 (Idea to Schema):** Chuyển đổi ý tưởng dạng prompt thành ERD Database (Prisma/PostgreSQL) và Zod Schema trong 3 phút.
- **Bước 2 (Design System Instantiation):** Tự động sinh `tailwind.config.js` với bộ tokens nhất quán, tích hợp Radix UI primitives hoặc Shadcn.
- **Bước 3 (API & Server Actions):** Tự động sinh Next.js App Router hoặc Spring Boot CRUD kèm validate 2 đầu và mock data thực tế.
- **Bước 4 (Auto-Deploy):** Tự động commit, push lên GitHub và kích hoạt webhook Vercel / Railway / Cloudflare Pages.

### 2. Workflow: Browser QA Testing Tự Động Với Subagents
- Tận dụng `browser_subagent` của Antigravity:
  - Agent tự động mở trình duyệt Chromium ngầm, điều hướng tới URL localhost hoặc staging.
  - Tự động điền form đăng ký/đăng nhập, bấm nút, kiểm tra responsive mobile/desktop.
  - Tự động chụp ảnh màn hình (Screenshot), quay video WebP và phát hiện lỗi console log để báo cáo về cho Dev fix.

### 3. Workflow: Refactoring Mã Nguồn Không Rủi Ro (Safe Refactoring Loop)
- Quy tắc của Neo Ngô: Không bao giờ sửa code lớn nếu chưa có lưới an toàn.
  1. Agent tự động quét codebase, chạy kiểm thử hiện tại.
  2. Tạo bản snapshot backup.
  3. Áp dụng Clean Architecture / tách hàm nhỏ.
  4. Chạy lại test suite; nếu pass 100% mới giữ lại code mới, nếu fail lập tức rollback.

---

## PHẦN 2: CÔNG CỤ ĐỘC QUYỀN `gh-switch.ps1` - QUẢN LÝ ĐA TÀI KHOẢN GITHUB THÔNG MINH

Một nỗi đau lớn của lập trình viên là làm việc cùng lúc trên nhiều tài khoản GitHub (tài khoản cá nhân, công ty, dự án freelance) dẫn đến việc:
- Push nhầm commit với email cá nhân vào repo công ty (lộ danh tính, vi phạm compliance).
- Xung đột SSH Key, liên tục phải gõ lệnh đổi config rườm rà.

### Giải pháp của Neo Ngô: Script `gh-switch.ps1`
Tự động lưu trữ thông tin tài khoản vào `~/.gh-accounts.json` và cấu hình lại `~/.ssh/config` cũng như `git config --global user.name / user.email` chỉ bằng 1 câu lệnh duy nhất:

```powershell
# Xem tài khoản đang kích hoạt
.\scripts\gh-switch.ps1 status

# Chuyển sang tài khoản công ty
.\scripts\gh-switch.ps1 switch work

# Chuyển sang tài khoản cá nhân
.\scripts\gh-switch.ps1 switch personal

# Thêm tài khoản mới linh hoạt
.\scripts\gh-switch.ps1 add -Alias "freelance" -GitName "Neo Ngo" -GitEmail "neo@example.com" -SSHKeyPath "~/.ssh/id_ed25519_freelance"
```

---

## PHẦN 3: KIẾN TRÚC SKILLS & RULES CHUẨN GOOGLE ANTIGRAVITY THEO NEO NGÔ

Để một AI Agent đạt hiệu suất 300% so với lập trình viên thông thường, việc thiết lập Customizations là yếu tố sống còn:

### 1. Phân Tầng Nạp Quy Tắc (Customization Hierarchy)
- **Tầng Global (`~/.gemini/config/`):** Áp dụng cho mọi dự án trên máy (phong cách lập trình, quy ước bảo mật, thông tin cá nhân).
- **Tầng Workspace (`.agents/` tại gốc dự án):**
  - `rules/` hoặc `AGENTS.md` / `GEMINI.md`: Phong cách giao tiếp, persona điều phối, quy định git và test suites.
  - `skills/<skill_name>/SKILL.md`: Các bộ kíp kỹ năng đóng gói có YAML frontmatter chuẩn.
- **Tầng MCP Servers (`mcp_config.json`):** Kết nối Agent với Database trực tiếp, GitHub API, Jira, hoặc công cụ tìm kiếm bên ngoài.

### 2. Tiêu Chuẩn Viết `SKILL.md` Chuyên Nghiệp
Mọi skill của Neo Ngô đều có cấu trúc:
```markdown
---
name: high-performance-optimizer
description: Tự động phát hiện memory leaks, N+1 query và tối ưu hóa bundle size frontend.
---

# Hướng dẫn chi tiết cho Agent
- Khi nào kích hoạt skill này...
- Các bước thực thi chuẩn AAA...
- Checklist kiểm tra trước khi hoàn thành...
```

---

## PHẦN 4: NGHỆ THUẬT VIBE CODING 2026 THEO CHUẨN NEO NGÔ

1. **Giao tiếp định hướng Kết quả (Outcome-Driven Prompting):**
   - Đừng nói: *"Hãy viết cho tôi một hàm đăng nhập."*
   - Hãy nói theo phong cách Neo Ngô: *"Hãy tạo một hệ thống Authentication hoàn chỉnh sử dụng JWT HttpOnly Cookie, Refresh Token Rotation, bảo vệ chống CSRF bằng Double Submit Cookie, kèm 3 unit test Jest bao phủ trường hợp mật khẩu sai và token hết hạn."*
2. **Kỹ thuật "Rubber Ducky" cùng Agent:**
   - Khi gặp bug hóc búa, hãy paste toàn bộ stack trace và hỏi: *"Hãy phân tích 3 giả thuyết khả dĩ nhất gây ra lỗi này theo thứ tự xác suất từ cao xuống thấp và đề xuất cách debug bằng log."*
3. **Sử dụng Micro-Animations & Aesthetic Design:**
   - Neo Ngô luôn chú trọng giao diện phải **"WOW"** người dùng ngay từ cái nhìn đầu tiên: Sử dụng dark mode sang trọng, glassmorphism tinh tế, chuyển động 60fps, typography Inter/Outfit thay vì font mặc định của trình duyệt.

---

## PHẦN 5: TÍCH HỢP BẢN SẮC NEO NGÔ VÀO THE ELITE FLEET

Triều Hí và 10 chuyên gia đã tích hợp trọn vẹn tri thức của Neo Ngô vào kho vũ khí của team:
- **Tự động áp dụng triết lý Workflows tự hành:** Không dừng lại chờ đợi, tự động chạy kiểm thử và sửa lỗi.
- **Sẵn sàng tích hợp `gh-switch`:** Hỗ trợ quản lý đa tài khoản Git an toàn tuyệt đối cho Sếp.
- **Chuẩn hóa giao diện thẩm mỹ cao:** Mọi sản phẩm web hay mobile tạo ra đều đạt chuẩn UI/UX đỉnh cao của kỷ nguyên Vibecoding.

---
*Biên soạn và tích hợp vào hệ thống tài liệu bởi Triều Hí & The Elite Fleet.*
