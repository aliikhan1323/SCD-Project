document.addEventListener("DOMContentLoaded", function () {
    
    // Function to switch between Sign In and Sign Up forms
    function switchToSignUp() {
        document.getElementById("signin").style.display = "none";
        document.getElementById("signup").style.display = "block";
    }

    function switchToSignIn() {
        document.getElementById("signup").style.display = "none";
        document.getElementById("signin").style.display = "block";
    }

    // Handle Log In Form Submission
    const loginForm = document.querySelector('#loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.querySelector('#loginEmail').value;
            const password = document.querySelector('#loginPassword').value;

            // Retrieve user data from localStorage
            const storedUser = JSON.parse(localStorage.getItem("user"));

            if (!storedUser) {
                alert("No user found. Please sign up first.");
                return;
            }

            // Validate email and password
            if (storedUser.email === email && storedUser.password === password) {
                alert(`Logged in as ${storedUser.name}`);
            } else {
                alert("Invalid email or password. Please try again.");
            }

            // Close modal after submission
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            loginModal.hide();
        });
    }

    // Handle Sign Up Form Submission
    const signUpForm = document.querySelector('#signUpForm');
    if (signUpForm) {
        signUpForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.querySelector('#signInName').value;
            const email = document.querySelector('#signInEmail').value;
            const password = document.querySelector('#signInPassword').value;
            const confirmPassword = document.querySelector('#signInConfirmPassword').value;

            // Validate password match
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            // Validate email format
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            // Validate password length
            if (password.length < 6) {
                alert("Password must be at least 6 characters.");
                return;
            }

            // Store user data in localStorage
            const user = { name, email, password };
            localStorage.setItem("user", JSON.stringify(user));

            alert(`Sign up successful for ${name}`);

            // Close modal after submission
            const signInModal = new bootstrap.Modal(document.getElementById('signInModal'));
            signInModal.hide();
        });
    }

    // Switch Between Sign In and Sign Up Forms for Modal Views
    const signUpLink = document.querySelector("#signUpLink");
    if (signUpLink) {
        signUpLink.addEventListener('click', switchToSignUp);
    }

    const signInLink = document.querySelector("#signInLink");
    if (signInLink) {
        signInLink.addEventListener('click', switchToSignIn);
    }

    // Functionality for Handling User Logged In/Out
    const loginStatus = document.querySelector('#loginStatus');
    const logoutBtn = document.querySelector('#logoutBtn');
    
    if (loginStatus) {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            loginStatus.textContent = `Welcome, ${storedUser.name}`;
        } else {
            loginStatus.textContent = "You are not logged in.";
        }
    }

    // Log Out functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem("user");
            alert("You have logged out.");
            window.location.reload();
        });
    }

    // Optional: If you need to handle auto-login upon page load (after refresh), you can check `localStorage` and auto-fill the form.
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && window.location.pathname !== "/login.html") {
        // Auto-login logic, redirect to home or dashboard
        window.location.href = "/dashboard.html";
    }
});
