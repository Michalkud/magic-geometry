# Magic Geometry - Mystical Tarot Tree of Life Explorer

## 🔮 Project Overview

Magic Geometry is a comprehensive **mystical Tarot study application** featuring an interactive Tree of Life visualization with deep correspondences, card exploration, and esoteric knowledge mapping. Built with modern web technologies, it provides an immersive experience for studying Thoth Tarot cards, their symbolic relationships, and their placement on the Qabalistic Tree of Life.

### ✨ Core Vision
An interactive digital grimoire that maps the relationships between Tarot cards, Hebrew letters, astrological correspondences, and the Tree of Life structure, presented with a mystical dark aesthetic and golden accents.

---

## 🛠 Technology Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS with custom mystical theme
- **UI Components:** Radix UI primitives (@radix-ui/react-checkbox, lucide-react)
- **Animations:** Framer Motion
- **3D Graphics:** Three.js
- **Data Visualization:** D3.js
- **Testing:** Playwright (E2E)
- **State Management:** React hooks + Zustand
- **Icons:** Custom SVG library (50+ mystical symbols)

---

## 🌟 Completed Features

### 1. **Interactive Tree of Life** (`/` - Homepage)
The centerpiece of the application featuring:

#### **Perfect Symmetry & Layout**
- **10 Sephiroth** positioned with mathematical precision
- **22 paths** connecting Sephiroth with card image backgrounds
- **Responsive design** that scales beautifully across devices
- **Golden mystical theme** with Hebrew names and English translations

#### **Interactive Navigation System**
- **Path highlighting** on hover with golden glow effects
- **Click navigation** directly to detailed card study pages
- **Smooth animations** (300ms transitions) for all interactions
- **Card name labels** displayed on each path (both clickable)
- **Floating card preview** appears on hover showing:
  - Card image thumbnail
  - Hebrew letter and name
  - Elemental/planetary associations
  - Trump number
  - Full card meaning
  - Key symbols (first 3)
- **Drill-down exploration** from Tree overview to individual card analysis

#### **Visual Features**
- **Card image backgrounds** fill each path showing tarot artwork
- **Mystical typography** using Cinzel font
- **Responsive scaling** maintains aspect ratio
- **Golden accents** throughout the interface

### 2. **Cards Library** (`/cards`)
Comprehensive card browsing and filtering system:

#### **Card Organization**
- **Major Arcana** (22 trump cards) with traditional ordering
- **Minor Arcana** organized by suits (Wands, Cups, Swords, Disks)
- **Court cards** (Princess, Prince, Queen, Knight of each suit)
- **Searchable interface** with real-time filtering

#### **Navigation Features**
- **Sidebar navigation** with collapsible sections
- **Quick links** between cards and Tree of Life
- **Tradition selector** (Thoth, Rider-Waite-Smith, Golden Dawn)
- **Back to Tree** navigation for seamless exploration

#### **Tree Integration**
- **Mini Tree** component showing path connections
- **Visual highlighting** of selected card's path
- **Sephiroth connections** clearly marked

### 3. **Individual Card Detail Pages** (`/card/:cardId`)
Deep-dive exploration of each card:

#### **CardCanvas Component**
Interactive card viewer with multiple layers:
- **Symbol layer** with clickable hotspots
- **Color scale overlays** with blend modes
- **Geometry overlays** (Flower of Life implemented)
- **Text annotations** and interpretations
- **Layer toggles** for focused study

#### **Symbol Hotspots System**
- **Polygon-based hit detection** for precise symbol targeting
- **Rich tooltips** with symbol meanings and cross-references
- **Visual feedback** with highlighting and pulse animations
- **Connected knowledge** linking symbols across cards

#### **Correspondence Rail**
Collapsible sections organizing deep correspondences:
- **Primary:** Hebrew letter, path number, element
- **Qabalah:** Sephiroth connections, magical weapons
- **Astrology:** Signs, planets, decans, dignities
- **Alchemy:** Principles, processes, operations
- **Natural:** Animals, plants, minerals, perfumes
- **Color Scales:** King, Queen, Emperor, Empress scales

