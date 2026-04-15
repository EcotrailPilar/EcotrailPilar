(function() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();

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

    document.getElementById('backToTop').addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('revealed'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail').value.trim();
            if (email && email.includes('@')) {
                alert('¡Gracias por suscribirte! (Recordá configurar el endpoint real en el action del form)');
                newsletterForm.reset();
            } else {
                alert('Por favor, ingresá un email válido.');
            }
        });
    }
})();