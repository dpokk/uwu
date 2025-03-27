// Admin JavaScript Functions

document.addEventListener('DOMContentLoaded', function() {
    // Handle Admin Login Form
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', handleAdminLogin);
    }

    // Initialize Dashboard if on admin dashboard page
    const adminContainer = document.querySelector('.admin-container');
    if (adminContainer) {
        initAdminDashboard();
    }

    // Initialize Password Toggle on Admin Login
    const passwordToggle = document.querySelector('.password-toggle');
    if (passwordToggle) {
        passwordToggle.addEventListener('click', togglePasswordVisibility);
    }
});

/**
 * Handle admin login form submission
 * @param {Event} e - Form submit event
 */
async function handleAdminLogin(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('adminEmail');
    const passwordInput = document.getElementById('adminPassword');
    
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Basic validation
    let isValid = true;
    
    if (!emailInput.value.trim()) {
        showInputError(emailInput, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        showInputError(emailInput, 'Please enter a valid email');
        isValid = false;
    }
    
    if (!passwordInput.value.trim()) {
        showInputError(passwordInput, 'Password is required');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Show loading state
    const submitBtn = adminLoginForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Logging in...</span>';
    submitBtn.disabled = true;
    
    try {
        // Simulate successful login for demo
        // Store admin session info
        localStorage.setItem('adminLoggedIn', 'true');
        
        // Show success message
        showToast('Login successful! Redirecting...');
        
        // Redirect to admin dashboard after delay
        setTimeout(() => {
            window.location.href = 'admin-dashboard.html';
        }, 1000);
        
    } catch (error) {
        console.error('Admin login error:', error);
        showToast(error.message || 'Login failed. Please check your credentials.');
        
        // Reset button state
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
}

/**
 * Initialize admin dashboard components
 */
function initAdminDashboard() {
    // Tab Switching
    initTabs();
    
    // Initialize Charts if on analytics tab
    if (document.getElementById('analytics-tab')) {
        initCharts();
    }
    
    // Action Buttons
    initActionButtons();
    
    // Modal functionality
    initModals();
    
    // Check Authentication
    checkAdminAuth();
}

/**
 * Check if user is authenticated as admin
 */
function checkAdminAuth() {
    // For demo purposes, always authenticate
    // In production, this would check for proper authentication
    localStorage.setItem('adminLoggedIn', 'true');
    return true;
}

/**
 * Initialize dashboard tabs
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabIndicator = document.querySelector('.tab-indicator');
    
    if (!tabButtons.length || !tabContents.length) return;
    
    // Set initial tab indicator position
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab && tabIndicator) {
        const tabWidth = 100 / tabButtons.length;
        const tabIndex = Array.from(tabButtons).indexOf(activeTab);
        tabIndicator.style.width = `${tabWidth}%`;
        tabIndicator.style.transform = `translateX(${tabIndex * 100}%)`;
    }
    
    tabButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Update active tab button
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update tab indicator
            if (tabIndicator) {
                const tabWidth = 100 / tabButtons.length;
                tabIndicator.style.width = `${tabWidth}%`;
                tabIndicator.style.transform = `translateX(${index * 100}%)`;
            }
            
            // Show relevant tab content
            const tabId = btn.getAttribute('data-tab');
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}-tab`) {
                    content.classList.add('active');
                    
                    // Initialize charts if analytics tab is activated
                    if (tabId === 'analytics' && typeof Chart !== 'undefined') {
                        initCharts();
                    }
                }
            });
        });
    });
}

/**
 * Initialize charts for analytics tab
 */
function initCharts() {
    // Only initialize charts if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded');
        return;
    }
    
    // Event Registrations Chart
    const registrationsCtx = document.getElementById('registrationsChart')?.getContext('2d');
    if (registrationsCtx) {
        new Chart(registrationsCtx, {
            type: 'line',
            data: {
                labels: generateDateLabels(30),
                datasets: [{
                    label: 'Event Registrations',
                    data: generateRandomData(30, 5, 25),
                    borderColor: '#2705d1',
                    backgroundColor: 'rgba(39, 5, 209, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
    
    // Categories Chart
    const categoriesCtx = document.getElementById('categoriesChart')?.getContext('2d');
    if (categoriesCtx) {
        new Chart(categoriesCtx, {
            type: 'doughnut',
            data: {
                labels: ['Academic', 'Social', 'Cultural', 'Sports', 'Other'],
                datasets: [{
                    data: [25, 20, 30, 15, 10],
                    backgroundColor: [
                        '#2705d1',
                        '#4a33d9',
                        '#6f62e3',
                        '#9691ec',
                        '#bdbdf5'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true
                }
            }
        });
    }
    
    // User Activity Chart
    const userActivityCtx = document.getElementById('userActivityChart')?.getContext('2d');
    if (userActivityCtx) {
        new Chart(userActivityCtx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Active Users',
                    data: [65, 59, 80, 81, 56, 40, 30],
                    backgroundColor: '#4a33d9'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                }
            }
        });
    }
    
    // Event Status Chart
    const eventStatusCtx = document.getElementById('eventStatusChart')?.getContext('2d');
    if (eventStatusCtx) {
        new Chart(eventStatusCtx, {
            type: 'pie',
            data: {
                labels: ['Active', 'Upcoming', 'Completed', 'Cancelled'],
                datasets: [{
                    data: [38, 25, 30, 7],
                    backgroundColor: [
                        '#28a745',
                        '#4a33d9',
                        '#6c757d',
                        '#dc3545'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Completion Rate Chart
    const completionRateCtx = document.getElementById('completionRateChart')?.getContext('2d');
    if (completionRateCtx) {
        new Chart(completionRateCtx, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'Abandoned'],
                datasets: [{
                    data: [85, 15],
                    backgroundColor: [
                        '#28a745',
                        '#e9ecef'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '75%',
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

/**
 * Initialize action buttons in tables and cards
 */
function initActionButtons() {
    // Approve/Reject Buttons
    const approveButtons = document.querySelectorAll('.approve-btn');
    const rejectButtons = document.querySelectorAll('.reject-btn');
    
    approveButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.approval-card');
            if (card) {
                // Animate and remove the card
                card.style.opacity = '0';
                card.style.transform = 'translateX(20px)';
                setTimeout(() => {
                    card.remove();
                    updatePendingCount();
                }, 300);
                toast.success('Event approved successfully');
            }
        });
    });
    
    rejectButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.approval-card');
            if (card) {
                card.style.opacity = '0';
                card.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    card.remove();
                    updatePendingCount();
                }, 300);
                toast.error('Event rejected');
            }
        });
    });
    
    // Table Actions
    const tableActions = document.querySelectorAll('.table-actions button');
    tableActions.forEach(btn => {
        btn.addEventListener('click', handleTableAction);
    });
    
    // Approve All Button
    const approveAllBtn = document.getElementById('approveAllBtn');
    if (approveAllBtn) {
        approveAllBtn.addEventListener('click', function() {
            const cards = document.querySelectorAll('.approval-card');
            
            // If no cards left, show message
            if (cards.length === 0) {
                toast.info('No pending approvals');
                return;
            }
            
            // Animate and remove all cards with delay between each
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateX(20px)';
                    setTimeout(() => {
                        card.remove();
                        if (index === cards.length - 1) {
                            updatePendingCount();
                        }
                    }, 300);
                }, index * 100);
            });
            
            toast.success('All events approved');
        });
    }
    
    // Details Buttons
    const detailsButtons = document.querySelectorAll('.details-btn');
    detailsButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = document.getElementById('eventDetailsModal');
            if (modal) {
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.style.opacity = '1';
                }, 10);
            }
        });
    });
}

