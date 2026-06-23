document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.getElementById("primary-navigation");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const revealItems = document.querySelectorAll(".reveal");
  const backToTop = document.getElementById("backToTop");
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    navList.classList.toggle("open");
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      navList.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  revealItems.forEach((item) => revealObserver.observe(item));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      navLinks.forEach((link) => link.classList.remove("active"));

      if (activeLink) {
        activeLink.classList.add("active");
      }
    });
  }, { rootMargin: "-42% 0px -45% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));

  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 520 ? "inline-flex" : "none";
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const accountType = String(formData.get("accountType") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !accountType || !message) {
      formMessage.textContent = "Please complete every field.";
      formMessage.style.color = "#b04a2f";
      return;
    }

    formMessage.textContent = "Thanks. Meridian Bank will follow up with the right banking specialist.";
    formMessage.style.color = "#235c61";
    contactForm.reset();
  });
});
