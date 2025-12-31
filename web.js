(function(){
  function qs(sel, ctx) { return (ctx||document).querySelector(sel); }
  // Mobile nav toggle
  const btn = qs('.nav-toggle');
  const nav = qs('#primary-navigation');
  if (btn && nav) {
    btn.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.style.display = expanded ? '' : 'block';
    });
  }

  function setActiveNav(){
    const links = document.querySelectorAll('.primary-nav a');
    const path = location.pathname.split('/').pop().toLowerCase();
    let page = 'home';
    if(path.includes('about')) page = 'about';
    else if(path.includes('contact')) page = 'contact';
    else if(location.hash && location.hash.startsWith('#products')) page = 'products';
    links.forEach(a => {
      const dp = a.dataset && a.dataset.page ? a.dataset.page : '';
      a.classList.toggle('active', dp === page);
    });
  }

  // Fill current year in footer and wire up nav behavior
  document.addEventListener('DOMContentLoaded', function(){
    const y = new Date().getFullYear();
    const span = qs('#year');
    if(span) span.textContent = y;

    setActiveNav();

    // Enhance nav links: handle cross-page product anchor and small-screen hide
    document.querySelectorAll('.primary-nav a').forEach(a=>{
      a.addEventListener('click', function(e){
        const dp = this.dataset && this.dataset.page ? this.dataset.page : '';
        if(dp === 'products' && !location.pathname.endsWith('index.improved.html') && !location.pathname.endsWith('index.html')){
          // If on a separate page, navigate back to improved index and jump to products
          location.href = 'index.improved.html#products';
          e.preventDefault();
          return;
        }
        // set active visual state for same-page navigation
        document.querySelectorAll('.primary-nav a').forEach(x=>x.classList.remove('active'));
        this.classList.add('active');
        if(btn && nav){ btn.setAttribute('aria-expanded','false'); nav.style.display=''; }
      });
    });

    // close mobile nav on escape
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && btn && nav){
        btn.setAttribute('aria-expanded', 'false');
        nav.style.display = '';
        btn.focus();
      }
    });
  });
})();
