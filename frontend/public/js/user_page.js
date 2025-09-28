// If no token, force login
const token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'login_form.html';
}

// Load user details and display them
async function loadUser() {
  try {
    const res = await fetch('http://localhost:5000/api/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      // token expired or invalid — clear and redirect
      localStorage.removeItem('token');
      return window.location.href = 'login_form.html';
    }

    const user = await res.json();
    console.log("User Data:", user);

    // Example: show a welcome message in the banner
    const bannerH1 = document.querySelector('.banner-content h1');
    if (bannerH1) {
      bannerH1.textContent = "Incredible India!"; // keep original
    }
  } catch (err) {
    console.error('Error fetching user:', err);
    localStorage.removeItem('token');
    window.location.href = 'login_form.html';
  }
}

loadUser();

// Logout handler
document.getElementById('logoutBtn')?.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'login_form.html';
});
