/* ==========================================
   LOGIKA VALIDASI & INTERAKSI FORMULIR (STABLE)
   ========================================== */

const form = document.getElementById('masterForm');
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

function checkFormValidity() {
    let isScreenshotValid = screenshot.files.length > 0;
    let isEmailValid = clientEmail.value.includes('@') && clientEmail.value.includes('.');
    let isTextInputsValid = username.value.trim() !== "" && birthdate.value !== "" && weton.value !== "";

    // Kontrol Tampilan Centang Bukti Bayar murni pakai JavaScript style
    if (isScreenshotValid) {
        checkScreenshot.style.display = "inline-block";
        uploadLabel.innerText = "File Berhasil Dipilih";
    } else {
        checkScreenshot.style.display = "none";
        uploadLabel.innerText = "Pilih File Screenshot";
    }

    // Kontrol Tampilan Centang Email murni pakai JavaScript style
    if (isEmailValid) {
        checkEmail.style.display = "inline-block";
    } else {
        checkEmail.style.display = "none";
    }

    // Mengaktifkan / Mengunci Tombol Analisis
    if (isScreenshotValid && isEmailValid && isTextInputsValid) {
        submitBtn.removeAttribute('disabled');
        submitBtn.style.backgroundColor = "#d97706"; /* Warna emas/amber */
        submitBtn.style.cursor = "pointer";
    } else {
        submitBtn.setAttribute('disabled', 'true');
        submitBtn.style.backgroundColor = "#9ca3af"; /* Warna abu-abu */
        submitBtn.style.cursor = "not-allowed";
    }
}

// Pasang Event Listener
username.addEventListener('input', checkFormValidity);
birthdate.addEventListener('input', checkFormValidity);
weton.addEventListener('change', checkFormValidity);
clientEmail.addEventListener('input', checkFormValidity);
screenshot.addEventListener('change', checkFormValidity);

// Menampilkan informasi sukses HANYA setelah tombol diklik (Form dikirim)
form.addEventListener('submit', function(e) {
    // Memunculkan kotak info secara paksa dengan JavaScript style
    infoSuccess.style.display = "block";
    infoSuccess.scrollIntoView({ behavior: 'smooth' });
});
       
