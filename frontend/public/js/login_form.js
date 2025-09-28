document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // stop page reload

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("Login Response:", data); // 👀 Debug in console

    if (!res.ok || !data.token) {
      alert(data.message || "⚠️ Login failed!");
      return;
    }

    // Save JWT in localStorage
    localStorage.setItem("token", data.token);

    // Redirect to user page
    window.location.href = "user_page.html";
  } catch (err) {
    console.error("Login error:", err);
    alert("⚠️ Something went wrong, try again.");
  }
});
