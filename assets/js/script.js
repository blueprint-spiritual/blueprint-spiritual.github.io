document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('masterForm');
    const username = document.getElementById('username');
    const birthdate = document.getElementById('birthdate');
    const weton = document.getElementById('weton');
    const screenshot = document.getElementById('screenshot');
    const clientEmail = document.getElementById('clientEmail');
    const submitBtn = document.getElementById('submitBtn');
    const comment = document.getElementById('comment');

    const uploadLabel = document.getElementById('uploadLabel');
    const fileNameInfo = document.getElementById('fileNameInfo');
    const checkScreenshot = document.getElementById('checkScreenshot');
    const checkEmail = document.getElementById('checkEmail');
    const statusInfo = document.getElementById('statusInfo');
    const infoSuccess = document.getElementById('infoSuccess');

    // 1. HANDLE PILIH FILE - BIAR NAMA FILE MUNCUL
    screenshot.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            uploadLabel.innerText = "✓ " + file.name;
            uploadLabel.classList.add("text-green-700");
            fileNameInfo.innerText = (file.size / 1024 / 1024).toFixed(2) + " MB - Siap kirim";
            checkScreenshot.style.display = "block";
        } else {
            uploadLabel.innerText = "KLIK UNTUK PILIH SCREENSHOT";
            fileNameInfo.innerText = "";
            checkScreenshot.style.display = "none";
        }
        cekValid();
    });

    // 2. FUNGSI VALIDASI BIAR TOMBOL BISA DIPENCET
    function cekValid() {
        const namaOk = username.value.trim().length > 2;
        const tglOk = birthdate.value!== "";
        const wetonOk = weton.value!== "";
        const fileOk = screenshot.files.length > 0;
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail.value.trim());

        if (emailOk) {
            checkEmail.style.display = "block";
        } else {
            checkEmail.style.display = "none";
        }

        if (namaOk && tglOk && wetonOk && fileOk && emailOk) {
            submitBtn.disabled = false;
            submitBtn.classList.remove("bg-gray-400");
            submitBtn.classList.add("bg-amber-600", "hover:bg-amber-700");
            statusInfo.innerText = "✅ Siap kirim!";
            statusInfo.classList.add("text-green-600");
            return true;
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.add("bg-gray-400");
            submitBtn.classList.remove("bg-amber-600", "hover:bg-amber-700");
            statusInfo.innerText = "Lengkapi: Nama, Tgl Lahir, Weton, Screenshot, Email";
            statusInfo.classList.remove("text-green-600");
            return false;
        }
    }

    username.addEventListener('input', cekValid);
    birthdate.addEventListener('input', cekValid);
    birthdate.addEventListener('change', cekValid);
    weton.addEventListener('change', cekValid);
    clientEmail.addEventListener('input', cekValid);
    comment.addEventListener('input', cekValid);

    // 3. KIRIM SEMUA KOLOM KE WEB3FORMS
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (!cekValid()) return;

        const textAsli = submitBtn.innerText;
        submitBtn.innerText = "⏳ MENGIRIM...";
        submitBtn.disabled = true;

        const formData = new FormData(form);

        // Kirim
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                form.style.display = "none";
                infoSuccess.style.display = "block";
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                alert("Gagal: " + data.message);
                submitBtn.innerText = textAsli;
                submitBtn.disabled = false;
                cekValid();
            }
        } catch (err) {
            alert("Koneksi error");
            submitBtn.innerText = textAsli;
            submitBtn.disabled = false;
            cekValid();
        }
    });

    cekValid();
});
