# snverify

Slide 1
đề xuất cấu trúc sn gồm 9 ký tự

3 lớp bảo mật - 2 lớp tiện ích - 1 lớp đọc hiểu bán công khai

Ví dụ: 4KAC5ABCD tương đương động cơ 4KA, sản xuất tháng 5 năm 2026, động cơ thứ [không thể biết được] được sản xuất trong tháng này

Slide 2
đọc hiểu: 3 ký tự đầu thể hiện kiểu động cơ, 2 ký tự thứ 4,5 thể hiện ngày tháng => có thể thể hiện khoảng thời gian gồm năm, tháng trong hơn 30 năm. ví dụ: quy ước ngầm AA là tháng 1 năm 2026 => A1 là tháng 1 năm 2024, A2 là tháng 2, AA là tháng 10, ... đến năm 2026  Có thể bổ sung ký tự thứ 10 để làm rõ loại động cơ hoặc lô sản xuất.

Slide 3

tiện ích 1: Chống sai sót - tự động sửa lỗi nếu người dùng nhập sai 0 => O, 1 => I, 8 => B, Khi mã QR bị hỏng - mờ xóa, cạo mất hơn 30% => lập tức checksum hoạt động, báo cho người dùng mã đã bị tác động hỏng nặng.
tiện ích 2: Vị trí hàng hóa, Quản lý tồn kho - kích hoạt khi người dùng quét mã ngoài công ty (check qua GPS) - lập tức xác định hàng ở ngoài công ty - xác nhận lại lượng tồn kho, đơn hàng, tình trạng giao hàng. Nếu vị trí là ở Công ty, QC kiểm tra lần cuối và quét mã để kích hoạt => hàng đã sẵn sàng trong kho nào => kinh doanh có thể làm thủ tục xuất hàng

Slide 4:
Bảo mật 1: Thuật toán bảo mật không thể dịch ngược từ serial ra thông tin gốc, chỉ cần thay đổi bất kỳ thứ gì trong đầu vào thì đầu ra sẽ bị thay đổi - nằm ở 3 ký tự gần cuối - thể hiện số lượng động cơ xuất xưởng trong tháng. => tránh đối thủ theo dõi sản lượng, năng lực công ty
Bảo mật 2: Thông báo về việc bảo hành điện tử - anh Toàn ký số, gắn với trang công bố thông tin - tất cả mọi người có thể download về và được pháp luật xác thực. Khi cần thì gỡ bỏ.
Bảo mật 3: Khi người dùng quét mã - cảnh báo nếu mã đã được quét ở nơi khác, đăng ký thông tin khác


Slide 5
cấu trúc serial number hoàn chỉnh:
 - 3 ký tự đầu: kiểu động cơ
 - 2 ký tự tiếp theo: năm tháng
 - 3 ký gần cuối: mã riêng của động cơ. ví dụ: Số 0   --> Mã hóa: JQY, Số 1   --> Mã hóa: Y5G, Số 2   --> Mã hóa: NJA, Số 31999 --> Mã hóa: KGW.
 - ký tự cuối cùng: check sum

Các ký tự được định dạng theo hệ số 32 chuẩn RFC 4648 base32

