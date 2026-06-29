/* =================================================================
   AI WEB DEVELOPMENT SUMMER BOOTCAMP 2026 — MAIN SCRIPT
   Vanilla JS only. No frameworks, no backend, no APIs.
================================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------------------------------------------------------------
     1. AOS (Animate On Scroll) INIT
  --------------------------------------------------------------- */
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60
    });
  }

  /* ---------------------------------------------------------------
     2. STICKY NAVBAR — solid background once the page is scrolled
  --------------------------------------------------------------- */
  var navbar = document.getElementById("mainNavbar");
  function updateNavbarState() {
    if (window.scrollY > 40) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  }
  updateNavbarState();
  window.addEventListener("scroll", updateNavbarState);

  /* Auto-close the mobile menu after a link is tapped */
  var navMenu = document.getElementById("navMenu");
  var navLinks = navMenu ? navMenu.querySelectorAll("a") : [];
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (navMenu.classList.contains("show") && window.bootstrap) {
        var collapseInstance = window.bootstrap.Collapse.getOrCreateInstance(navMenu);
        collapseInstance.hide();
      }
    });
  });

  /* ---------------------------------------------------------------
     3. SCROLL-TO-TOP BUTTON
  --------------------------------------------------------------- */
  var scrollTopBtn = document.getElementById("scrollTopBtn");
  function updateScrollTopBtn() {
    if (window.scrollY > 420) {
      scrollTopBtn.classList.add("is-visible");
    } else {
      scrollTopBtn.classList.remove("is-visible");
    }
  }
  updateScrollTopBtn();
  window.addEventListener("scroll", updateScrollTopBtn);
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------------------------------------------------------------
     4. COUNTER ANIMATION — hero stats count up once visible
  --------------------------------------------------------------- */
  var statNumbers = document.querySelectorAll(".stat-number");

  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var duration = 1200; // ms
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    var counterObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    statNumbers.forEach(function (el) { counterObserver.observe(el); });
  } else {
    // Fallback for very old browsers: just show final numbers
    statNumbers.forEach(function (el) {
      el.textContent = el.getAttribute("data-count");
    });
  }

  /* ---------------------------------------------------------------
     5. HERO SIGNATURE ANIMATION — "code becomes a website"
     Types out a short snippet, then reveals a live rendered preview.
  --------------------------------------------------------------- */
  var codeEl = document.getElementById("codeTyped");
  var previewEl = document.getElementById("livePreview");

  var plainCode =
    '<section class="hero">\n' +
    '  <h1>My First Website</h1>\n' +
    "  <p>Built in 10 days.</p>\n" +
    "  <button>Hire Me</button>\n" +
    "</section>";

  var highlightedCode =
    '<span class="tok-tag">&lt;section</span> <span class="tok-attr">class</span>="<span class="tok-str">hero</span>"<span class="tok-tag">&gt;</span>\n' +
    '  <span class="tok-tag">&lt;h1&gt;</span>My First Website<span class="tok-tag">&lt;/h1&gt;</span>\n' +
    '  <span class="tok-tag">&lt;p&gt;</span>Built in 10 days.<span class="tok-tag">&lt;/p&gt;</span>\n' +
    '  <span class="tok-tag">&lt;button&gt;</span>Hire Me<span class="tok-tag">&lt;/button&gt;</span>\n' +
    '<span class="tok-tag">&lt;/section&gt;</span>';

  function typeCode() {
    if (!codeEl) return;
    codeEl.innerHTML = "";
    var i = 0;
    var typingSpeed = 28; // ms per character

    function typeChar() {
      if (i <= plainCode.length) {
        codeEl.textContent = plainCode.slice(0, i);
        i++;
        setTimeout(typeChar, typingSpeed);
      } else {
        // Swap in the syntax-highlighted version once typing is complete
        codeEl.innerHTML = highlightedCode;
        revealLivePreview();
      }
    }
    typeChar();
  }

  function revealLivePreview() {
    if (!previewEl) return;
    setTimeout(function () {
      previewEl.classList.add("is-visible");
      // Wait for 3.5 seconds showing the live website preview, then restart the cycle
      setTimeout(resetAndRestart, 3500);
    }, 400);
  }

  function resetAndRestart() {
    if (!previewEl || !codeEl) return;
    // Fade out preview
    previewEl.classList.remove("is-visible");
    // Wait for the fade-out transition to finish (650ms), then clear and restart typing
    setTimeout(typeCode, 650);
  }

  // Only run the typing animation once the hero mockup scrolls into view
  if ("IntersectionObserver" in window && codeEl) {
    var heroObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            typeCode();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    heroObserver.observe(codeEl);
  } else if (codeEl) {
    typeCode();
  }

  /* ---------------------------------------------------------------
     6. FOOTER — current year, set automatically
  --------------------------------------------------------------- */
  var yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
