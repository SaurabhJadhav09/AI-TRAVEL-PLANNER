// Clear JWT token and redirect to login page
function logoutUser() {
  localStorage.removeItem("token"); // remove stored JWT
  window.location.href = "login_form.html"; // redirect to login
}

// If you want to auto-run logout when page loads:
logoutUser();
