document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get values by ID
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const cpassword = document.getElementById("cpassword").value;

  const role = "user"; // ✅ assign role here

  if (password !== cpassword) {
    document.getElementById("errorMsg").innerText = "⚠️ Passwords do not match!";
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json();
    console.log("Register Response:", data);

    if (!res.ok) {
      document.getElementById("errorMsg").innerText =
        data.message || "⚠️ Registration failed!";
      return;
    }

    alert("✅ Registration successful! Please login.");
    window.location.href = "login_form.html"; // redirect
  } catch (err) {
    console.error("Register error:", err);
    document.getElementById("errorMsg").innerText =
      "⚠️ Something went wrong, try again.";
  }
});