### 4. **Zodiac & Decan Wheel** (`/zodiac`)
Interactive astrological visualization:

#### **D3.js Radial Visualization**
- **12 zodiac signs** arranged in traditional order
- **36 decans** (10-degree subdivisions) with detailed information
- **Color-coded elements** (Fire=red, Water=blue, Air=yellow, Earth=green)
- **Interactive rotation** via drag controls

#### **Real-Time Date Tracking**
- **Golden indicator** showing current date position
- **Date picker** for exploring different times of year
- **Automatic calculations** for decan rulers and associations

#### **Decan Information Panel**
- **Planetary rulers** with traditional symbols
- **Associated pip cards** (2-10 of Minor Arcana)
- **Traditional titles** (e.g., "Dominion", "Victory", "Sorrow")
- **Deep linking** to associated cards in library

### 5. **Enhanced Data Architecture**

#### **Comprehensive Card Data Model**
New JSON structure (`cards-v2/`) containing:
- **Basic information:** Name, number, suit, element
- **Correspondences:** Hebrew letters, paths, sephiroth connections
- **Astrological data:** Signs, planets, decans, dignities
- **Alchemical attributions:** Principles, processes, metals
- **Natural correspondences:** Animals, plants, minerals, perfumes
- **Color scales:** Four complete scales for color meditation
- **Symbol hotspots:** Clickable regions with coordinate mapping
- **Cross-references:** Links to related cards and concepts

### 6. **Daily Card Learning System** (December 2024)
Comprehensive daily practice system for structured Tarot study:

#### **DailyCardSelector Component**
- **Manual card selection:** User-driven card choice with search interface
- **Morning reflection system:** 5 rotating daily prompts for deeper engagement
- **Evening review feature:** Space for reflecting on card manifestation
- **Animated drawing experience:** Engaging card reveal with mystical styling
- **Local storage persistence:** All reflections saved automatically

#### **DailyCardJournal Component**
- **Complete history tracking:** Chronological display of all daily cards
- **Streak calculation:** Automatic tracking of consecutive daily practice
- **Paginated entries:** Organized display with 7 entries per page
- **Detailed entry modals:** Full view of past reflections and reviews
- **Statistics dashboard:** Total cards drawn and current streak display

#### **DailyCardReminder Component**
- **Customizable reminder times:** Separate morning and evening notifications
- **Browser notification support:** Permission-based system notifications
- **Next reminder countdown:** Real-time display of upcoming reminders
- **Settings persistence:** All preferences saved in localStorage
- **Smart reminder timing:** 5-minute notification windows

#### **36 Complete Decans System**
- **Zodiac integration** with sign and degree ranges
- **Calendar mapping** for each 10-day period
- **Planetary rulers** with traditional and modern attributions
- **Minor Arcana connections** to pip cards
- **Helper functions** for date/degree lookups

#### **Sacred Geometry Registry**
- **Flower of Life** pattern implementation
- **Expandable system** for additional geometric overlays
- **Mathematical precision** in pattern generation
- **Blend mode options** for visual layering

---

## 🗺 Application Routes & Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | TreeOfLifeMystical | Interactive Tree of Life homepage |
| `/cards` | CardsLibrary | Complete card library with filtering |
| `/cards/:id` | CardsLibrary | Card library with specific card selected |
| `/card/:cardId` | ThothCardDetailPage | Detailed individual card study page |
| `/zodiac` | ZodiacPage | Interactive zodiac wheel with decans |

---

## 🏗 Component Architecture

### **Core Components**

#### **TreeOfLifeMystical** - Main Tree Visualization
- **Dual display modes** with line paths and individual card views
- **Toggle system** for switching between visualization modes
- **Travel Mode integration** with full-screen card navigation
- **Expanded geometry** with optimized Sephiroth positioning
- **Responsive SVG** with perfect symmetry and overflow scrolling
- **Hover state management** for interactive paths in both modes
- **Card preview system** with floating tooltips
- **Smooth animations** and visual feedback with 500ms transitions
- **Click-to-navigate** drill-down from paths to card detail pages

