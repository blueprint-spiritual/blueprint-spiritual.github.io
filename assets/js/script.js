/* ==========================================
   LOGIKA VALIDASI BERTAHAP (STEP-BY-STEP FORM)
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

// ALUR 1: Ketika user klik tombol bayar DANA, buka Step 2
payDanaBtn.addEventListener('click', function() {
    // Beri sedikit jeda agar tab baru DANA terbuka dulu, baru form bawah muncul di tab lama
    setTimeout(() => {
        step2Container.style.display = 'block';
        step2Container.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
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
        submitBtn.style.backgroundColor = "#d97706"; // Warna Emas Erat/Amber
        submitBtn.style.cursor = "pointer";
    } else {
        submitBtn.setAttribute('disabled', 'true');
        submitBtn.style.backgroundColor = "#9ca3af"; // Warna Abu-abu jika dikunci
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
    // Memunculkan kotak informasi sukses di paling bawah
    infoSuccess.style.display = "block";
    infoSuccess.scrollIntoView({ behavior: 'smooth' });
});
   
