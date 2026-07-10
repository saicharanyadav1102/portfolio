document.addEventListener('DOMContentLoaded', () => {
    // ===== THEME TOGGLE =====
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const html = document.documentElement;
            html.classList.toggle('dark');
            try {
                localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
            } catch (e) {
                console.warn('localStorage not accessible', e);
            }
        });
    }

    // ===== MOBILE MENU =====
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const id = this.getAttribute('href');
            if (id && id.length > 1) {
                const targetElement = document.querySelector(id);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // ===== SCROLL FADE-IN ANIMATIONS =====
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-fade-in').forEach(section => {
        sectionObserver.observe(section);
    });

    // ===== WORK EXPERIENCE STAGGERED LIST ANIMATION =====
    const expObserver = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 150);
                expObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.exp-list-item').forEach(item => {
        expObserver.observe(item);
    });

    // ===== PROJECTS STAGGERED ENTRANCE =====
    const staggerObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.stagger-children').forEach(container => {
        staggerObserver.observe(container);
    });

    // ===== PROFILE IMAGE UPLOAD & LIVE PREVIEW =====
    const profileInput = document.getElementById('profileImageInput');
    const profilePreview = document.getElementById('profileImagePreview');
    if (profileInput && profilePreview) {
        profileInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = evt => {
                    profilePreview.src = evt.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
});