#### **TravelMode** - Immersive Card Navigation
- **Full-screen overlay** with mystical dark background
- **Swipe gesture detection** using Framer Motion drag system
- **Multi-modal navigation** supporting touch, keyboard, and buttons
- **Sequential card progression** following Tree of Life path order
- **Rich information display** with card details and correspondences
- **Smooth transitions** with spring animations between cards
- **Responsive design** optimized for both desktop and mobile
- **Integration hooks** for seamless Tree of Life integration

#### **CardsLibrary** - Card Browsing Interface
- **Filterable card grid** with search functionality
- **Tradition switching** between different decks
- **Integration with mini Tree** for path visualization
- **Responsive layout** adapting to screen sizes

#### **ThothCardDetailPage** - Individual Card Study
- **CardCanvas** with interactive layers and hotspots
- **CorrespondenceRail** with collapsible sections
- **Symbol system** with rich tooltip interactions
- **Color scale switching** with live previews

#### **ZodiacPage** - Astrological Wheel
- **D3.js powered** interactive circular layout
- **Real-time date tracking** and positioning
- **Decan information** panel with detailed data
- **Smooth transitions** and intuitive navigation

#### **DailyCardSelector** - Daily Practice System
- **Manual card selection** with search and filter interface
- **Card browser** with suit filtering and visual previews
- **Animated card selection** with Framer Motion transitions
- **Reflection prompt system** with 5 rotating daily questions
- **Evening review functionality** for manifestation tracking
- **Local storage integration** for persistence

#### **DailyCardJournal** - Practice History
- **Chronological entry display** with pagination system
- **Streak calculation** for consecutive daily practice
- **Entry detail modals** with full reflection viewing
- **Statistics tracking** for total cards and current streak
- **Responsive design** for mobile and desktop

#### **DailyCardReminder** - Notification System
- **Customizable reminder scheduling** for morning and evening
- **Browser notification integration** with permission handling
- **Settings persistence** using localStorage
- **Real-time countdown display** for next reminder
- **Smart timing windows** to prevent notification spam

### **UI Components**

#### **SymbolIcon** - Custom SVG Icon System
- **50+ mystical symbols** covering:
  - Astrological symbols (planets, signs, aspects)
  - Alchemical symbols (elements, processes, metals)
  - Religious/mystical symbols (ankh, pentagram, hexagram)
  - Natural symbols (animals, plants, minerals)
  - Geometric patterns (sacred geometry shapes)

#### **CardCanvas** - Interactive Card Viewer
- **Layer system** with toggleable overlays
- **Hotspot detection** with polygon-based hit areas
- **Geometry integration** for sacred pattern overlays
- **Zoom and pan** capabilities for detailed study

#### **CorrespondenceRail** - Data Organization
- **Collapsible sections** for organized information display
- **Clickable chips** for cross-navigation
- **Color coding** for different types of correspondences
- **Responsive design** for mobile and desktop viewing

#### **Checkbox** - Toggle Controls
- **Radix UI foundation** with accessibility features
- **Mystical styling** with golden theme integration
- **Smooth state transitions** with visual feedback
- **Focus management** and keyboard navigation support

### **Utility Components**

#### **GlyphBar** - Hebrew & Attribution Display
- **Hebrew letter rendering** with proper fonts
- **Path number integration** with Tree of Life
- **Elemental and planetary symbols**
- **Compact information display**

#### **MiniTree** - Compact Tree Visualization
- **Simplified Tree structure** for navigation contexts
- **Path highlighting** for current card selection
- **Click navigation** to main Tree view
- **Responsive scaling** for sidebar integration

---

## 🎯 Recent Major Improvements

### **Enhanced Tree Symmetry** (Latest Update)
- **Perfect mathematical positioning** of all 10 Sephiroth
- **Balanced horizontal levels** for visual harmony
- **Equidistant pillars** (left/right at ±150px from center)
- **Improved spacing** between Sephiroth for better proportions

### **Interactive Hover System** (Latest Update)
- **Real-time path highlighting** with golden glow effects
- **Dynamic stroke width changes** (25px → 35px on hover)
- **Enhanced text labels** becoming brighter and larger
- **Smooth 300ms transitions** for all animation states

