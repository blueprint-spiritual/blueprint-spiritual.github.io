document.addEventListener('DOMContentLoaded', function() {
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

    // --- ANTI SCRAPER: Link DANA di-encode Base64 ---
    // aHR0cHM6Ly9yYi5neS9kOGE5emY= adalah https://rb.gy/d8a9zf
    function getDanaLink() {
        const part1 = "aHR0cHM6Ly9yYi5neS9k";
        const part2 = "OGE5emY=";
        try {
            return atob(part1 + part2);
        } catch(e) {
            return "";
        }
    }

    if(payDanaBtn){
        payDanaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const realLink = getDanaLink();
            if(realLink){
                window.open(realLink, '_blank', 'noopener');
            }
            step2Container.style.display = 'block';
            setTimeout(() => {
                step2Container.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 200);
        });
    }

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
                infoSuccess.scrollIntoView({ behavior: 'smooth' });
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
