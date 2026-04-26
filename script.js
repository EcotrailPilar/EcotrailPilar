(function() {
    // Año actual
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // ---------- TEMA CLARO/OSCURO ----------
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('ecotrail-theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
    } else {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            body.classList.toggle('dark-mode');
            const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
            localStorage.setItem('ecotrail-theme', currentTheme);
        });
    }

    // Header scroll
    const header = document.getElementById('mainHeader');
    let lastScroll = 0;
    let isMobile = window.innerWidth <= 768;

    function handleScroll() {
        const currentScroll = window.scrollY;
        if (currentScroll > 20) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
        if (!isMobile && currentScroll > lastScroll && currentScroll > 80) header.classList.add('header-hidden');
        else header.classList.remove('header-hidden');
        lastScroll = currentScroll;
        document.getElementById('backToTop').classList.toggle('visible', currentScroll > 400);
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', () => {
        const wasMobile = isMobile;
        isMobile = window.innerWidth <= 768;
        if (wasMobile && !isMobile) {
            closeMenu();
            document.body.style.overflow = '';
        }
        handleScroll();
    });

    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('primaryNav');
    const overlay = document.getElementById('mobileOverlay');

    function closeMenu() {
        navLinks.classList.remove('open');
        overlay.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    function openMenu() {
        navLinks.classList.add('open');
        overlay.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.contains('open') ? closeMenu() : openMenu();
        });
    }
    overlay.addEventListener('click', closeMenu);
    document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('open')) closeMenu();
    });

    // Navegación activa por scroll
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(link => {
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                        link.setAttribute('aria-current', 'page');
                    }
                });
            }
        });
    }, { threshold: 0.4, rootMargin: '-80px 0px 0px 0px' });
    sections.forEach(section => observer.observe(section));

    // Botón "Volver arriba"
    document.getElementById('backToTop').addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Reveal on scroll
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('revealed'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ---------- CONTADOR PROMO URBANO PLAYO (3 días) ----------
    function startPromoCountdown() {
        const daysEl = document.getElementById('promoDays');
        const hoursEl = document.getElementById('promoHours');
        const minutesEl = document.getElementById('promoMinutes');
        const secondsEl = document.getElementById('promoSeconds');
        
        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 3);
        targetDate.setHours(23, 59, 59, 999);

        function updateTimer() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (86400000)) / (3600000));
            const minutes = Math.floor((distance % 3600000) / 60000);
            const seconds = Math.floor((distance % 60000) / 1000);

            daysEl.textContent = days.toString().padStart(2, '0');
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
        }

        updateTimer();
        const timerInterval = setInterval(updateTimer, 1000);
        window.addEventListener('beforeunload', () => clearInterval(timerInterval));
    }

    startPromoCountdown();
})();