### **Floating Card Preview** (Latest Update)
- **Contextual information display** appearing on path hover
- **Comprehensive card data** including Hebrew letters, elements, meanings
- **Visual card thumbnail** with proper aspect ratios
- **Key symbols display** showing the 3 most important symbols
- **Smooth animations** with fade-in/slide-in effects

### **Path Click Navigation** (Latest Update)
- **Direct drill-down** from Tree of Life paths to individual card detail pages
- **Seamless routing** using React Router navigation (`/card/:cardId`)
- **Enhanced interactivity** with clickable paths and labels
- **Preserved hover effects** maintaining existing visual feedback
- **Comprehensive testing** verified with Playwright E2E tests

### **Travel Mode Feature** (Latest Update)
Revolutionary immersive navigation system for sequential card exploration:

#### **Full-Screen Card Journey**
- **Travel Mode button** positioned next to "Show Cards" checkbox in header
- **Full-screen overlay** with immersive dark mystical background
- **Large card display** showing detailed artwork with golden borders
- **Card counter** indicating position (e.g., "13 of 22") in journey
- **Sequential navigation** following Tree of Life path order

#### **Multi-Modal Navigation System**
- **Swipe gestures** using Framer Motion drag detection for touch-friendly navigation
- **Keyboard controls** with arrow keys (←/→) for quick navigation
- **Navigation buttons** with Previous/Next controls
- **ESC key support** for instant mode exit
- **Wrap-around navigation** seamlessly cycling from last to first card

#### **Rich Card Information Display**
- **Path connection details** showing Sephiroth relationships
- **Hebrew letter and trump number** prominently displayed
- **Card meaning and interpretation** with mystical context
- **Key symbols highlighting** showing most important symbolic elements
- **Pillar information** indicating card's position on Tree structure

#### **Enhanced User Experience**
- **Smooth animations** with spring transitions between cards
- **Visual navigation hints** showing swipe/keyboard instructions
- **Draggable interface** with cursor feedback and elastic constraints
- **Mystical styling consistency** maintaining golden theme throughout
- **Responsive design** working seamlessly across desktop and mobile

### **Dual Display Mode System** (December 2024)
Revolutionary toggle system providing two distinct viewing modes:

#### **Toggle Interface**
- **"Show Cards" checkbox** positioned in top-right header
- **Golden mystical styling** matching application theme
- **Instant mode switching** with smooth transitions
- **Persistent interactivity** maintained across both modes

#### **Line Mode** (Default)
- **Traditional path visualization** with card image textures
- **Textured pathways** showing tarot artwork within connecting lines
- **Optimal for overview study** and traditional Tree navigation
- **Maintains classical Qabalistic aesthetic**

#### **Card Mode** (Toggle Enabled)
- **Individual card display** positioned between connected Sephiroth
- **Full card artwork visibility** with golden borders and glow effects
- **Expanded Tree layout** preventing card overlap
- **Enhanced mystical presentation** highlighting individual card symbolism

### **Expanded Tree Geometry** (December 2024)
Major architectural improvements for optimal card visibility:

#### **Enhanced Sephiroth Positioning**
- **Expanded horizontal spacing** (±220px from center, increased from ±150px)
- **Optimized vertical distribution** with increased inter-level spacing
- **Maintained sacred proportions** while maximizing card display area
- **Traditional Tree structure** preserved with expanded geometry

#### **Advanced Scaling System**
- **Responsive coordinate system** adapting to expanded layout
- **Dynamic sizing calculations** preventing card overlap
- **Screen-adaptive scaling** maintaining usability across devices
- **Overflow scroll support** for very large tree displays

#### **Card Positioning Algorithm**
- **Mathematical midpoint placement** between connected Sephiroth
- **Minimum spacing constraints** ensuring no card overlap
- **Golden border highlighting** with hover scale effects
- **Optimal card dimensions** (50px minimum width with 1.6 aspect ratio)

---

## 💾 Data Structure & Management

### **Primary Data Sources**

