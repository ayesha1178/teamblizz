function register() {
  fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: ruser.value,
      password: rpass.value,
      role: role.value
    })
  }).then(res => res.text()).then(alert);
}

function login() {
  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  })
  .then(res => res.json())
  .then(user => {
    if (!user) return alert("Invalid login");

    if (user.role === "admin") {
      window.location = "admin.html";
    } else {
      window.location = "bidder.html";
    }
  });
}