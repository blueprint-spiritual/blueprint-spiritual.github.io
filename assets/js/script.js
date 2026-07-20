/* ==========================================
   LOGIKA VALIDASI BERTAHAP (FIX MOBILE ACCURATE)
   ========================================== */

const form = document.getElementById('masterForm');
const payDanaBtn = document.getElementById('payDanaBtn');
const step2Container = document.getElementById('step2');

const username = document.getElementById('username');
const birthdate = document.getElementById('birthdate');
const weton = document.getElementById('weton');
const screenshot = document.getElementById('screenshot');
const clientEmail = document.getElementById('clientEmail');
const submitBtn = document.getElementById('submitBtn');

const uploadLabel = document.getElementById('uploadLabel');
const checkScreenshot = document.getElementById('checkScreenshot');
const checkEmail = document.getElementById('checkEmail');
const infoSuccess = document.getElementById('infoSuccess');

const LINK_PEMBAYARAN_DANA = "https://rb.gy/d8a9zf";

// ALUR 1: Tombol Bayar DANA
payDanaBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.open(LINK_PEMBAYARAN_DANA, '_blank');

    step2Container.style.display = 'block';
    setTimeout(() => {
        step2Container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
});

// ALUR 2: Validasi
function checkFormValidity() {
    const isScreenshotValid = screenshot.files.length > 0;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail.value.trim());
    const isIdentityValid = username.value.trim()!== "" && birthdate.value!== "" && weton.value!== "";

    if (isScreenshotValid) {
        checkScreenshot.style.display = "inline-block";
        uploadLabel.innerText = "✓ " + screenshot.files[0].name;
    } else {
        checkScreenshot.style.display = "none";
        uploadLabel.innerText = "Pilih File Screenshot";
    }

    checkEmail.style.display = isEmailValid? "inline-block" : "none";

    if (isScreenshotValid && isEmailValid && isIdentityValid) {
        submitBtn.disabled = false;
        submitBtn.style.backgroundColor = "#d97706";
        submitBtn.style.cursor = "pointer";
    } else {
        submitBtn.disabled = true;
        submitBtn.style.backgroundColor = "#9ca3af";
        submitBtn.style.cursor = "not-allowed";
    }
}

// Pantau real-time - pakai input + change biar akurat di HP
[username, clientEmail].forEach(el => {
    el.addEventListener('input', checkFormValidity);
});
[birthdate, weton, screenshot].forEach(el => {
    el.addEventListener('change', checkFormValidity);
    el.addEventListener('input', checkFormValidity);
});

// ALUR 3: FIX - Tombol Analisis
form.addEventListener('submit', function(e) {
    e.preventDefault(); // INI KUNCINYA, biar gak reload

    if (submitBtn.disabled) return;

    console.log("Form valid, kirim data...");

    // Tampilkan sukses
    infoSuccess.style.display = "block";
    infoSuccess.scrollIntoView({ behavior: 'smooth' });

    // Di sini nanti kamu masukin logika kirim ke Google Sheet / EmailJS
    // contoh: fetch()...
});
