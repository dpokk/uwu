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

    // Team Registration Modal
    const teamButtons = document.querySelectorAll('.team-rsvp');
    const teamModal = document.querySelector('.modal-overlay');
    const teamModalClose = document.querySelectorAll('.modal-close');
    
    teamButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get event details from the card
            const eventCard = button.closest('.event-card');
            const eventTitle = eventCard.querySelector('.event-title').textContent;
            const eventTime = eventCard.querySelector('.event-time').textContent;
            const eventLocation = eventCard.querySelector('.event-location').textContent;
            
            // Update modal with event details
            document.querySelector('.event-title-modal').textContent = eventTitle;
            document.querySelector('.event-details-modal').textContent = `July 15, ${eventTime} at ${eventLocation}`;
            
            // Show modal with animation
            teamModal.classList.add('active');
            
            // Prevent body scrolling
            document.body.style.overflow = 'hidden';
        });
    });
    
    teamModalClose.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            // Close any open modals
            document.querySelectorAll('.modal-overlay').forEach(modal => {
                modal.classList.remove('active');
            });
            
            // Re-enable scrolling
            document.body.style.overflow = 'auto';
        });
    });

    // Click outside to close modals
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
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

    // RSVP Button Functionality
    const rsvpButtons = document.querySelectorAll('.event-rsvp');
    
    rsvpButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Change button state
            this.innerHTML = '<span>Registered ✓</span>';
            this.style.backgroundColor = 'var(--color-success)';
            this.disabled = true;
            
            // Show success toast
            showToast('Your RSVP was successful!');
        });
    });

    // Toast Notification Function
    function showToast(message) {
        const toast = document.querySelector('.toast');
        const toastMessage = document.querySelector('.toast-message');
        
        // Update message
        toastMessage.textContent = message;
        
        // Show toast
        toast.classList.add('active');
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    }
    
    // Close toast on click
    const toastCloseBtn = document.querySelector('.toast-close');
    if (toastCloseBtn) {
        toastCloseBtn.addEventListener('click', () => {
            document.querySelector('.toast').classList.remove('active');
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
}); 