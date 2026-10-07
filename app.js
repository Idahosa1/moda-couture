/**
 * MODA COUTURE — Interactive E-Commerce & Atelier Application
 * Craft Standards: Emil Kowalski & Jakub Krehel
 * Strictly 2 Fonts: Plus Jakarta Sans & Space Grotesk (Prices & Highlights Only)
 */

(function () {
  'use strict';

  // Parse URL Search Parameters for testing & deep-linking
  const urlParams = new URLSearchParams(window.location.search);
  const paramTheme = urlParams.get('theme');
  const paramCurrency = urlParams.get('currency');
  const paramProduct = urlParams.get('id') || urlParams.get('product');
  const paramCart = urlParams.get('cart');
  const paramMobileNav = urlParams.get('mobileNav');
  const paramConsultation = urlParams.get('consultation');
  const paramCheckout = urlParams.get('checkout');

  // State Management
  const state = {
    currency: paramCurrency || localStorage.getItem('moda_currency') || 'NGN',
    theme: paramTheme || localStorage.getItem('moda_theme') || 'light',
    activeCategory: 'all',
    searchQuery: '',
    sortBy: 'featured',
    cart: JSON.parse(localStorage.getItem('moda_cart') || '[]'),
    selectedProduct: null,
    selectedSize: null,
    isBespokeFitting: false,
    selectedGalleryImageIndex: 0
  };

  // Curated Products Database — Clean Editorial Studio Photography
  const products = [
    {
      id: 'senator-01',
      name: 'The Lagos Senator 01',
      category: 'senator',
      categoryLabel: 'Senator Suit',
      priceNGN: 185000,
      priceUSD: 125,
      tag: 'Signature Piece',
      fabric: 'Super 140s Italian Wool & Silk Blend',
      cut: 'Tailored Slim Structured Fit',
      description: 'Handcrafted in our Lagos atelier, the Lagos Senator 01 reimagines traditional Nigerian authority through sharp contemporary lines. Features a concealed front placket, mandarin collar, and our signature geometric terracotta needlework across the left breast.',
      images: [
        'assets/images/senator_black.jpg',
        'assets/images/senator_detail.jpg',
        'assets/images/senator_midnight.jpg'
      ],
      sizes: ['38R', '40R', '42R', '44L', '46L'],
      details: [
        'Concealed placket with genuine horn buttons',
        'Minimalist geometric terracotta embroidery',
        'Matching tapered trousers with side adjusters',
        'Full breathable silk-viscose lining'
      ]
    },
    {
      id: 'fila-01',
      name: 'Royal Noir Velvet Fila Cap',
      category: 'fila',
      categoryLabel: 'Handcrafted Fila',
      priceNGN: 45000,
      priceUSD: 32,
      tag: 'Handcrafted',
      fabric: 'Plush Obsidian Velvet & Metallic Thread',
      cut: 'Traditional Gobi Folded Silhouette',
      description: 'An iconic crown of Yoruba heritage, meticulously hand-embroidered with spiraling geometric motifs using gold and bronze metallic thread. Crafted from dense luxury velvet that retains its architectural shape effortlessly.',
      images: [
        'assets/images/fila_black.jpg',
        'assets/images/fila_terracotta.jpg'
      ],
      sizes: ['56cm', '58cm', '60cm', '62cm'],
      details: [
        'Traditional Yoruba Gobi pleat style',
        'Hand-guided bullion wire embroidery',
        'Padded sweatband for all-day comfort',
        'Moda Couture archival edition'
      ]
    },
    {
      id: 'agbada-01',
      name: 'The Eko Sovereign Agbada Robe',
      category: 'agbada',
      categoryLabel: 'Grand Agbada',
      priceNGN: 340000,
      priceUSD: 230,
      tag: 'Couture Atelier',
      fabric: 'High-Twist Wool Crepe & Silk Weave',
      cut: 'Architectural Drape 3-Piece Set',
      description: 'The pinnacle of ceremonial presence. The Eko Sovereign Agbada features sculpted shoulder geometry that cascades naturally down the torso. Complete with internal tailored vest, tunic, and tapered trousers.',
      images: [
        'assets/images/agbada_noir.jpg',
        'assets/images/agbada_runway.jpg',
        'assets/images/senator_detail.jpg'
      ],
      sizes: ['38R', '40R', '42R', '44L', '46L'],
      details: [
        '3-piece ensemble: Agbada, Awotele (Tunic), Sokoto (Trousers)',
        'Geometric chest medallion with tone-on-tone embroidery',
        'Weighted hemline for flawless runway drape',
        'Accommodates bespoke shoulder alterations'
      ]
    },
    {
      id: 'senator-02',
      name: 'The Sahara Ivory Senator Suit',
      category: 'senator',
      categoryLabel: 'Senator Suit',
      priceNGN: 195000,
      priceUSD: 135,
      tag: 'New Season',
      fabric: 'Swiss Cashmere-Cotton & Terracotta Silk',
      cut: 'Contemporary Modernist Cut',
      description: 'A striking departure in warm ivory cream, balanced with refined terracotta piping along the stand collar, placket, and cuff edges. Designed for day receptions, galas, and summer international soirees.',
      images: [
        'assets/images/senator_cream.jpg',
        'assets/images/senator_detail.jpg',
        'assets/images/senator_black.jpg'
      ],
      sizes: ['38R', '40R', '42R', '44L', '46L'],
      details: [
        'Ivory double-faced breathable Swiss cotton-cashmere',
        'Terracotta silk piping along placket & cuffs',
        'Hand-stitched covered buttons',
        'Trousers with clean flat front & curtain waistband'
      ]
    },
    {
      id: 'fila-02',
      name: 'Terracotta Rust Aso-Oke Fila',
      category: 'fila',
      categoryLabel: 'Handcrafted Fila',
      priceNGN: 52000,
      priceUSD: 36,
      tag: 'Artisanal Weave',
      fabric: 'Handwoven Nigerian Aso-Oke Cloth',
      cut: 'Sculpted Peak Silhouette',
      description: 'Woven on traditional wooden looms in Iseyin, Oyo State, this Fila cap pairs natural rust terracotta cotton with obsidian black pinstripes and metallic gold accents. Each piece carries subtle weaver markings.',
      images: [
        'assets/images/fila_terracotta.jpg',
        'assets/images/fila_black.jpg'
      ],
      sizes: ['56cm', '58cm', '60cm', '62cm'],
      details: [
        '100% authentic handwoven Yoruba Aso-Oke',
        'Metallic gold threading woven directly into the selvedge',
        'Breathable natural cotton structure',
        'Can be folded to the left or right'
      ]
    },
    {
      id: 'senator-03',
      name: 'Midnight Obsidian Senator Suit',
      category: 'senator',
      categoryLabel: 'Senator Suit',
      priceNGN: 210000,
      priceUSD: 145,
      tag: 'Atelier Limited',
      fabric: 'Super 160s Worsted Charcoal Wool',
      cut: 'Slim Atelier Cut',
      description: 'Designed for the sartorial connoisseur. An asymmetrical geometric embroidery pattern sweeps across the left chest and collar in muted bronze and terracotta hues, creating a sharp graphic statement.',
      images: [
        'assets/images/senator_midnight.jpg',
        'assets/images/senator_detail.jpg',
        'assets/images/senator_black.jpg'
      ],
      sizes: ['38R', '40R', '42R', '44L', '46L'],
      details: [
        'Super 160s worsted wool from Biella, Italy',
        'Intricate multi-directional needle embroidery',
        'Discreet zipped side vent for smooth sitting drape',
        'Hand-finished hem and cuff buttons'
      ]
    },
    {
      id: 'agbada-02',
      name: 'The Gilded Ivory Agbada Set',
      category: 'agbada',
      categoryLabel: 'Grand Agbada',
      priceNGN: 380000,
      priceUSD: 260,
      tag: 'Runway Edition',
      fabric: 'Structured Damask & Silk Brocade',
      cut: 'Monumental Flow Silhouette',
      description: 'Celebrated across royal durbars and international galas, this majestic piece combines traditional West African royalty with stark architectural minimalism.',
      images: [
        'assets/images/agbada_runway.jpg',
        'assets/images/agbada_noir.jpg',
        'assets/images/senator_detail.jpg'
      ],
      sizes: ['38R', '40R', '42R', '44L', '46L'],
      details: [
        'Signature proportion with broad architectural wingspan',
        'Includes complimentary hand-woven velvet Fila',
        'Deep side slits for effortless stride',
        'Hand-stitched by senior master tailors'
      ]
    },
    {
      id: 'bespoke-01',
      name: 'Bespoke 14-Point Commission',
      category: 'bespoke',
      categoryLabel: 'Bespoke Atelier',
      priceNGN: 225000,
      priceUSD: 155,
      tag: 'Bespoke Only',
      fabric: 'Custom Client Selection (Wool/Silk/Damask)',
      cut: 'Individually Drafted Pattern',
      description: 'Work directly with our master cutters to create an entirely bespoke Senator or Agbada set drafted from your unique 14-point body measurements. Includes custom geometric chest embroidery designed specifically for you.',
      images: [
        'assets/images/senator_black.jpg',
        'assets/images/senator_cream.jpg',
        'assets/images/senator_detail.jpg'
      ],
      sizes: ['Bespoke Fit'],
      details: [
        '14 individual anatomical measurements drafted on paper',
        'Direct consultation with Moda Head Tailor',
        'Personalized initials embroidered inside placket',
        'Guaranteed fit with complimentary adjustments'
      ]
    }
  ];

  // Helper: Format Price in Space Grotesk tabular-nums
  function formatPrice(priceNGN, priceUSD) {
    if (state.currency === 'USD') {
      return `$${priceUSD.toLocaleString('en-US')}`;
    }
    return `₦${priceNGN.toLocaleString('en-NG')}`;
  }

  // Toast Notification System
  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </span>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }

  // Theme Toggling
  function initTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    updateThemeToggleIcons();
  }

  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('moda_theme', state.theme);
    document.documentElement.setAttribute('data-theme', state.theme);
    updateThemeToggleIcons();
    showToast(`Switched to ${state.theme === 'dark' ? 'Dark Noir' : 'Light Atelier'} theme`);
  }

  function updateThemeToggleIcons() {
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    if (!sunIcon || !moonIcon) return;

    if (state.theme === 'dark') {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    } else {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    }
  }

  // Currency Toggling
  function setCurrency(currency) {
    if (state.currency === currency) return;
    state.currency = currency;
    localStorage.setItem('moda_currency', currency);

    document.querySelectorAll('.currency-toggle-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.currency === currency);
    });

    renderCatalog();
    renderCart();
    if (state.selectedProduct) {
      const priceEl = document.getElementById('pdpPriceText');
      if (priceEl) priceEl.textContent = formatPrice(state.selectedProduct.priceNGN, state.selectedProduct.priceUSD);
    }

    showToast(`Currency updated to ${currency === 'NGN' ? 'Nigerian Naira (₦)' : 'US Dollar ($)'}`);
  }

  // Snappy Editorial Swipe Page Navigation (Directional GPU Transform)
  function navigateToProduct(productId) {
    const panel = document.getElementById('pageSwipePanel');
    sessionStorage.setItem('moda_swipe_dir', 'forward');
    if (panel) {
      panel.style.borderRight = 'none';
      panel.style.borderLeft = '2px solid var(--terracotta)';
      panel.style.transition = 'transform 200ms cubic-bezier(0.23, 1, 0.32, 1)';
      panel.classList.add('swipe-in');
      setTimeout(() => {
        window.location.href = `product.html?id=${encodeURIComponent(productId)}`;
      }, 160);
    } else {
      window.location.href = `product.html?id=${encodeURIComponent(productId)}`;
    }
  }

  // Render Catalog Grid on index.html
  function renderCatalog() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    let filtered = products.filter(p => {
      const matchesCat = state.activeCategory === 'all' || p.category === state.activeCategory;
      const matchesSearch = !state.searchQuery ||
        p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        p.fabric.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(state.searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });

    if (state.sortBy === 'price-asc') {
      filtered.sort((a, b) => (state.currency === 'USD' ? a.priceUSD - b.priceUSD : a.priceNGN - b.priceNGN));
    } else if (state.sortBy === 'price-desc') {
      filtered.sort((a, b) => (state.currency === 'USD' ? b.priceUSD - a.priceUSD : b.priceNGN - a.priceNGN));
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <p style="font-size: 1.25rem; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; margin-bottom: 0.5rem;">No items found matching your selection.</p>
          <p style="font-size: 0.85rem;">Try refining your keywords or selecting another category.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(product => `
      <article class="product-card" data-product-id="${product.id}">
        <div class="product-card-img-container">
          <span class="product-tag-pill">${product.tag}</span>
          <img src="${product.images[0]}" alt="${product.name}" loading="lazy" />
          <div class="product-quick-view-overlay">
            <button class="quick-view-btn" data-product-id="${product.id}" aria-label="Inspect ${product.name}">
              Inspect Piece
            </button>
          </div>
        </div>
        <div class="product-info">
          <span class="product-category-meta">${product.categoryLabel}</span>
          <h3 class="product-title">${product.name}</h3>
          <span class="product-spec">${product.fabric}</span>
          <div class="product-price-row">
            <span class="product-price tabular-nums">${formatPrice(product.priceNGN, product.priceUSD)}</span>
            <span class="product-bespoke-badge">${product.cut}</span>
          </div>
        </div>
      </article>
    `).join('');

    // Attach card click handlers: clicking card or Inspect Piece navigates to dedicated product page
    grid.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = card.dataset.productId;
        navigateToProduct(id);
      });
    });

    grid.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.productId;
        navigateToProduct(id);
      });
    });
  }

  // Initial Page Preloader Animation (Outfit.hellohello.is inspired)
  function initPreloader() {
    const preloader = document.getElementById('sitePreloader');
    if (!preloader) return;

    // Accessibility check: Skip animation if user requested reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      preloader.classList.add('dismissed');
      return;
    }

    const counterEl = document.getElementById('preloaderCounter');
    const shutterStack = document.getElementById('shutterStack');
    const images = shutterStack ? shutterStack.querySelectorAll('.shutter-img') : [];

    let currentImgIdx = 0;
    const shutterInterval = setInterval(() => {
      if (images.length > 0) {
        images[currentImgIdx].classList.remove('active');
        currentImgIdx = (currentImgIdx + 1) % images.length;
        images[currentImgIdx].classList.add('active');
      }
    }, 140);

    const startTime = performance.now();
    const duration = 1100; // 1.1s duration: fast, cinematic, non-blocking

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progressFraction = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progressFraction, 3);
      const progress = Math.floor(eased * 100);

      if (counterEl) {
        counterEl.textContent = `${String(progress).padStart(2, '0')}%`;
      }

      if (progressFraction < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        clearInterval(shutterInterval);
        setTimeout(() => {
          preloader.classList.add('dismissed');
        }, 120);
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // Dedicated Product Detail Page Initializer (product.html)
  function initProductDetailPage() {
    const pdpWrapper = document.getElementById('pdpPageWrapper');
    if (!pdpWrapper) return;

    const prodId = paramProduct || 'senator-01';
    const product = products.find(p => p.id === prodId) || products[0];

    state.selectedProduct = product;
    state.selectedSize = product.sizes[0];
    state.isBespokeFitting = false;
    state.selectedGalleryImageIndex = 0;

    // Set page title
    document.title = `${product.name} — MODA COUTURE Atelier`;

    // Elements
    const titleEl = document.getElementById('pdpTitleText');
    const catPill = document.getElementById('pdpCategoryPill');
    const pieceNum = document.getElementById('pdpPieceNumber');
    const priceEl = document.getElementById('pdpPriceText');
    const descEl = document.getElementById('pdpDescText');
    const fabricVal = document.getElementById('pdpFabricVal');
    const cutVal = document.getElementById('pdpCutVal');
    const mainImg = document.getElementById('pdpMainImg');
    const thumbsRow = document.getElementById('pdpThumbsRow');
    const sizeChipsContainer = document.getElementById('pdpSizeChips');
    const relatedGrid = document.getElementById('pdpRelatedGrid');
    const bespokeCheck = document.getElementById('pdpBespokeCheckbox');
    const backBtn = document.getElementById('pdpBackLink');

    // Return to collections button with snappy directional reverse swipe
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const panel = document.getElementById('pageSwipePanel');
        sessionStorage.setItem('moda_swipe_dir', 'reverse');
        if (panel) {
          panel.style.borderLeft = 'none';
          panel.style.borderRight = '2px solid var(--terracotta)';
          panel.style.transition = 'none';
          panel.style.transform = 'translateX(-100%)';
          panel.offsetHeight;
          requestAnimationFrame(() => {
            panel.style.transition = 'transform 200ms cubic-bezier(0.23, 1, 0.32, 1)';
            panel.style.transform = 'translateX(0)';
          });
          setTimeout(() => {
            window.location.href = 'index.html#catalogSection';
          }, 160);
        } else {
          window.location.href = 'index.html#catalogSection';
        }
      });
    }

    if (titleEl) titleEl.textContent = product.name;
    const crumbTitle = document.getElementById('pdpCrumbTitle');
    if (crumbTitle) crumbTitle.textContent = product.name;
    if (catPill) catPill.textContent = product.categoryLabel.toUpperCase();
    if (pieceNum) pieceNum.textContent = `PIECE Nº 00${products.indexOf(product) + 1} // ATELIER BESPOKE`;
    if (priceEl) priceEl.textContent = formatPrice(product.priceNGN, product.priceUSD);
    if (descEl) descEl.textContent = product.description;
    if (fabricVal) fabricVal.textContent = product.fabric;
    if (cutVal) cutVal.textContent = product.cut;
    if (mainImg) {
      mainImg.src = product.images[0];
      mainImg.alt = product.name;
    }

    // Render Thumbnails
    if (thumbsRow) {
      thumbsRow.innerHTML = product.images.map((img, idx) => `
        <div class="pdp-thumb-item ${idx === 0 ? 'active' : ''}" data-index="${idx}">
          <img src="${img}" alt="${product.name} angle ${idx + 1}" />
        </div>
      `).join('');

      thumbsRow.querySelectorAll('.pdp-thumb-item').forEach(thumb => {
        thumb.addEventListener('click', () => {
          const idx = parseInt(thumb.dataset.index, 10);
          state.selectedGalleryImageIndex = idx;
          if (mainImg) {
            mainImg.style.opacity = '0';
            setTimeout(() => {
              mainImg.src = product.images[idx];
              mainImg.style.opacity = '1';
            }, 120);
          }
          thumbsRow.querySelectorAll('.pdp-thumb-item').forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
        });
      });
    }

    // Render Size Chips
    if (sizeChipsContainer) {
      sizeChipsContainer.innerHTML = product.sizes.map((sz, idx) => `
        <button class="pdp-size-chip ${idx === 0 ? 'selected' : ''}" data-size="${sz}">${sz}</button>
      `).join('');

      sizeChipsContainer.querySelectorAll('.pdp-size-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          state.selectedSize = chip.dataset.size;
          sizeChipsContainer.querySelectorAll('.pdp-size-chip').forEach(c => c.classList.remove('selected'));
          chip.classList.add('selected');
        });
      });
    }

    // Sizing guide alert
    document.getElementById('pdpSizeGuideBtn')?.addEventListener('click', () => {
      alert('Moda Couture Atelier Sizing Guide:\n\n38R: Chest 38-40in | Waist 32in | Height 5ft 8in - 5ft 11in\n40R: Chest 40-42in | Waist 34in | Height 5ft 9in - 6ft 1in\n42R: Chest 42-44in | Waist 36in | Height 5ft 10in - 6ft 2in\n44L: Chest 44-46in | Waist 38in | Height 6ft 0in - 6ft 4in\n46L: Chest 46-48in | Waist 40in | Height 6ft 1in - 6ft 5in\n\nFila Caps:\n56cm - 62cm circumference\n\nCustom Made-to-Measure: Tailored to your exact 14-point body measurements.');
    });

    // Bespoke custom toggle
    if (bespokeCheck) {
      bespokeCheck.addEventListener('change', (e) => {
        state.isBespokeFitting = e.target.checked;
        if (e.target.checked) {
          showToast('Bespoke custom fit selected. Our master tailor will draft a personalized pattern.');
        }
      });
    }

    // Add to Bag CTA
    document.getElementById('pdpAddToBag')?.addEventListener('click', () => {
      addToCart(product, state.selectedSize || 'Standard', state.isBespokeFitting);
      toggleCart(true);
    });

    // Book Fitting Consultation CTA
    document.getElementById('pdpBookFitting')?.addEventListener('click', openConsultationModal);

    // Accordions
    document.querySelectorAll('.pdp-accordion-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.pdp-accordion-item');
        const isOpen = item.classList.contains('open');
        item.classList.toggle('open');
        trigger.setAttribute('aria-expanded', !isOpen);
        const content = item.querySelector('.pdp-accordion-content');
        if (content && content.style.display) {
          content.style.removeProperty('display');
        }
        const icon = trigger.querySelector('.pdp-acc-icon');
        if (icon) icon.textContent = isOpen ? '+' : '−';
      });
    });

    // Curated related recommendations
    if (relatedGrid) {
      const related = products.filter(p => p.id !== product.id).slice(0, 3);
      relatedGrid.innerHTML = related.map(rel => `
        <article class="product-card" data-product-id="${rel.id}">
          <div class="product-card-img-container">
            <span class="product-tag-pill">${rel.tag}</span>
            <img src="${rel.images[0]}" alt="${rel.name}" loading="lazy" />
            <div class="product-quick-view-overlay">
              <button class="quick-view-btn" data-product-id="${rel.id}" aria-label="Inspect ${rel.name}">
                Inspect Piece
              </button>
            </div>
          </div>
          <div class="product-info">
            <span class="product-category-meta">${rel.categoryLabel}</span>
            <h3 class="product-title">${rel.name}</h3>
            <span class="product-spec">${rel.fabric}</span>
            <div class="product-price-row">
              <span class="product-price tabular-nums">${formatPrice(rel.priceNGN, rel.priceUSD)}</span>
              <span class="product-bespoke-badge">${rel.cut}</span>
            </div>
          </div>
        </article>
      `).join('');

      relatedGrid.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
          navigateToProduct(card.dataset.productId);
        });
      });
    }

    // Snappy swipe panel exit on arrival
    const swipeDir = sessionStorage.getItem('moda_swipe_dir');
    const panel = document.getElementById('pageSwipePanel');
    if (panel && swipeDir === 'forward') {
      sessionStorage.removeItem('moda_swipe_dir');
      panel.style.transition = 'none';
      panel.style.transform = 'translateX(0)';
      panel.offsetHeight;
      requestAnimationFrame(() => {
        panel.style.transition = 'transform 220ms cubic-bezier(0.23, 1, 0.32, 1)';
        panel.style.transform = 'translateX(-100%)';
      });
    }

    // Page ready
    requestAnimationFrame(() => {
      pdpWrapper.classList.add('page-loaded');
    });
  }

  // Cart Management
  function addToCart(product, size, bespoke) {
    const existingIndex = state.cart.findIndex(
      item => item.id === product.id && item.size === size && item.bespoke === bespoke
    );

    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += 1;
    } else {
      state.cart.push({
        id: product.id,
        name: product.name,
        priceNGN: product.priceNGN,
        priceUSD: product.priceUSD,
        image: product.images[0],
        size: size,
        bespoke: bespoke,
        quantity: 1
      });
    }

    saveCart();
    renderCart();
    updateCartBadge();
    showToast(`Added "${product.name}" to your shopping bag`);
  }

  function removeFromCart(index) {
    state.cart.splice(index, 1);
    saveCart();
    renderCart();
    updateCartBadge();
    showToast('Item removed from your bag');
  }

  function updateQuantity(index, delta) {
    state.cart[index].quantity += delta;
    if (state.cart[index].quantity <= 0) {
      removeFromCart(index);
      return;
    }
    saveCart();
    renderCart();
    updateCartBadge();
  }

  function saveCart() {
    localStorage.setItem('moda_cart', JSON.stringify(state.cart));
  }

  function updateCartBadge() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-badge').forEach(badge => {
      badge.textContent = totalCount;
      badge.style.display = totalCount > 0 ? 'inline-block' : 'none';
    });
    const countTag = document.getElementById('cartCountTag');
    if (countTag) {
      countTag.textContent = `${totalCount} ${totalCount === 1 ? 'ITEM' : 'ITEMS'}`;
    }
  }

  function renderCart() {
    const list = document.getElementById('cartItemsList');
    if (!list) return;

    if (state.cart.length === 0) {
      list.innerHTML = `
        <div class="cart-empty-state">
          <svg class="cart-empty-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <h4 class="cart-empty-title">Your shopping bag is empty</h4>
          <p class="cart-empty-text">Explore our collection of African Senator suits, Royal Agbadas, and handcrafted Fila caps.</p>
        </div>
      `;
      updateCartTotals(0, 0);
      return;
    }

    const subtotalNGN = state.cart.reduce((sum, item) => sum + item.priceNGN * item.quantity, 0);
    const subtotalUSD = state.cart.reduce((sum, item) => sum + item.priceUSD * item.quantity, 0);

    list.innerHTML = state.cart.map((item, idx) => `
      <div class="cart-item-card">
        <div class="cart-item-thumb">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.name}</h4>
          <span class="cart-item-meta">Size: ${item.size} ${item.bespoke || item.isBespoke ? '• Bespoke Made-to-Measure' : ''}</span>
          <span class="cart-item-price tabular-nums">${formatPrice(item.priceNGN * item.quantity, item.priceUSD * item.quantity)}</span>
          <div class="cart-qty-ctrls">
            <button class="qty-btn" data-action="dec" data-index="${idx}" aria-label="Decrease quantity">−</button>
            <span class="qty-display tabular-nums">${item.quantity}</span>
            <button class="qty-btn" data-action="inc" data-index="${idx}" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="btn-icon" data-action="remove" data-index="${idx}" style="min-width: 32px; min-height: 32px; border: none;" title="Remove item" aria-label="Remove item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `).join('');

    // Quantity events
    list.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index, 10);
        const action = btn.dataset.action;
        updateQuantity(idx, action === 'inc' ? 1 : -1);
      });
    });

    list.querySelectorAll('[data-action="remove"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index, 10);
        removeFromCart(idx);
      });
    });

    updateCartTotals(subtotalNGN, subtotalUSD);
  }

  function updateCartTotals(subtotalNGN, subtotalUSD) {
    const subtotalEl = document.getElementById('cartSubtotal');
    const totalEl = document.getElementById('cartTotal');
    const formatted = formatPrice(subtotalNGN, subtotalUSD);

    if (subtotalEl) subtotalEl.textContent = formatted;
    if (totalEl) totalEl.textContent = formatted;

    // Shipping Progress Meter
    const threshold = state.currency === 'USD' ? 150 : 200000;
    const currentVal = state.currency === 'USD' ? subtotalUSD : subtotalNGN;
    const progress = Math.min((currentVal / threshold) * 100, 100);

    const meterFill = document.getElementById('shippingMeterFill') || document.getElementById('cartMeterFill');
    const meterText = document.getElementById('shippingMeterText') || document.getElementById('cartMeterText');

    if (meterFill) meterFill.style.width = `${progress}%`;
    if (meterText) {
      if (progress >= 100) {
        meterText.innerHTML = `🎉 <strong>Complimentary express shipping unlocked!</strong>`;
      } else {
        const diff = threshold - currentVal;
        const diffStr = state.currency === 'USD' ? `$${diff}` : `₦${diff.toLocaleString()}`;
        meterText.textContent = `Add ${diffStr} more to unlock complimentary global shipping.`;
      }
    }
  }

  function toggleCart(open) {
    const overlay = document.getElementById('cartOverlay');
    const drawer = document.getElementById('cartDrawer');
    if (!overlay || !drawer) return;

    if (open) {
      overlay.classList.add('open');
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      overlay.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // Checkout Modal
  function openCheckout() {
    if (state.cart.length === 0) {
      showToast('Your bag is empty. Please select an item first.');
      return;
    }
    toggleCart(false);
    const checkoutModal = document.getElementById('checkoutOverlay');
    if (!checkoutModal) return;

    const subtotalNGN = state.cart.reduce((sum, item) => sum + item.priceNGN * item.quantity, 0);
    const subtotalUSD = state.cart.reduce((sum, item) => sum + item.priceUSD * item.quantity, 0);
    const summaryEl = document.getElementById('checkoutSummaryPrice');
    if (summaryEl) summaryEl.textContent = formatPrice(subtotalNGN, subtotalUSD);

    checkoutModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCheckout() {
    const checkoutModal = document.getElementById('checkoutOverlay');
    if (!checkoutModal) return;
    checkoutModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function completeOrder(e) {
    e.preventDefault();
    const orderNum = 'MODA-' + Math.floor(100000 + Math.random() * 900000);
    const nameInput = document.getElementById('checkoutName');
    const customerName = nameInput ? nameInput.value : 'Valued Patron';

    closeCheckout();
    state.cart = [];
    saveCart();
    renderCart();
    updateCartBadge();

    // Show Confirmation Dialog
    const confirmOverlay = document.getElementById('orderConfirmationOverlay');
    const confirmOrderNum = document.getElementById('confirmOrderNumber');
    const confirmPatronName = document.getElementById('confirmPatronName');

    if (confirmOrderNum) confirmOrderNum.textContent = orderNum;
    if (confirmPatronName) confirmPatronName.textContent = customerName;
    if (confirmOverlay) confirmOverlay.classList.add('open');
  }

  // Bespoke Fitting Consultation Modal
  function openConsultationModal() {
    const modal = document.getElementById('consultationOverlay');
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeConsultationModal() {
    const modal = document.getElementById('consultationOverlay');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function submitConsultation(e) {
    e.preventDefault();
    closeConsultationModal();
    showToast('Consultation request received! Our master tailor will contact you via WhatsApp.');
  }

  function toggleMobileNav(open) {
    const overlay = document.getElementById('mobileNavOverlay');
    const drawer = document.getElementById('mobileNavDrawer');
    if (!overlay || !drawer) return;

    if (open) {
      overlay.classList.add('open');
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      overlay.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // Initialize Event Listeners
  function initEvents() {
    // Mobile Navigation Drawer
    document.getElementById('mobileMenuBtn')?.addEventListener('click', () => toggleMobileNav(true));
    document.getElementById('mobileNavCloseBtn')?.addEventListener('click', () => toggleMobileNav(false));
    document.getElementById('mobileNavOverlay')?.addEventListener('click', () => toggleMobileNav(false));
    document.querySelectorAll('.mobile-filter-link').forEach(link => {
      link.addEventListener('click', () => {
        const cat = link.dataset.category;
        if (cat) {
          state.activeCategory = cat;
          document.querySelectorAll('.filter-pill').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === cat);
          });
          renderCatalog();
        }
        toggleMobileNav(false);
      });
    });
    document.getElementById('mobileBookFittingBtn')?.addEventListener('click', () => {
      toggleMobileNav(false);
      openConsultationModal();
    });

    // Theme toggle
    document.getElementById('themeToggleBtn')?.addEventListener('click', toggleTheme);

    // Currency toggles
    document.querySelectorAll('.currency-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => setCurrency(btn.dataset.currency));
    });

    // Category filter pills
    document.querySelectorAll('.filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeCategory = btn.dataset.category;
        renderCatalog();
      });
    });

    // Search input
    document.getElementById('catalogSearchInput')?.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderCatalog();
    });

    // Sort select
    document.getElementById('catalogSortSelect')?.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderCatalog();
    });

    // Cart trigger & drawer
    document.getElementById('cartTriggerBtn')?.addEventListener('click', () => toggleCart(true));
    document.getElementById('cartCloseBtn')?.addEventListener('click', () => toggleCart(false));
    document.getElementById('cartOverlay')?.addEventListener('click', () => toggleCart(false));

    // Checkout Triggers
    document.getElementById('cartCheckoutBtn')?.addEventListener('click', openCheckout);
    document.getElementById('checkoutBtn')?.addEventListener('click', openCheckout);
    document.getElementById('checkoutCloseBtn')?.addEventListener('click', closeCheckout);
    document.getElementById('checkoutOverlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'checkoutOverlay') closeCheckout();
    });
    document.getElementById('checkoutForm')?.addEventListener('submit', completeOrder);

    // Order confirmation close
    document.getElementById('orderConfirmCloseBtn')?.addEventListener('click', () => {
      document.getElementById('orderConfirmationOverlay')?.classList.remove('open');
      document.body.style.overflow = '';
    });

    // Consultation booking
    document.getElementById('bookFittingBtn')?.addEventListener('click', openConsultationModal);
    document.getElementById('consultationCloseBtn')?.addEventListener('click', closeConsultationModal);
    document.getElementById('consultationOverlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'consultationOverlay') closeConsultationModal();
    });
    document.getElementById('consultationForm')?.addEventListener('submit', submitConsultation);

    // Keyboard navigation (Escape to close modals & drawers)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        toggleCart(false);
        toggleMobileNav(false);
        closeCheckout();
        closeConsultationModal();
        document.getElementById('orderConfirmationOverlay')?.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // DOM Content Loaded
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initEvents();

    // Sync currency buttons
    document.querySelectorAll('.currency-toggle-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.currency === state.currency);
    });

    // If on index.html: initialize preloader and render catalog
    initPreloader();
    renderCatalog();

    // Handle reverse swipe exit when returning to index.html
    const swipeDir = sessionStorage.getItem('moda_swipe_dir');
    const panel = document.getElementById('pageSwipePanel');
    if (panel && swipeDir === 'reverse') {
      sessionStorage.removeItem('moda_swipe_dir');
      panel.style.borderLeft = 'none';
      panel.style.borderRight = '2px solid var(--terracotta)';
      panel.style.transition = 'none';
      panel.style.transform = 'translateX(0)';
      panel.offsetHeight;
      requestAnimationFrame(() => {
        panel.style.transition = 'transform 220ms cubic-bezier(0.23, 1, 0.32, 1)';
        panel.style.transform = 'translateX(100%)';
      });
    }

    // If on product.html: initialize dedicated product page
    initProductDetailPage();

    renderCart();
    updateCartBadge();

    // Handle deep link testing queries
    if (paramCart === 'open') {
      if (state.cart.length === 0 && products.length > 0) {
        addToCart(products[0], '40R', false);
      }
      setTimeout(() => toggleCart(true), 150);
    } else if (paramMobileNav === 'open') {
      setTimeout(() => toggleMobileNav(true), 150);
    } else if (paramConsultation === 'open') {
      setTimeout(() => openConsultationModal(), 150);
    } else if (paramCheckout === 'open') {
      if (state.cart.length === 0 && products.length > 0) {
        addToCart(products[0], '40R', false);
      }
      setTimeout(() => openCheckout(), 150);
    }
  });

})();