#### **Tarot Cards** (`src/data/cards.ts`)
Complete dataset of 78 cards with:
- **Basic metadata:** ID, label, image paths, card numbers
- **Correspondences:** Hebrew letters, elemental associations
- **Tree integration:** Path numbers, Sephiroth connections
- **Astrological data:** Ruling planets, zodiac signs, decans

#### **Tree of Life Structure** (`src/data/tarotData.ts`)
- **Sephiroth definitions:** Names, Hebrew spellings, positions
- **Path mappings:** 22 paths connecting Sephiroth with card associations
- **Color systems:** Gradient definitions for visual theming
- **Coordinate systems:** Perfect mathematical positioning

#### **Zodiacal System** (`src/data/decans.ts`)
- **36 complete decans** with dates, rulers, and card associations
- **Elemental qualities** and traditional dignities
- **Calendar integration** for real-time date positioning
- **Helper functions** for astrological calculations

#### **Symbol Registry** (`src/data/symbolHotspots.ts`)
- **Polygon coordinates** for clickable symbol regions
- **Tooltip content** with meanings and cross-references
- **Visual styling** for hover states and interactions
- **Connection mapping** between related symbols

### **Advanced Data Models**

#### **Cards v2 Format** (`src/data/cards-v2/`)
Next-generation card data structure featuring:
- **Hierarchical organization** of correspondence types
- **Rich text formatting** for descriptions and meanings
- **Cross-reference system** linking related concepts
- **Extensible schema** for future enhancements

#### **Geometry System** (`src/data/geometries.json`)
- **Sacred geometry patterns** with mathematical definitions
- **SVG path generation** for overlay rendering
- **Customizable parameters** for size and positioning
- **Blend mode specifications** for visual integration

---

## 🚀 Development Setup

### **Prerequisites**
- Node.js 18+ 
- npm or yarn package manager
- Modern web browser with ES6+ support

### **Installation**
```bash
git clone [repository-url]
cd magic-geometry
npm install
```

### **Available Scripts**

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (localhost:5173) |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build |
| `npm run test:e2e` | Run Playwright end-to-end tests |
| `npm run cards:download` | Download Thoth card images |
| `npm run cards:download:minors` | Download minor arcana images |
| `npm run cards:download:rws` | Download Rider-Waite-Smith images |

### **Development Workflow**
1. **Start dev server:** `npm run dev`
2. **Open browser:** Navigate to `http://localhost:5173`
3. **Live reload:** Changes automatically refresh the browser
4. **Testing:** Use Playwright for E2E testing with `npm run test:e2e`

---

## 📁 Project File Structure

```
magic-geometry/
├── src/
│   ├── components/
│   │   ├── TreeOfLifeMystical.tsx    # Main Tree visualization
│   │   ├── TravelMode.tsx            # Immersive card navigation
│   │   ├── CardCanvas.tsx            # Interactive card viewer
│   │   ├── CorrespondenceRail.tsx    # Data organization
│   │   ├── GlyphBar.tsx              # Hebrew/attribution display
│   │   ├── MiniTree.tsx              # Compact Tree component
│   │   ├── ZodiacWheel.tsx           # Astrological wheel
│   │   ├── DailyCardSelector.tsx     # Daily card drawing system
│   │   ├── DailyCardJournal.tsx      # Daily practice history
│   │   ├── DailyCardReminder.tsx     # Notification system
│   │   ├── icons/
│   │   │   └── SymbolIcon.tsx        # Custom SVG icon library
│   │   └── ui/                       # Radix UI components
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx             # Toggle controls
│   │       ├── dialog.tsx
│   │       └── tabs.tsx
│   ├── pages/
│   │   ├── CardsLibrary.tsx          # Card browsing interface
│   │   ├── ThothCardDetailPage.tsx   # Individual card study
│   │   └── ZodiacPage.tsx            # Zodiac wheel page
│   ├── data/
│   │   ├── tarotData.ts              # Tree structure & paths
│   │   ├── cards.ts                  # Complete card dataset
│   │   ├── decans.ts                 # Astrological system
│   │   ├── symbolHotspots.ts         # Interactive symbol regions
│   │   ├── geometries.json           # Sacred geometry patterns
│   │   └── cards-v2/                 # Next-gen card format
│   │       └── the-fool.json         # Enhanced card data
│   ├── styles/
│   │   └── index.css                 # Global styles & Tailwind
│   ├── lib/
│   │   └── utils.ts                  # Utility functions
│   ├── App.tsx                       # Main application & routing
│   └── main.tsx                      # Application entry point
├── public/
│   ├── cards/                        # Thoth tarot card images
│   │   ├── the-fool.jpg
│   │   ├── the-magus.jpg
│   │   └── [78 card images]
│   └── rws/                          # Rider-Waite-Smith images
├── tests/
│   └── e2e/                          # Playwright test suites
│       ├── basic.spec.ts             # Core functionality tests
│       ├── card-positioning.spec.ts  # Tree positioning tests
│       ├── travel-mode.spec.ts       # Travel mode feature tests
│       └── daily-card-system.spec.ts # Daily card system tests
├── scripts/                          # Image download utilities
├── CLAUDE.md                         # AI assistant instructions
└── PROJECT_DOCUMENTATION.md         # This file
```

