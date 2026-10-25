# DECODE LEOX MASTER PLAYBOOK: KHO TÀI LIỆU TOÀN DIỆN VỀ DSA, DỰ ÁN GHI ĐIỂM CV & BÍ KÍP PHỎNG VẤN 2026

> **Đơn vị thẩm thấu & biên soạn:** Triều Hí (Hoàng Minh Triều) & Biệt đội 10 Chuyên gia Fullstack (The Elite Fleet)  
> **Nguồn trích xuất:** Kênh công nghệ & đào tạo lập trình **Decode Leox** (`@decode_leox` / `@decodeleox`)  
> **Phiên bản:** 2026 Ultimate Developer Edition

---

## TỔNG QUAN HỆ SINH THÁI DECODE LEOX

**Decode Leox** là kênh học thuật và cẩm nang lập trình nổi tiếng toàn cầu (hơn 67.000 lập trình viên theo dõi) chuyên cung cấp:
- 🚀 **Learning Material & PDF Notes:** Ghi chú trực quan về Cấu trúc dữ liệu & Giải thuật (DSA), Java Core, Python, SQL và Web Development.
- 💡 **Project Ideas for Resume:** Tuyển tập ý tưởng dự án từ cấp độ nhập môn đến cấp độ phân tán (Enterprise) giúp ứng viên ghi điểm tuyệt đối trong mắt nhà tuyển dụng.
- 🧩 **Coding Challenges & Logic Building:** Các mẫu hình (Patterns) giải quyết bài toán tư duy, thuật toán thực chiến.
- 🎯 **Career & Placement Guide:** Lộ trình phát triển sự nghiệp, kỹ thuật viết cold email xin việc và cẩm nang phỏng vấn System Design dành cho Junior/Mid.

---

## PHẦN 1: 14 MẪU HÌNH THUẬT TOÁN KINH ĐIỂN (DSA CODING PATTERNS)
*Thay vì giải hàng nghìn bài tập LeetCode rời rạc, Decode Leox đúc kết thành 14 mẫu hình tư duy giải quyết 90% bài toán phỏng vấn:*

```
                                  ┌──────────────────────────────────────────────┐
                                  │      14 PATTERNS GIẢI THUẬT DECODE LEOX      │
                                  └──────────────────────┬───────────────────────┘
            ┌──────────────────────┬─────────────────────┼─────────────────────┬──────────────────────┐
            ▼                      ▼                     ▼                     ▼                      ▼
    [1. Two Pointers]      [2. Sliding Window]   [3. Fast & Slow]      [4. Monotonic Stack]   [5. Top 'K' Elements]
    (Mảng đối xứng/Sort)    (Dãy con liên tiếp)   (Chu trình / Linked)  (Tìm phần tử lớn hơn)  (Min/Max Heap)
            │                      │                     │                     │                      │
            ▼                      ▼                     ▼                     ▼                      ▼
    [6. Merge Intervals]   [7. Cyclic Sort]      [8. In-place Reverse] [9. Tree BFS/DFS]      [10. Two Heaps]
    (Khoảng trùng lặp)     (Mảng số 1 đến N)     (Đảo ngược Node)      (Duyệt tầng / Nhánh)   (Tìm Median dòng)
            │                      │                     │                     │                      │
            ▼                      ▼                     ▼                     ▼                      ▼
    [11. Subsets / BT]     [12. Modified Binary] [13. Bitwise XOR]     [14. Dynamic Prog.]
    (Tổ hợp / Quay lui)    (Mảng xoay vòng)      (Tìm số độc nhất)     (Quy hoạch động mẫu)
```

### 1. Two Pointers (Hai Con Trỏ)
- **Dấu hiệu nhận biết:** Mảng hoặc chuỗi đã được sắp xếp, cần tìm cặp số thỏa mãn tổng $S$, hoặc xử lý mảng đối xứng (Palindrome).
- **Chiến thuật:** Đặt một con trỏ ở đầu (`left = 0`) và một con trỏ ở cuối (`right = n - 1`). Di chuyển con trỏ tùy theo điều kiện so sánh. Độ phức tạp giảm từ $O(n^2)$ xuống $O(n)$.

### 2. Sliding Window (Cửa Sổ Trượt)
- **Dấu hiệu:** Tìm dãy con (subarray) hoặc chuỗi con (substring) dài nhất/ngắn nhất thỏa mãn một điều kiện (ví dụ: tổng bằng $K$, chứa $K$ ký tự khác nhau).
- **Chiến thuật:** Mở rộng biên phải (`right++`) để nạp dữ liệu vào cửa sổ; khi điều kiện bị vi phạm, co biên trái (`left++`) để thu hẹp cửa sổ.

### 3. Fast & Slow Pointers (Rùa và Thỏ - Floyd's Cycle Detection)
- **Dấu hiệu:** Phát hiện chu trình trong Linked List, tìm phần tử trung vị (Middle of Linked List), bài toán Happy Number.
- **Chiến thuật:** Con trỏ `slow` đi 1 bước, con trỏ `fast` đi 2 bước. Nếu có chu trình, hai con trỏ chắc chắn gặp nhau.

