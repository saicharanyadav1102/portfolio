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

    // ===== INTERACTIVE HERO NAME (RUBBER-BAND WAVE & SPARKLE BURST) =====
    const heroName = document.getElementById('hero-name');
    const heroNameHint = document.getElementById('hero-name-hint');
    if (heroName) {
        const text = heroName.textContent.trim();
        heroName.innerHTML = '';
        const charSpans = [];

        // Split text into interactive spans
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === ' ') {
                const spaceSpan = document.createElement('span');
                spaceSpan.innerHTML = '&nbsp;';
                spaceSpan.className = 'inline-block';
                heroName.appendChild(spaceSpan);
                charSpans.push(null);
            } else {
                const span = document.createElement('span');
                span.textContent = char;
                span.className = 'interactive-char';
                heroName.appendChild(span);
                charSpans.push(span);

                // Mouseover rubber-band bounce & neighbor wave effect
                span.addEventListener('mouseenter', () => {
                    span.classList.add('hovered');
                    // Wave left neighbor
                    if (i > 0 && charSpans[i - 1]) {
                        charSpans[i - 1].classList.add('neighbor');
                    }
                    // Wave right neighbor
                    if (i < charSpans.length - 1 && charSpans[i + 1]) {
                        charSpans[i + 1].classList.add('neighbor');
                    }
                });

                span.addEventListener('mouseleave', () => {
                    span.classList.remove('hovered');
                    if (i > 0 && charSpans[i - 1]) {
                        charSpans[i - 1].classList.remove('neighbor');
                    }
                    if (i < charSpans.length - 1 && charSpans[i + 1]) {
                        charSpans[i + 1].classList.remove('neighbor');
                    }
                });
            }
        }

        // Sparkle & Particle Burst on Click
        const createSparkleBurst = (e) => {
            const emojis = ['✨', '💻', '⚡', '🚀', '🔥', '🌟', '💎', '🎉'];
            const rect = heroName.getBoundingClientRect();
            // Get click position relative to document or center of name if clicked from hint
            const x = e.clientX || (rect.left + rect.width / 2);
            const y = e.clientY || (rect.top + rect.height / 2);

            for (let i = 0; i < 16; i++) {
                const particle = document.createElement('span');
                particle.className = 'sparkle-particle';
                particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];

                const angle = (Math.PI * 2 / 16) * i + (Math.random() - 0.5) * 0.5;
                const distance = 60 + Math.random() * 80;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                const rot = (Math.random() - 0.5) * 360;

                particle.style.left = `${x + window.scrollX}px`;
                particle.style.top = `${y + window.scrollY}px`;
                particle.style.setProperty('--tx', `${tx}px`);
                particle.style.setProperty('--ty', `${ty}px`);
                particle.style.setProperty('--rot', `${rot}deg`);

                document.body.appendChild(particle);

                setTimeout(() => {
                    particle.remove();
                }, 800);
            }

            // Quick ripple animation across all characters
            charSpans.forEach((span, idx) => {
                if (span) {
                    setTimeout(() => {
                        span.classList.add('hovered');
                        setTimeout(() => span.classList.remove('hovered'), 250);
                    }, idx * 35);
                }
            });
        };

        heroName.addEventListener('click', createSparkleBurst);
        if (heroNameHint) {
            heroNameHint.addEventListener('click', createSparkleBurst);
        }
    }

    // ===== INTERACTIVE PROJECT FILTER TABS =====
    const filterButtons = document.querySelectorAll('.project-filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active styling from all buttons
                filterButtons.forEach(b => {
                    b.classList.remove('active', 'bg-zinc-900', 'dark:bg-white', 'text-white', 'dark:text-zinc-900', 'shadow-md');
                    b.classList.add('bg-white', 'dark:bg-zinc-900', 'text-zinc-700', 'dark:text-zinc-300', 'border', 'border-zinc-200', 'dark:border-zinc-800');
                });

                // Add active styling to clicked button
                btn.classList.add('active', 'bg-zinc-900', 'dark:bg-white', 'text-white', 'dark:text-zinc-900', 'shadow-md');
                btn.classList.remove('bg-white', 'dark:bg-zinc-900', 'text-zinc-700', 'dark:text-zinc-300', 'border', 'border-zinc-200', 'dark:border-zinc-800');

                const filterValue = btn.getAttribute('data-filter');

                // Filter cards with smooth scale & fade transition
                projectItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        item.style.display = 'flex';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ===== INTERACTIVE CARD 3D TILT EFFECT =====
    const interactiveCards = document.querySelectorAll('.interactive-card');
    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // ===== ACTIVE NAVIGATION HIGHLIGHTING WHILE SCROLLING =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header nav a[href^="#"]');

    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('text-zinc-900', 'dark:text-white', 'font-extrabold', 'underline', 'decoration-2', 'underline-offset-8');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('text-zinc-900', 'dark:text-white', 'font-extrabold', 'underline', 'decoration-2', 'underline-offset-8');
                }
            });
        });
    }

    // ===== CONTACT FORM & BOT AUTO-REPLY HANDLER =====
    const contactForm = document.getElementById('contact-form');
    const contactSubmitBtn = document.getElementById('contact-submit-btn');
    const botReplyModal = document.getElementById('bot-reply-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalOkBtn = document.getElementById('modal-ok-btn');
    const modalRecipientName = document.getElementById('modal-recipient-name');
    const modalRecipientEmail = document.getElementById('modal-recipient-email');

    if (contactForm && botReplyModal) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('sender-name');
            const emailInput = document.getElementById('sender-email');
            const messageInput = document.getElementById('sender-message');

            const name = nameInput ? nameInput.value.trim() : 'Visitor';
            const email = emailInput ? emailInput.value.trim() : 'visitor@example.com';
            const message = messageInput ? messageInput.value.trim() : '';

            if (!name || !email || !message) return;

            // Show loading state on button
            const originalBtnText = contactSubmitBtn.innerHTML;
            contactSubmitBtn.disabled = true;
            contactSubmitBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Triggering Auto-Reply Bot...
            `;

            // Check if user has entered their real Web3Forms access key
            const web3formsKey = '6efe7443-5df3-4a51-b3de-f5abab78d3d7'; // <-- Your active Web3Forms Key

            if (!web3formsKey || web3formsKey === 'YOUR_WEB3FORMS_ACCESS_KEY' || web3formsKey.includes('YOUR_')) {
                console.warn('⚠️ [PortfolioBot Notice] Real email delivery is waiting for your free Web3Forms API Key!');
                console.info('👉 Get your free key in 10 seconds at: https://web3forms.com (no backend/server needed)');
                console.info('👉 Then replace "YOUR_WEB3FORMS_ACCESS_KEY" in script.js line 319 with your actual key.');
            } else {
                // Send real email via Web3Forms API (works seamlessly on GitHub Pages / static hosting)
                try {
                    fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            access_key: web3formsKey,
                            name: name,
                            email: email,
                            message: message,
                            subject: `New Portfolio Inquiry from ${name}`,
                            from_name: 'PortfolioBot Auto-Responder'
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            console.log('✅ Web3Forms Email Successfully Sent!', data);
                        } else {
                            console.warn('⚠️ Web3Forms reported an issue:', data);
                        }
                    })
                    .catch(err => console.error('Error sending email:', err));
                } catch (err) {
                    console.error('Error during fetch:', err);
                }
            }

            // Show immediate confirmation & live bot response window
            setTimeout(() => {
                if (modalRecipientName) modalRecipientName.textContent = name;
                if (modalRecipientEmail) modalRecipientEmail.textContent = email;

                // Open bot response confirmation modal
                botReplyModal.classList.remove('hidden');

                // Reset button state and form fields
                contactSubmitBtn.disabled = false;
                contactSubmitBtn.innerHTML = originalBtnText;
                contactForm.reset();
            }, 900);
        });

        // Close modal functions
        const closeModal = () => {
            botReplyModal.classList.add('hidden');
        };

        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        if (modalOkBtn) modalOkBtn.addEventListener('click', closeModal);
        botReplyModal.addEventListener('click', (e) => {
            if (e.target === botReplyModal) closeModal();
        });
    }
});
