document.addEventListener('DOMContentLoaded', function() {
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
        } else {
            submitBtn.disabled = true;
            submitBtn.style.backgroundColor = "#9ca3af";
            submitBtn.style.cursor = "not-allowed";
        }
    }

    [username, clientEmail].forEach(el => el.addEventListener('input', checkFormValidity));
    [birthdate, weton, screenshot].forEach(el => {
        el.addEventListener('change', checkFormValidity);
        el.addEventListener('input', checkFormValidity);
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        if (submitBtn.disabled) return;
        submitBtn.innerText = "⏳ Mengirim...";
        submitBtn.disabled = true;
        const formData = new FormData(form);
        try {
            const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
            const data = await response.json();
            if (data.success) {
                form.style.display = "none";
                infoSuccess.style.display = "block";
            } else {
                alert("Gagal: " + data.message);
                submitBtn.disabled = false;
                submitBtn.innerText = "Kunci Semua Informasi & Analis";
            }
        } catch (err) {
            alert("Koneksi error");
            submitBtn.disabled = false;
            submitBtn.innerText = "Kunci Semua Informasi & Analis";
        }
    });
});
