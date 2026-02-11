/* ============================================
   ZMAC Construction — Core JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Header Scroll Effect ----
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('bg-black/95', 'backdrop-blur-xl', 'py-3', 'shadow-2xl');
                header.classList.remove('bg-transparent', 'py-6');
            } else {
                header.classList.remove('bg-black/95', 'backdrop-blur-xl', 'py-3', 'shadow-2xl');
                header.classList.add('bg-transparent', 'py-6');
            }
        });
    }

    // ---- Mobile Menu Toggle ----
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('mobile-menu-close');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = '';
            });
        }
        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = '';
            });
        });
    }

    // ---- Mobile Nav Accordion (Submenu toggles) ----
    document.querySelectorAll('.mobile-nav-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const submenu = toggle.nextElementSibling;
            const icon = toggle.querySelector('.toggle-icon');
            if (submenu) {
                submenu.classList.toggle('hidden');
                if (icon) icon.style.transform = submenu.classList.contains('hidden') ? '' : 'rotate(180deg)';
            }
        });
    });

    // ---- FAQ Accordion ----
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                // Close all other FAQ items in same container
                item.closest('.faq-container')?.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        }
    });

    // ---- Scroll Reveal (IntersectionObserver) ----
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ---- Contact Form Handling ----
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'SENDING...';
            submitBtn.disabled = true;

            setTimeout(() => {
                const formContent = document.getElementById('form-content');
                const successMessage = document.getElementById('form-success');
                if (formContent && successMessage) {
                    formContent.classList.add('hidden');
                    successMessage.classList.remove('hidden');
                }
            }, 800);
        });
    }

    // ---- Send Another Button ----
    const sendAnotherBtn = document.getElementById('send-another-btn');
    if (sendAnotherBtn) {
        sendAnotherBtn.addEventListener('click', () => {
            const formContent = document.getElementById('form-content');
            const successMessage = document.getElementById('form-success');
            if (formContent && successMessage) {
                successMessage.classList.add('hidden');
                formContent.classList.remove('hidden');
                const form = document.getElementById('contact-form');
                if (form) {
                    form.reset();
                    const submitBtn = form.querySelector('button[type="submit"]');
                    if (submitBtn) {
                        submitBtn.innerText = 'SEND REQUEST';
                        submitBtn.disabled = false;
                    }
                }
            }
        });
    }

    // ---- Lucide Icons ----
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

});
