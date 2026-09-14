# Hướng dẫn: đưa Katalon DS 2.0 lên Git và biến nó thành Skill của Claude

Tài liệu này đi từ file zip bạn vừa tải về → repo trên GitHub → skill dùng được trong
**Claude Code** và **Claude (claude.ai / Claude Design)**. Làm theo đúng thứ tự; mỗi bước
có mục tiêu rõ ràng và cách kiểm tra là đã xong.

---

# PHẦN A · UPLOAD LÊN GITHUB BẰNG BROWSER

> **Mục tiêu phần A:** có một repo GitHub chứa toàn bộ hệ thống, với `SKILL.md` nằm ở
> **gốc repo**, và một đường link bạn có thể gửi cho bất kỳ ai (hoặc cho agent).

### A1 · Giải nén và kiểm tra cấu trúc

Giải nén `Design System Katalon 2.0.zip`. Mở thư mục ra, bạn phải thấy **đúng** cấu trúc này ở tầng
đầu tiên:

```
Design System Katalon 2.0/
├── SKILL.md          ← BẮT BUỘC ở đây, không nằm trong thư mục con
├── README.md
├── UPLOAD-GUIDE.md   ← file bạn đang đọc
├── styles.css
├── catalog.dc.html
├── support.js
├── .gitignore
├── rules/            (7 file .md — luật bắt buộc)
├── deck/             (deck template + SKILL.md riêng của deck)
├── ds/               (katalon-ds.css — hợp đồng token)
├── tokens/           (fonts.css)
├── knowledge/        (3 file .md)
├── assets/           (logos, brand-svg, pathway, imagery)
└── _ds/              (token file marketing mà catalog load trước)
```

**Kiểm tra là xong:** `SKILL.md` nằm ngang hàng với `README.md`. Nếu nó nằm sâu hơn một
tầng, Claude sẽ không nhận ra đây là một skill.

### A2 · Tạo repo mới trên GitHub

1. Vào **github.com** → đăng nhập.
2. Góc trên phải, bấm **+** → **New repository**.
3. Điền:
   - **Repository name:** `katalon-ds-2.0`
     *(tên repo không dùng dấu cách — URL sẽ bị mã hoá thành `%20`. Tên hiển thị của gói là "Design System Katalon 2.0", tên repo là kebab.)*
   - **Description:** `Katalon Design System 2.0 — tokens, binding rules, 53 components, deck template`
   - **Public** hay **Private**: chọn **Private** nếu đây là tài sản nội bộ. *Lưu ý: repo
     private thì người khác (và Claude Code của người khác) phải được cấp quyền mới đọc được.*
   - **KHÔNG** tick "Add a README file" — bạn đã có README rồi, tick vào sẽ bị trùng.
   - **KHÔNG** tick "Add .gitignore" — đã có sẵn trong package.
4. Bấm **Create repository**.

**Kiểm tra là xong:** bạn thấy trang repo trống với dòng hướng dẫn "Get started by…".

### A3 · Upload file — chia theo lô, không kéo một lần

GitHub web **giới hạn 100 file mỗi lần kéo**. Package này khoảng 190 file, nên phải làm
**nhiều lô**. Đây là bước dễ sai nhất — làm chậm và đúng thứ tự:

**Lô 1 — các file gốc + thư mục nhỏ**

1. Trong repo, bấm **Add file** → **Upload files**.
2. Kéo vào các **file** ở tầng gốc: `SKILL.md`, `README.md`, `UPLOAD-GUIDE.md`,
   `styles.css`, `catalog.dc.html`, `support.js`, `.gitignore`.
3. Kéo tiếp các **thư mục**: `rules/`, `tokens/`, `knowledge/`, `ds/`, `_ds/`.
4. Ô **Commit changes** ở dưới, gõ: `Add DS 2.0 core: skill, rules, tokens`
5. Bấm **Commit changes**.

**Lô 2 — deck**

