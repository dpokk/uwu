// Make sure this code runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // First, let's add the progress bar HTML if it doesn't exist
    const form = document.querySelector('form');
    
    if (!document.querySelector('.progress-container')) {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        progressContainer.innerHTML = `
            <div class="progress-text">0/0 fields completed</div>
            <div class="progress-bar-container">
                <div class="progress-bar"></div>
            </div>
        `;
        
        // Insert progress container before the form
        form.parentNode.insertBefore(progressContainer, form);
    }
    
    // Add CSS styles dynamically if they're not already in your stylesheet
    if (!document.getElementById('progress-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'progress-styles';
        styleElement.textContent = `
            .progress-container {
                width: 100%;
                max-width: 500px;
                margin: 20px auto;
            }
            
            .progress-text {
                font-size: 14px;
                margin-bottom: 5px;
                text-align: center;
                color: #555;
            }
            
            .progress-bar-container {
                width: 100%;
                background-color: #f1f1f1;
                border-radius: 5px;
                height: 10px;
                overflow: hidden;
            }
            
            .progress-bar {
                height: 100%;
                background: linear-gradient(to right, #4CAF50, #2196F3);
                width: 0%;
                transition: width 0.5s ease-in-out;
                border-radius: 5px;
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // Function to update progress animation
    function updateProgressAnimation() {
        console.log('Updating progress animation'); // Debug log
        
        const formFields = form.querySelectorAll('input, select, textarea');
        const totalFields = formFields.length;
        let filledFields = 0;
        
        formFields.forEach(field => {
            if (field.value.trim() !== '') {
                filledFields++;
                console.log(`Field ${field.name || field.id} is filled`); // Debug log
            }
        });
        
        const progressPercentage = totalFields > 0 ? (filledFields / totalFields) * 100 : 0;
        console.log(`Progress: ${filledFields}/${totalFields} (${progressPercentage}%)`); // Debug log
        
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = progressPercentage + '%';
        }
        
        const progressText = document.querySelector('.progress-text');
        if (progressText) {
            progressText.textContent = `${filledFields}/${totalFields} fields completed`;
        }
    }
    
    // Add event listeners to all form fields
    form.querySelectorAll('input, select, textarea').forEach(field => {
        // Remove any existing listeners to avoid duplicates
        field.removeEventListener('input', updateProgressAnimation);
        field.removeEventListener('change', updateProgressAnimation);
        
        // Add listeners
        field.addEventListener('input', updateProgressAnimation);
        field.addEventListener('change', updateProgressAnimation);
        console.log(`Added event listeners to field: ${field.name || field.id}`); // Debug log
    });
    
    // Initial update
    updateProgressAnimation();
    
    // Form submission handler (no Supabase)
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get the email field
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput ? emailInput.value.trim() : '';
        
        // Check if email validation is required and valid
        let shouldRedirect = true;
        
        if (emailInput) {
            const isValidEmail = email.endsWith('@bmsit.in');
            if (!isValidEmail) {
                shouldRedirect = false;
                // Display warning for invalid email domain
                let warningElement = document.getElementById('email-warning');
                if (!warningElement) {
                    warningElement = document.createElement('div');
                    warningElement.id = 'email-warning';
                    warningElement.className = 'warning-message';
                    warningElement.style.color = 'red';
                    warningElement.style.fontSize = '12px';
                    warningElement.style.marginTop = '5px';
                    emailInput.parentNode.appendChild(warningElement);
                }
                warningElement.textContent = 'Email must use the bmsit.in domain';
                warningElement.style.display = 'block';
            }
        }
        
        if (shouldRedirect) {
            // Redirect to index.html regardless of other input values
            window.location.href = 'index.html';
        }
    });
    
    console.log('Form animation setup complete'); // Debug log

    // Mobile menu toggle (if not already in your main script)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Optional: Add animation when events cards come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.flip-card').forEach(card => {
        observer.observe(card);
        card.classList.add('fade-in');
    });

    // RSVP Button Functionality
    // Get all RSVP buttons
    const rsvpButtons = document.querySelectorAll('.rsvp-btn');
    
    // Add click event listener to each button
    rsvpButtons.forEach(button => {
        button.addEventListener('click', function() {
            // If button is not already in "registered" state
            if (!this.classList.contains('registered')) {
                // Change text and add registered class
                this.textContent = 'Registered';
                this.classList.add('registered');
                
                // Optional: Add a checkmark icon
                const checkIcon = document.createElement('i');
                checkIcon.className = 'fas fa-check';
                checkIcon.style.marginLeft = '5px';
                this.appendChild(checkIcon);
            }
        });
    });
}); 