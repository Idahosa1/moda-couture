# MODA COUTURE — Atelier & Luxury African Menswear

A luxury e-commerce experience crafted for **Moda Couture**, celebrating the sovereign heritage of African tailoring—specializing in bespoke African Senator wears, Grand Agbada robes, and handcrafted Yoruba Fila caps.

---

## 🏛️ Inspiration & Aesthetic References

1. **[Outfit (hellohello.is)](https://outfit.hellohello.is/)**:
   - **Hero Section**: Architectural typography, dynamic runway marquee, and floating lookbook preview cards.
   - **Theme Switching**: Instant, effortless toggle between crisp editorial light paper (`#FBFBFA`) and deep luxury noir (`#070707`).
   - **Click Animation**: Buttery smooth product transition into modal inspection using GPU-accelerated transforms (`--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, scale `0.95` → `1.0`, zero layout shifts).

2. **[Adina Buzatu (adinabuzatu.ro)](https://adinabuzatu.ro/)**:
   - **Clean & Minimal Product Listing**: Airy multi-column grid with category pills, live keyword search, and price sorting.
   - **Product Detail Page (PDP)**: Tailoring specifications (Super 140s wool, concealed placket, French cuffs), multi-image gallery switcher, Ready-to-Wear vs Bespoke Made-to-Measure options, and sizing guide.

---

## 🎨 Brand Identity & Craft Engineering

- **Wordmark**: `MODA` (uppercase, letter-spaced, high-contrast modernist typography).
- **Core Color**: Black (`#070707` / `#0A0A0A`) as the anchor of luxury African prestige.
- **CTA Accent**: **Terracotta** (`#C85A32` / `#B84C26` / `#A13D19`) triggered on hover and click/press (`:hover`, `:active`).
- **Currencies Supported**:
  - **Nigerian Naira (NGN, ₦)**
  - **US Dollar (USD, $)**
  - Formatted everywhere using `font-variant-numeric: tabular-nums` to eliminate layout jitter.

### 📐 Emil Kowalski & Jakub Krehel Design Principles
- **Concentric Border Radius**: `outerRadius = innerRadius + padding`.
- **Motion Durations**: Button press `160ms` (`scale(0.96)`), modal enter `240ms`, cart drawer `280ms`.
- **Easing**: Calibrated cubic bezier curve `cubic-bezier(0.23, 1, 0.32, 1)`—starts instantaneously, decelerates smoothly.
- **Hardware Acceleration**: Transitions strictly animate `transform` and `opacity` (no height/width triggers).
- **Mobile-Native Polish**: Touch target minimum 44px, `touch-action: manipulation`, `-webkit-tap-highlight-color: transparent`, and 16px minimum font size on inputs to prevent iOS Safari auto-zoom.
- **Image Edge Polish**: `1px` subtle outline at 10% opacity for crisp edge contrast in both light and dark modes.

---

## 🛍️ Interactive Features

1. **Dual Currency Engine**:
   - Instant header toggle between `NGN ₦` and `USD $`.
   - Real-time conversion across all catalog cards, product modal, shopping bag, and checkout totals.
2. **Light & Dark Mode**:
   - High-contrast editorial light paper mode and deep noir dark mode.
   - Preserves user preference in `localStorage` and supports system defaults.
3. **Product Detail View (PDP)**:
   - Interactive multi-angle image gallery with thumbnail navigation.
   - Sizing matrix (38R, 40R, 42R, 44L, 46L) and Fila circumferences (56cm - 62cm).
   - "✨ Require Custom Made-to-Measure?" bespoke commission toggle.
4. **Slide-Over Shopping Bag**:
   - Slide-over drawer with spring physics.
   - Complimentary global shipping threshold meter (over ₦200,000 / $150).
   - Line-item quantity increments and removal with live subtotal.
5. **Checkout & Order Confirmation**:
   - Multi-field checkout for Nigeria, UK, US, and Worldwide dispatch.
   - Simulation of Paystack, Flutterwave, and card processing.
   - Order confirmation modal with unique reference ID (`MODA-2026-XXXX`).
6. **Bespoke Atelier Consultation**:
   - Appointment booking modal for in-person fittings (Lagos Victoria Island or London Mayfair) or virtual video measuring.

---

## 🚀 Running Locally

No dependencies required! You can open the site directly or run a local server:

### Option 1: Python HTTP Server (Recommended)
```bash
cd C:\Users\hp\.gemini\antigravity\scratch\moda-couture
python -m http.server 3000
```
Then navigate to: `http://localhost:3000`

### Option 2: Direct File Open
Double-click or open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Brave, Safari, Firefox).

---

## 📂 Project Architecture

```
moda-couture/
├── index.html              # Semantic, accessible HTML5 structure
├── styles.css              # Custom properties, motion tokens, light/dark themes
├── app.js                  # Store state, currency engine, modal transitions, cart
├── README.md               # Documentation & design engineering notes
├── assets/
│   └── images/             # Editorial lookbook & product photography
│       ├── senator_black.jpg        # The Lagos Senator 01 (Obsidian & Terracotta)
│       ├── senator_midnight.jpg     # Signature Asymmetric Senator Suit
│       ├── senator_cream.jpg        # The Sahara Ivory Senator Suit
│       ├── senator_detail.jpg       # Macro Needlework & Placket Craftsmanship
│       ├── agbada_noir.jpg          # The Eko Sovereign 3-Piece Agbada Robe
│       ├── agbada_runway.jpg        # Runway Grand Agbada Campaign
│       ├── fila_black.jpg           # Royal Noir Velvet Handcrafted Fila
│       └── fila_terracotta.jpg      # Terracotta Rust Handwoven Aso-Oke Fila
└── screenshots/            # Verification screenshots across themes & states
```
