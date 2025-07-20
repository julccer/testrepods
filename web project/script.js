/**
 * Toggles the navigation menu's visibility when the hamburger icon is clicked.
 */
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Attach event listener to hamburger icon
document.querySelector('.hamburger').addEventListener('click', toggleMenu);

/**
 * Implements smooth scrolling for navigation links referencing sections within the page.
 */
document.querySelectorAll('.nav-menu a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            // Optionally close menu after click
            document.querySelector('.nav-menu').classList.remove('active');
        }
    });
});

/**
 * Filters projects by category.
 * @param {string} category - The category to filter by.
 */
function filterProjects(category) {
    document.querySelectorAll('.project').forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = '';
        } else {
            project.style.display = 'none';
        }
    });
}

// Attach event listeners to filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const category = this.dataset.category;
        filterProjects(category);
    });
});

/**
 * Displays project image in a lightbox modal.
 */
function showLightbox(imgSrc) {
    let lightbox = document.querySelector('.lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${imgSrc}" alt="Project Image">
                <span class="lightbox-close">&times;</span>
            </div>
        `;
        document.body.appendChild(lightbox);
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
            lightbox.remove();
        });
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.remove();
        });
    }
}

// Attach event listeners to project images
document.querySelectorAll('.project img').forEach(img => {
    img.addEventListener('click', function() {
        showLightbox(this.src);
    });
});

// Form validation for Contact form
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    const nameInput = contactForm.querySelector('input[name="name"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const messageInput = contactForm.querySelector('textarea[name="message"]');

    function showError(input, message) {
        let error = input.nextElementSibling;
        if (!error || !error.classList.contains('error-message')) {
            error = document.createElement('span');
            error.className = 'error-message';
            input.parentNode.insertBefore(error, input.nextSibling);
        }
        error.textContent = message;
        input.classList.add('input-error');
    }

    function clearError(input) {
        let error = input.nextElementSibling;
        if (error && error.classList.contains('error-message')) {
            error.textContent = '';
        }
        input.classList.remove('input-error');
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validateInput(input) {
        if (input === nameInput && !input.value.trim()) {
            showError(input, 'Name is required.');
            return false;
        }
        if (input === emailInput) {
            if (!input.value.trim()) {
                showError(input, 'Email is required.');
                return false;
            }
            if (!validateEmail(input.value.trim())) {
                showError(input, 'Enter a valid email.');
                return false;
            }
        }
        if (input === messageInput && !input.value.trim()) {
            showError(input, 'Message is required.');
            return false;
        }
        clearError(input);
        return true;
    }

    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', () => validateInput(input));
        input.addEventListener('blur', () => validateInput(input));
    });

    contactForm.addEventListener('submit', function(e) {
        let valid = true;
        [nameInput, emailInput, messageInput].forEach(input => {
            if (!validateInput(input)) valid = false;
        });
        if (!valid) {
            e.preventDefault();
        }
    });
}