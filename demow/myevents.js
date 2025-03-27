document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        gsap.to(preloader, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                preloader.style.display = 'none';
                initPageAnimations();
            }
        });
    });

    function initPageAnimations() {
        // Animate badge numbers
        animateCounterValues();
        
        // Animate tab indicator position
        animateTabIndicator();
        
        // Initialize countdown timers
        initCountdownTimers();
        
        // Initialize analytics charts
        initAnalyticsCharts();
        
        // Show content with animation
        gsap.from('.event-card', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out'
        });
    }

    // Tab Switching
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabIndicator = document.querySelector('.tab-indicator');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Move tab indicator
            animateTabIndicator();
            
            // Show corresponding tab content
            const tabContentId = `${tab.dataset.tab}-content`;
            tabContents.forEach(content => {
                content.classList.remove('active');
                
                // Animate content out/in
                if (content.id === tabContentId) {
                    gsap.fromTo(content, 
                        { opacity: 0, y: 20 }, 
                        { 
                            opacity: 1, 
                            y: 0, 
                            duration: 0.5, 
                            delay: 0.2,
                            onStart: () => content.classList.add('active')
                        }
                    );
                }
            });
        });
    });

    function animateTabIndicator() {
        const activeTab = document.querySelector('.tab.active');
        const tabIndex = Array.from(tabs).indexOf(activeTab);
        
        gsap.to(tabIndicator, {
            translateX: tabIndex * 100 + '%',
            duration: 0.5,
            ease: 'power2.inOut'
        });
    }

    // Badge Counter Animation
    function animateCounterValues() {
        const badges = document.querySelectorAll('.badge');
        
        badges.forEach(badge => {
            const finalValue = parseInt(badge.textContent);
            
            gsap.fromTo(badge, 
                { innerHTML: '0' },
                {
                    innerHTML: finalValue,
                    duration: 1.5,
                    ease: 'power2.inOut',
                    snap: { innerHTML: 1 },
                    delay: 0.5
                }
            );
        });
    }

    // QR Code Reveal Animation
    const qrButtons = document.querySelectorAll('.show-qr-btn');
    
    qrButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventCard = this.closest('.event-card');
            const qrContainer = eventCard.querySelector('.qr-container');
            
            if (qrContainer.style.display === 'flex') {
                // Hide QR code
                gsap.to(qrContainer, {
                    opacity: 0,
                    y: -10,
                    duration: 0.3,
                    onComplete: () => {
                        qrContainer.style.display = 'none';
                        this.textContent = 'Show QR Code';
                        this.classList.remove('btn-primary');
                        this.classList.add('btn-secondary');
                    }
                });
            } else {
                // Show QR code
                qrContainer.style.display = 'flex';
                gsap.fromTo(qrContainer,
                    { opacity: 0, y: -10 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.5,
                        ease: 'back.out(1.7)'
                    }
                );
                this.textContent = 'Hide QR Code';
                this.classList.remove('btn-secondary');
                this.classList.add('btn-primary');
            }
        });
    });

    // Countdown Timer
    function initCountdownTimers() {
        const countdownElements = document.querySelectorAll('.countdown-timer');
        
        countdownElements.forEach(countdown => {
            // Animate in the countdown numbers
            const countNumbers = countdown.querySelectorAll('.count-number');
            
            gsap.from(countNumbers, {
                textContent: 0,
                duration: 2,
                ease: 'power2.out',
                stagger: 0.2,
                snap: { textContent: 1 }
            });
            
            // Add pulse animation to the days count
            const daysElement = countdown.querySelector('.countdown-unit:first-child .count-number');
            gsap.to(daysElement, {
                scale: 1.1,
                duration: 0.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        });
    }

    // Attendee Count Animation
    const attendeeNumbers = document.querySelectorAll('.attendee-number');
    
    attendeeNumbers.forEach(number => {
        const finalValue = parseInt(number.textContent);
        
        gsap.fromTo(number,
            { innerHTML: '0' },
            {
                innerHTML: finalValue,
                duration: 2,
                ease: 'power2.out',
                delay: 0.8,
                snap: { innerHTML: 1 }
            }
        );
    });

    // Analytics Chart Animation
    function initAnalyticsCharts() {
        const chartCanvases = document.querySelectorAll('.mini-chart');
        
        chartCanvases.forEach(canvas => {
            const ctx = canvas.getContext('2d');
            
            // Generate random data for demo
            const data = Array.from({ length: 7 }, () => Math.floor(Math.random() * 50) + 10);
            
            // Create chart
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        data: data,
                        borderColor: '#2705d1',
                        backgroundColor: 'rgba(39, 5, 209, 0.1)',
                        tension: 0.4,
                        fill: true,
                        borderWidth: 2,
                        pointRadius: 0
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
                            enabled: false
                        }
                    },
                    scales: {
                        x: {
                            display: false
                        },
                        y: {
                            display: false
                        }
                    },
                    animation: {
                        duration: 2000,
                        easing: 'easeOutQuart'
                    }
                }
            });
        });
    }

    // Create Event Button Animation
    const createEventBtn = document.querySelector('.create-event-btn');
    
    if (createEventBtn) {
        createEventBtn.addEventListener('click', () => {
            window.location.href = 'host.html';
        });
    }

    // Cancel Registration Modal
    const cancelBtns = document.querySelectorAll('.cancel-btn');
    const cancelModal = document.querySelector('.cancel-overlay');
    const modalCloseBtns = document.querySelectorAll('.modal-close, .modal-cancel');
    const confirmCancelBtn = document.querySelector('.confirm-cancel');
    
    cancelBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const eventCard = this.closest('.event-card');
            const eventTitle = eventCard.querySelector('.event-title').textContent;
            const eventDate = eventCard.querySelector('.event-day').textContent;
            const eventMonth = eventCard.querySelector('.event-month').textContent;
            const eventTime = eventCard.querySelector('.event-time').textContent;
            const eventLocation = eventCard.querySelector('.event-location').textContent;
            
            // Update modal content
            document.querySelector('.event-title-modal').textContent = eventTitle;
            document.querySelector('.event-details-modal').textContent = `${eventMonth} ${eventDate}, ${eventTime} at ${eventLocation}`;
            
            // Show modal with animation
            cancelModal.style.display = 'flex';
            gsap.fromTo(cancelModal, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.3 }
            );
            
            // Animate modal in
            const modalElement = document.querySelector('.cancel-modal');
            gsap.fromTo(modalElement,
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
            );
            
            // Store reference to the event card to remove later
            cancelModal.dataset.targetCard = eventCard.getAttribute('class');
        });
    });
    
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(cancelModal);
        });
    });
    
    // Click outside to close modal
    cancelModal.addEventListener('click', (e) => {
        if (e.target === cancelModal) {
            closeModal(cancelModal);
        }
    });
    
    function closeModal(modal) {
        gsap.to(modal, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                modal.style.display = 'none';
            }
        });
    }
    
    // Confirm Cancel Registration
    if (confirmCancelBtn) {
        confirmCancelBtn.addEventListener('click', () => {
            // Get the event card reference
            const cardClass = cancelModal.dataset.targetCard;
            const eventCard = document.querySelector(`.${cardClass.replace(/ /g, '.')}`);
            
            // Close modal
            closeModal(cancelModal);
            
            // Animate card removal
            gsap.to(eventCard, {
                x: -100,
                opacity: 0,
                height: 0,
                marginBottom: 0,
                paddingTop: 0,
                paddingBottom: 0,
                duration: 0.5,
                ease: 'power2.in',
                onComplete: () => {
                    // Update badge count
                    const registeredTab = document.querySelector('.tab[data-tab="registered"]');
                    const badge = registeredTab.querySelector('.badge');
                    let count = parseInt(badge.textContent);
                    badge.textContent = count - 1;
                    
                    // Remove event card
                    eventCard.remove();
                    
                    // Show toast notification
                    showToast('Your registration has been cancelled');
                }
            });
        });
    }

    // Quick Actions Toggle and Menu
    const quickActionToggles = document.querySelectorAll('.quick-action-toggle');
    
    quickActionToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click from closing the menu
            
            const menu = toggle.nextElementSibling;
            const isVisible = menu.style.opacity === '1';
            
            // Close all other menus
            document.querySelectorAll('.quick-action-menu').forEach(m => {
                if (m !== menu) {
                    gsap.to(m, {
                        opacity: 0,
                        y: 10,
                        duration: 0.3,
                        onComplete: () => {
                            m.style.visibility = 'hidden';
                        }
                    });
                }
            });
            
            if (isVisible) {
                // Hide menu
                gsap.to(menu, {
                    opacity: 0,
                    y: 10,
                    duration: 0.3,
                    onComplete: () => {
                        menu.style.visibility = 'hidden';
                    }
                });
            } else {
                // Show menu
                menu.style.visibility = 'visible';
                gsap.fromTo(menu,
                    { opacity: 0, y: 10 },
                    { 
                        opacity: 1, 
                        y: 5, 
                        duration: 0.3,
                        ease: 'power2.out'
                    }
                );
                
                // Animate menu items in sequence
                const menuItems = menu.querySelectorAll('.quick-action-item');
                gsap.fromTo(menuItems,
                    { opacity: 0, x: -10 },
                    { 
                        opacity: 1, 
                        x: 0, 
                        duration: 0.2,
                        stagger: 0.05,
                        ease: 'power2.out'
                    }
                );
            }
        });
    });
    
    // Close quick action menu when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.quick-action-menu').forEach(menu => {
            if (menu.style.visibility === 'visible') {
                gsap.to(menu, {
                    opacity: 0,
                    y: 10,
                    duration: 0.3,
                    onComplete: () => {
                        menu.style.visibility = 'hidden';
                    }
                });
            }
        });
    });

    // Toast Notification
    function showToast(message) {
        const toast = document.querySelector('.toast');
        const toastMessage = document.querySelector('.toast-message');
        
        // Set message
        toastMessage.textContent = message;
        
        // Show toast
        toast.classList.add('active');
        
        // Animate toast in
        gsap.fromTo(toast,
            { x: 100, opacity: 0 },
            { 
                x: 0, 
                opacity: 1, 
                duration: 0.5,
                ease: 'back.out(1.7)'
            }
        );
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            gsap.to(toast, {
                x: 100,
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    toast.classList.remove('active');
                }
            });
        }, 3000);
    }
    
    // Close toast on click
    const toastCloseBtn = document.querySelector('.toast-close');
    if (toastCloseBtn) {
        toastCloseBtn.addEventListener('click', () => {
            gsap.to(document.querySelector('.toast'), {
                x: 100,
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    document.querySelector('.toast').classList.remove('active');
                }
            });
        });
    }

    // Initialize Three.js Particle Background
    try {
        initParticles();
    } catch (error) {
        console.warn("Could not initialize particle background", error);
    }
}); 