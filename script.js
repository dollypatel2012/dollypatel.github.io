// ========== SIDEBAR TOGGLE ==========
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const menuIcon = document.getElementById('menuIcon');
const sideLinks = document.querySelectorAll('.side-link');

function openSidebar() {
  sidebar.classList.add('open');
  menuToggle.setAttribute('aria-expanded', 'true');
  menuIcon.classList.remove('fa-bars');
  menuIcon.classList.add('fa-times');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuIcon.classList.remove('fa-times');
  menuIcon.classList.add('fa-bars');
}

menuToggle.addEventListener('click', () => {
  if (sidebar.classList.contains('open')) {
    closeSidebar();
  } else {
    openSidebar();
  }
});

// Close sidebar when a navigation link is clicked
sideLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeSidebar();
  });
});

// Close sidebar if user clicks outside it (only when open)
document.addEventListener('click', (e) => {
  if (
    sidebar.classList.contains('open') &&
    !sidebar.contains(e.target) &&
    e.target !== menuToggle &&
    !menuToggle.contains(e.target)
  ) {
    closeSidebar();
  }
});

// ========== TYPING ANIMATION ==========
const text = ["Future Software Engineer", "Full Stack Developer", "DSA Enthusiast"];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

(function type() {
  if (count === text.length) {
    count = 0;
  }
  currentText = text[count];
  letter = currentText.slice(0, ++index);
  document.getElementById('typing').textContent = letter;

  if (letter.length === currentText.length) {
    count++;
    index = 0;
    setTimeout(type, 1500);
  } else {
    setTimeout(type, 80);
  }
})();

// ========== SCROLL PROGRESS LINE ==========
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (scrollTop / height) * 100;
  document.body.style.setProperty('--scroll', scrolled + '%');
});

// ========== ACTIVE SIDEBAR LINK (Intersection Observer) ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.side-link');

const observerOptions = {
  root: null,
  rootMargin: '0px 0px -40% 0px',
  threshold: 0,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.side-link[href="#${id}"]`);

    if (entry.isIntersecting) {
      navLinks.forEach((l) => {
        l.classList.remove('active');
        l.removeAttribute('aria-current');
      });
      if (link) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    }
  });
}, observerOptions);

sections.forEach((section) => observer.observe(section));

// Fallback for direct URL hash or first load
window.addEventListener('load', () => {
  const hash = window.location.hash || '#about';
  const activeLink = document.querySelector(`.side-link[href="${hash}"]`);
  if (activeLink) {
    navLinks.forEach((l) => {
      l.classList.remove('active');
      l.removeAttribute('aria-current');
    });
    activeLink.classList.add('active');
    activeLink.setAttribute('aria-current', 'page');
  }
});

// ========== CERTIFICATE LIGHTBOX ==========
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const certificateCards = document.querySelectorAll('.certificate-card');

// Open lightbox when a certificate card is clicked
certificateCards.forEach(card => {
  card.addEventListener('click', () => {
    const imgSrc = card.querySelector('img').src;
    const imgAlt = card.querySelector('img').alt;
    lightboxImg.src = imgSrc;
    lightboxImg.alt = imgAlt;
    lightbox.classList.add('open');
  });
});

// Close lightbox functions
function closeLightbox() {
  lightbox.classList.remove('open');
  // Clear the image (optional) so it doesn't flash when closing
  lightboxImg.src = '';
}

// Close when the close button (✕) is clicked
lightboxClose.addEventListener('click', closeLightbox);

// Close when clicking anywhere on the dark background (but not on the image itself)
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Close with the Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) {
    closeLightbox();
  }
});