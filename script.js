/* ==================================================
   MOBILE MENU
================================================== */

const menuButton = document.getElementById("menu-button");
const mobileMenu = document.getElementById("mobile-menu");

if (menuButton) {
  menuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");

    if (mobileMenu.classList.contains("active")) {
      menuButton.textContent = "✕";
    } else {
      menuButton.textContent = "☰";
    }
  });
}

/* ==================================================
   CLOSE MOBILE MENU
================================================== */

const mobileLinks = document.querySelectorAll(".mobile-menu a");

mobileLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    mobileMenu.classList.remove("active");
    if (menuButton) menuButton.textContent = "☰";
  });
});

/* ==================================================
   HERO SLIDER (image slider, opsional — cuma jalan
   kalau halaman punya elemen #sliderTrack)
================================================== */

const track = document.getElementById("sliderTrack");

if (track) {
  const realSlides = Array.from(
    track.querySelectorAll(".case-study-image.showcase-image"),
  );
  const total = realSlides.length;

  const prevBtn = document.getElementById("sliderPrev");
  const nextBtn = document.getElementById("sliderNext");
  const dotsWrap = document.getElementById("sliderDots");

  const SLIDE_DURATION = 1000;
  let isAnimating = false;

  // ===== Siapkan clone untuk loop tanpa putus =====
  const firstClone = realSlides[0].cloneNode(true);
  const lastClone = realSlides[total - 1].cloneNode(true);
  firstClone.setAttribute("aria-hidden", "true");
  lastClone.setAttribute("aria-hidden", "true");

  track.insertBefore(lastClone, realSlides[0]);
  track.appendChild(firstClone);

  let trackIndex = 1;
  let dotIndex = 0;

  track.style.transition = "none";
  track.style.transform = `translateX(-${trackIndex * 100}%)`;
  track.offsetHeight;
  track.style.transition = `transform ${SLIDE_DURATION}ms cubic-bezier(.4,0,.2,1)`;

  // ===== Titik indikator =====
  realSlides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "slider-dot" + (i === 0 ? " is-active" : "");
    dot.setAttribute("aria-label", `Ke gambar ${i + 1}`);
    dot.addEventListener("click", () => {
      trackIndex = i + 1;
      dotIndex = i;
      moveTrack();
      updateDots();
    });
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll(".slider-dot");

  function updateDots() {
    dots.forEach((d, i) => d.classList.toggle("is-active", i === dotIndex));
  }

  function moveTrack() {
    track.style.transform = `translateX(-${trackIndex * 100}%)`;
  }

  function next() {
    if (isAnimating) return;
    isAnimating = true;
    trackIndex++;
    dotIndex = (dotIndex + 1) % total;
    moveTrack();
    updateDots();
  }

  function prev() {
    if (isAnimating) return;
    isAnimating = true;
    trackIndex--;
    dotIndex = (dotIndex - 1 + total) % total;
    moveTrack();
    updateDots();
  }

  track.addEventListener("transitionend", () => {
    if (trackIndex === total + 1) {
      track.style.transition = "none";
      trackIndex = 1;
      moveTrack();
      track.offsetHeight;
      track.style.transition = `transform ${SLIDE_DURATION}ms cubic-bezier(.4,0,.2,1)`;
    } else if (trackIndex === 0) {
      track.style.transition = "none";
      trackIndex = total;
      moveTrack();
      track.offsetHeight;
      track.style.transition = `transform ${SLIDE_DURATION}ms cubic-bezier(.4,0,.2,1)`;
    }
    isAnimating = false;
  });

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  let touchStartX = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true },
  );
  track.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
  });
}

/* ==================================================
   FIGMA SLIDER (multi-prototype, geser horizontal —
   berdiri sendiri, tidak bergantung pada HERO SLIDER)
================================================== */

const figmaTrack = document.getElementById("figmaSliderTrack");

