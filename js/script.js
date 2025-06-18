// var typed = new Typed(".typing", {
//     strings: ["", "Web Designer", "Web Developer", "Graphic Designer"],
//     typeSpeed: 100,
//     backSpeed: 60,
//     loop: true,
//   });
  

//   const nav = document.querySelector(".nav");
//    navLinks = document.querySelectorAll("li");
//    totalNavLinks = navList.length;
//    for (let i = 0; i < totalNavList; i++) {
//     console.log(navList[i])
//    }
// Responsive Portfolio JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile navigation toggle
    const navToggler = document.querySelector('.logo-toggler');
    const aside = document.querySelector('.aside');
    const navLinks = document.querySelectorAll('.nav li a');
    
    // Create mobile menu toggle functionality
    if (navToggler) {
        navToggler.addEventListener('click', function() {
            aside.classList.toggle('open');
            navToggler.classList.toggle('open');
        });
    }
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                aside.classList.remove('open');
                navToggler.classList.remove('open');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 768) {
            if (!aside.contains(e.target) && !navToggler.contains(e.target)) {
                aside.classList.remove('open');
                navToggler.classList.remove('open');
            }
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active section highlighting on scroll
    function updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('.section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav a[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }
    
    // Debounce function for better performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Add scroll event listener with debouncing
    window.addEventListener('scroll', debounce(updateActiveNavOnScroll, 10));
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            aside.classList.remove('open');
            navToggler.classList.remove('open');
        }
    });
    
    // Typing animation for profession text
    const typingText = document.querySelector('.typing');
    if (typingText) {
        const professions = ['Front-end Developer', 'Web Designer', 'UI/UX Designer', 'React Developer'];
        let currentProfession = 0;
        let currentChar = 0;
        let isDeleting = false;
        
        function typeWriter() {
            const current = professions[currentProfession];
            
            if (isDeleting) {
                typingText.textContent = current.substring(0, currentChar - 1);
                currentChar--;
            } else {
                typingText.textContent = current.substring(0, currentChar + 1);
                currentChar++;
            }
            
            let typeSpeed = 100;
            if (isDeleting) {
                typeSpeed = 50;
            }
            
            if (!isDeleting && currentChar === current.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentProfession = (currentProfession + 1) % professions.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeWriter, typeSpeed);
        }
        
        typeWriter();
    }
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[placeholder="Name"]').value;
            const email = this.querySelector('input[placeholder="Email"]').value;
            const subject = this.querySelector('input[placeholder="Subject"]').value;
            const message = this.querySelector('textarea[placeholder="Message"]').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Show success message (you can integrate with actual email service)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Image lazy loading for portfolio
    const portfolioImages = document.querySelectorAll('.portfolia-img img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        portfolioImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Add loading animation
    function showLoadingAnimation() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = '<div class="loader-spinner"></div>';
        document.body.appendChild(loader);
        
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.remove();
                }, 300);
            }, 500);
        });
    }
    
    // Initialize loading animation
    showLoadingAnimation();
    
    // Portfolio image modal functionality
    portfolioImages.forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <img src="${this.src}" alt="${this.alt}">
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close modal functionality
            const closeBtn = modal.querySelector('.modal-close');
            closeBtn.addEventListener('click', () => modal.remove());
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.remove();
            });
            
            // Close on Escape key
            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    modal.remove();
                    document.removeEventListener('keydown', escHandler);
                }
            });
        });
    });
});

// Add CSS for the new JavaScript functionality
const additionalStyles = `
    /* Page loader styles */
    .page-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-black-900);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.3s ease;
    }
    
    .loader-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid var(--bg-black-50);
        border-top: 3px solid var(--skin-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    /* Image modal styles */
    .image-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: modalFadeIn 0.3s ease;
    }
    
    @keyframes modalFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .modal-content img {
        width: 100%;
        height: auto;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 10px;
    }
    
    .modal-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 30px;
        cursor: pointer;
        transition: color 0.3s ease;
    }
    
    .modal-close:hover {
        color: var(--skin-color);
    }
    
    /* Portfolio image hover effects */
    .portfolia-img {
        overflow: hidden;
        position: relative;
    }
    
    .portfolia-img img {
        transition: transform 0.3s ease;
        cursor: pointer;
    }
    
    .portfolia-img:hover img {
        transform: scale(1.1);
    }
    
    .portfolia-img::before {
        content: '🔍';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        color: white;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 2;
    }
    
    .portfolia-img:hover::before {
        opacity: 1;
    }
    
    .portfolia-img::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .portfolia-img:hover::after {
        opacity: 1;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);