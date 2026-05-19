// ==============================================================
// LƯU FILE NÀY THÀNH: js/app.js
// VÀ GỌI VÀO TRONG HTML BẰNG: <script src="js/app.js"></script>
// ==============================================================

// CẤU HÌNH API
const GAS_API_URL = "https://script.google.com/macros/s/AKfycby0JheJzMmaKYFUSX3Yy8vEiMYb_cyTkyLTqBOSHC-oI9L2BNrlbygRoSow5XmGIc1M0g/exec"; 

// UI Elements
const inputSerial = document.getElementById('serialInput');
const btnSearch = document.getElementById('btnSearch');
const btnScan = document.getElementById('btnScan');
const correctionNote = document.getElementById('correctionNote');

const statusArea = document.getElementById('statusArea');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');

const resultArea = document.getElementById('resultArea');
const fraudWarning = document.getElementById('fraudWarning');
const fraudText = document.getElementById('fraudText');

let html5QrCode;

// Auto Correct Serial
function sanitizeSerial(serial) {
    let original = serial.toUpperCase().trim();
    let corrected = original.replace(/0/g, 'O').replace(/1/g, 'I').replace(/8/g, 'B');
    
    if (original !== corrected) {
        correctionNote.classList.remove('hidden');
    } else {
        correctionNote.classList.add('hidden');
    }
    return corrected;
}

// Lấy GPS
function getGPSLocation() {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            resolve("No GPS Support");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => resolve(`${position.coords.latitude},${position.coords.longitude}`),
            (error) => resolve("Denied/Failed"),
            { timeout: 3000 }
        );
    });
}

function resetUI() {
    statusArea.classList.add('hidden');
    resultArea.classList.add('hidden');
    inputSerial.value = '';
    inputSerial.focus();
}

// Main logic tra cứu
async function handleSearch(rawSerial) {
    if (!rawSerial) return;
    
    const serial = sanitizeSerial(rawSerial);
    inputSerial.value = serial; 
    
    if (html5QrCode && html5QrCode.isScanning) {
        stopScanner();
    }

    // Show Loading
    resultArea.classList.add('hidden');
    errorMessage.classList.add('hidden');
    statusArea.classList.remove('hidden');
    loadingSpinner.classList.remove('hidden');
    loadingSpinner.classList.add('flex');

    try {
        const gps = await getGPSLocation();
        const device = navigator.userAgent;

        const queryParams = new URLSearchParams({ serial: serial, gps: gps, device: device });
        
        // NẾU CHƯA CÓ LINK API, HIỂN THỊ DỮ LIỆU MẪU ĐỂ TEST BẢNG
        if (GAS_API_URL === "YOUR_WEB_APP_URL_HERE") {
            setTimeout(() => renderDummyData(serial), 1000);
            return;
        }

        const response = await fetch(`${GAS_API_URL}?${queryParams.toString()}`);
        const resData = await response.json();

        if (resData.status === "success") {
            renderResult(resData.data, resData.cảnh_báo);
        } else {
            showError(resData.message || "Không tìm thấy thông tin sản phẩm.");
        }

    } catch (error) {
        showError("Lỗi kết nối đến máy chủ. Vui lòng thử lại sau.");
        console.error(error);
    }
}

