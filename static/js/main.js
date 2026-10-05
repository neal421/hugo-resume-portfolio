/**
 * Neal Raulston — Hugo Resume & Infrastructure Portfolio Interactivity
 * Handles:
 * 1. Dark / Light Theme Toggle (persisted in localStorage)
 * 2. Interactive Technical Domain Filtering
 * 3. One-Click Print / Save PDF Resume
 * 4. Copy Email to Clipboard
 * 5. Flat-File CMS & Netlify Guide Drawer
 * 6. Smooth In-Page Anchor Scrolling
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const htmlEl = document.documentElement;
      const currentTheme = htmlEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', nextTheme);
      try {
        localStorage.setItem('nr-portfolio-theme', nextTheme);
      } catch (e) {}
    });
  }

  // 2. Interactive Technical Domain Filter
  const filterChips = document.querySelectorAll('.filter-chip');
  const filterableItems = document.querySelectorAll('[data-domains]');

  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const selectedDomain = chip.getAttribute('data-filter');

      filterChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');

      filterableItems.forEach((item) => {
        if (selectedDomain === 'all') {
          item.classList.remove('is-dimmed');
          return;
        }
        const itemDomains = (item.getAttribute('data-domains') || '').split(/\s+/);
        if (itemDomains.includes(selectedDomain)) {
          item.classList.remove('is-dimmed');
        } else {
          item.classList.add('is-dimmed');
        }
      });
    });
  });

  // 3. One-Click Print / Save PDF Resume
  const printBtn = document.getElementById('print-resume-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // 4. Copy Email to Clipboard
  const copyEmailBtn = document.getElementById('copy-email-hero-btn');
  const copyFeedback = document.getElementById('copy-email-feedback');
  if (copyEmailBtn && copyFeedback) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.getAttribute('data-email') || '';
      try {
        await navigator.clipboard.writeText(email);
        copyFeedback.textContent = 'Copied!';
        setTimeout(() => {
          copyFeedback.textContent = 'Copy';
        }, 2000);
      } catch (err) {
        window.location.href = `mailto:${email}`;
      }
    });
  }

  // 5. CMS & Deploy Guide Drawer
  const drawer = document.getElementById('cms-guide-drawer');
  const openBtn = document.getElementById('cms-guide-toggle');
  const closeBtn = document.getElementById('cms-drawer-close');
  const backdrop = document.getElementById('cms-drawer-backdrop');

  function setDrawerOpen(isOpen) {
    if (!drawer || !openBtn) return;
    drawer.classList.toggle('is-open', isOpen);
    drawer.setAttribute('aria-hidden', String(!isOpen));
    openBtn.setAttribute('aria-expanded', String(isOpen));
  }

  if (openBtn) {
    openBtn.addEventListener('click', () => setDrawerOpen(true));
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', () => setDrawerOpen(false));
  }
  if (backdrop) {
    backdrop.addEventListener('click', () => setDrawerOpen(false));
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) {
      setDrawerOpen(false);
    }
  });

  // 6. Smooth In-Page Anchor Scrolling (prevents iframe navigation issues)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
