/* ============================================================
   SHANGARH SAINJ VALLEY — Premium Travel Microsite
   Interactive JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── Configuration ─────────────────────────────────────── */
  const CONFIG = {
    // Set the trip departure date (YYYY-MM-DD format)
    tripDate: '2026-08-15',
    // Packing items organized into 4 categories
    packingItems: {
      'Essentials': [
        'Trekking Shoes', 'Jacket', 'Small Day Backpack (20–30L)',
        'Water Bottle', 'Sunscreen', 'Sunglasses', 'Power Bank',
        'Toiletries', 'ID Proof', 'Cap', 'Lip Balm', 'Big Bag',
        'Small Backpack', 'Cash', 'Aadhar Card', 'Wallet',
        'Tickets', 'Metro Card'
      ],
      'Clothing': [
        'Quick Dry Clothes', 'Quick Dry Towel', 'Socks',
        'Hoodie', 'Joggers', 'Trousers', 'Half Sleeve Tshirts',
        'Shorts', 'Belt', 'Running Shoes', 'Slippers',
        'Hand Towel', 'Swimming Costume'
      ],
      'Tech & Gear': [
        'Charger (Apple)', 'Type C Charger', 'Micro USB Charger',
        'Speaker', 'Camera', 'Debit Card', 'Credit Card',
        'Perfume', 'Watch', 'Caps'
      ],
      'Hygiene & Medical': [
        'Brush', 'Toothpaste', 'Shower Gel', 'Shampoo',
        'Facewash', 'Hair Brush', 'Sanitizer', 'Face Wipes',
        'Medical Kit', 'Norflox', 'PCM', 'ORS', 'Glucon D',
        'Vitamin C', 'Band Aid', 'Medicines', 'Snacks',
        'Cold Drinks'
      ]
    },
    localStorageKey: 'shangarh_packing_checklist'
  };


  /* ── DOM Ready ─────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initLoader();
    initNavigation();
    initScrollProgress();
    initScrollToTop();
    initRevealAnimations();
    initLazyLoading();
    initFloatingLeaves();
    initFloatingBirds();
    initStars();
    initBonfireSparks();
    initPackingChecklist();
    initGalleryLightbox();
    initCountdown();
    initAnimatedCounters();
    initElevationProfile();
  }


  /* ── Loading Screen ────────────────────────────────────── */
  function initLoader() {
    const loader = document.getElementById('loader');
    // Wait for critical resources, then fade out
    window.addEventListener('load', function () {
      setTimeout(function () {
        loader.classList.add('hidden');
      }, 800);
    });

    // Fallback: hide loader after 3 seconds regardless
    setTimeout(function () {
      loader.classList.add('hidden');
    }, 3000);
  }


  /* ── Navigation ────────────────────────────────────────── */
  function initNavigation() {
    var navbar = document.getElementById('navbar');
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');
    var links = document.querySelectorAll('.nav__link');
    var sections = document.querySelectorAll('section[id]');

    // Scroll state change
    function updateNav() {
      if (window.scrollY > 60) {
        navbar.classList.add('nav--scrolled');
      } else {
        navbar.classList.remove('nav--scrolled');
      }
    }

    window.addEventListener('scroll', throttle(updateNav, 100));
    updateNav();

    // Hamburger toggle
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });

    // Active section highlighting
    function updateActiveLink() {
      var scrollPos = window.scrollY + 150;

      sections.forEach(function (section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          links.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', throttle(updateActiveLink, 150));
  }


  /* ── Scroll Progress Bar ───────────────────────────────── */
  function initScrollProgress() {
    var progressBar = document.getElementById('scrollProgress');

    function updateProgress() {
      var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      var scrolled = (window.scrollY / scrollHeight) * 100;
      progressBar.style.width = scrolled + '%';
    }

    window.addEventListener('scroll', throttle(updateProgress, 30));
  }


  /* ── Scroll to Top Button ──────────────────────────────── */
  function initScrollToTop() {
    var btn = document.getElementById('scrollTop');

    function toggleVisibility() {
      if (window.scrollY > 600) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', throttle(toggleVisibility, 100));

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ── Reveal Animations (Intersection Observer) ─────────── */
  function initRevealAnimations() {
    var reveals = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything immediately
      reveals.forEach(function (el) { el.classList.add('revealed'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Don't unobserve to allow re-triggering if needed
          // observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }


  /* ── Lazy Loading Images ───────────────────────────────── */
  function initLazyLoading() {
    var lazyImages = document.querySelectorAll('img[data-src]');

    if (!('IntersectionObserver' in window)) {
      lazyImages.forEach(function (img) {
        img.src = img.dataset.src;
        img.classList.add('loaded');
      });
      return;
    }

    var imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.dataset.src;
          img.addEventListener('load', function () {
            img.classList.add('loaded');
          });
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px 0px'
    });

    lazyImages.forEach(function (img) {
      imageObserver.observe(img);
    });
  }


  /* ── Floating Leaves ───────────────────────────────────── */
  function initFloatingLeaves() {
    var container = document.getElementById('heroLeaves');
    var leaves = ['🍃', '🍂', '🌿'];
    var leafCount = 8;

    for (var i = 0; i < leafCount; i++) {
      var leaf = document.createElement('span');
      leaf.className = 'leaf';
      leaf.textContent = leaves[i % leaves.length];
      leaf.style.left = Math.random() * 100 + '%';
      leaf.style.animationDuration = (8 + Math.random() * 12) + 's';
      leaf.style.animationDelay = (Math.random() * 15) + 's';
      leaf.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
      container.appendChild(leaf);
    }
  }


  /* ── Floating Birds ────────────────────────────────────── */
  function initFloatingBirds() {
    var container = document.getElementById('floatingBirds');
    var birdCount = 4;

    for (var i = 0; i < birdCount; i++) {
      var bird = document.createElement('span');
      bird.className = 'bird';
      bird.textContent = '🕊';
      bird.style.top = (10 + Math.random() * 30) + '%';
      bird.style.animationDuration = (20 + Math.random() * 20) + 's';
      bird.style.animationDelay = (Math.random() * 15) + 's';
      bird.style.fontSize = (0.6 + Math.random() * 0.5) + 'rem';
      container.appendChild(bird);
    }
  }


  /* ── Stars (Evening & Footer) ──────────────────────────── */
  function initStars() {
    createStars('eveningStars', 'evening__star', 50);
    createStars('footerStars', 'footer__star', 80);
  }

  function createStars(containerId, className, count) {
    var container = document.getElementById(containerId);
    if (!container) return;

    for (var i = 0; i < count; i++) {
      var star = document.createElement('span');
      star.className = className;
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.width = (1 + Math.random() * 2) + 'px';
      star.style.height = star.style.width;
      star.style.animationDuration = (2 + Math.random() * 4) + 's';
      star.style.animationDelay = (Math.random() * 3) + 's';
      star.style.animation = 'starTwinkle ' + (2 + Math.random() * 4) + 's ease-in-out ' + (Math.random() * 3) + 's infinite';
      container.appendChild(star);
    }
  }


  /* ── Bonfire Sparks ────────────────────────────────────── */
  function initBonfireSparks() {
    createSparks('bonfireSparks');
    createSparks('footerSparks');
  }

  function createSparks(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    for (var i = 0; i < 8; i++) {
      var spark = document.createElement('span');
      spark.className = 'spark';
      var sx = (-15 + Math.random() * 30) + 'px';
      spark.style.setProperty('--sx', sx);
      spark.style.left = (-10 + Math.random() * 20) + 'px';
      spark.style.animationDuration = (1 + Math.random() * 2) + 's';
      spark.style.animationDelay = (Math.random() * 3) + 's';
      container.appendChild(spark);
    }
  }


  /* ── Packing Checklist ─────────────────────────────────── */
  function initPackingChecklist() {
    var grid = document.getElementById('packingGrid');
    var categories = CONFIG.packingItems;
    var savedState = loadPackingState();
    var allItems = [];

    // Create columns for each category
    Object.keys(categories).forEach(function (category) {
      var column = document.createElement('div');
      column.className = 'packing__column';

      var title = document.createElement('h3');
      title.className = 'packing__column-title';
      title.textContent = category;
      column.appendChild(title);

      categories[category].forEach(function (itemName) {
        var item = document.createElement('div');
        item.className = 'packing__item';
        item.dataset.item = itemName;

        // Check if this item was previously checked
        if (savedState[itemName]) {
          item.classList.add('checked');
        }

        var checkbox = document.createElement('span');
        checkbox.className = 'packing__checkbox';
        checkbox.textContent = '✓';

        var text = document.createElement('span');
        text.className = 'packing__item-text';
        text.textContent = itemName;

        item.appendChild(checkbox);
        item.appendChild(text);
        column.appendChild(item);

        allItems.push(item);

        // Click handler
        item.addEventListener('click', function () {
          item.classList.toggle('checked');
          savePackingState(allItems);
          updatePackingProgress(allItems);
        });
      });

      grid.appendChild(column);
    });

    // Initialize counters
    var total = allItems.length;
    document.getElementById('totalCount').textContent = total;
    updatePackingProgress(allItems);
  }

  function updatePackingProgress(items) {
    var total = items.length;
    var packed = items.filter(function (item) {
      return item.classList.contains('checked');
    }).length;
    var remaining = total - packed;
    var percent = total > 0 ? Math.round((packed / total) * 100) : 0;

    // Update display
    document.getElementById('packedCount').textContent = packed;
    document.getElementById('remainingCount').textContent = remaining;
    document.getElementById('progressPercent').textContent = percent + '%';

    // Update circular progress
    var circle = document.getElementById('progressCircle');
    var circumference = 2 * Math.PI * 52; // r=52
    var offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }

  function savePackingState(items) {
    var state = {};
    items.forEach(function (item) {
      state[item.dataset.item] = item.classList.contains('checked');
    });
    try {
      localStorage.setItem(CONFIG.localStorageKey, JSON.stringify(state));
    } catch (e) {
      // localStorage not available
    }
  }

  function loadPackingState() {
    try {
      var data = localStorage.getItem(CONFIG.localStorageKey);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }


  /* ── Gallery Lightbox ──────────────────────────────────── */
  function initGalleryLightbox() {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightboxImg');
    var lightboxCaption = document.getElementById('lightboxCaption');
    var lightboxClose = document.getElementById('lightboxClose');
    var galleryItems = document.querySelectorAll('.gallery__item');

    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        var img = item.querySelector('img');
        var caption = item.dataset.caption || '';
        lightboxImg.src = img.src || img.dataset.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }


  /* ── Countdown Timer ───────────────────────────────────── */
  function initCountdown() {
    var countdownEl = document.getElementById('countdownDays');
    var tripDate = new Date(CONFIG.tripDate + 'T00:00:00');

    function updateCountdown() {
      var now = new Date();
      var diff = tripDate - now;
      var days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
      countdownEl.textContent = days;
    }

    updateCountdown();
    // Update once per hour
    setInterval(updateCountdown, 3600000);
  }


  /* ── Animated Counters ─────────────────────────────────── */
  function initAnimatedCounters() {
    var counters = document.querySelectorAll('.counter');

    if (!('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  function animateCounter(el) {
    var target = parseInt(el.textContent, 10);
    if (isNaN(target) || target === 0) {
      // For countdown, trigger re-read after a brief delay
      setTimeout(function () {
        target = parseInt(el.textContent, 10);
        if (isNaN(target)) return;
        runCounterAnimation(el, target);
      }, 100);
      return;
    }
    runCounterAnimation(el, target);
  }

  function runCounterAnimation(el, target) {
    var current = 0;
    var increment = Math.max(1, Math.floor(target / 40));
    var duration = 1500;
    var stepTime = duration / (target / increment);

    var timer = setInterval(function () {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current;
    }, stepTime);
  }


  /* ── Elevation Profile Animation ───────────────────────── */
  function initElevationProfile() {
    var elevation = document.getElementById('elevationProfile');
    if (!elevation) return;

    if (!('IntersectionObserver' in window)) {
      elevation.classList.add('revealed');
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(elevation);
  }


  /* ── Utility Functions ─────────────────────────────────── */

  /**
   * Throttle function to limit execution rate
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time in ms between executions
   * @returns {Function}
   */
  function throttle(func, limit) {
    var lastFunc;
    var lastRan;
    return function () {
      var context = this;
      var args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }

})();