### 4. Monotonic Stack (Ngăn Xếp Đơn Điệu)
- **Dấu hiệu:** Tìm phần tử lớn hơn hoặc nhỏ hơn tiếp theo (Next Greater Element, Daily Temperatures, Largest Rectangle in Histogram).
- **Chiến thuật:** Duy trì các phần tử trong stack theo thứ tự tăng dần hoặc giảm dần ngặt.

### 5. Top 'K' Elements (Sử Dụng PriorityQueue / Heap)
- **Dấu hiệu:** Tìm $K$ phần tử lớn nhất/nhỏ nhất/tần suất cao nhất trong tập dữ liệu không sắp xếp.
- **Chiến thuật:** Dùng **Min-Heap kích thước K** để tìm $K$ phần tử lớn nhất (giữ chi phí $O(n \log K)$ thay vì sắp xếp toàn bộ $O(n \log n)$).

---

## PHẦN 2: BẢN ĐỒ VŨ KHÍ LẬP TRÌNH & DATABASE CHUYÊN SÂU

### 1. Java Core & Collections Master Sheet
- **ArrayList vs LinkedList:** ArrayList dùng mảng động, truy cập ngẫu nhiên $O(1)$, chèn ở giữa chậm $O(n)$; LinkedList dùng con trỏ 2 chiều, tốn thêm bộ nhớ lưu node reference.
- **HashMap Internals:** Hoạt động dựa trên Bucket Array và Hash Function. Từ Java 8, khi 1 bucket có từ 8 phần tử trở lên và kích thước bảng $\ge 64$, cấu trúc tự động chuyển từ Linked List ($O(n)$) sang Red-Black Tree ($O(\log n)$) để chống tấn công Hash Collision.
- **Java Streams API:** Làm chủ `filter()`, `map()`, `flatMap()`, `collect(Collectors.groupingBy())` để xử lý dữ liệu khai báo (declarative) song song với `parallelStream()`.

### 2. SQL Window Functions (Vũ Khí Lương Nghìn Đô)
Decode Leox nhấn mạnh: 90% bài test SQL nâng cao của doanh nghiệp đều xoay quanh Window Functions:
```sql
-- Tìm nhân viên có mức lương cao thứ 2 trong mỗi phòng ban
WITH RankedSalaries AS (
    SELECT 
        emp_id, 
        emp_name, 
        department_id, 
        salary,
        DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as rank_num
    FROM employees
)
SELECT emp_name, department_id, salary 
FROM RankedSalaries 
WHERE rank_num = 2;
```
- **`ROW_NUMBER()`:** Đánh số thứ tự duy nhất 1, 2, 3, 4 (dù trùng giá trị).
- **`RANK()`:** Nhảy cóc thứ hạng khi bằng điểm: 1, 2, 2, 4.
- **`DENSE_RANK()`:** Không nhảy cóc: 1, 2, 2, 3.
- **`LEAD()` & `LAG()`:** Lấy giá trị của dòng tiếp theo hoặc dòng trước đó mà không cần thực hiện phép `SELF JOIN` tốn kém.

---

## PHẦN 3: TUYỂN TẬP "KILLER RESUME PROJECTS" PHÂN THEO 3 CẤP ĐỘ

*Bí quyết của Decode Leox: Đừng bao giờ nộp CV chỉ có dự án Todo-List hay Máy tính cơ bản. Hãy xây dựng dự án theo 3 bậc thang:*

| Cấp Độ (Tier) | Tên Dự Án Đề Xuất | Tech Stack Khuyên Dùng | Điểm Nhấn Kiến Trúc Ghi Điểm CV |
| :--- | :--- | :--- | :--- |
| **Tier 1: Nền tảng** | **Interactive Code Snippet Manager** | React, Tailwind, LocalStorage/IndexedDB | Hỗ trợ Syntax Highlighting, Tagging, Full-text Search offline không cần backend. |
| **Tier 2: Thực chiến** | **E-Commerce API with Real-time Inventory** | Java Spring Boot 3, Redis, PostgreSQL, PayOS/Stripe | Triển khai Caching, JWT Cookie HttpOnly, Chống Race Condition khi trừ hàng tồn kho. |
| **Tier 3: Enterprise** | **Distributed Event-Driven Task Queue** | Go / Node.js, Redis Streams, Kafka, Docker | Hệ thống hàng đợi bất đồng bộ có Worker Pool, xử lý Retry Policy, Dead-Letter Queue (DLQ). |
| **Tier 3: AI-Powered** | **Autonomous Agentic Doc Reviewer** | Python FastAPI, LangGraph, Qdrant Vector DB | Trợ lý phân tích văn bản pháp lý / kỹ thuật đa luồng với Hybrid Search và Guardrails. |

