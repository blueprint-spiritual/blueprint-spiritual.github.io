/* ==========================================
   LOGIKA VALIDASI BERTAHAP (MOBILE ACCURATE)
   ========================================== */

const form = document.getElementById('masterForm');
const payDanaBtn = document.getElementById('payDanaBtn');
const step2Container = document.getElementById('step2');

// Elemen Input Step 2
const username = document.getElementById('username');
const birthdate = document.getElementById('birthdate');
const weton = document.getElementById('weton');
const screenshot = document.getElementById('screenshot');
const clientEmail = document.getElementById('clientEmail');
const submitBtn = document.getElementById('submitBtn');

// Elemen UI Indikator
const uploadLabel = document.getElementById('uploadLabel');
const checkScreenshot = document.getElementById('checkScreenshot');
const checkEmail = document.getElementById('checkEmail');
const infoSuccess = document.getElementById('infoSuccess');

// MASUKKAN LINK PENDEK DANA ABANG DI SINI
const LINK_PEMBAYARAN_DANA = "https://rb.gy/d8a9zf"; 

// ALUR 1: Menggunakan window.open agar tombol dipaksa responsif di browser HP
payDanaBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Buka aplikasi DANA / link transfer di tab baru secara paksa
    window.open(LINK_PEMBAYARAN_DANA, '_blank');
    
    // LANGSUNG munculkan form tahap dua tanpa delay agar tidak gagal sensor
    step2Container.style.display = 'block';
    
    // Geser layar ke form baru secara halus
    setTimeout(() => {
        step2Container.scrollIntoView({ behavior: 'smooth' });
    }, 300);
});

// ALUR 2: Fungsi validasi input di Step 2 untuk membuka gembok tombol submit
function checkFormValidity() {
    let isScreenshotValid = screenshot.files.length > 0;
    let isEmailValid = clientEmail.value.includes('@') && clientEmail.value.includes('.');
    let isIdentityValid = username.value.trim() !== "" && birthdate.value !== "" && weton.value !== "";

    // Kontrol Tampilan Centang Bukti Bayar
    if (isScreenshotValid) {
        checkScreenshot.style.display = "inline-block";
        uploadLabel.innerText = "File Berhasil Dipilih";
    } else {
        checkScreenshot.style.display = "none";
        uploadLabel.innerText = "Pilih File Screenshot";
    }

    // Kontrol Tampilan Centang Email
    if (isEmailValid) {
        checkEmail.style.display = "inline-block";
    } else {
        checkEmail.style.display = "none";
    }

    // Buka kunci tombol Analisis jika seluruh syarat terpenuhi
    if (isScreenshotValid && isEmailValid && isIdentityValid) {
        submitBtn.removeAttribute('disabled');
        submitBtn.style.backgroundColor = "#d97706"; // Warna Emas
        submitBtn.style.cursor = "pointer";
    } else {
        submitBtn.setAttribute('disabled', 'true');
        submitBtn.style.backgroundColor = "#9ca3af"; // Warna Abu-abu
        submitBtn.style.cursor = "not-allowed";
    }
}

// Pasang Event Listener pantauan real-time
username.addEventListener('input', checkFormValidity);
birthdate.addEventListener('input', checkFormValidity);
weton.addEventListener('change', checkFormValidity);
clientEmail.addEventListener('input', checkFormValidity);
screenshot.addEventListener('change', checkFormValidity);

// ALUR 3: Ketika Tombol Analisis diklik & Form sukses terkirim
form.addEventListener('submit', function(e) {
    infoSuccess.style.display = "block";
    infoSuccess.scrollIntoView({ behavior: 'smooth' });
});
                                                  