1. **Add file** → **Upload files**.
2. Kéo thư mục `deck/` vào.
3. Commit message: `Add deck template 2.0 (40 slides, 6 layout kinds)`
4. **Commit changes**.

**Lô 3 — assets, chia nhỏ tiếp**

`assets/` có hơn 100 file nên phải chia. Làm **ba lần upload riêng**, mỗi lần một thư mục con:

| Lần | Kéo vào | Commit message |
|---|---|---|
| 3a | `assets/logos/` | `Add logo assets` |
| 3b | `assets/brand-svg/` + `assets/pathway/` | `Add brand marks and pathway assets` |
| 3c | `assets/imagery/` + các file `.svg` lẻ trong `assets/` | `Add imagery and diagram assets` |

> **Quan trọng về đường dẫn:** khi bạn kéo thư mục `assets/logos/`, GitHub giữ nguyên
> đường dẫn `assets/logos/…`. Đừng đổi tên hay gộp thư mục — catalog và deck tham chiếu
> đúng các đường dẫn này, đổi là hỏng ảnh.

**Kiểm tra là xong:** ở trang chính của repo, bạn thấy đủ 8 thư mục
(`_ds`, `assets`, `deck`, `ds`, `knowledge`, `rules`, `tokens`) và
`SKILL.md`, `README.md`, `catalog.dc.html`, `styles.css`, `support.js`.
README sẽ tự hiển thị ở dưới danh sách file.

### A4 · Lấy link

Link repo của bạn có dạng:

```
https://github.com/<tên-user-của-bạn>/katalon-ds-2.0
```

Copy từ thanh địa chỉ. Đây là link bạn đưa cho tôi (hoặc cho bất kỳ agent nào) để đọc
trực tiếp hệ thống.

### A5 · (Tuỳ chọn) Xem catalog như một trang web

Nếu muốn mở catalog bằng URL thay vì tải về:

1. Repo → **Settings** → **Pages** (menu bên trái).
2. **Source:** chọn **Deploy from a branch**.
3. **Branch:** `main`, folder `/ (root)` → **Save**.
4. Chờ 1–2 phút, GitHub cho bạn link dạng
   `https://<user>.github.io/katalon-ds-2.0/catalog.dc.html`

*Chỉ làm được với repo **Public**. Repo private thì không có Pages ở gói miễn phí.*

---

# PHẦN B · TẠO SKILL CHO CLAUDE CODE

> **Mục tiêu phần B:** Claude Code trên máy bạn tự động áp dụng DS 2.0 — kể cả deck —
> mà bạn không phải nhắc lại luật trong từng câu chat.

Claude Code đọc skill **trực tiếp từ thư mục trên máy**, không cần upload, không cần zip.
Một skill = một thư mục có file `SKILL.md` bên trong.

### B1 · Chọn phạm vi: cá nhân hay theo project

| Phạm vi | Đặt ở đâu | Khi nào dùng |
|---|---|---|
| **Cá nhân** — mọi project trên máy bạn | `~/.claude/skills/katalon-ds-2-0/` | Bạn là người duy nhất dùng, muốn luôn có sẵn |
| **Theo project** — commit chung với team | `<project>/.claude/skills/katalon-ds-2-0/` | Cả team dùng chung, skill đi kèm code |

### B2 · Cài bằng cách clone repo (khuyến nghị)

Mở Terminal và chạy:

**Cách cá nhân:**
```bash
mkdir -p ~/.claude/skills
git clone https://github.com/<user>/katalon-ds-2.0.git ~/.claude/skills/katalon-ds-2-0
```

**Cách theo project:**
```bash
cd <thư-mục-project-của-bạn>
mkdir -p .claude/skills
git clone https://github.com/<user>/katalon-ds-2.0.git .claude/skills/katalon-ds-2-0
```

Ưu điểm của clone: khi DS có bản mới, bạn chỉ cần `cd` vào thư mục đó và `git pull` —
skill tự cập nhật, không phải cài lại.

