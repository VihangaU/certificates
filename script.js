// Hamburger Menu Toggle
function toggleMenu() {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    hamburgerIcon.classList.toggle('open');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
}

// Certificate Filtering
document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const certificateCards = document.querySelectorAll('.certificate-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const category = this.getAttribute('data-category');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter certificates with animation
            certificateCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Add entrance animation on load
    certificateCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// Modal Functions
function openModal(imageSrc, title) {
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');

    modal.style.display = 'block';
    modalImage.src = imageSrc;
    modalTitle.textContent = title;

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('certificateModal');
    modal.style.display = 'none';

    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
window.onclick = function (event) {
    const modal = document.getElementById('certificateModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navigation
let lastScrollTop = 0;
const nav = document.querySelector('#desktop-nav');
const hamburgerNav = document.querySelector('#hamburger-nav');

window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        if (nav) nav.style.transform = 'translateY(-100%)';
        if (hamburgerNav) hamburgerNav.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        if (nav) nav.style.transform = 'translateY(0)';
        if (hamburgerNav) hamburgerNav.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
});

// Add transition for nav scroll effect
if (nav) nav.style.transition = 'transform 0.3s ease';
if (hamburgerNav) hamburgerNav.style.transition = 'transform 0.3s ease';

// Certificate count animation
function animateCount() {
    const cards = document.querySelectorAll('.certificate-card:not(.hidden)');
    console.log(`Displaying ${cards.length} certificates`);
}

// Call count on filter change
const observer = new MutationObserver(animateCount);
document.querySelectorAll('.certificate-card').forEach(card => {
    observer.observe(card, { attributes: true, attributeFilter: ['style'] });
});
