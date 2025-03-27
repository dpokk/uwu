/**
 * Team Registration Module
 * Handles all team registration functionality for campus events
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const teamRegModal = document.getElementById('team-registration-modal');
    const teamRegForm = document.getElementById('teamRegistrationForm');
    const teamMemberList = document.querySelector('.team-member-list');
    const addMemberBtn = document.querySelector('.add-member-btn');
    const currentMembersSpan = document.querySelector('.current-members');
    const maxMembersSpan = document.querySelector('.max-members');
    
    // Initialize
    if (teamRegModal) {
        initTeamRegistration();
    }
    
    /**
     * Initialize team registration components
     */
    function initTeamRegistration() {
        // Set user email from localStorage if available
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail && teamRegForm) {
            const leaderInput = teamRegForm.querySelector('.team-leader input');
            if (leaderInput) {
                leaderInput.value = userEmail;
            }
        }
        
        // Add event listeners
        if (addMemberBtn) {
            addMemberBtn.addEventListener('click', addTeamMember);
        }
        
        if (teamRegForm) {
            teamRegForm.addEventListener('submit', handleTeamRegistration);
        }
    }
    
    /**
     * Add a new team member input field
     */
    function addTeamMember() {
        const currentMembers = parseInt(currentMembersSpan.textContent);
        const maxMembers = parseInt(maxMembersSpan.textContent);
        
        if (currentMembers < maxMembers) {
            // Create new member element
            const newMember = document.createElement('div');
            newMember.classList.add('team-member');
            newMember.innerHTML = `
                <input type="email" placeholder="Member email" name="member${currentMembers + 1}" required>
                <button type="button" class="remove-member">
                    <svg viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                    </svg>
                </button>
            `;
            
            // Add remove event listener
            const removeBtn = newMember.querySelector('.remove-member');
            removeBtn.addEventListener('click', () => removeTeamMember(newMember));
            
            // Add to DOM
            teamMemberList.appendChild(newMember);
            
            // Animate entry
            gsap.from(newMember, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            // Update count
            currentMembersSpan.textContent = currentMembers + 1;
            
            // Disable add button if max reached
            if (currentMembers + 1 >= maxMembers) {
                addMemberBtn.disabled = true;
                addMemberBtn.classList.add('disabled');
            }
        }
    }
    
    /**
     * Remove a team member input field
     * @param {HTMLElement} memberElement - The team member element to remove
     */
    function removeTeamMember(memberElement) {
        const currentMembers = parseInt(currentMembersSpan.textContent);
        
        // Animate removal
        gsap.to(memberElement, {
            opacity: 0,
            y: -20,
            height: 0,
            marginBottom: 0,
            paddingTop: 0,
            paddingBottom: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                // Remove from DOM
                memberElement.remove();
                
                // Update count
                currentMembersSpan.textContent = currentMembers - 1;
                
                // Re-enable add button
                if (addMemberBtn.disabled) {
                    addMemberBtn.disabled = false;
                    addMemberBtn.classList.remove('disabled');
                }
                
                // Reorganize remaining members (update names)
                reorganizeMembers();
            }
        });
    }
    
    /**
     * Reorganize team member indices after removal
     */
    function reorganizeMembers() {
        const memberInputs = teamMemberList.querySelectorAll('.team-member:not(.team-leader) input');
        memberInputs.forEach((input, index) => {
            input.name = `member${index + 1}`;
        });
    }
    
    /**
     * Handle team registration form submission
     * @param {Event} e - Form submit event
     */
    function handleTeamRegistration(e) {
        e.preventDefault();
        
        // Check if user is logged in
        if (!localStorage.getItem('token')) {
            window.location.href = 'login.html';
            return;
        }
        
        // Collect form data
        const formData = new FormData(teamRegForm);
        const teamName = formData.get('teamName');
        const leaderEmail = formData.get('leader');
        
        // Collect member emails
        const teamEmails = [leaderEmail];
        const memberInputs = teamMemberList.querySelectorAll('.team-member:not(.team-leader) input');
        
        memberInputs.forEach(input => {
            if (input.value) {
                teamEmails.push(input.value);
            }
        });
        
        // Event details from modal
        const eventTitle = document.querySelector('.event-title-modal').textContent;
        const eventDetails = document.querySelector('.event-details-modal').textContent;
        
        // Validate emails
        const invalidEmails = teamEmails.filter(email => !isValidEmail(email));
        if (invalidEmails.length > 0) {
            showToast('Please enter valid email addresses for all team members');
            return;
        }
        
        // Show loading state
        const submitBtn = teamRegForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = 'Registering...';
        submitBtn.disabled = true;
        
        // Register the team
        registerTeam(eventTitle, teamName, teamEmails)
            .then(result => {
                // Show success message
                showToast('Team registered successfully!');
                
                // Close modal
                closeModal();
                
                // Update UI: mark this event as registered
                updateEventRegistrationStatus(eventTitle);
            })
            .catch(error => {
                console.error('Team registration error:', error);
                showToast('Failed to register team. Please try again.');
            })
            .finally(() => {
                // Reset button
                submitBtn.innerHTML = 'Register Team';
                submitBtn.disabled = false;
            });
    }
    
    /**
     * Register team with the backend
     * @param {string} eventTitle - Event title
     * @param {string} teamName - Team name
     * @param {Array} teamEmails - Array of team member emails
     * @returns {Promise} - Promise resolving to registration result
     */
    async function registerTeam(eventTitle, teamName, teamEmails) {
        try {
            // For demo: store in localStorage
            const registeredTeams = JSON.parse(localStorage.getItem('registeredTeams') || '[]');
            
            // Create team record
            const teamRecord = {
                id: Date.now().toString(),
                eventTitle,
                teamName,
                members: teamEmails,
                registeredAt: new Date().toISOString()
            };
            
            // Add to local storage
            registeredTeams.push(teamRecord);
            localStorage.setItem('registeredTeams', JSON.stringify(registeredTeams));
            
            // In a real implementation, this would be an API call to Supabase
            return { success: true, teamId: teamRecord.id };
        } catch (error) {
            console.error('Error registering team:', error);
            throw error;
        }
    }
    
    /**
     * Update UI to mark event as registered
     * @param {string} eventTitle - Title of the event
     */
    function updateEventRegistrationStatus(eventTitle) {
        // Find the event card matching this title
        const eventCards = document.querySelectorAll('.event-card');
        eventCards.forEach(card => {
            const cardTitle = card.querySelector('.event-title');
            if (cardTitle && cardTitle.textContent === eventTitle) {
                // Find registration button
                const rsvpBtn = card.querySelector('.team-rsvp');
                if (rsvpBtn) {
                    // Update button appearance
                    rsvpBtn.innerHTML = 'Registered';
                    rsvpBtn.classList.add('registered');
                    rsvpBtn.disabled = true;
                }
            }
        });
    }
    
    /**
     * Close team registration modal
     */
    function closeModal() {
        if (teamRegModal) {
            // Animate out
            gsap.to(teamRegModal, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    teamRegModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    
                    // Reset form
                    if (teamRegForm) {
                        teamRegForm.reset();
                        
                        // Remove added members
                        const addedMembers = teamMemberList.querySelectorAll('.team-member:not(.team-leader)');
                        addedMembers.forEach(member => member.remove());
                        
                        // Reset counter
                        if (currentMembersSpan) {
                            currentMembersSpan.textContent = '1';
                        }
                        
                        // Enable add button
                        if (addMemberBtn) {
                            addMemberBtn.disabled = false;
                            addMemberBtn.classList.remove('disabled');
                        }
                    }
                }
            });
        }
    }
    
    /**
     * Show toast notification
     * @param {string} message - Message to display
     */
    function showToast(message) {
        // Find toast element
        const toast = document.querySelector('.toast');
        const toastMessage = document.querySelector('.toast-message');
        
        if (toast && toastMessage) {
            // Set message
            toastMessage.textContent = message;
            
            // Show toast
            toast.classList.add('visible');
            
            // Hide after 3 seconds
            setTimeout(() => {
                toast.classList.remove('visible');
            }, 3000);
        }
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