### B3 · Cách không dùng lệnh

Nếu bạn không muốn dùng Terminal:

1. Trên trang repo GitHub, bấm nút xanh **Code** → **Download ZIP**.
2. Giải nén.
3. Đổi tên thư mục thành `katalon-ds-2-0` (bỏ đuôi `-main` mà GitHub tự thêm).
4. Copy thư mục đó vào `.claude/skills/` trong project, hoặc vào `~/.claude/skills/`.
   - macOS: trong Finder bấm **Cmd+Shift+G**, gõ `~/.claude/skills`
   - Windows: mở Explorer, gõ `%USERPROFILE%\.claude\skills`

### B4 · Kiểm tra Claude Code đã thấy skill

1. Mở Claude Code trong project.
2. Gõ `/` — bạn sẽ thấy `katalon-ds-2-0` trong danh sách skill.
3. Thử một câu **không** nhắc tên skill, ví dụ:
   > *"Làm cho tôi một pricing page cho Katalon"*

   Claude phải tự gọi skill, dùng Forest green `#0f8461`, và **không** tự bịa màu mới.
4. Thử tiếp một câu về deck:
   > *"Làm deck QBR Q3 cho team QA, 12 slide"*

   Claude phải mở `deck/DECK-RULES.md` và dựng từ `deck/KatalonDeck.dc.html` —
   **không** tự thiết kế slide từ đầu.

**Nếu Claude không tự gọi skill:** kiểm tra `SKILL.md` có nằm đúng ở
`.claude/skills/katalon-ds-2-0/SKILL.md` (không lồng thêm một tầng thư mục nữa) và
phần `---` frontmatter ở đầu file còn nguyên.

---

# PHẦN C · TẠO SKILL CHO CLAUDE (claude.ai / Claude Design)

> **Mục tiêu phần C:** cùng bộ luật đó có hiệu lực khi bạn chat và thiết kế trên web,
> không chỉ trong Claude Code.

Ở đây Claude nhận skill dưới dạng **file .zip upload**, không đọc từ Git. Skill trên
claude.ai và skill trong Claude Code là **hai nơi riêng biệt, không tự đồng bộ** — bạn
phải làm cả hai phần B và C.

### C1 · Bật Code execution trước

1. claude.ai → avatar/tên bạn ở góc dưới trái → **Settings**.
2. Vào **Capabilities** (hoặc **Features**).
3. Bật **Code execution** (và **File creation** nếu có).

**Skill sẽ không chạy nếu chưa bật cái này.** Cần gói Pro, Max, Team hoặc Enterprise.

### C2 · Chuẩn bị file zip đúng cấu trúc

Zip phải chứa **một thư mục**, và `SKILL.md` nằm **ngay trong thư mục đó**:

```
Design System Katalon 2.0.zip
└── Design System Katalon 2.0/
    ├── SKILL.md      ← đúng vị trí
    ├── rules/
    ├── deck/
    └── …
```

Cách tạo:
- **macOS:** click phải thư mục `Design System Katalon 2.0` → **Compress "katalon-ds-2.0"**
- **Windows:** click phải → **Send to** → **Compressed (zipped) folder**

> **Đừng** vào trong thư mục rồi bôi đen hết file và nén — như vậy `SKILL.md` sẽ nằm ở
> gốc zip mà không có thư mục bọc, và Claude sẽ không nhận.
>
> **Nếu zip quá nặng:** xoá `assets/imagery/` (ảnh mẫu, chỉ để tham chiếu kích thước) và
> `_ds/` trước khi nén. Skill vẫn đủ luật để làm việc; catalog thì nên xem từ Git.

### C3 · Upload

1. claude.ai → **Settings** → **Capabilities** → **Upload skill**
   *(ở một số phiên bản: **Customize** ở góc dưới trái → **Skills** → nút **+** →
   **Upload a skill**)*
