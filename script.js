// Wedding QR Pro V2
console.log("Wedding QR Pro جاهز");

document.addEventListener("DOMContentLoaded", () => {

    const scanBtn = document.getElementById("scanBtn");
    const checkBtn = document.getElementById("checkBtn");

    scanBtn.addEventListener("click", () => {
        alert("سيتم تشغيل الكاميرا في الخطوة القادمة 📷");
    });

    checkBtn.addEventListener("click", () => {

        const code = document.getElementById("manualCode").value.trim();

        if(code===""){
            alert("الرجاء إدخال رقم الدعوة");
            return;
        }

        alert("رقم الدعوة: " + code);

    });

});
