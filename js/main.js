(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const header = document.querySelector(".header");
  const burger = document.querySelector(".burger");
  const mobileNav = document.getElementById("mobile-nav");

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const closeMobile = () => {
    if (!burger || !mobileNav) return;
    burger.setAttribute("aria-expanded", "false");
    mobileNav.hidden = true;
  };

  if (burger && mobileNav) {
    burger.addEventListener("click", () => {
      const open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      mobileNav.hidden = open;
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobile);
    });
  }

  const revealEls = document.querySelectorAll(
    ".infobar, .categories, .about, .catalog, .order, .steps, .contacts"
  );
  revealEls.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
})();
