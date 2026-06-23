/* script.js
   - Smooth scrolling
   - Typing animation for hero subtitle
   - Back-to-top button
   - Fade-in reveal on scroll
   - Contact form validation and success message
   - Active navigation highlighting
   - Say Hello interactive message
*/
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section');
  const backToTop = document.getElementById('backToTop');
  const subtitleEl = document.querySelector('.subtitle');
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const sayHello = document.getElementById('sayHello');
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('primary-navigation');

  // Mobile nav toggle
  navToggle.addEventListener('click', () =>{
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('open');
  });

  // Smooth scrolling for navigation & anchors
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
        // close mobile nav
        navList.classList.remove('open');
        navToggle.setAttribute('aria-expanded','false');
      }
    });
  });

  // Typing animation for subtitle
  const typingText = 'Computer Science Student';
  function typeText(el, text, speed = 80) {
    el.textContent = '';
    let i = 0;
    const id = setInterval(() => {
      el.textContent += text.charAt(i);
      i++;
      if (i === text.length) clearInterval(id);
    }, speed);
  }
  if (subtitleEl) typeText(subtitleEl, typingText, 70);

  // Reveal on scroll using IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Active nav link highlighting
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  }, {threshold:0.45});
  sections.forEach(s => navObserver.observe(s));

  // Back-to-top button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) backToTop.style.display = 'block';
    else backToTop.style.display = 'none';
  });
  backToTop.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

  // Contact form validation (client-side) and success message
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formMessage.textContent = '';
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const subject = contactForm.subject.value.trim();
    const message = contactForm.message.value.trim();
    if (!name || !email || !subject || !message) {
      formMessage.style.color = '#ff7676';
      formMessage.textContent = 'Please fill in all fields.';
      return;
    }
    // Simulate success (no backend) and reset
    formMessage.style.color = '#77ffb3';
    formMessage.textContent = 'Message sent — thank you! (simulation)';
    contactForm.reset();
    setTimeout(()=> formMessage.textContent = '', 5000);
  });

  // Say Hello button - non-blocking toast
  function showToast(text){
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = text;
    Object.assign(t.style,{position:'fixed',right:'1rem',bottom:'4.2rem',background:'#062a4a',color:'#fff',padding:'.6rem 1rem',borderRadius:'8px',boxShadow:'0 6px 18px rgba(0,0,0,0.6)',zIndex:999});
    document.body.appendChild(t);
    setTimeout(()=> t.style.opacity='0',3000);
    setTimeout(()=> t.remove(),3600);
  }
  sayHello.addEventListener('click', ()=> showToast('Hello! Thanks for visiting — feel free to reach out.'));

  // keyboard-friendly: allow nav links to work with Enter
  document.querySelectorAll('.nav-link, .btn, .logo').forEach(el=>{
    el.addEventListener('keyup', (e)=>{ if(e.key === 'Enter') el.click(); });
  });
});
