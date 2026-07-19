/* ==========================================
   LOGIKA VALIDASI & INTERAKSI FORMULIR
   ========================================== */

// 1. Inisialisasi Semua Elemen Input dari HTML
const form = document.getElementById('masterForm');
const username = document.getElementById('username');
const birthdate = document.getElementById('birthdate');
const weton = document.getElementById('weton');
const screenshot = document.getElementById('screenshot');
const clientEmail = document.getElementById('clientEmail');
const submitBtn = document.getElementById('submitBtn');

// 2. Inisialisasi Elemen UI Indikator (Centang & Info)
const uploadLabel = document.getElementById('uploadLabel');
const checkScreenshot = document.getElementById('checkScreenshot');
const checkEmail = document.getElementById('checkEmail');
const infoSuccess = document.getElementById('infoSuccess');

/**
 * Fungsi Utama untuk Memeriksa Validitas Formulir secara Real-time
 */
function checkFormValidity() {
    // Validasi file screenshot (harus ada file yang diunggah)
    let isScreenshotValid = screenshot.files.length > 0;
    
    // Validasi email sederhana (harus mengandung karakter '@' dan '.')
    let isEmailValid = clientEmail.value.includes('@') && clientEmail.value.includes('.');
    
    // Validasi input teks biasa (tidak boleh kosong)
    let isTextInputsValid = username.value.trim() !== "" && birthdate.value !== "" && weton.value !== "";

    // Atur Tampilan Indikator Centang Hijau Bukti Bayar
    if (isScreenshotValid) {
        checkScreenshot.classList.remove('opacity-0');
        uploadLabel.innerText = "File Berhasil Dipilih";
    } else {
        checkScreenshot.classList.add('opacity-0');
        uploadLabel.innerText = "Pilih File Screenshot";
    }

    // Atur Tampilan Indikator Centang Hijau Email Client
    if (isEmailValid) {
        checkEmail.classList.remove('opacity-0');
    } else {
        checkEmail.classList.add('opacity-0');
    }

    // Aktifkan atau Matikan Tombol Submit Berdasarkan Validasi Seluruh Form
    if (isScreenshotValid && isEmailValid && isTextInputsValid) {
        // Jika SEMUA informasi valid, buka kunci tombol
        submitBtn.removeAttribute('disabled');
        submitBtn.classList.remove('bg-gray-400', 'cursor-not-allowed');
        // Berikan warna gradasi amber emas modern khas tema spiritual
        submitBtn.classList.add('bg-gradient-to-r', 'from-amber-500', 'to-amber-600', 'hover:from-amber-600', 'hover:to-amber-700', 'cursor-pointer');
    } else {
        // Jika ada satu saja yang belum diisi, kunci kembali tombolnya
        submitBtn.setAttribute('disabled', 'true');
        submitBtn.classList.add('bg-gray-400', 'cursor-not-allowed');
        submitBtn.classList.remove('bg-gradient-to-r', 'from-amber-500', 'to-amber-600', 'hover:from-amber-600', 'hover:to-amber-700', 'cursor-pointer');
    }
}

// 3. Pasang Event Listener untuk Memantau Setiap Perubahan Input Pengunjung
username.addEventListener('input', checkFormValidity);
birthdate.addEventListener('input', checkFormValidity);
weton.addEventListener('change', checkFormValidity);
clientEmail.addEventListener('input', checkFormValidity);
screenshot.addEventListener('change', checkFormValidity);

/**
 * Menangani Event saat Formulir Dikirim (Submit)
 */
form.addEventListener('submit', function(e) {
    // Catatan: Jangan gunakan e.preventDefault() secara permanen agar Web3Forms bisa memproses pengiriman data ke email Anda.
    
    // Memunculkan kotak informasi sukses dan instruksi proses data di bagian bawah form
    infoSuccess.classList.remove('hidden');
    
    // Geser layar secara mulus ke arah kotak informasi sukses agar terbaca jelas oleh user
    infoSuccess.scrollIntoView({ behavior: 'smooth' });
});