if (figmaTrack) {
  const figmaRealSlides = Array.from(
    figmaTrack.querySelectorAll(".figma-slide"),
  );
  const figmaTotal = figmaRealSlides.length;

  const figmaPrevBtn = document.getElementById("figmaSliderPrev");
  const figmaNextBtn = document.getElementById("figmaSliderNext");
  const figmaDotsWrap = document.getElementById("figmaSliderDots");

  const FIGMA_SLIDE_DURATION = 1000;
  let figmaIsAnimating = false;

  function figmaLoadSlide(index) {
    const slide = figmaTrack.children[index];
    if (!slide) return;
    const iframe = slide.querySelector(".figma-iframe");
    if (iframe && iframe.dataset.src) {
      iframe.src = iframe.dataset.src;
      iframe.removeAttribute("data-src");
    }
  }

  // ===== Clone untuk loop tanpa putus =====
  const figmaFirstClone = figmaRealSlides[0].cloneNode(true);
  const figmaLastClone = figmaRealSlides[figmaTotal - 1].cloneNode(true);
  figmaFirstClone.setAttribute("aria-hidden", "true");
  figmaLastClone.setAttribute("aria-hidden", "true");

  figmaTrack.insertBefore(figmaLastClone, figmaRealSlides[0]);
  figmaTrack.appendChild(figmaFirstClone);

  let figmaTrackIndex = 1;
  let figmaDotIndex = 0;

  figmaTrack.style.transition = "none";
  figmaTrack.style.transform = `translateX(-${figmaTrackIndex * 100}%)`;
  figmaTrack.offsetHeight;
  figmaTrack.style.transition = `transform ${FIGMA_SLIDE_DURATION}ms cubic-bezier(.4,0,.2,1)`;
  figmaLoadSlide(figmaTrackIndex);

  // ===== Titik indikator =====
  figmaRealSlides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "slider-dot" + (i === 0 ? " is-active" : "");
    dot.setAttribute("aria-label", `Ke prototype ${i + 1}`);
    dot.addEventListener("click", () => {
      figmaTrackIndex = i + 1;
      figmaDotIndex = i;
      figmaMoveTrack();
      figmaUpdateDots();
    });
    figmaDotsWrap.appendChild(dot);
  });
  const figmaDots = figmaDotsWrap.querySelectorAll(".slider-dot");

  function figmaUpdateDots() {
    figmaDots.forEach((d, i) =>
      d.classList.toggle("is-active", i === figmaDotIndex),
    );
  }

  function figmaMoveTrack() {
    figmaTrack.style.transform = `translateX(-${figmaTrackIndex * 100}%)`;
    figmaLoadSlide(figmaTrackIndex);
  }

  function figmaNext() {
    if (figmaIsAnimating) return;
    figmaIsAnimating = true;
    figmaTrackIndex++;
    figmaDotIndex = (figmaDotIndex + 1) % figmaTotal;
    figmaMoveTrack();
    figmaUpdateDots();
  }

  function figmaPrev() {
    if (figmaIsAnimating) return;
    figmaIsAnimating = true;
    figmaTrackIndex--;
    figmaDotIndex = (figmaDotIndex - 1 + figmaTotal) % figmaTotal;
    figmaMoveTrack();
    figmaUpdateDots();
  }

  figmaTrack.addEventListener("transitionend", () => {
    if (figmaTrackIndex === figmaTotal + 1) {
      figmaTrack.style.transition = "none";
      figmaTrackIndex = 1;
      figmaMoveTrack();
      figmaTrack.offsetHeight;
      figmaTrack.style.transition = `transform ${FIGMA_SLIDE_DURATION}ms cubic-bezier(.4,0,.2,1)`;
    } else if (figmaTrackIndex === 0) {
      figmaTrack.style.transition = "none";
      figmaTrackIndex = figmaTotal;
      figmaMoveTrack();
      figmaTrack.offsetHeight;
      figmaTrack.style.transition = `transform ${FIGMA_SLIDE_DURATION}ms cubic-bezier(.4,0,.2,1)`;
    }
    figmaIsAnimating = false;
  });

  figmaNextBtn.addEventListener("click", figmaNext);
  figmaPrevBtn.addEventListener("click", figmaPrev);

  let figmaTouchStartX = 0;
  figmaTrack.addEventListener(
    "touchstart",
    (e) => {
      figmaTouchStartX = e.touches[0].clientX;
    },
    { passive: true },
  );
  figmaTrack.addEventListener("touchend", (e) => {
    const diff = figmaTouchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? figmaNext() : figmaPrev();
  });
}

