/**
 * RSVP Handler Module
 * Manages individual RSVP functionality for campus events
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize RSVP handlers when document is ready
    initRSVPSystem();

    /**
     * Initialize RSVP system
     */
    function initRSVPSystem() {
        // Find all RSVP buttons
        const rsvpButtons = document.querySelectorAll('.event-rsvp');
        
        // Check if there are any RSVP buttons on the page
        if (rsvpButtons.length === 0) return;
        
        // Add click handlers to each RSVP button
        rsvpButtons.forEach(button => {
            button.addEventListener('click', handleRSVP);
        });
        
        // Check and update status of events user has already RSVPed to
        updateRSVPStatus();
    }
    
    /**
     * Handle RSVP button click
     * @param {Event} e - Click event
     */
    async function handleRSVP(e) {
        e.preventDefault();
        
        // Check if user is logged in
        if (!isLoggedIn()) {
            // Store the current URL in session storage to redirect back after login
            sessionStorage.setItem('redirectAfterLogin', window.location.href);
            // Redirect to login
            window.location.href = 'login.html';
            return;
        }
        
        const button = e.currentTarget;
        
        // Prevent double-clicking
        if (button.classList.contains('processing') || button.classList.contains('registered')) {
            return;
        }
        
        // Get event data from the card
        const eventCard = button.closest('.event-card');
        const eventId = eventCard.getAttribute('data-id') || generateEventId(eventCard);
        const eventTitle = eventCard.querySelector('.event-title').textContent;
        const eventLocation = eventCard.querySelector('.event-location').textContent;
        const eventDate = eventCard.querySelector('.event-date') ? 
                          `${eventCard.querySelector('.event-day').textContent} ${eventCard.querySelector('.event-month').textContent}` : 
                          'Upcoming';
        const eventTime = eventCard.querySelector('.event-time').textContent;
        
        // Show processing state
        button.classList.add('processing');
        button.innerHTML = '<div class="loading-spinner"></div> Processing...';
        
        try {
            // Register for the event
            await registerForEvent(eventId, {
                title: eventTitle,
                location: eventLocation,
                date: eventDate,
                time: eventTime
            });
            
            // Update button to show registered state
            button.classList.remove('processing');
            button.classList.add('registered');
            button.innerHTML = 'Registered <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path></svg>';
            
            // Show success notification
            showNotification(`Successfully registered for ${eventTitle}`, 'success');
        } catch (error) {
            // Show error state
            button.classList.remove('processing');
            button.innerHTML = 'RSVP Failed';
            
            // Show error notification
            showNotification('Registration failed. Please try again.', 'error');
            
            // Reset button after delay
            setTimeout(() => {
                button.innerHTML = 'RSVP Now';
            }, 2000);
            
            console.error('RSVP error:', error);
        }
    }
    
    /**
     * Generate a unique ID for an event if none exists
     * @param {HTMLElement} eventCard - The event card element
     * @returns {string} - Generated event ID
     */
    function generateEventId(eventCard) {
        const eventTitle = eventCard.querySelector('.event-title').textContent;
        const hash = Math.abs(hashCode(eventTitle));
        eventCard.setAttribute('data-id', hash.toString());
        return hash.toString();
    }
    
    /**
     * Simple string hash function
     * @param {string} str - String to hash
     * @returns {number} - Hash value
     */
    function hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
    
    /**
     * Check if the user is logged in
     * @returns {boolean} - True if user is logged in
     */
    function isLoggedIn() {
        return localStorage.getItem('token') && localStorage.getItem('userId');
    }
    
    /**
     * Register for an event
     * @param {string} eventId - Event ID
     * @param {Object} eventDetails - Event details object
     * @returns {Promise} - Promise that resolves when registration is complete
     */
    async function registerForEvent(eventId, eventDetails) {
        return new Promise((resolve, reject) => {
            // For real app, this would be an API call to Supabase
            try {
                // Get user information
                const userId = localStorage.getItem('userId');
                
                // Create registration record
                const registration = {
                    userId,
                    eventId,
                    eventDetails,
                    registeredAt: new Date().toISOString()
                };
                
                // Store in localStorage (in real app, this would be stored in database)
                const registrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]');
                registrations.push(registration);
                localStorage.setItem('eventRegistrations', JSON.stringify(registrations));
                
                // Simulate network delay for realism
                setTimeout(() => {
                    resolve(registration);
                }, 1200);
            } catch (error) {
                reject(error);
            }
        });
    }
    
    /**
     * Update RSVP status for events user has already registered for
     */
    function updateRSVPStatus() {
        // Skip if user is not logged in
        if (!isLoggedIn()) return;
        
        // Get user's registrations
        const registrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]');
        const userId = localStorage.getItem('userId');
        
        // Filter to this user's registrations
        const userRegistrations = registrations.filter(reg => reg.userId === userId);
        
        // Get all event cards on the page
        const eventCards = document.querySelectorAll('.event-card');
        
        // Check each card against registrations
        eventCards.forEach(card => {
            const eventId = card.getAttribute('data-id') || generateEventId(card);
            const isRegistered = userRegistrations.some(reg => reg.eventId === eventId);
            
            if (isRegistered) {
                const rsvpButton = card.querySelector('.event-rsvp');
                if (rsvpButton) {
                    rsvpButton.classList.add('registered');
                    rsvpButton.innerHTML = 'Registered <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path></svg>';
                    rsvpButton.disabled = true;
                }
            }
        });
    }
    
    /**
     * Show a notification toast
     * @param {string} message - Notification message
     * @param {string} type - Notification type ('success', 'error', etc.)
     */
    function showNotification(message, type = 'success') {
        // Find or create toast container
        let toastContainer = document.querySelector('.toast-container');
        
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast ${type}-toast`;
        
        // Create toast content
        toast.innerHTML = `
            <div class="toast-icon">
                ${type === 'success' 
                    ? '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path></svg>'
                    : '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>'}
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
        toastContainer.appendChild(toast);
        
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
            toast.classList.add('toast-hiding');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 5000);
    }
}); 