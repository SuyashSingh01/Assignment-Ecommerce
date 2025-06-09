document.addEventListener("DOMContentLoaded", function () {
  // Check if user is logged in
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const authLink = document.getElementById("auth-link");

  if (currentUser) {
    authLink.textContent = `Hi, ${currentUser.name}`;
    authLink.href = "#";

    // Add logout functionality
    const logoutItem = document.createElement("li");
    const logoutLink = document.createElement("a");
    logoutLink.href = "#";
    logoutLink.textContent = "Logout";
    logoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      window.location.href = "index.html";
    });
    logoutItem.appendChild(logoutLink);
    authLink.parentElement.parentElement.appendChild(logoutItem);
  }

  // Tab switching functionality
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  if (tabBtns.length > 0) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tabId = btn.getAttribute("data-tab");

        // Remove active class from all tabs
        tabBtns.forEach((btn) => btn.classList.remove("active"));
        tabContents.forEach((content) => content.classList.remove("active"));

        // Add active class to selected tab
        btn.classList.add("active");
        document.getElementById(tabId).classList.add("active");
      });
    });
  }

  // Register form validation and submission
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("register-name").value.trim();
      const email = document.getElementById("register-email").value.trim();
      const password = document.getElementById("register-password").value;
      const confirmPassword = document.getElementById(
        "register-confirm-password"
      ).value;

      // Reset error messages
      document
        .querySelectorAll(".error-message")
        .forEach((el) => (el.textContent = ""));

      // Validate form
      let isValid = true;

      if (!name) {
        document.getElementById("register-name-error").textContent =
          "Name is required";
        isValid = false;
      }

      if (!email) {
        document.getElementById("register-email-error").textContent =
          "Email is required";
        isValid = false;
      } else if (!isValidEmail(email)) {
        document.getElementById("register-email-error").textContent =
          "Please enter a valid email";
        isValid = false;
      }

      if (!password) {
        document.getElementById("register-password-error").textContent =
          "Password is required";
        isValid = false;
      } else if (password.length < 6) {
        document.getElementById("register-password-error").textContent =
          "Password must be at least 6 characters";
        isValid = false;
      }

      if (!confirmPassword) {
        document.getElementById("register-confirm-password-error").textContent =
          "Please confirm your password";
        isValid = false;
      } else if (password !== confirmPassword) {
        document.getElementById("register-confirm-password-error").textContent =
          "Passwords do not match";
        isValid = false;
      }

      if (isValid) {
        // Check if email already exists
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = users.find((user) => user.email === email);

        if (existingUser) {
          document.getElementById("register-email-error").textContent =
            "Email already registered";
          return;
        }

        // Add new user
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        // Show success message
        const messageEl = document.getElementById("register-message");
        messageEl.textContent = "Registration successful! You can now log in.";
        messageEl.classList.add("success");

        // Reset form
        registerForm.reset();

        // Switch to login tab after 2 seconds
        setTimeout(() => {
          document.querySelector('[data-tab="login"]').click();
        }, 2000);
      }
    });
  }

  // Login form validation and submission
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value;

      // Reset error messages
      document
        .querySelectorAll(".error-message")
        .forEach((el) => (el.textContent = ""));

      // Validate form
      let isValid = true;

      if (!email) {
        document.getElementById("login-email-error").textContent =
          "Email is required";
        isValid = false;
      }

      if (!password) {
        document.getElementById("login-password-error").textContent =
          "Password is required";
        isValid = false;
      }

      if (isValid) {
        // Check credentials
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          // Store current user
          localStorage.setItem("currentUser", JSON.stringify(user));

          // Show success message
          const messageEl = document.getElementById("login-message");
          messageEl.textContent = "Login successful! Redirecting...";
          messageEl.classList.add("success");

          // Redirect to home page
          setTimeout(() => {
            window.location.href = "index.html";
          }, 1500);
        } else {
          // Show error message
          const messageEl = document.getElementById("login-message");
          messageEl.textContent = "Invalid email or password";
          messageEl.classList.add("error");
        }
      }
    });
  }

  // function to validate email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