---

## PHẦN 4: SYSTEM DESIGN BASICS DÀNH CHO JUNIOR / MID-LEVEL

Khi nhà tuyển dụng hỏi: *"Hệ thống của em làm thế nào để chịu được 100.000 người dùng?"*, Decode Leox cung cấp bản đồ 6 khối trụ cột:

1. **Horizontal vs Vertical Scaling:**
   - *Scale Up (Vertical):* Tăng RAM, CPU máy chủ -> Bị giới hạn vật lý và chi phí tăng theo hàm mũ.
   - *Scale Out (Horizontal):* Bổ sung nhiều máy chủ nhỏ phía sau Load Balancer -> Chuẩn kiến trúc điện toán đám mây hiện đại.
2. **Load Balancer (Nginx / HAProxy / AWS ALB):**
   - Các thuật toán phân phối: Round Robin, Least Connections, IP Hash (đảm bảo Session Sticky).
3. **Caching Layer (Redis / Memcached):**
   - Đặt Redis trước DB để giảm 90% tải đọc.
   - Chiến lược: Cache-Aside, Write-Through, Write-Behind.
4. **Database Sharding & Replication:**
   - *Master-Slave (Read/Write Splitting):* Ghi vào Master, đọc từ nhiều Slave để cân bằng tải.
   - *Horizontal Sharding:* Chia bảng User thành nhiều DB dựa trên Hash của `user_id`.
5. **Message Queues (Kafka / RabbitMQ):**
   - Phân tách luồng xử lý đồng bộ và bất đồng bộ (ví dụ: Đặt hàng thành công thì trả về ngay 200 OK, việc gửi email và tính điểm thưởng được đẩy vào hàng đợi xử lý sau).
6. **CAP Theorem:**
   - Trong một hệ thống phân tán khi có sự cố mạng (Partition Tolerance - P), ta chỉ có thể chọn:
     - **Consistency (Tính nhất quán - C):** Mọi node đều thấy cùng một dữ liệu (ví dụ: tài khoản ngân hàng).
     - HOẶC **Availability (Tính khả dụng - A):** Mọi request đều nhận được phản hồi dù dữ liệu có thể trễ vài giây (ví dụ: lượt like Facebook, xem video TikTok).

---

## PHẦN 5: BÍ KÍP VƯỢT QUA VÒNG PHỎNG VẤN VÀ GỬI COLD EMAIL

### 1. Template Cold Email Xin Việc / Thực Tập Có Tỷ Lệ Mở 75%
```text
Tiêu đề: [Vị trí ứng tuyển] - Đơn ứng tuyển từ [Họ tên] - Đã có dự án giải quyết bài toán [Vấn đề công ty đang gặp]

Kính gửi [Tên Tech Lead / Hiring Manager],

Em theo dõi sản phẩm [Tên sản phẩm của công ty] và rất ấn tượng với cách team xử lý bài toán [Một tính năng kỹ thuật].

Là một kỹ sư định hướng [Chuyên môn: ví dụ Backend Java/React], em vừa hoàn thiện dự án [Tên dự án] giải quyết bài toán [Bài toán kỹ thuật: ví dụ tối ưu hóa truy vấn giảm 80% latency và xử lý concurrency bằng Redis Lock].

Em gửi anh/chị xem qua:
- GitHub Repo (đầy đủ Git Flow & Architecture Diagram): [Link]
- Live Demo / Swagger API Docs: [Link]
- CV 1 trang chuẩn ATS của em: [Link]

Em rất mong có cơ hội được trao đổi ngắn 10 phút để lắng nghe thêm về các thách thức kỹ thuật mà team đang giải quyết.

Trân trọng,  
[Họ và tên] | [Số điện thoại] | [LinkedIn]
```

### 2. 5 Quy Tắc Vàng Khi Làm Coding Challenge
1. **Đừng vội code ngay:** Dành 3-5 phút đầu tiên hỏi lại phỏng vấn viên về các ràng buộc đầu vào (Input size, có số âm không, có mảng rỗng không).
2. **Nói to suy nghĩ (Think Out Loud):** Người phỏng vấn chấm điểm quá trình tư duy, không chỉ chấm kết quả code cuối cùng.
3. **Bắt đầu bằng Brute Force:** Trình bày thuật toán thô $O(n^2)$ trước để đảm bảo có giải pháp chạy được, sau đó mới đề xuất dùng Hash Map / Two Pointers để tối ưu về $O(n)$.
4. **Viết mã sạch:** Đặt tên biến có nghĩa, tách hàm rõ ràng, không viết code dồn cục.
5. **Tự chạy Dry-Run với Test Case:** Vẽ bảng biến ra nháp và chạy thử từng bước trước khi tuyên bố với phỏng vấn viên: *"Em đã hoàn thành"*.

---
*Biên tập và tích hợp vào hệ thống tài liệu bởi Triều Hí & The Elite Fleet.*
