document.addEventListener('DOMContentLoaded', function() {
    console.log("FIX Weton Loaded");

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

    // FUNGSI CEK FILE - INI YANG BIKIN NAMA FILE MUNCUL
    screenshot.addEventListener('change', function() {
        console.log("File dipilih:", this.files[0]?.name);
        if (this.files.length > 0) {
            uploadLabel.innerText = "✓ " + this.files[0].name;
            uploadLabel.classList.add("text-green-600");
            checkScreenshot.style.display = "inline-block";
        } else {
            uploadLabel.innerText = "Pilih File Screenshot";
            uploadLabel.classList.remove("text-green-600");
            checkScreenshot.style.display = "none";
        }
        validasiForm();
    });

    function validasiForm() {
        const adaFile = screenshot.files.length > 0;
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail.value.trim());
        const identitasLengkap = username.value.trim()!== "" && birthdate.value!== "" && weton.value!== "";

        // Tampilkan centang email
        if(clientEmail.value.trim()!== ""){
            checkEmail.style.display = emailValid? "inline-block" : "none";
        }

        // INI KUNCI BIAR TOMBOL BISA DIPENCET
        if (adaFile && emailValid && identitasLengkap) {
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = "#d97706"; // jadi orange
            submitBtn.style.cursor = "pointer";
            submitBtn.classList.remove("cursor-not-allowed");
            console.log("Form VALID - Tombol Aktif");
        } else {
            submitBtn.disabled = true;
            submitBtn.style.backgroundColor = "#9ca3af"; // abu
            submitBtn.style.cursor = "not-allowed";
            console.log("Form belum lengkap");
        }
    }

    // Pantau semua input biar tombol langsung aktif pas lengkap
    username.addEventListener('input', validasiForm);
    birthdate.addEventListener('change', validasiForm);
    birthdate.addEventListener('input', validasiForm);
    weton.addEventListener('change', validasiForm);
    clientEmail.addEventListener('input', validasiForm);

    // KIRIM KE WEB3FORMS
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        if (submitBtn.disabled) return;

        const namaTombolAsli = submitBtn.innerText;
        submitBtn.innerText = "⏳ Mengirim...";
        submitBtn.disabled = true;

        const formData = new FormData(form);

        // Debug - lihat apa yang kekirim
        for (let [key, value] of formData.entries()) {
            console.log(key + ": ", value instanceof File? value.name : value);
        }

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                form.style.display = "none";
                infoSuccess.style.display = "block";
                infoSuccess.innerHTML = `<div class="bg-green-50 border border-green-200 p-4 rounded-xl text-center"><p class="text-green-800 font-bold text-sm">🎉 Sukses! Data: ${username.value}, ${weton.value}, File: ${screenshot.files[0].name} berhasil terkirim.</p></div>`;
            } else {
                alert("Gagal: " + data.message);
                submitBtn.innerText = namaTombolAsli;
                submitBtn.disabled = false;
            }
        } catch (err) {
            console.error(err);
            alert("Koneksi error, cek internet");
            submitBtn.innerText = namaTombolAsli;
            submitBtn.disabled = false;
        }
    });

    // Jalankan sekali pas load
    validasiForm();
});
