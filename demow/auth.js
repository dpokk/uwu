document.addEventListener('DOMContentLoaded', () => {
    // Handle preloader
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);

    const signupForm = document.getElementById('signupForm');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const validationIcons = document.querySelectorAll('.validation-icon');
    const errorMessages = document.querySelectorAll('.error-message');

    // Form Validation Functions (keep your existing validation logic)
    function validateFullName(name) {
        const nameRegex = /^[a-zA-Z\s]{2,50}$/;
        return nameRegex.test(name);
    }

    function validatePhone(phone) {
        const phoneRegex = /^[6-9]\d{9}$/;
        return phoneRegex.test(phone);
    }

    function validateEmail(email) {
        // Accept college emails with common educational domains
        const emailRegex = /^[^\s@]+@([a-zA-Z0-9-]+\.)*(edu|ac\.in|ac\.uk|edu\.[a-z]{2}|college\.edu|university\.edu|bmsit\.in|bmsce\.ac\.in)$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        return password.length >= 8;
    }

    // Signup Function
    async function handleSignup(event) {
        event.preventDefault();

        const fullName = document.getElementById('fullName').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const termsCheck = document.getElementById('termsCheck').checked;

        // Validation
        let isValid = true;

        // Full Name Validation
        if (!validateFullName(fullName)) {
            showError(0, 'Please enter a valid name');
            isValid = false;
        } else {
            clearError(0);
        }

        // Phone Validation
        if (!validatePhone(phone)) {
            showError(1, 'Please enter a valid 10-digit phone number');
            isValid = false;
        } else {
            clearError(1);
        }

        // Email Validation
        if (!validateEmail(email)) {
            showError(2, 'Please use your college email address');
            isValid = false;
        } else {
            clearError(2);
        }

        // Password Validation
        if (!validatePassword(password)) {
            showError(3, 'Password must be at least 8 characters long');
            isValid = false;
        } else {
            clearError(3);
        }

        // Terms Check Validation
        if (!termsCheck) {
            alert('Please agree to the Terms & Conditions');
            isValid = false;
        }

        if (!isValid) return;

        // Skip Supabase authentication for demo
        // Store user data in localStorage
        localStorage.setItem('tempUserEmail', email);
        localStorage.setItem('tempUserName', fullName);
        localStorage.setItem('tempUserPhone', phone);

        // Show success message
        document.querySelector('.auth-form').style.display = 'none';
        document.querySelector('.success-message').classList.remove('hidden');

        // Redirect to login page immediately
        window.location.href = 'login.html';
    }

    // Helper Functions for Error Handling
    function showError(index, message) {
        errorMessages[index].textContent = message;
        errorMessages[index].classList.add('show');
        validationIcons[index].classList.remove('valid');
        validationIcons[index].classList.add('invalid');
    }

    function clearError(index) {
        errorMessages[index].textContent = '';
        errorMessages[index].classList.remove('show');
        validationIcons[index].classList.remove('invalid');
        validationIcons[index].classList.add('valid');
    }

    // Event Listeners
    signupForm.addEventListener('submit', handleSignup);
});

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Login Function
    async function handleLogin(event) {
        event.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Skip authentication - just store sample user data and redirect
        localStorage.setItem('token', 'sample-token-123');
        localStorage.setItem('userId', 'user-' + Date.now());
        localStorage.setItem('userEmail', email);

        // Successful login
        showToast('Login Successful! Redirecting...');
        setTimeout(() => {
            window.location.href = 'events.html';
        }, 2000);
    }

    // Forgot Password Function
    async function handleForgotPassword(event) {
        event.preventDefault();

        const resetEmail = document.getElementById('resetEmail').value;

        // Skip actual password reset for demo
        showToast('Password reset link sent to your email');
        closeModal();
    }

    // Toast Notification Function
    function showToast(message, type = 'success') {
        const toast = document.getElementById('notificationToast');
        const toastContent = toast.querySelector('.toast-content');
        
        toastContent.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Modal Close Function
    function closeModal() {
        forgotPasswordModal.classList.remove('show');
    }

    // Event Listeners
    loginForm.addEventListener('submit', handleLogin);
    forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    closeModalBtn.addEventListener('click', closeModal);
});