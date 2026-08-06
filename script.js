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
    initBlobUploader();
    initBlobGallery();
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


  /* ── Live Countdown Timer ───────────────────────────────── */
  function initCountdown() {
    var hoursEl = document.getElementById('countdownHours');
    var minutesEl = document.getElementById('countdownMinutes');
    var secondsEl = document.getElementById('countdownSeconds');

    // Trip departure: 8:30 PM IST on July 31, 2026
    // IST is UTC+5:30, so 8:30 PM IST = 15:00 UTC
    var tripDate = new Date('2026-07-31T20:30:00+05:30');

    function pad(n) {
      return n < 10 ? '0' + n : String(n);
    }

    function updateCountdown() {
      var now = new Date();
      var diff = tripDate - now;

      if (diff <= 0) {
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        document.querySelector('.fun__countdown-label').textContent = '🎉 Trip has started!';
        return;
      }

      var totalSeconds = Math.floor(diff / 1000);
      var hours = Math.floor(totalSeconds / 3600);
      var minutes = Math.floor((totalSeconds % 3600) / 60);
      var seconds = totalSeconds % 60;

      hoursEl.textContent = pad(hours);
      minutesEl.textContent = pad(minutes);
      secondsEl.textContent = pad(seconds);
    }

    updateCountdown();
    // Update every second for live tracking
    setInterval(updateCountdown, 1000);
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


  /* ── Vercel Blob Image Uploader & Gallery ──────────────── */
  function initBlobUploader() {
    var dropZone = document.getElementById('dropZone');
    var fileInput = document.getElementById('fileInput');
    var uploadPreviews = document.getElementById('uploadPreviews');
    var previewGrid = document.getElementById('previewGrid');
    var previewCount = document.getElementById('previewCount');
    var clearPreviewsBtn = document.getElementById('clearPreviewsBtn');
    var startUploadBtn = document.getElementById('startUploadBtn');
    var progressWrapper = document.getElementById('progressWrapper');
    var progressFill = document.getElementById('progressFill');
    var progressPercentageText = document.getElementById('progressPercentageText');
    var progressStatusText = document.getElementById('progressStatusText');
    var folderSelect = document.getElementById('uploadFolderSelect');

    var selectedFiles = [];
    var ALLOWED_EXTS = ['jpg', 'jpeg', 'png', 'webp'];
    var MAX_SIZE = 20 * 1024 * 1024; // 20MB

    if (!dropZone || !fileInput) return;

    // Drag & Drop events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
      dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(function (eventName) {
      dropZone.addEventListener(eventName, function () {
        dropZone.classList.add('dragover');
      }, false);
    });

    ['dragleave', 'drop'].forEach(function (eventName) {
      dropZone.addEventListener(eventName, function () {
        dropZone.classList.remove('dragover');
      }, false);
    });

    dropZone.addEventListener('drop', function (e) {
      var dt = e.dataTransfer;
      var files = dt.files;
      handleFiles(files);
    });

    fileInput.addEventListener('change', function () {
      handleFiles(this.files);
      this.value = '';
    });

    clearPreviewsBtn.addEventListener('click', function () {
      selectedFiles = [];
      renderPreviews();
    });

    function handleFiles(files) {
      var validFiles = [];
      var errors = [];

      Array.from(files).forEach(function (file) {
        var ext = file.name.split('.').pop().toLowerCase();
        if (!ALLOWED_EXTS.includes(ext)) {
          errors.push('"' + file.name + '" is not an allowed format (jpg, jpeg, png, webp).');
          return;
        }
        if (file.size > MAX_SIZE) {
          errors.push('"' + file.name + '" exceeds the 20MB maximum file size.');
          return;
        }

        var isDuplicate = selectedFiles.some(function (f) {
          return f.name === file.name && f.size === file.size;
        });

        if (isDuplicate) {
          errors.push('"' + file.name + '" is already selected.');
          return;
        }

        validFiles.push(file);
      });

      if (errors.length > 0) {
        showNotification(errors.join('<br>'), 'error');
      }

      if (validFiles.length > 0) {
        selectedFiles = selectedFiles.concat(validFiles);
        renderPreviews();
      }
    }

    function renderPreviews() {
      previewGrid.innerHTML = '';
      if (selectedFiles.length === 0) {
        uploadPreviews.classList.add('hidden');
        return;
      }

      uploadPreviews.classList.remove('hidden');
      previewCount.textContent = selectedFiles.length + (selectedFiles.length === 1 ? ' file selected' : ' files selected');

      selectedFiles.forEach(function (file, index) {
        var card = document.createElement('div');
        card.className = 'preview-card';

        var img = document.createElement('img');
        img.className = 'preview-card__img';
        img.alt = file.name;

        createCompressedPreview(file, function (dataUrl) {
          img.src = dataUrl;
        });

        var info = document.createElement('div');
        info.className = 'preview-card__info';

        var name = document.createElement('div');
        name.className = 'preview-card__name';
        name.textContent = file.name;

        var size = document.createElement('div');
        size.className = 'preview-card__size';
        size.textContent = formatBytes(file.size);

        info.appendChild(name);
        info.appendChild(size);

        var removeBtn = document.createElement('button');
        removeBtn.className = 'preview-card__remove';
        removeBtn.innerHTML = '✕';
        removeBtn.title = 'Remove image';
        removeBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          selectedFiles.splice(index, 1);
          renderPreviews();
        });

        card.appendChild(img);
        card.appendChild(info);
        card.appendChild(removeBtn);
        previewGrid.appendChild(card);
      });
    }

    function createCompressedPreview(file, callback) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var img = new Image();
        img.onload = function () {
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          var maxWidth = 300;
          var maxHeight = 300;
          var width = img.width;
          var height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          callback(canvas.toDataURL('image/jpeg', 0.7));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    startUploadBtn.addEventListener('click', function () {
      if (selectedFiles.length === 0) return;

      var folder = folderSelect ? folderSelect.value : 'gallery';
      startUploadBtn.disabled = true;
      progressWrapper.classList.remove('hidden');
      updateProgress(10, 'Uploading to Vercel Blob...');

      uploadFilesWithRetry(selectedFiles, folder, 2)
        .then(function (result) {
          if (result.success && result.images) {
            updateProgress(100, 'Upload complete!');
            showNotification('Successfully uploaded ' + result.images.length + ' image(s) to Vercel Blob!', 'success');

            result.images.forEach(function (image) {
              addBlobToGallery(image);
            });

            selectedFiles = [];
            renderPreviews();
          } else {
            showNotification(result.error || 'Upload failed.', 'error');
          }
        })
        .catch(function (err) {
          showNotification('Upload error: ' + (err.message || 'Network error'), 'error');
        })
        .finally(function () {
          startUploadBtn.disabled = false;
          setTimeout(function () {
            progressWrapper.classList.add('hidden');
          }, 1500);
        });
    });

    function uploadFilesWithRetry(files, folder, retriesLeft) {
      var formData = new FormData();
      formData.append('folder', folder);
      files.forEach(function (file) {
        formData.append('files', file);
      });

      return fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
        .then(function (res) {
          if (!res.ok) {
            return res.json().then(function (data) {
              throw new Error(data.error || 'Server responded with status ' + res.status);
            });
          }
          return res.json();
        })
        .catch(function (err) {
          if (retriesLeft > 0) {
            updateProgress(40, 'Retrying upload...');
            return new Promise(function (resolve) {
              setTimeout(resolve, 1000);
            }).then(function () {
              return uploadFilesWithRetry(files, folder, retriesLeft - 1);
            });
          }
          throw err;
        });
    }

    function updateProgress(percent, text) {
      progressFill.style.width = percent + '%';
      progressPercentageText.textContent = percent + '%';
      if (text) progressStatusText.textContent = text;
    }
  }

  /* ── Gallery Item Actions & Vercel Blob Sync ─────────────── */
  function initBlobGallery() {
    var galleryItems = document.querySelectorAll('#galleryGrid .gallery__item');
    galleryItems.forEach(function (item) {
      attachGalleryItemActions(item);
    });

    fetch('/api/list')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success && Array.isArray(data.blobs)) {
          data.blobs.forEach(function (blob) {
            addBlobToGallery(blob);
          });
        }
      })
      .catch(function (err) {
        console.log('Could not list blobs:', err);
      });
  }

  function addBlobToGallery(blobData) {
    var galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    var existing = galleryGrid.querySelector('[data-blob-url="' + blobData.url + '"]');
    if (existing) return;

    var item = document.createElement('div');
    item.className = 'gallery__item revealed';
    item.setAttribute('data-blob-url', blobData.url);
    item.setAttribute('data-caption', blobData.pathname || 'Uploaded to Vercel Blob');

    var img = document.createElement('img');
    img.src = blobData.url;
    img.alt = blobData.pathname || 'Vercel Blob Image';
    img.loading = 'lazy';
    img.className = 'loaded';

    var overlay = document.createElement('div');
    overlay.className = 'gallery__item-overlay';
    var caption = document.createElement('span');
    caption.className = 'gallery__item-caption';
    caption.textContent = (blobData.pathname || 'Vercel Blob Image').split('/').pop();
    overlay.appendChild(caption);

    item.appendChild(img);
    item.appendChild(overlay);

    attachGalleryItemActions(item, blobData.url);

    galleryGrid.insertBefore(item, galleryGrid.firstChild);

    item.addEventListener('click', function (e) {
      if (e.target.closest('.gallery__item-actions')) return;
      var lightbox = document.getElementById('lightbox');
      var lightboxImg = document.getElementById('lightboxImg');
      var lightboxCaption = document.getElementById('lightboxCaption');
      if (lightbox && lightboxImg) {
        lightboxImg.src = blobData.url;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = item.dataset.caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  function attachGalleryItemActions(item, blobUrl) {
    if (item.querySelector('.gallery__item-actions')) return;

    var img = item.querySelector('img');
    var url = blobUrl || (img ? (img.src || img.dataset.src) : '');

    var actionsContainer = document.createElement('div');
    actionsContainer.className = 'gallery__item-actions';

    // Copy URL Button
    var copyBtn = document.createElement('button');
    copyBtn.className = 'gallery-action-btn';
    copyBtn.innerHTML = '📋 Copy';
    copyBtn.title = 'Copy Image URL';
    copyBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var targetUrl = url.startsWith('http') ? url : window.location.origin + '/' + url;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(targetUrl).then(function () {
          showNotification('Image URL copied to clipboard!', 'success');
        }).catch(function () {
          fallbackCopyText(targetUrl);
        });
      } else {
        fallbackCopyText(targetUrl);
      }
    });

    // Download Button
    var downloadBtn = document.createElement('button');
    downloadBtn.className = 'gallery-action-btn';
    downloadBtn.innerHTML = '⬇ Download';
    downloadBtn.title = 'Download Image';
    downloadBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      downloadImage(url, (item.dataset.caption || 'image').replace(/[^a-zA-Z0-9_\-]/g, '_'));
    });

    actionsContainer.appendChild(copyBtn);
    actionsContainer.appendChild(downloadBtn);

    // Delete Button (if it's a Vercel Blob URL or user uploaded item)
    if (url && (url.includes('vercel-storage.com') || url.includes('public.blob.vercel-storage') || blobUrl)) {
      var deleteBtn = document.createElement('button');
      deleteBtn.className = 'gallery-action-btn gallery-action-btn--delete';
      deleteBtn.innerHTML = '🗑 Delete';
      deleteBtn.title = 'Delete from Vercel Blob';
      deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this image from Vercel Blob?')) {
          item.classList.add('deleting');
          fetch('/api/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: url })
          })
            .then(function (res) { return res.json(); })
            .then(function (data) {
              if (data.success) {
                showNotification('Image deleted successfully from Vercel Blob!', 'success');
                item.remove();
              } else {
                item.classList.remove('deleting');
                showNotification(data.error || 'Failed to delete image.', 'error');
              }
            })
            .catch(function (err) {
              item.classList.remove('deleting');
              showNotification('Delete error: ' + err.message, 'error');
            });
        }
      });
      actionsContainer.appendChild(deleteBtn);
    }

    item.appendChild(actionsContainer);
  }

  function fallbackCopyText(text) {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showNotification('Image URL copied to clipboard!', 'success');
    } catch (err) {
      showNotification('Failed to copy URL.', 'error');
    }
    document.body.removeChild(textArea);
  }

  function downloadImage(url, filename) {
    fetch(url)
      .then(function (res) { return res.blob(); })
      .then(function (blob) {
        var a = document.createElement('a');
        var objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = filename || 'download';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(objectUrl);
      })
      .catch(function () {
        var a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.download = filename || 'download';
        a.click();
      });
  }

  function showNotification(message, type) {
    var container = document.getElementById('uploadNotifications');
    if (!container) return;

    var toast = document.createElement('div');
    toast.className = 'notification-toast notification-toast--' + type;
    toast.innerHTML = (type === 'success' ? '✅ ' : '⚠️ ') + message;

    container.appendChild(toast);

    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 4000);
  }

  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    var k = 1024;
    var sizes = ['Bytes', 'KB', 'MB', 'GB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

})();