2. Chọn file `Design System Katalon 2.0.zip`.
3. Chờ upload xong — bạn sẽ thấy `katalon-ds-2-0` xuất hiện trong danh sách Skills.
4. **Bật công tắc** của skill đó lên.

### C4 · Kiểm tra

Mở một chat mới và thử **không** nhắc tên skill:

- > *"Thiết kế banner CTA cuối trang cho Katalon"*
  → phải ra Forest green, phẳng (không shadow), và **chỉ** thêm pathway nếu bạn yêu cầu.
- > *"Tạo deck all-hands 15 slide"*
  → phải dựng từ deck template, 1920×1080, pathway khoá theo bảng.
- > *"Dùng màu tím cho nút chính"*
  → Claude phải **hỏi lại** hoặc từ chối, vì luật 01/02 cấm tự đổi màu action.

Câu thử thứ ba là câu quan trọng nhất: nó xác nhận phần **Rule authority** đang có hiệu lực.

---

# PHẦN D · DECK HOẠT ĐỘNG NHƯ THẾ NÀO TRONG CẢ HAI SKILL

> **Mục tiêu phần D:** hiểu vì sao bạn không cần tạo skill riêng cho deck.

Deck **đã nằm trong** skill này, ở hai tầng:

1. **Tầng nhận diện** — dòng `description` trong `SKILL.md` ở gốc liệt kê thẳng các từ
   khoá deck: *slide deck, presentation, all-hands, QBR, product review, board review,
   kickoff, readout, post-mortem, "put this into Katalon slides"*. Đó là thứ khiến Claude
   **tự gọi** skill khi bạn nói về deck, không cần bạn ra lệnh.
2. **Tầng thi hành** — `SKILL.md` §9 ra chỉ thị: *nếu người dùng cần deck thì không tự
   thiết kế deck, mở `deck/DECK-RULES.md` và dựng từ template*. File `deck/DECK-RULES.md` mới là nơi
   chứa hợp đồng chi tiết: 10 luật cứng, bảng theme sáng/tối, **bảng pathway khoá theo từng
   slide**, luật về ảnh và chart do người dùng cung cấp, và checklist trước khi giao.

Nên luồng thực tế sẽ là:

```
Bạn: "Làm deck QBR cho team QA"
  → Claude gọi skill katalon-ds-2-0 (nhờ từ khoá "deck", "QBR")
  → đọc SKILL.md §9 → mở deck/DECK-RULES.md
  → copy deck/KatalonDeck.dc.html, xoá slide không dùng, thay nội dung
  → giữ nguyên pathway, foot rule, canvas 1920×1080
  → xuất PPTX/PDF từ deck/KatalonDeck Export.dc.html
```

**Điều Claude không được tự quyết trong deck:** canvas · 6 layout kind · giá trị pathway
từng slide · foot rule 6px · màu nền (chỉ dùng ramp neutral; **Forest Green 600 không bao
giờ là màu nền**) · chữ tối thiểu 24px. Chỉ `theme`, `footerNote`, `showSlideNumbers` là
được đổi.

---

# PHẦN E · CẬP NHẬT VỀ SAU

| Bạn sửa gì | Làm gì |
|---|---|
| Sửa một luật trong DS | Sửa `rules/*.md` **trước**, rồi commit lên GitHub, rồi mới áp dụng vào thiết kế (đúng thứ tự trong Rule authority) |
| Đồng bộ Claude Code | `cd ~/.claude/skills/katalon-ds-2-0 && git pull` |
| Đồng bộ claude.ai | Tải ZIP mới → Settings → Capabilities → xoá skill cũ → upload lại |
| Thêm component / trang vào catalog | Cập nhật `catalog.dc.html`, rồi cập nhật số lượng trong `README.md` và `SKILL.md` cho khớp |

**Một nguyên tắc xuyên suốt:** luật nằm ở **một chỗ duy nhất** (`rules/`). Đừng chép luật
sang nơi khác cho tiện — bản chép sẽ lệch ngay lần sửa đầu tiên, và đó chính là điều luật
04 cấm.