// Render dữ liệu lên UI
function renderResult(data, canhBaoMsg) {
    loadingSpinner.classList.add('hidden');
    loadingSpinner.classList.remove('flex');
    statusArea.classList.add('hidden');
    resultArea.classList.remove('hidden');

    // 1. Cảnh báo gian lận
    if (canhBaoMsg && canhBaoMsg.trim() !== "") {
        fraudWarning.classList.remove('hidden');
        fraudText.innerText = canhBaoMsg;
    } else {
        fraudWarning.classList.add('hidden');
    }

    // 2. Binding Bảng Thông số
    document.getElementById('resTenSP').innerText = data.TenSanPham || "N/A";
    document.getElementById('resLogo').innerText = data.Logo || "HEM EMM";
    document.getElementById('resCongSuat').innerText = data.CongSuat || "-";
    document.getElementById('resTocDo').innerText = data.TocDo || "-";
    document.getElementById('resDienAp').innerText = data.DienAp || "-";
    document.getElementById('resKieuLap').innerText = data.KieuLapDat || "-";

    // 3. Binding Hồ sơ bảo hành
    document.getElementById('resSerial').innerText = data.Serial || "-";
    document.getElementById('resNgaySX').innerText = data.NgaySanXuat || "-";
    document.getElementById('resNgayKH').innerText = data.NgayKichHoat || "-";
    document.getElementById('resThoiHan').innerText = data.ThoiHanBaoHanh || "-";
    document.getElementById('resNgayHetHan').innerText = data.NgayHetHan || "-";
    document.getElementById('resDaiLy').innerText = data.DaiLyPhanPhoi || "-";

    // Logic Badge Trạng thái
    const badge = document.getElementById('badgeStatus');
    const status = data.TrangThaiBaoHanh ? data.TrangThaiBaoHanh.toLowerCase() : "";
    
    if (status.includes("hết hạn")) {
        badge.className = "px-3 py-1 text-sm font-bold rounded-full bg-red-100 text-red-700 border border-red-200";
        badge.innerHTML = '<i class="fas fa-times-circle mr-1"></i> Hết Hạn';
    } else if (status.includes("từ chối")) {
        badge.className = "px-3 py-1 text-sm font-bold rounded-full bg-gray-200 text-gray-700 border border-gray-300";
        badge.innerHTML = '<i class="fas fa-ban mr-1"></i> Từ chối BH';
    } else {
        badge.className = "px-3 py-1 text-sm font-bold rounded-full bg-green-100 text-green-700 border border-green-200";
        badge.innerHTML = '<i class="fas fa-check-circle mr-1"></i> Hợp lệ';
    }
}

function showError(msg) {
    loadingSpinner.classList.add('hidden');
    loadingSpinner.classList.remove('flex');
    errorMessage.classList.remove('hidden');
    errorMessage.classList.add('flex');
    errorText.innerText = msg;
}

// TÍNH NĂNG QUÉT QR CODE
const qrContainer = document.getElementById('qr-reader');
const btnCloseScanner = document.getElementById('btnCloseScanner');

function startScanner() {
    qrContainer.style.display = "block";
    btnCloseScanner.classList.remove('hidden');
    btnCloseScanner.classList.add('flex');
    
    html5QrCode = new Html5Qrcode("qr-reader");
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    
    html5QrCode.start({ facingMode: "environment" }, config, 
        (decodedText) => {
            stopScanner();
            inputSerial.value = decodedText;
            handleSearch(decodedText);
        },
        (errorMessage) => {}
    ).catch((err) => {
        alert("Không thể truy cập Camera. Vui lòng cấp quyền trong trình duyệt.");
        stopScanner();
    });
}

function stopScanner() {
    if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().then(() => {
            qrContainer.style.display = "none";
            btnCloseScanner.classList.add('hidden');
            btnCloseScanner.classList.remove('flex');
        });
    }
}

// EVENT LISTENERS
btnSearch.addEventListener('click', () => handleSearch(inputSerial.value));
inputSerial.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch(inputSerial.value);
});
btnScan.addEventListener('click', () => {
    if (qrContainer.style.display === "block") stopScanner();
    else startScanner();
});
btnCloseScanner.addEventListener('click', stopScanner);

// DATA MẪU TEST GIAO DIỆN MỚI
function renderDummyData(serial) {
    renderResult({
        Serial: serial,
        TenSanPham: "ĐỘNG CƠ ĐIỆN 1 PHA \n0.3 KW 1500 VÒNG/PHÚT",
        LoaiDongCo: "1 Pha",
        CongSuat: "0.3 kW",
        TocDo: "1500 vòng/phút",
        DienAp: "220",
        KieuLapDat: "Chân đế",
        Logo: "HEM EMM",
        NgaySanXuat: "15/05/2026",
        NgayKichHoat: "20/05/2026",
        ThoiHanBaoHanh: "12 Tháng",
        NgayHetHan: "20/05/2027",
        TrangThaiBaoHanh: "Hợp lệ",
        DaiLyPhanPhoi: "Đại lý HEM Cấp 1"
    }, ""); 
}