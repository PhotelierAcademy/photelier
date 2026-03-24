/* =====================================================
   Photelier Academy — script.js
   ===================================================== */

// --- Nav scroll effect ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// --- Hamburger menu ---
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  hamburger.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
});

menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target)) menu.classList.remove('open');
});

// --- Works filter ---
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    workCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// --- FAQ accordion ---
document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    const answer = btn.nextElementSibling;

    // Close all others
    document.querySelectorAll('.faq__question').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        other.nextElementSibling.classList.remove('open');
      }
    });

    btn.setAttribute('aria-expanded', String(!isExpanded));
    answer.classList.toggle('open', !isExpanded);
  });
});

// --- Contact form ---
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

function showError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  if (field) field.classList.add('error');
  if (error) error.textContent = message;
}

function clearErrors() {
  form.querySelectorAll('.form__input, .form__textarea').forEach(el => el.classList.remove('error'));
  form.querySelectorAll('.form__error').forEach(el => el.textContent = '');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const privacy = document.getElementById('privacy').checked;

  let valid = true;

  if (!name) {
    showError('name', 'nameError', 'お名前を入力してください');
    valid = false;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError('email', 'emailError', '正しいメールアドレスを入力してください');
    valid = false;
  }
  if (!message) {
    showError('message', 'messageError', 'メッセージを入力してください');
    valid = false;
  }
  if (!privacy) {
    document.getElementById('privacyError').textContent = 'プライバシーポリシーへの同意が必要です';
    valid = false;
  }

  if (!valid) return;

  // Simulate submit (replace with actual endpoint)
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.textContent = '送信中...';
  submitBtn.disabled = true;

  setTimeout(() => {
    form.style.display = 'none';
    successMsg.classList.add('visible');
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1200);
});

// --- Scroll reveal ---
const revealEls = document.querySelectorAll(
  '.service-card, .work-card, .voice-card, .pricing-card, .faq__item, .concept__inner'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));
