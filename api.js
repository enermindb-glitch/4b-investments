// ==== CONFIGURE THIS ====
// Paste the Web App URL you get after deploying Code.gs (see SETUP.md)
const API_URL = "https://script.google.com/macros/s/AKfycbzpnxgQddAIbl99PRQkbDji4VtgG1F2WnjeP7rYyH0IkOVh5RJxZPIbYKLz0J-_a66x/exec";
// =========================

async function api(action, payload = {}) {
  const body = JSON.stringify({ action, ...payload });
  const res = await fetch(API_URL, {
    method: "POST",
    // text/plain avoids a CORS preflight against Apps Script
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body
  });
  return res.json();
}

function getToken() {
  return localStorage.getItem("4b_token");
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("4b_user"));
  } catch {
    return null;
  }
}

function requireLogin() {
  if (!getToken()) window.location.href = "index.html";
}

function requireAdminUI() {
  const user = getUser();
  if (!getToken() || !user || user.role !== "admin") window.location.href = "dashboard.html";
}

function logout() {
  api("logout", { token: getToken() }).finally(() => {
    localStorage.removeItem("4b_token");
    localStorage.removeItem("4b_user");
    window.location.href = "index.html";
  });
}

function showMsg(el, text, type) {
  el.textContent = text;
  el.className = "msg " + type;
  el.style.display = "block";
}
