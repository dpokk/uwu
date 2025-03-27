/**
 * Utility Functions
 * Common functions for session handling, validation, etc.
 */

/**
 * Check if a user is logged in
 * @returns {boolean} - Whether the user is logged in
 */
function isLoggedIn() {
    return localStorage.getItem('token') && localStorage.getItem('userId');
}

/**
 * Get the current user's details
 * @returns {Object|null} - User details or null if not logged in
 */
function getCurrentUser() {
    if (!isLoggedIn()) return null;
    
    return {
        userId: localStorage.getItem('userId'),
        email: localStorage.getItem('userEmail') || '',
        name: localStorage.getItem('userName') || '',
        token: localStorage.getItem('token')
    };
}

/**
 * Set user session after login/signup
 * @param {Object} userData - User data to store in session
 */
function setUserSession(userData) {
    localStorage.setItem('token', userData.token || '');
    localStorage.setItem('userId', userData.userId || '');
    localStorage.setItem('userEmail', userData.email || '');
    localStorage.setItem('userName', userData.name || '');
    
    // Store the last login time
    localStorage.setItem('lastLogin', new Date().toISOString());
}

/**
 * Clear user session on logout
 */
function clearUserSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('lastLogin');
}

/**
 * Redirect to login page if not logged in
 * @param {string} returnUrl - URL to return to after login
 * @returns {boolean} - Whether redirection occurred
 */
function requireLogin(returnUrl = window.location.href) {
    if (!isLoggedIn()) {
        sessionStorage.setItem('redirectAfterLogin', returnUrl);
        window.location.href = 'login.html';
        return true;
    }
    return false;
}

/**
 * Get the redirect URL after login
 * @param {string} defaultUrl - Default URL to redirect to
 * @returns {string} - URL to redirect to
 */
function getRedirectUrl(defaultUrl = 'discover.html') {
    const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
    sessionStorage.removeItem('redirectAfterLogin');
    return redirectUrl || defaultUrl;
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate college email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether the email is a valid college email
 */
function isValidCollegeEmail(email) {
    if (!isValidEmail(email)) return false;
    
    const validDomains = ['edu', 'ac.in', 'college.edu', 'bmsit.in'];
    const domain = email.split('@')[1];
    
    return validDomains.some(validDomain => 
        domain.endsWith(validDomain)
    );
}

/**
 * Format date to a readable string
 * @param {string|Date} date - Date to format
 * @param {boolean} includeTime - Whether to include the time
 * @returns {string} - Formatted date string
 */
function formatDate(date, includeTime = false) {
    const d = new Date(date);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    };
    
    if (includeTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
    }
    
    return d.toLocaleDateString('en-US', options);
}

/**
 * Format a date to a relative time string (e.g. "2 days ago")
 * @param {string|Date} date - Date to format
 * @returns {string} - Relative time string
 */
function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        return interval === 1 ? '1 year ago' : `${interval} years ago`;
    }
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval === 1 ? '1 month ago' : `${interval} months ago`;
    }
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval === 1 ? '1 day ago' : `${interval} days ago`;
    }
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
    }
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;
    }
    
    return seconds < 10 ? 'just now' : `${Math.floor(seconds)} seconds ago`;
}

/**
 * Handle image errors by replacing with a placeholder
 * @param {HTMLImageElement} img - Image element that failed to load
 */
function handleImageError(img) {
    img.src = 'assets/images/placeholder.svg';
    img.alt = 'Image not available';
}

// Export utility functions to global scope
window.isLoggedIn = isLoggedIn;
window.getCurrentUser = getCurrentUser;
window.setUserSession = setUserSession;
window.clearUserSession = clearUserSession;
window.requireLogin = requireLogin;
window.getRedirectUrl = getRedirectUrl;
window.isValidEmail = isValidEmail;
window.isValidCollegeEmail = isValidCollegeEmail;
window.formatDate = formatDate;
window.timeAgo = timeAgo;
window.handleImageError = handleImageError; 