document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        gsap.to(preloader, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                preloader.style.display = 'none';
                
                // Show content with animation when preloader is done
                showContent();
            }
        });
    });

    // Show page content with animations
    function showContent() {
        // Hide skeleton and show events grid
        setTimeout(() => {
            document.querySelector('.skeleton-container').style.display = 'none';
            const eventsGrid = document.querySelector('.events-grid');
            eventsGrid.style.display = 'grid';
            
            // Animate in event cards
            gsap.from('.event-card', {
                y: 50,
                opacity: 0,
                duration: 0.7,
                stagger: 0.1,
                ease: 'back.out(1.2)'
            });
        }, 800); // Delay to simulate data loading
    }

    // Sticky Navigation
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // View Toggle (Grid/List)
    const viewButtons = document.querySelectorAll('.view-btn');
    const eventsGrid = document.querySelector('.events-grid');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            viewButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Toggle view mode
            const viewMode = button.dataset.view;
            
            if (viewMode === 'grid') {
                eventsGrid.classList.remove('list-view');
                gsap.to('.event-card', {
                    height: 'auto',
                    width: '100%',
                    duration: 0.5,
                    ease: 'power2.out'
                });
            } else if (viewMode === 'list') {
                eventsGrid.classList.add('list-view');
                gsap.to('.event-card', {
                    height: '150px',
                    width: '100%',
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });
    });

    // Handle Team Registration Button Clicks 
    const teamButtons = document.querySelectorAll('.team-rsvp');
    const teamRegModal = document.getElementById('team-registration-modal');
    
    teamButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Check if user is logged in
            if (!checkUserLoggedIn()) {
                window.location.href = 'login.html';
                return;
            }
            
            // Get event details from the card
            const eventCard = button.closest('.event-card');
            const eventTitle = eventCard.querySelector('.event-title').textContent;
            const eventTime = eventCard.querySelector('.event-time').textContent;
            const eventLocation = eventCard.querySelector('.event-location').textContent;
            const eventDescription = eventCard.querySelector('.event-description').textContent;
            
            // Update modal with event details
            document.querySelector('.event-title-modal').textContent = eventTitle;
            document.querySelector('.event-details-modal').textContent = `${eventDescription} (${eventLocation}, ${eventTime})`;
            
            // Pre-fill user email if available in localStorage
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) {
                const leaderInput = document.querySelector('.team-leader input');
                if (leaderInput) {
                    leaderInput.value = userEmail;
                }
            }
            
            // Show modal with animation
            teamRegModal.style.display = 'flex';
            gsap.fromTo(teamRegModal, 
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: 'power1.out' }
            );
            
            // Animate content
            const modalContent = teamRegModal.querySelector('.modal-content');
            gsap.fromTo(modalContent,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.3, delay: 0.1, ease: 'back.out(1.7)' }
            );
            
            // Prevent body scrolling
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal button handlers
    const closeModalBtns = document.querySelectorAll('.close-modal');
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', closeTeamModal);
    });
    
    // Close team registration modal function
    function closeTeamModal() {
        const teamRegModal = document.getElementById('team-registration-modal');
        
        // Animate out
        gsap.to(teamRegModal, {
            opacity: 0, 
            duration: 0.3,
            onComplete: () => {
                teamRegModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Click outside team modal to close
    teamRegModal.addEventListener('click', (e) => {
        if (e.target === teamRegModal) {
            closeTeamModal();
        }
    });

    // Team Member Management
    const addMemberBtn = document.querySelector('.add-member-btn');
    const teamMemberList = document.querySelector('.team-member-list');
    const currentMembersSpan = document.querySelector('.current-members');
    const maxMembers = parseInt(document.querySelector('.max-members').textContent);
    
    let currentMembers = 1;
    
    // Add new team member field
    addMemberBtn.addEventListener('click', () => {
        if (currentMembers < maxMembers) {
            currentMembers++;
            
            // Create new member input
            const newMember = document.createElement('div');
            newMember.classList.add('team-member');
            newMember.innerHTML = `
                <input type="email" placeholder="Member email" name="member${currentMembers}" required>
                <button type="button" class="remove-member">
                    <svg viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                    </svg>
                </button>
            `;
            
            // Append to the list with animation
            teamMemberList.appendChild(newMember);
            
            // Animate the new member field
            gsap.from(newMember, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            // Update counter
            currentMembersSpan.textContent = currentMembers;
            
            // Add event listener for the remove button
            const removeBtn = newMember.querySelector('.remove-member');
            removeBtn.addEventListener('click', handleRemoveMember);
            
            // Check if max members reached
            if (currentMembers >= maxMembers) {
                addMemberBtn.disabled = true;
                addMemberBtn.style.opacity = '0.5';
            }
        }
    });
    
    // Function to handle removing team members
    function handleRemoveMember() {
        const memberElement = this.closest('.team-member');
        
        // Animate removal
        gsap.to(memberElement, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                memberElement.remove();
                currentMembers--;
                currentMembersSpan.textContent = currentMembers;
                
                // Re-enable add button if below max
                if (currentMembers < maxMembers) {
                    addMemberBtn.disabled = false;
                    addMemberBtn.style.opacity = '1';
                }
            }
        });
    }
    
    // Add event listeners to existing remove buttons
    document.querySelectorAll('.remove-member').forEach(btn => {
        btn.addEventListener('click', handleRemoveMember);
    });

    // Form Validation with Animation
    const teamForm = document.getElementById('teamForm');
    if (teamForm) {
        teamForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            let isValid = true;
            const requiredInputs = this.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    
                    // Shake animation for invalid fields
                    gsap.to(input, {
                        x: [-10, 10, -10, 10, 0],
                        duration: 0.5,
                        ease: 'power2.inOut'
                    });
                    
                    // Highlight invalid fields
                    input.style.borderColor = 'var(--color-error)';
                    input.style.boxShadow = '0 0 0 2px rgba(220, 53, 69, 0.25)';
                }
            });
            
            // If form is valid, process submission
            if (isValid) {
                // Close modal with success animation
                gsap.to('.team-modal', {
                    y: -20,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.in',
                    onComplete: () => {
                        document.querySelector('.modal-overlay').classList.remove('active');
                        document.body.style.overflow = 'auto';
                        
                        // Show success toast
                        showToast('Your team has been registered successfully!');
                        
                        // Reset form
                        teamForm.reset();
                        
                        // Reset team members
                        const memberElements = document.querySelectorAll('.team-member');
                        for (let i = 1; i < memberElements.length; i++) {
                            memberElements[i].remove();
                        }
                        currentMembers = 1;
                        currentMembersSpan.textContent = '1';
                        addMemberBtn.disabled = false;
                        addMemberBtn.style.opacity = '1';
                    }
                });
            }
        });
        
        // Remove error styling on input focus
        teamForm.querySelectorAll('input').forEach(input => {
            input.addEventListener('focus', function() {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            });
        });
    }

    // Share Button Functionality
    const shareButtons = document.querySelectorAll('.share-btn');
    const shareModal = document.querySelector('.share-overlay');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Get event details
            const eventCard = button.closest('.event-card');
            const eventTitle = eventCard.querySelector('.event-title').textContent;
            
            // Update share modal
            document.querySelector('.share-event-title').textContent = eventTitle;
            
            // Show share modal
            shareModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Copy link functionality
    const copyLinkBtn = document.querySelector('.copy-link-btn');
    const shareLinkInput = document.querySelector('.share-link');
    
    if (copyLinkBtn && shareLinkInput) {
        copyLinkBtn.addEventListener('click', () => {
            shareLinkInput.select();
            document.execCommand('copy');
            
            // Change button text temporarily
            const originalText = copyLinkBtn.innerHTML;
            copyLinkBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path></svg><span>Copied!</span>';
            
            setTimeout(() => {
                copyLinkBtn.innerHTML = originalText;
            }, 2000);
            
            // Show toast
            showToast('Link copied to clipboard!');
        });
    }

    // Single Person RSVP Functionality
    const singleRsvpButtons = document.querySelectorAll('.single-rsvp');
    
    singleRsvpButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Check if user is logged in
            const isLoggedIn = checkUserLoggedIn();
            
            if (!isLoggedIn) {
                // Redirect to login page if not logged in
                window.location.href = 'login.html';
                return;
            }
            
            // Get event details from the card
            const eventCard = button.closest('.event-card');
            const eventTitle = eventCard.querySelector('.event-title').textContent;
            const eventId = eventCard.dataset.eventId;
            
            // Show loading state
            const originalText = button.textContent;
            button.textContent = 'Processing...';
            button.disabled = true;
            
            // Simulate API call to register for event
            setTimeout(() => {
                // Register for event in database
                registerForEvent(eventId, eventTitle)
                    .then(() => {
                        // Update button state
                        button.textContent = 'Registered';
                        button.classList.add('registered');
                        button.disabled = true;
                        
                        // Show success message
                        showToast(`Successfully registered for ${eventTitle}`);
                    })
                    .catch(error => {
                        // Show error message
                        showToast(error.message || 'Failed to register. Please try again.');
                        
                        // Reset button
                        button.textContent = originalText;
                        button.disabled = false;
                    });
            }, 1000);
        });
    });

    // Team Registration Form Submission
    const teamRegForm = document.getElementById('teamRegistrationForm');
    
    if (teamRegForm) {
        teamRegForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Check if user is logged in
            const isLoggedIn = checkUserLoggedIn();
            
            if (!isLoggedIn) {
                // Redirect to login page if not logged in
                window.location.href = 'login.html';
                return;
            }
            
            // Get event title from modal
            const eventTitle = document.querySelector('.event-title-modal').textContent;
            
            // Collect all team member emails
            const teamEmails = [];
            const emailInputs = document.querySelectorAll('.team-member input[type="email"]');
            
            emailInputs.forEach(input => {
                if (input.value.trim()) {
                    teamEmails.push(input.value.trim());
                }
            });
            
            // Validate emails
            const invalidEmails = teamEmails.filter(email => !isValidEmail(email));
            
            if (invalidEmails.length > 0) {
                showToast('Please enter valid email addresses for all team members');
                return;
            }
            
            // Show loading state
            const submitBtn = teamRegForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            
            // Simulate API call to register team
            setTimeout(() => {
                // Register team for event in database
                registerTeamForEvent(eventTitle, teamEmails)
                    .then(() => {
                        // Close modal
                        document.querySelector('.modal-overlay').classList.remove('active');
                        document.body.style.overflow = 'auto';
                        
                        // Show success message
                        showToast(`Team successfully registered for ${eventTitle}`);
                        
                        // Reset form
                        teamRegForm.reset();
                        
                        // Update corresponding button
                        const eventCards = document.querySelectorAll('.event-card');
                        eventCards.forEach(card => {
                            if (card.querySelector('.event-title').textContent === eventTitle) {
                                const rsvpBtn = card.querySelector('.team-rsvp');
                                if (rsvpBtn) {
                                    rsvpBtn.textContent = 'Registered';
                                    rsvpBtn.classList.add('registered');
                                    rsvpBtn.disabled = true;
                                }
                            }
                        });
                    })
                    .catch(error => {
                        // Show error message
                        showToast(error.message || 'Failed to register team. Please try again.');
                    })
                    .finally(() => {
                        // Reset button
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    });
            }, 1500);
        });
    }

    // Toast Notification Function
    function showToast(message) {
        const toastContainer = document.querySelector('.toast-container');
        const toast = document.querySelector('.success-toast');
        const toastMessage = document.querySelector('.toast-message');
        
        if (toast && toastMessage) {
            // Update message
            toastMessage.textContent = message;
            
            // Show toast
            toast.classList.add('visible');
            
            // Hide toast after 3 seconds
            setTimeout(() => {
                toast.classList.remove('visible');
            }, 3000);
        }
    }
    
    // Close toast button
    const toastCloseBtn = document.querySelector('.toast-close');
    if (toastCloseBtn) {
        toastCloseBtn.addEventListener('click', () => {
            document.querySelector('.success-toast').classList.remove('visible');
        });
    }

    // Initialize Three.js Particle Background
    try {
        initParticles();
    } catch (error) {
        console.warn("Could not initialize particle background", error);
    }

    function initParticles() {
        const particleContainer = document.getElementById('particle-container');
        if (!particleContainer || !window.THREE) return;
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        particleContainer.appendChild(renderer.domElement);
        
        // Create particles with a subtle blue color
        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = window.innerWidth < 768 ? 500 : 1000;
        
        const posArray = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.01,
            color: 0x2705d1,
            transparent: true,
            blending: THREE.AdditiveBlending,
            opacity: 0.4
        });
        
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        
        camera.position.z = 3;
        
        // Mouse movement effect
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });
        
        // Resize handler
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            
            particlesMesh.rotation.x += 0.0001;
            particlesMesh.rotation.y += 0.0002;
            
            // Follow mouse with subtle effect
            particlesMesh.rotation.x += mouseY * 0.0001;
            particlesMesh.rotation.y += mouseX * 0.0001;
            
            renderer.render(scene, camera);
        };
        
        animate();
    }

    /**
     * Check if user is logged in
     * @returns {boolean} - True if user is logged in
     */
    function checkUserLoggedIn() {
        // In a real implementation, this would check with the auth system
        // For now, we'll just check if there's a token in localStorage
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        return token !== null && userId !== null;
    }

    /**
     * Register for an event (single person)
     * @param {string} eventId - Event ID
     * @param {string} eventTitle - Event title for display purposes
     * @returns {Promise} - Promise that resolves when registration is complete
     */
    async function registerForEvent(eventId, eventTitle) {
        // In a real implementation, this would call the API
        // For now, we'll just simulate a successful registration
        return new Promise((resolve, reject) => {
            try {
                // Simulate API call to Supabase
                const userId = localStorage.getItem('userId');
                console.log(`Registering user ${userId} for event: ${eventId} - ${eventTitle}`);
                
                // Store in localStorage for demo purposes
                let registeredEvents = JSON.parse(localStorage.getItem('registeredEvents') || '[]');
                registeredEvents.push({ eventId, eventTitle, registeredAt: new Date().toISOString() });
                localStorage.setItem('registeredEvents', JSON.stringify(registeredEvents));
                
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Register a team for an event
     * @param {string} eventTitle - Event title
     * @param {Array} teamEmails - Array of team member emails
     * @returns {Promise} - Promise that resolves when registration is complete
     */
    async function registerTeamForEvent(eventTitle, teamEmails) {
        // In a real implementation, this would call the API
        // For now, we'll just simulate a successful registration
        return new Promise((resolve, reject) => {
            try {
                // Simulate API call to Supabase
                const userId = localStorage.getItem('userId');
                console.log(`Registering team for ${eventTitle}`);
                console.log('Team members:', teamEmails);
                
                // Store in localStorage for demo purposes
                let registeredTeams = JSON.parse(localStorage.getItem('registeredTeams') || '[]');
                registeredTeams.push({ 
                    eventTitle, 
                    teamMembers: teamEmails, 
                    registeredAt: new Date().toISOString() 
                });
                localStorage.setItem('registeredTeams', JSON.stringify(registeredTeams));
                
                resolve();
            } catch (error) {
                reject(error);
            }
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
}); 