/**
 * Handle table action button clicks
 */
function handleTableAction(e) {
    const row = this.closest('tr');
    const action = this.classList.contains('edit-btn') ? 'edit' : 
                   this.classList.contains('delete-btn') ? 'delete' : 
                   this.classList.contains('view-btn') ? 'view' : 
                   this.classList.contains('activate-btn') ? 'activate' : '';
    
    switch (action) {
        case 'edit':
            // Show edit form/modal
            toast.info('Edit functionality not implemented in demo');
            break;
        case 'delete':
            // Confirm and delete row
            if (row) {
                row.style.opacity = '0';
                row.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    row.remove();
                }, 300);
                toast.success('Item deleted successfully');
            }
            break;
        case 'view':
            // Show details view
            toast.info('View functionality not implemented in demo');
            break;
        case 'activate':
            // Change status to active
            if (row) {
                const statusCell = row.querySelector('.status-inactive');
                if (statusCell) {
                    statusCell.classList.remove('status-inactive');
                    statusCell.classList.add('status-active');
                    statusCell.textContent = 'Active';
                }
                toast.success('User activated successfully');
            }
            break;
    }
}

/**
 * Initialize modal functionality
 */
function initModals() {
    // Close buttons for modals
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }
        });
    });
    
    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.opacity = '0';
            setTimeout(() => {
                e.target.style.display = 'none';
            }, 300);
        }
    });
}

/**
 * Update the pending approval count in stats
 */
function updatePendingCount() {
    const pendingCountElement = document.querySelector('.stat-card:nth-child(3) .stat-value');
    if (pendingCountElement) {
        const currentCount = parseInt(pendingCountElement.textContent);
        const newCount = Math.max(0, currentCount - 1);
        pendingCountElement.textContent = newCount;
        
        // Animate the change
        pendingCountElement.classList.add('updated');
        setTimeout(() => {
            pendingCountElement.classList.remove('updated');
        }, 1000);
    }
}

/**
 * Generate random data for charts
 */
function generateRandomData(count, min, max) {
    return Array.from({ length: count }, () => 
        Math.floor(Math.random() * (max - min + 1)) + min
    );
}

/**
 * Generate date labels for the past X days
 */
function generateDateLabels(days) {
    const labels = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        labels.push(`${day} ${month}`);
    }
    
    return labels;
}

/**
 * Toggle password visibility
 */
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('adminPassword');
    if (!passwordInput) return;
    
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Optionally update the icon
    const eyeIcon = this.querySelector('.eye-icon');
    if (eyeIcon) {
        if (type === 'text') {
            eyeIcon.innerHTML = '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>';
        } else {
            eyeIcon.innerHTML = '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>';
        }
    }
}

/**
 * Show error message for input field
 * @param {HTMLElement} input - Input element
 * @param {string} message - Error message
 */
function showInputError(input, message) {
    const errorElement = input.closest('.form-group').querySelector('.error-message');
    errorElement.textContent = message;
    
    // Add error styling to input
    input.classList.add('error');
    
    // Remove error styling after user starts typing
    input.addEventListener('input', function onInput() {
        input.classList.remove('error');
        errorElement.textContent = '';
        input.removeEventListener('input', onInput);
    });
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 */
function showToast(message) {
    const toast = document.getElementById('notificationToast');
    const toastContent = document.querySelector('.toast-content');
    
    if (!toast || !toastContent) return;
    
    toastContent.textContent = message;
    
    // Show toast
    gsap.fromTo(toast,
        { opacity: 0, y: 20 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.3,
            onComplete: () => {
                // Auto-hide after delay
                setTimeout(() => {
                    gsap.to(toast, {
                        opacity: 0,
                        y: 20,
                        duration: 0.3
                    });
                }, 3000);
            }
        }
    );
} 