/* ==========================================
   LOGIKA VALIDASI & KIRIM WEB3FORMS - FIX FINAL
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
    // Buka di tab baru, anti-block
    const win = window.open(LINK_PEMBAYARAN_DANA, '_blank');
    if (!win) {
        window.location.href = LINK_PEMBAYARAN_DANA;
    }

    step2Container.style.display = 'block';
    setTimeout(() => {
        step2Container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
});

// ALUR 2: Validasi Real-time
function checkFormValidity() {
    const isScreenshotValid = screenshot.files.length > 0;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail.value.trim());
    const isIdentityValid = username.value.trim()!== "" && birthdate.value!== "" && weton.value!== "";

    if (isScreenshotValid) {
        checkScreenshot.style.display = "inline-block";
        uploadLabel.innerText = "✓ " + screenshot.files[0].name.substring(0, 20);
    } else {
        checkScreenshot.style.display = "none";
        uploadLabel.innerText = "Pilih File Screenshot";
    }

    checkEmail.style.display = isEmailValid? "inline-block" : "none";

    if (isScreenshotValid && isEmailValid && isIdentityValid) {
        submitBtn.disabled = false;
        submitBtn.style.backgroundColor = "#d97706";
        submitBtn.style.cursor = "pointer";
        submitBtn.innerText = "Kunci Semua Informasi & Analis";
    } else {
        submitBtn.disabled = true;
        submitBtn.style.backgroundColor = "#9ca3af";
        submitBtn.style.cursor = "not-allowed";
    }
}

[username, clientEmail].forEach(el => {
    el.addEventListener('input', checkFormValidity);
});
[birthdate, weton, screenshot].forEach(el => {
    el.addEventListener('change', checkFormValidity);
    el.addEventListener('input', checkFormValidity);
});

// ALUR 3: FIX TOTAL - Kirim Beneran ke Web3Forms
form.addEventListener('submit', async function(e) {
    e.preventDefault();

    if (submitBtn.disabled) return;

    // Ubah tombol jadi loading
    submitBtn.innerText = "⏳ Sedang Mengirim & Memproses...";
    submitBtn.disabled = true;

    const formData = new FormData(form);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            console.log("SUKSES KIRIM:", data);
            form.style.display = "none"; // Sembunyikan form
            infoSuccess.style.display = "block";
            infoSuccess.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.log("GAGAL:", data);
            alert("Gagal mengirim: " + data.message + "\nCek Access Key Web3Forms lu masih YOUR_ACCESS_KEY_HERE");
            submitBtn.innerText = "Kunci Semua Informasi & Analis";
            submitBtn.disabled = false;
            checkFormValidity();
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Koneksi error. Coba lagi.");
        submitBtn.innerText = "Kunci Semua Informasi & Analis";
        submitBtn.disabled = false;
        checkFormValidity();
    }
});
