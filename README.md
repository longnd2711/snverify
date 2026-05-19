# snverify

📋 KẾ HOẠCH DỰ ÁN: HỆ THỐNG TRA CỨU BẢO HÀNH ĐIỆN TỬ HEM EMM

Kiến trúc hệ thống:

Database: Google Sheets (Serverless, Miễn phí, Quản lý trực quan)

Backend API: Google Apps Script (Tối ưu TextFinder, CacheService)

Frontend (UI): HTML/JS + Tailwind CSS (Host trên GitHub Pages)

Tính năng nổi bật: Thuật toán Serial Base32, Checksum tự sửa lỗi, GPS tracking, Chống scan spam/gian lận, Mô phỏng nhãn in thực tế.

🟢 GIAI ĐOẠN 1: BÁO CÁO BAN ĐIỀU HÀNH (ĐÃ HOÀN THÀNH)

Mục tiêu: Thuyết phục Ban lãnh đạo về cấu trúc mã Serial và định hướng công nghệ.

[x] Đề xuất cấu trúc mã: [3 ký tự Kiểu máy] + [2 ký tự Năm/Tháng] + [3 ký tự STT mã hóa] + [1 Checksum].

[x] Xây dựng bản Presentation HTML (6 slides) trình bày chuyên nghiệp về Tiện ích, Bảo mật và Khả năng phát triển.

🟢 GIAI ĐOẠN 2: THIẾT LẬP DATABASE (ĐÃ HOÀN THÀNH)

Mục tiêu: Xây dựng cấu trúc lưu trữ dữ liệu tiêu chuẩn và nhật ký hoạt động.

[x] Tạo file Google Sheets.

[x] Viết script Setup.gs tự động khởi tạo bảng.

[x] Sheet 1: Data (20 cột) - Lưu thông tin tĩnh của động cơ (Serial, Công suất, Ngày xuất xưởng...) và biến đếm SoLanQuet.

[x] Sheet 2: ScanHistory (6 cột) - Bảng nhật ký âm thầm ghi lại mọi hành vi quét mã (Thời gian, Tọa độ GPS, Thiết bị...).

🟢 GIAI ĐOẠN 3: XÂY DỰNG BACKEND & API (ĐÃ HOÀN THÀNH)

Mục tiêu: Tạo cầu nối (API) để Frontend có thể đọc/ghi dữ liệu vào Google Sheets an toàn và siêu tốc.

[x] Viết file Code.gs xử lý logic.

[x] Hàm doGet (Tra cứu): Dùng TextFinder để tìm Serial nhanh chóng trong 200.000 dòng. Cập nhật SoLanQuet và ghi log vào ScanHistory. Áp dụng Cache 10 phút.

[x] Hàm doPost (Import): Cấu hình setValues để cho phép Admin chèn hàng loạt (Batch Insert) dữ liệu từ Excel vào Sheet nhanh chóng.

🟡 GIAI ĐOẠN 4: XÂY DỰNG FRONTEND (ĐANG THỰC HIỆN)

Mục tiêu: Lập trình giao diện tương tác cho Khách hàng và Quản trị viên.

[x] Trang Admin (admin.html): Giao diện upload file, tích hợp thư viện SheetJS đọc file Excel ngay trên trình duyệt, thanh tiến trình import dữ liệu, có lớp bảo mật mật khẩu cơ bản.

[x] Trang Khách hàng (Tính năng nền tảng): Giao diện Mobile-first, tích hợp quét QR Code bằng Camera, tự sửa lỗi nhập liệu (0->O), xin quyền GPS, gọi API.

[ ] Trang Khách hàng (Tính năng nâng cao - Đang cập nhật): Bổ sung chức năng Vẽ lại nhãn in (Nameplate) kim loại trực quan trên màn hình. Điền động các thông số (kW, Vòng/phút, Vôn...) trả về từ Server lên đúng các ô trên tem để khách hàng đối chiếu vật lý.

📍 CHÚNG TA ĐANG Ở ĐÂY: GIAI ĐOẠN 4 - HOÀN THIỆN TÍNH NĂNG NHÃN IN FRONTEND

Thay vì chỉ hiển thị bảng thông số khô khan, hệ thống sẽ render ra một "Tem Động Cơ" chân thực.

⏳ Các bước tiếp theo cần thực hiện:

Bước 4.1: Cập nhật file index.html

Viết thêm mã CSS/HTML5 mô phỏng thiết kế tem nhôm đặc trưng của Động cơ HEM EMM.

Cập nhật hàm Javascript để binding (đẩy) dữ liệu từ kết quả JSON vào các ô trống trên tem ảo này.

Bước 5.1: Xuất bản Backend (Lấy Link API)

Mở file Google Sheets -> Tiện ích mở rộng -> Apps Script -> Deploy dưới dạng Web App để lấy Link API.

Bước 5.2: Tích hợp API vào Frontend & Triển khai Internet

Gắn Link API vào 2 file HTML.

Đẩy toàn bộ lên GitHub Pages để có đường link truy cập chính thức.

🔮 GIAI ĐOẠN 5: BẢO TRÌ & MỞ RỘNG (TƯƠNG LAI)

[ ] Chỉnh sửa giao diện theo feedback thực tế của người dùng.

[ ] Trỏ tên miền công ty (VD: baohanh.hem.com.vn) về GitHub Pages.

[ ] Mở rộng kết nối API với hệ thống ERP nội bộ của nhà máy.