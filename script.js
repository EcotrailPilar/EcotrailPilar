(function(){
    // Año
    var y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();

    // Header scroll + back-to-top
    var hdr=document.getElementById('hdr'), toTop=document.getElementById('toTop');
    window.addEventListener('scroll',function(){
        var s=window.scrollY;
        hdr.classList.toggle('scrolled', s>20);
        toTop.classList.toggle('show', s>500);
    },{passive:true});
    toTop.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});

    // Menú móvil
    var burger=document.getElementById('burger'), nav=document.getElementById('nav');
    burger.addEventListener('click',function(){
        var open=nav.classList.toggle('open');
        burger.setAttribute('aria-expanded', open?'true':'false');
    });
    nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){
        nav.classList.remove('open'); burger.setAttribute('aria-expanded','false');
    });});

    // Reveal on scroll
    var io=new IntersectionObserver(function(es){
        es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
    },{threshold:.12});
    document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

    // YouTube lazy
    document.querySelectorAll('[data-youtube]').forEach(function(c){
        function load(){
            var id=c.getAttribute('data-youtube');
            var f=document.createElement('iframe');
            f.src='https://www.youtube.com/embed/'+id+'?autoplay=1&rel=0';
            f.setAttribute('frameborder','0');
            f.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            f.setAttribute('allowfullscreen','');
            f.style.cssText='position:absolute;inset:0;width:100%;height:100%;border:0';
            c.innerHTML=''; c.appendChild(f);
        }
        c.addEventListener('click',load);
        c.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();load();}});
    });

    // Cookie consent
    var ck=document.getElementById('cookie'), ok=document.getElementById('cookieOk');
    if(ck && ok){
        if(!localStorage.getItem('cookie-consent')) ck.style.display='block';
        ok.addEventListener('click',function(){localStorage.setItem('cookie-consent','1'); ck.style.display='none';});
    }
})();