---

## 🔮 Mystical Design Principles

### **Visual Aesthetic**
- **Dark mystical theme** creating an immersive atmosphere
- **Golden accents** (#fbbf24) throughout the interface
- **Cinzel font** for headings providing classical elegance
- **High contrast** ensuring excellent readability
- **Sacred geometry integration** with mathematical precision

### **User Experience Philosophy**
- **Progressive disclosure** revealing information as needed
- **Contextual interactions** providing relevant data on hover/click
- **Smooth animations** creating fluid, magical transitions
- **Responsive design** ensuring accessibility across devices
- **Intuitive navigation** allowing natural exploration flow

### **Information Architecture**
- **Knowledge graph approach** linking related concepts
- **Multiple access points** to the same information
- **Cross-referencing system** connecting cards, paths, and symbols
- **Hierarchical organization** from overview to detailed study
- **Search and filter capabilities** for quick information retrieval

---

## 🧪 Testing & Quality Assurance

### **End-to-End Testing**
- **Playwright integration** for comprehensive UI testing
- **Cross-browser compatibility** testing across major browsers
- **Responsive design validation** on multiple screen sizes
- **Interactive feature testing** for hover states and animations
- **Navigation testing** ensuring all routes function properly

### **Code Quality**
- **TypeScript integration** providing compile-time error checking
- **ESLint configuration** enforcing consistent code style
- **Component-based architecture** enabling maintainable code
- **Custom hooks** for reusable state management
- **Performance optimization** through React best practices

---

## 🎯 Current Status: Feature Complete

This application represents a **fully functional mystical Tarot study system** with:

✅ **Interactive Tree of Life** with hover animations, card previews, and click navigation  
✅ **Travel Mode** with immersive full-screen card navigation and swipe gestures  
✅ **Complete card library** with 78 cards and filtering  
✅ **Detailed card study pages** with symbol hotspots and correspondences  
✅ **Seamless drill-down navigation** from Tree paths to individual card exploration  
✅ **Zodiac wheel** with real-time date tracking and decan information  
✅ **Daily Card System** with manual selection, reflections, and personal journaling
✅ **Comprehensive journaling** with history, pagination, and personal notes  
✅ **Smart reminder system** with customizable notifications and browser integration
✅ **Responsive design** working across all device sizes  
✅ **Rich data model** with deep correspondences and cross-references  
✅ **Modern tech stack** with TypeScript, React, and Tailwind CSS  
✅ **Comprehensive testing** with Playwright E2E tests  
✅ **Mystical aesthetic** with custom icons and golden theme  

The application successfully bridges ancient wisdom with modern web technology, creating an immersive digital grimoire for Tarot study and exploration. Every component has been crafted with attention to both functionality and the mystical atmosphere that makes studying the Tarot a transformative experience.

---

*"As above, so below; as within, so without." - The application embodies the hermetic principle of correspondence, connecting the digital realm with timeless esoteric wisdom.*