/* ==================================================
   FIGMA PROTOTYPE EMBED (facade — iframe baru dimuat
   setelah tombol play diklik)
================================================== */

document.querySelectorAll(".figma-facade").forEach((facade) => {
  facade.addEventListener("click", function handleClick() {
    const embedSrc = facade.dataset.embedSrc;
    if (!embedSrc) return;

    facade.innerHTML = `
      <div class="figma-loading">
        <div class="spinner"></div>
        <p>Memuat prototype…</p>
      </div>
      <iframe class="figma-iframe" src="${embedSrc}" allowfullscreen loading="lazy"></iframe>
    `;

    const iframe = facade.querySelector(".figma-iframe");
    const loading = facade.querySelector(".figma-loading");

    iframe.addEventListener("load", () => {
      setTimeout(() => {
        loading.classList.add("is-hidden");
      }, 300);
    });

    facade.classList.remove("figma-facade");
    facade.style.cursor = "default";
  });
});

// Tombol fullscreen + loading-hide untuk slider (yang bukan facade)
document.querySelectorAll(".figma-embed-wrap").forEach((wrap) => {
  const embedContainer = wrap.querySelector(".figma-embed");
  const fullscreenBtn = wrap.querySelector(".fullscreen-btn");
  const iframe = wrap.querySelector(".figma-iframe");

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener("click", () => {
      if (embedContainer.requestFullscreen) {
        embedContainer.requestFullscreen();
      }
    });
  }

  // Kalau ini BUKAN facade (contoh: figma-slider, iframe-nya sudah
  // ada langsung di HTML), pasang loading-hide listener seperti biasa.
  const isFacade =
    embedContainer && embedContainer.classList.contains("figma-facade");
  if (iframe && !isFacade) {
    const loading = wrap.querySelector(".figma-loading");
    iframe.addEventListener("load", () => {
      setTimeout(() => {
        if (loading) loading.classList.add("is-hidden");
      }, 300);
    });
  }
});

/* ==================================================
   DARK / LIGHT MODE TOGGLE
================================================== */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  const themeIcon = themeToggle.querySelector(".theme-icon");
  const root = document.documentElement;

  const ICON_MOON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

  const ICON_SUN = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

  function setFavicon(filename) {
    const oldFavicon = document.getElementById("favicon");
    if (!oldFavicon) return;

    const newFavicon = document.createElement("link");
    newFavicon.rel = "icon";
    newFavicon.type = "image/png";
    newFavicon.id = "favicon";
    newFavicon.href = oldFavicon.href.replace(
      /favicon-(light|dark)\.png.*$/,
      filename + "?v=" + Date.now(),
    );

    oldFavicon.parentNode.replaceChild(newFavicon, oldFavicon);
  }

  function updateThemePhotos(theme) {
    const photos = document.querySelectorAll(".theme-photo");
    photos.forEach((img) => {
      const newSrc =
        theme === "dark" ? img.dataset.darkSrc : img.dataset.lightSrc;
      if (newSrc && img.getAttribute("src") !== newSrc) {
        img.src = newSrc;
      }
    });
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      if (themeIcon) themeIcon.innerHTML = ICON_SUN;
      setFavicon("favicon-dark.png");
      updateThemePhotos("dark");
    } else {
      root.removeAttribute("data-theme");
      if (themeIcon) themeIcon.innerHTML = ICON_MOON;
      setFavicon("favicon-light.png");
      updateThemePhotos("light");
    }
  }

  const savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme || "dark");

  themeToggle.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    const newTheme = isDark ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

/* ==================================================
   BACK TO TOP (muncul cuma saat sudah di bagian bawah)
================================================== */
const backToTopBtn = document.getElementById("backToTop");

if (backToTopBtn) {
  function getBottomThreshold() {
    return window.innerWidth <= 768 ? 40 : 20; // mobile: 100px, desktop: 300px
  }

  function checkScrollPosition() {
    const scrollBottom = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;
    const isNearBottom = pageHeight - scrollBottom <= getBottomThreshold();

    backToTopBtn.classList.toggle("is-visible", isNearBottom);
  }

  window.addEventListener("scroll", checkScrollPosition, { passive: true });
  checkScrollPosition();

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
