console.log("Wedding QR Pro V2");

function jsonp(url) {
  return new Promise((resolve, reject) => {
    const callback = "cb_" + Date.now();
    const script = document.createElement("script");

    window[callback] = (data) => {
      resolve(data);
      delete window[callback];
      script.remove();
    };

    script.onerror = reject;
    script.src = url + (url.includes("?") ? "&" : "?") + "callback=" + callback;
    document.body.appendChild(script);
  });
}

function showMessage(text, type) {
  const msg = document.getElementById("message");
  msg.className = type === "success" ? "success" : "error";
  msg.innerHTML = text;
}

async function loadStats() {
  const stats = await jsonp(API_URL + "?action=stats");
  document.getElementById("stats").innerHTML =
    "👥 الحضور<br>" + stats.attended + " / " + stats.total;
}

async function checkCode(code) {
  if (!code) {
    showMessage("الرجاء إدخال رقم الدعوة", "error");
    return;
  }

  const result = await jsonp(
    API_URL + "?action=check&code=" + encodeURIComponent(code)
  );

  showMessage(result.message, result.status === "success" ? "success" : "error");
  document.getElementById("manualCode").value = "";
  loadStats();
}

document.addEventListener("DOMContentLoaded", () => {
  loadStats();

  document.getElementById("checkBtn").addEventListener("click", () => {
    const code = document.getElementById("manualCode").value.trim();
    checkCode(code);
  });

  document.getElementById("manualCode").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      checkCode(e.target.value.trim());
    }
  });

  document.getElementById("scanBtn").addEventListener("click", () => {
    alert("الربط نجح. سنضيف الكاميرا في الخطوة التالية 📷");
  });
});
