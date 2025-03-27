document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        gsap.to(preloader, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                preloader.style.display = 'none';
                initFormAnimations();
            }
        });
    });

    // Initialize GSAP Timeline for form steps
    const formTimeline = gsap.timeline({
        paused: true,
        defaults: { duration: 0.5, ease: 'power2.inOut' }
    });

    // Form and progress tracking
    const form = document.getElementById('eventForm');
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressFill = document.querySelector('.progress-fill');
    const nextBtns = document.querySelectorAll('.step-next');
    const backBtns = document.querySelectorAll('.step-back');
    const submitBtn = document.querySelector('.submit-btn');
    let currentStep = 1;
    const totalSteps = steps.length;

    function initFormAnimations() {
        // Animate progress steps on load
        gsap.from(progressSteps, {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        });
        
        // Setup timeline for progress indicator
        for (let i = 1; i <= totalSteps; i++) {
            const progressPercentage = (i / totalSteps) * 100;
            formTimeline.to(progressFill, {
                width: `${progressPercentage}%`
            }, `step${i}`);
            
            if (i > 1) {
                // Mark previous step as completed
                formTimeline.to(progressSteps[i-2], {
                    onStart: () => {
                        progressSteps[i-2].classList.add('completed');
                    }
                }, `step${i}-=0.4`);
            }
            
            // Update active step
            formTimeline.to(progressSteps, {
                onStart: () => {
                    progressSteps.forEach(step => step.classList.remove('active'));
                    progressSteps[i-1].classList.add('active');
                }
            }, `step${i}`);
        }
        
        // Initialize first step
        formTimeline.progress(0);
    }

    // Next button event listeners
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                goToNextStep();
            } else {
                shakeInvalidInputs();
            }
        });
    });

    // Back button event listeners
    backBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            goToPrevStep();
        });
    });

    // Submit form event
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (validateStep(currentStep)) {
                submitForm();
            } else {
                shakeInvalidInputs();
            }
        });
    }

    // Go to next step
    function goToNextStep() {
        if (currentStep < totalSteps) {
            // Animate current step out
            gsap.to(steps[currentStep - 1], {
                opacity: 0,
                x: -50,
                duration: 0.3,
                onComplete: () => {
                    steps[currentStep - 1].classList.remove('active');
                    
                    // Increment step
                    currentStep++;
                    
                    // Animate next step in
                    steps[currentStep - 1].classList.add('active');
                    gsap.fromTo(steps[currentStep - 1],
                        { opacity: 0, x: 50 },
                        { opacity: 1, x: 0, duration: 0.5 }
                    );
                    
                    // Update timeline progress
                    formTimeline.play(`step${currentStep}`);
                    
                    // Scroll to top of form
                    scrollToFormTop();
                }
            });
        }
    }

    // Go to previous step
    function goToPrevStep() {
        if (currentStep > 1) {
            // Animate current step out
            gsap.to(steps[currentStep - 1], {
                opacity: 0,
                x: 50,
                duration: 0.3,
                onComplete: () => {
                    steps[currentStep - 1].classList.remove('active');
                    
                    // Decrement step
                    currentStep--;
                    
                    // Animate previous step in
                    steps[currentStep - 1].classList.add('active');
                    gsap.fromTo(steps[currentStep - 1],
                        { opacity: 0, x: -50 },
                        { opacity: 1, x: 0, duration: 0.5 }
                    );
                    
                    // Update timeline progress
                    formTimeline.progress(currentStep / totalSteps);
                    
                    // Scroll to top of form
                    scrollToFormTop();
                }
            });
        }
    }

    // Scroll to top of form container
    function scrollToFormTop() {
        const formContainer = document.querySelector('.form-container');
        if (formContainer) {
            formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Form Validation
    function validateStep(step) {
        const currentStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
        const requiredInputs = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        requiredInputs.forEach(input => {
            const validationMessage = input.parentElement.querySelector('.validation-message');
            
            if (!input.value.trim()) {
                isValid = false;
                if (validationMessage) {
                    validationMessage.textContent = 'This field is required';
                    validationMessage.classList.add('error');
                }
                input.classList.add('invalid');
            } else {
                if (validationMessage) {
                    validationMessage.textContent = '';
                    validationMessage.classList.remove('error');
                }
                input.classList.remove('invalid');
            }
            
            // Specific validations
            if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    if (validationMessage) {
                        validationMessage.textContent = 'Please enter a valid email address';
                        validationMessage.classList.add('error');
                    }
                    input.classList.add('invalid');
                }
            }
        });
        
        return isValid;
    }

    // Shake animation for invalid inputs
    function shakeInvalidInputs() {
        const invalidInputs = document.querySelectorAll('.invalid');
        
        gsap.to(invalidInputs, {
            x: 10,
            duration: 0.1,
            repeat: 3,
            yoyo: true,
            ease: 'power2.inOut'
        });
    }

    // Submit form and show success animation
    function submitForm() {
        // Hide form container
        gsap.to('.form-container', {
            opacity: 0,
            y: -20,
            duration: 0.5,
            onComplete: () => {
                // Show success container
                const successContainer = document.querySelector('.success-container');
                successContainer.style.display = 'flex';
                
                // Animate success checkmark
                gsap.fromTo(successContainer,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.5 }
                );
                
                // Animate success content
                const successAnimation = document.querySelector('.success-animation');
                gsap.fromTo(successAnimation,
                    { scale: 0.8, opacity: 0 },
                    { 
                        scale: 1, 
                        opacity: 1, 
                        duration: 0.7, 
                        ease: 'back.out(1.7)',
                        delay: 0.2
                    }
                );
                
                // Show toast notification
                showToast('Your event has been submitted for approval!');
            }
        });
    }

    // Character counter for description
    const descriptionField = document.getElementById('eventDescription');
    const charCounter = document.querySelector('.current-count');
    const maxCount = document.querySelector('.max-count');
    
    if (descriptionField && charCounter && maxCount) {
        const maxChars = parseInt(maxCount.textContent);
        
        descriptionField.addEventListener('input', () => {
            const currentLength = descriptionField.value.length;
            charCounter.textContent = currentLength;
            
            if (currentLength >= maxChars) {
                charCounter.classList.add('limit-reached');
                descriptionField.value = descriptionField.value.substring(0, maxChars);
                charCounter.textContent = maxChars;
            } else {
                charCounter.classList.remove('limit-reached');
            }
            
            // Animate counter if approaching limit
            if (currentLength > maxChars * 0.8) {
                gsap.to(charCounter, {
                    scale: 1.2,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1
                });
            }
        });
    }

    // Location Type Handling
    const locationTypeRadios = document.querySelectorAll('input[name="locationType"]');
    const locationDependentSections = document.querySelectorAll('.location-dependent');
    
    locationTypeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const selectedType = radio.value;
            
            // Hide all location dependent sections first
            locationDependentSections.forEach(section => {
                if (section.classList.contains(selectedType)) {
                    // Show selected section
                    gsap.fromTo(section, 
                        { display: 'block', opacity: 0, height: 0 },
                        { opacity: 1, height: 'auto', duration: 0.5 }
                    );
                } else {
                    // Hide other sections
                    gsap.to(section, {
                        opacity: 0,
                        height: 0,
                        duration: 0.3,
                        onComplete: () => {
                            section.style.display = 'none';
                        }
                    });
                }
            });
            
            // Update map placeholder text based on selection
            const mapPlaceholder = document.querySelector('.map-placeholder p');
            if (mapPlaceholder) {
                if (selectedType === 'on-campus') {
                    mapPlaceholder.textContent = 'Campus location map will appear here';
                } else if (selectedType === 'off-campus') {
                    mapPlaceholder.textContent = 'Off-campus venue map will appear here';
                } else {
                    mapPlaceholder.textContent = 'Virtual events do not have a map preview';
                }
            }
        });
    });

    // Capacity Slider Visualization
    const capacitySlider = document.getElementById('attendeeCapacity');
    const capacityValue = document.getElementById('capacityValue');
    const capacityIcons = document.querySelector('.capacity-icons');
    
    if (capacitySlider && capacityValue && capacityIcons) {
        // Set initial value
        capacityValue.textContent = capacitySlider.value;
        
        // Generate capacity visualization
        generateCapacityIcons(parseInt(capacitySlider.value));
        
        // Update on slider change
        capacitySlider.addEventListener('input', () => {
            capacityValue.textContent = capacitySlider.value;
            generateCapacityIcons(parseInt(capacitySlider.value));
            
            // Animate the value change
            gsap.fromTo(capacityValue,
                { scale: 1.2, color: '#2705d1' },
                { scale: 1, color: 'inherit', duration: 0.5 }
            );
        });
    }
    
    function generateCapacityIcons(capacity) {
        // Clear existing icons
        if (capacityIcons) {
            capacityIcons.innerHTML = '';
            
            // Determine how many icons to show (max 50)
            const iconCount = Math.min(Math.ceil(capacity / 10), 50);
            
            // Create and append icons with staggered animation
            for (let i = 0; i < iconCount; i++) {
                const icon = document.createElement('div');
                icon.className = 'capacity-icon';
                capacityIcons.appendChild(icon);
                
                // Animate icon appearance
                gsap.fromTo(icon,
                    { scale: 0, opacity: 0 },
                    { 
                        scale: 1, 
                        opacity: 0.8, 
                        duration: 0.3,
                        delay: i * 0.02,
                        ease: 'back.out(1.7)'
                    }
                );
            }
        }
    }

    // Accessibility Options Toggle
    const accessibilityCheckbox = document.getElementById('accessibilityOptions');
    const accessibilityOptions = document.querySelector('.accessibility-options');
    
    if (accessibilityCheckbox && accessibilityOptions) {
        accessibilityCheckbox.addEventListener('change', () => {
            if (accessibilityCheckbox.checked) {
                accessibilityOptions.style.display = 'block';
                gsap.fromTo(accessibilityOptions,
                    { opacity: 0, height: 0 },
                    { opacity: 1, height: 'auto', duration: 0.5 }
                );
            } else {
                gsap.to(accessibilityOptions, {
                    opacity: 0,
                    height: 0,
                    duration: 0.3,
                    onComplete: () => {
                        accessibilityOptions.style.display = 'none';
                    }
                });
            }
        });
    }

    // Event Tags Selection
    const tagOptions = document.querySelectorAll('.tag-option');
    const selectedTagsContainer = document.querySelector('.selected-tags');
    const tagsInput = document.getElementById('eventTags');
    const selectedTags = new Set();
    
    tagOptions.forEach(tag => {
        tag.addEventListener('click', () => {
            const tagValue = tag.dataset.tag;
            
            if (selectedTags.has(tagValue)) {
                // Remove tag
                selectedTags.delete(tagValue);
                tag.classList.remove('selected');
                
                // Remove from visual selection
                const selectedTag = document.querySelector(`.selected-tag[data-tag="${tagValue}"]`);
                if (selectedTag) {
                    gsap.to(selectedTag, {
                        opacity: 0,
                        x: -10,
                        duration: 0.2,
                        onComplete: () => {
                            selectedTag.remove();
                        }
                    });
                }
            } else {
                // Add tag
                selectedTags.add(tagValue);
                tag.classList.add('selected');
                
                // Add to visual selection
                const selectedTag = document.createElement('div');
                selectedTag.className = 'selected-tag';
                selectedTag.dataset.tag = tagValue;
                selectedTag.innerHTML = `
                    ${tagValue}
                    <span class="remove-tag">×</span>
                `;
                selectedTagsContainer.appendChild(selectedTag);
                
                // Animate the tag addition
                gsap.fromTo(selectedTag,
                    { opacity: 0, x: -10 },
                    { opacity: 1, x: 0, duration: 0.3, ease: 'back.out(1.7)' }
                );
                
                // Add remove event listener
                const removeBtn = selectedTag.querySelector('.remove-tag');
                removeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    selectedTags.delete(tagValue);
                    tag.classList.remove('selected');
                    
                    gsap.to(selectedTag, {
                        opacity: 0,
                        x: -10,
                        duration: 0.2,
                        onComplete: () => {
                            selectedTag.remove();
                            updateTagsInput();
                        }
                    });
                });
            }
            
            // Update hidden input value
            updateTagsInput();
        });
    });
    
    function updateTagsInput() {
        if (tagsInput) {
            tagsInput.value = Array.from(selectedTags).join(',');
        }
    }

    // Image Upload Preview
    const eventBanner = document.getElementById('eventBanner');
    const bannerPreview = document.getElementById('bannerPreview');
    const removeBanner = document.getElementById('removeBanner');
    
    if (eventBanner && bannerPreview) {
        eventBanner.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const uploadPlaceholder = bannerPreview.previousElementSibling;
                    
                    // Hide placeholder and show preview
                    uploadPlaceholder.style.display = 'none';
                    bannerPreview.style.display = 'block';
                    bannerPreview.src = e.target.result;
                    
                    // Show remove button
                    if (removeBanner) {
                        removeBanner.style.display = 'inline-flex';
                    }
                    
                    // Animate image appearance
                    gsap.fromTo(bannerPreview,
                        { opacity: 0, scale: 0.9 },
                        { opacity: 1, scale: 1, duration: 0.5 }
                    );
                };
                
                reader.readAsDataURL(this.files[0]);
            }
        });
        
        // Remove banner
        if (removeBanner) {
            removeBanner.addEventListener('click', () => {
                const uploadPlaceholder = bannerPreview.previousElementSibling;
                
                // Animate image removal
                gsap.to(bannerPreview, {
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.3,
                    onComplete: () => {
                        // Clear file input
                        eventBanner.value = '';
                        
                        // Hide preview and show placeholder
                        bannerPreview.style.display = 'none';
                        uploadPlaceholder.style.display = 'flex';
                        
                        // Hide remove button
                        removeBanner.style.display = 'none';
                    }
                });
            });
        }
    }

    // Additional Photos Upload
    const additionalPhotos = document.getElementById('additionalPhotos');
    const photoPreviews = document.querySelector('.photo-previews');
    
    if (additionalPhotos && photoPreviews) {
        additionalPhotos.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                // Only allow up to 5 photos
                const maxPhotos = 5;
                const filesToProcess = Array.from(this.files).slice(0, maxPhotos);
                
                // Process each file
                filesToProcess.forEach((file, index) => {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        // Create photo preview element
                        const photoPreview = document.createElement('div');
                        photoPreview.className = 'photo-preview';
                        photoPreview.innerHTML = `
                            <img src="${e.target.result}" alt="Preview">
                            <div class="remove-photo">
                                <svg viewBox="0 0 24 24">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                                </svg>
                            </div>
                        `;
                        photoPreviews.appendChild(photoPreview);
                        
                        // Hide placeholder if it's the first photo
                        if (photoPreviews.previousElementSibling && index === 0) {
                            photoPreviews.previousElementSibling.style.display = 'none';
                        }
                        
                        // Animate photo appearance with stagger
                        gsap.fromTo(photoPreview,
                            { opacity: 0, scale: 0.8 },
                            { 
                                opacity: 1, 
                                scale: 1, 
                                duration: 0.3,
                                delay: index * 0.1,
                                ease: 'back.out(1.7)'
                            }
                        );
                        
                        // Remove photo functionality
                        const removeBtn = photoPreview.querySelector('.remove-photo');
                        removeBtn.addEventListener('click', () => {
                            gsap.to(photoPreview, {
                                opacity: 0,
                                scale: 0.8,
                                duration: 0.2,
                                onComplete: () => {
                                    photoPreview.remove();
                                    
                                    // Show placeholder if no photos left
                                    if (photoPreviews.children.length === 0 && photoPreviews.previousElementSibling) {
                                        photoPreviews.previousElementSibling.style.display = 'flex';
                                    }
                                }
                            });
                        });
                    };
                    
                    reader.readAsDataURL(file);
                });
            }
        });
    }

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