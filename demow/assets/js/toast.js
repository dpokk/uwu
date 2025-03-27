/**
 * Toast Notification System
 * Provides a consistent way to show toast notifications across all pages
 */

class ToastManager {
    constructor() {
        this.container = null;
        this.init();
    }

    /**
     * Initialize the toast container
     */
    init() {
        // Check if container already exists
        let container = document.querySelector('.toast-container');
        
        if (!container) {
            // Create container if it doesn't exist
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        
        this.container = container;
    }

    /**
     * Show a toast notification
     * @param {string} message - The message to display
     * @param {string} type - The type of toast (success, error, warning, info)
     * @param {number} duration - How long to show the toast in milliseconds
     */
    show(message, type = 'success', duration = 3000) {
        if (!this.container) {
            this.init();
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast ${type}-toast`;
        
        // Set icon based on type
        let iconPath = '';
        switch (type) {
            case 'success':
                iconPath = '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>';
                break;
            case 'error':
                iconPath = '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>';
                break;
            case 'warning':
                iconPath = '<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>';
                break;
            case 'info':
                iconPath = '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>';
                break;
        }
        
        // Create toast content
        toast.innerHTML = `
            <div class="toast-icon">
                <svg viewBox="0 0 24 24">${iconPath}</svg>
            </div>
            <div class="toast-content">
                <p class="toast-message">${message}</p>
            </div>
            <button class="toast-close">
                <svg viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
            </button>
        `;
        
        // Add to container
        this.container.appendChild(toast);
        
        // Add close event listener
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.classList.add('toast-hiding');
            setTimeout(() => {
                toast.remove();
            }, 300);
        });
        
        // Show with animation
        setTimeout(() => {
            toast.classList.add('visible');
        }, 10);
        
        // Auto-hide after delay
        setTimeout(() => {
            if (toast.parentNode) {
                toast.classList.add('toast-hiding');
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.remove();
                    }
                }, 300);
            }
        }, duration);
    }
    
    /**
     * Show a success toast
     * @param {string} message - The message to display
     * @param {number} duration - How long to show the toast in milliseconds
     */
    success(message, duration = 3000) {
        this.show(message, 'success', duration);
    }
    
    /**
     * Show an error toast
     * @param {string} message - The message to display
     * @param {number} duration - How long to show the toast in milliseconds
     */
    error(message, duration = 3000) {
        this.show(message, 'error', duration);
    }
    
    /**
     * Show a warning toast
     * @param {string} message - The message to display
     * @param {number} duration - How long to show the toast in milliseconds
     */
    warning(message, duration = 3000) {
        this.show(message, 'warning', duration);
    }
    
    /**
     * Show an info toast
     * @param {string} message - The message to display
     * @param {number} duration - How long to show the toast in milliseconds
     */
    info(message, duration = 3000) {
        this.show(message, 'info', duration);
    }
}

// Create global toast instance
const toast = new ToastManager();

// Export for use in other modules
window.toast = toast; 