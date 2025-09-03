# Magic Geometry - Project Documentation

## Overview
Magic Geometry is an interactive web application for exploring Tarot symbolism through the Tree of Life. It provides tools for studying card meanings, symbol relationships, and creating detailed annotations of tarot imagery.

## Current Implementation State

### Core Application
- **Stack**: React 18 + TypeScript + Vite + Tailwind CSS + Dexie (IndexedDB)
- **Database**: Dexie.js for client-side IndexedDB storage with comprehensive data seeding
- **Routes**:
  - `/` - Interactive Tree of Life with 22 Major Arcana paths
  - `/pattern-game` - Visual Pattern Matching Game (visual-only symbol recognition)
  - `/symbols` - Symbol Graph System demo page
  - `/editor` - Symbol Hotspot Editor for card annotation
  - `/association` - Symbol Association with arrow drawing and radius mapping
  - `/database` - Database management demo page
  - `/schema` - Database schema visualization
  - `/relationships` - Interactive Card Relationships visualization with Sacred Geometry layouts

### Database Structure (COMPLETE ✅)
The application uses IndexedDB via Dexie with the following tables:
- **cards** (22 records): Major Arcana with Hebrew letters, attributions, and path titles
- **sephirot** (10 records): Tree of Life nodes with meanings
- **minorCards** (40 records): Minor Arcana cards mapped to sephirot
- **symbols** (25+ records): Universal and card-specific symbols
- **cardMeanings** (22 records): Detailed meanings and essays for each card
- **relationships** (58 records): Symbol-to-symbol relationships (evolution, mirrors, opposes, etc.)
- **cardAppearances** (162 records): Symbol positions on cards (RWS and Thoth variants)
- **hotspots** (15 records): Interactive areas on card images
- **decans** (36 records): Astrological decan associations with minor cards
- **geometries** (15 records): Sacred geometry patterns

All data is automatically seeded from `/src/data/` files on first load.

## Core Features

### 1. Tree of Life Visualization (`/`)
- Interactive Kabbalistic Tree of Life with 22 Major Arcana paths
- 10 Sephiroth with Hebrew names
- Hover effects showing floating card previews
- Dual display modes (line paths vs individual cards)

### 2. Visual Pattern Matching Game (`/pattern-game`) - NEW ✅
- Visual-only symbol recognition game (no text labels during gameplay)
- Progressive difficulty levels (Easy, Medium, Hard)
- Timed challenges with visual feedback
- Streak tracking with visual rewards
- Particle effects and animations for correct matches
- Designed for neurodivergent learners following visual learning principles

### 3. Symbol Graph System (`/symbols`) - COMPLETE ✅

#### Data Structure
```typescript
type Symbol = {
  id: string;
  label: string;
  type: 'card'|'figure'|'animal'|'plant'|'celestial'|'object'|'architectural'|'geometric'|'color'|'number'|'element';
  description: string;
  meanings: string[];
  traditions: string[];
  appearances: CardAppearance[];
}

type SymbolRelationship = {
  sourceId: string;
  targetId: string;
  relationshipType: 'contains'|'opposes'|'transforms_into'|'balances'|'mirrors'|'complements'|'evolution'|'corresponds'|'shares_element'|'numerological'|'geometric'|'alchemical'|'kabbalistic'|'derives_from';
  strength: number; // 0-1
  bidirectional: boolean;
}
```

#### Implementation
- **Symbol Files**: 22 Major Arcana files (`00-the-fool.ts` through `21-the-world.ts`)
- **Core System**: 
  - `types.ts` - TypeScript interfaces
  - `symbolRegistry.ts` - Map-based registry (450-500 unique symbols)
  - `relationships.ts` - 80+ symbol relationships
  - `graphUtils.ts` - Graph algorithms (BFS/DFS, PageRank, clustering)
- **Features**: 
  - Graph-based architecture with N-to-N relationships
  - 14 relationship types
  - Symbol search by meaning
  - Card-based exploration
  - Relationship visualization
  - PageRank importance calculation
  - Cluster detection
  - Cross-card symbol tracking

### 4. Symbol Association Page (`/association`)
**Added: 2025-09-03**
**Updated: 2025-09-03** - Fixed z-index issues, added custom delete confirmation, improved test compatibility, fixed modal overlap and improved space utilization

#### Purpose
Visual symbol association tool that allows drawing arrows from symbol modals to card images. Creates precise mappings with radius-based areas for symbol associations.

#### Components

##### AssociationCanvas (`/src/components/association/AssociationCanvas.tsx`)
- Central card image display
- SVG overlay for arrows and radius circles with proper z-index layering
- Mouse event handling for association creation
- Real-time arrow drawing feedback
- Radius calculation based on arrow length
- Right-click deletion with custom confirmation modal support
- Visual indicators for saved associations
- Persistent radius value display (shows immediately after creation)
- Improved pointer-events management for SVG elements

##### SymbolModal (`/src/components/association/SymbolModal.tsx`)
- Draggable symbol information cards
- Displays symbol name and description
- Drag initiation point for arrow drawing
- Visual feedback during drag operations
- Hover and active states
- Proper z-index management (z-index: 10) to prevent overlapping with associations

##### CircularLayout (`/src/components/association/CircularLayout.tsx`)
- Arranges symbol modals in circular formation around card
- Automatic position calculation based on item count
- Responsive radius adjustment (0.45 multiplier with 250px minimum)
- Even distribution of modals with 75px buffer for modal width
- Prevents overlap with card image

##### SymbolAssociationPage (`/src/pages/SymbolAssociationPage.tsx`)
- Main page orchestrating all components
- Card selector for 22 Major Arcana
- Symbol loading from registry (filtered by card)
- Association state management
- LocalStorage persistence
- JSON export functionality
- Statistics display
- Custom delete confirmation modal (replaces browser confirm dialog)
- Proper state management for delete requests
- Optimized container height (calc(100vh - 200px)) for better space utilization

#### Data Structure

```typescript
interface SymbolAssociation {
  id: string;
  symbolId: string;
  x: number; // normalized 0-1
  y: number; // normalized 0-1
  radius: number; // normalized 0-1
}

interface CardAssociations {
  cardId: string;
  associations: SymbolAssociation[];
  createdAt: string;
  updatedAt: string;
}
```

#### Workflow

1. **Select Card**: Choose from 22 Major Arcana cards
2. **View Symbols**: See up to 12 symbols arranged in circle
3. **Create Association**: Drag from symbol modal to card position
4. **Radius Calculation**: Automatic radius based on drag distance
5. **Save/Export**: Persist to localStorage or export JSON

#### Features
- Real-time arrow drawing during drag
- Radius circles showing association areas
- Multiple associations per card
- Right-click to delete associations
- Export to JSON for data analysis
- Automatic symbol loading per card
- Visual feedback for all operations

### 5. Symbol Hotspot Editor (`/editor`)
**Added: 2025-09-02**  
**Updated: 2025-09-03** - Added smooth rectangle movement capability, assigned symbols panel

#### Purpose
Enables users to annotate tarot card images by drawing rectangles around symbols and associating them with entries from the symbol registry. This creates a mapping between visual elements and their symbolic meanings.

#### Components

##### HotspotCanvas (`/src/components/editor/HotspotCanvas.tsx`)
- Interactive canvas for drawing rectangles on card images
- Click and drag to create new hotspots
- Click and drag existing rectangles to move them (cursor changes to move icon)
- **Smooth rectangle movement implementation**:
  - Uses separate drag preview state for visual feedback
  - Original rectangle becomes transparent during drag
  - Preview rectangle follows cursor with dashed outline and drop shadow
  - Position updates only on mouse release (reduces re-renders)
  - Maintains boundaries within canvas (0-1 normalized coordinates)
- Visual feedback during drawing (dashed blue rectangle)
- Visual feedback during move (dashed outline with drop shadow)
- Hover effects on existing hotspots (cursor changes to move icon)
- Left-click to select hotspots
- Right-click to delete with confirmation
- Normalized coordinates (0-1 range) for responsive scaling
- Preview mode for testing interactions
- Movement preserves symbol associations

##### SymbolList (`/src/components/editor/SymbolList.tsx`)
- Browse all 454 symbols from the symbol registry
- Real-time search functionality
- Filter by symbol type (figure, animal, plant, celestial, etc.)
- **Filter by card** - Show only symbols that appear in selected card (2025-09-03)
- Combined filtering - Search, type, and card filters work together
- Click to associate symbols with selected hotspots
- Shows symbol descriptions and meanings
- Displays filtered symbol count
- **Hide assigned symbols** - Option to filter out already assigned symbols (2025-09-03)

##### CoordinateDisplay (`/src/components/editor/CoordinateDisplay.tsx`)
- Shows normalized coordinates (0-1 range)
- Displays pixel coordinates based on image dimensions
- Shows rectangle dimensions (width/height)
- Updates in real-time while drawing

##### ExportModal (`/src/components/editor/ExportModal.tsx`)
- Export hotspot data as JSON
- Copy to clipboard functionality
- Download as file option
- Includes card ID, rectangle coordinates, and symbol associations

##### AssignedSymbolsList (`/src/components/editor/AssignedSymbolsList.tsx`) - **Added 2025-09-03**
- Display all symbols assigned to current card's hotspots
- Shows count of assigned and unassigned hotspots
- Click symbol to select its hotspot (scrolls into view)
- Remove symbol assignments with one click
- Groups multiple hotspots using the same symbol
- Filter option to hide assigned symbols from main symbol list
- Visual indicators for hotspots missing symbols

##### SymbolHotspotEditor (`/src/pages/SymbolHotspotEditor.tsx`)
- Main editor page with all components integrated
- Card selector for all 22 Major Arcana
- Edit/Preview mode toggle
- Save to localStorage for persistence
- Undo/Redo support with state history
- Demo button for testing with sample hotspots (uses real Fool card symbols)
- Statistics panel showing hotspot counts
- **Assigned Symbols Panel toggle** - Show/hide panel of assigned symbols (2025-09-03)
- **Visual feedback mode** - Enhanced colors for hotspots with/without symbols

#### Data Structure

```typescript
interface Rectangle {
  id: string;
  x1: number; // normalized 0-1
  y1: number; // normalized 0-1
  x2: number; // normalized 0-1
  y2: number; // normalized 0-1
  symbolId?: string; // Associated symbol from registry
}

interface RectangleHotspot {
  key: string;
  rectangle: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
  meanings: string[];
  links: string[];
  note?: string;
}
```

#### Usage Workflow

1. **Select Card**: Choose a tarot card from the dropdown
2. **Draw Rectangles**: Click and drag on the card image to create hotspots
3. **Move Rectangles**: Click and drag existing rectangles to reposition them
4. **Select Hotspot**: Click on a rectangle to select it (turns blue)
5. **Assign Symbol**: Click a symbol from the right panel to associate it
6. **View Assigned Symbols**: Toggle "Show Assigned" button to see all symbols on current card
7. **Manage Assignments**: Use assigned symbols panel to:
   - Click symbol to jump to its hotspot
   - Remove symbol assignments
   - See unassigned hotspot count
   - Filter main symbol list to hide already assigned symbols
8. **Save Work**: Click Save to persist to browser storage
9. **Export Data**: Click Export to get JSON for integration with other features

#### Export Format

```json
{
  "cardId": "the-fool",
  "hotspots": [
    {
      "id": "the-fool-figure",
      "rectangle": {
        "x1": 0.35,
        "y1": 0.15,
        "x2": 0.65,
        "y2": 0.35
      }
    }
  ],
  "exportedAt": "2025-09-02T12:00:00.000Z"
}
```

#### Testing
- Comprehensive E2E test suite:
  - `/tests/e2e/symbol-hotspot-editor.spec.ts` - Core editor functionality
  - `/tests/e2e/assigned-symbols-panel.spec.ts` - Assigned symbols panel features
- Tests cover drawing, selection, deletion, moving, export, persistence, and symbol management

#### Future Use Cases
- **Zoom Views**: Use rectangle coordinates to create detailed views of specific symbols
- **Symbol Learning**: Interactive exploration of card symbolism
- **Comparative Analysis**: Compare symbol placement across different cards
- **API Integration**: Export data for use in other tarot applications

#### Technical Implementation Details

##### Smooth Rectangle Movement (2025-09-03)
The rectangle movement feature uses a dual-state approach for optimal performance:
- **Drag Preview State**: Temporary visual representation that follows cursor in real-time
- **Deferred Updates**: Actual hotspot data updates only on mouse release
- **Performance Optimization**: Reduces React re-renders during drag operations
- **Visual Feedback**: Original rectangle becomes transparent, preview shows with dashed border and drop shadow
- **Boundary Constraints**: Rectangles automatically constrain to canvas bounds (0-1 range)
- **State Management**: Uses `dragPreview` state separate from actual hotspots array

##### Assigned Symbols Panel (2025-09-03)
The assigned symbols management feature provides comprehensive symbol tracking:
- **Real-time Updates**: Panel updates immediately when symbols are assigned/removed
- **Visual Indicators**: Hotspots show green borders when assigned, red dashed when missing symbols
- **Smart Filtering**: Option to hide already-assigned symbols from main selection list
- **Multi-hotspot Support**: Shows when same symbol is used in multiple locations
- **Navigation**: Click symbol to select and scroll to its hotspot
- **Batch Operations**: Remove symbol from all hotspots with single click

## Technical Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation

### Data Management
- **Database**: Dexie.js (IndexedDB) for client-side persistence
- **Reactive hooks**: Database hooks for real-time data updates
- **Graph-based data structures**: Symbol relationships stored in database

### Testing
- Playwright for E2E testing
- Test-driven development approach

## Data Files

- `cards.ts` - 78 tarot cards with correspondences
- `tarotData.ts` - Tree structure and paths  
- `decans.ts` - 36 astrological decans
- `symbolHotspots.ts` - Symbol location mappings
- `symbols/` - Complete symbol graph system
  - `cardSymbols/` - 22 Major Arcana symbol files
  - `symbolRegistry.ts` - Central symbol registry
  - `relationships.ts` - Symbol relationships
  - `graphUtils.ts` - Graph algorithms

## File Structure

```
/src
├── components/
│   ├── association/
│   │   ├── AssociationCanvas.tsx
│   │   ├── SymbolModal.tsx
│   │   └── CircularLayout.tsx
│   ├── editor/
│   │   ├── HotspotCanvas.tsx
│   │   ├── SymbolList.tsx
│   │   ├── AssignedSymbolsList.tsx
│   │   ├── CoordinateDisplay.tsx
│   │   └── ExportModal.tsx
│   ├── TreeOfLifeMystical.tsx
│   └── CardCanvas.tsx
├── pages/
│   ├── SymbolAssociationPage.tsx
│   ├── SymbolHotspotEditor.tsx
│   ├── SymbolQuizPage.tsx
│   └── SymbolSystemDemo.tsx
├── data/
│   ├── cards.ts
│   ├── tarotData.ts
│   ├── decans.ts
│   ├── symbolHotspots.ts
│   └── symbols/
│       ├── types.ts
│       ├── symbolRegistry.ts
│       ├── relationships.ts
│       ├── graphUtils.ts
│       └── cardSymbols/
│           └── [00-21 Major Arcana files]
└── App.tsx
```

## Testing
- **Framework**: Playwright E2E tests in `/tests/e2e/`
- **Coverage**: Symbol system, hotspot editor, tree visualization
- **Approach**: Test-driven development (TDD)

## Scripts
- `npm run dev` - Development server
- `npm run build` - Production build  
- `npm run test:e2e` - Run Playwright tests
- `npm run lint` - Code linting
- `npm run typecheck` - TypeScript validation

## Development Guidelines

### Development Rules (CLAUDE.md)
1. **Research first** - Check documentation (Context7/online)
2. **Write tests before code** - TDD approach
3. **Keep it simple** - KISS principle
4. **Update docs after changes** - Keep documentation current

### Code Style
- TypeScript for type safety
- Functional React components with hooks
- Tailwind CSS for consistent styling
- Normalized coordinates for responsive design

### Testing Strategy
- Write E2E tests before implementation
- Test user interactions and data flow
- Verify persistence and export functionality

### Performance Considerations
- Efficient event handling for drawing operations
- Optimized re-renders with React.useCallback
- Debounced search in symbol list

## Deployment
- Runs on Vite dev server (port 5173)
- Production build with `npm run build`
- Static hosting compatible

## Database Architecture (Added 2025-09-03)

### Technology: Dexie.js (IndexedDB wrapper)
- Client-side database for offline-first functionality
- Reactive queries with dexie-react-hooks
- TypeScript support with typed tables

### Database Schema

```typescript
// Main tables
cards: id, trumpNumber, hebrewLetter, element, pathA, pathB
sephirot: id, key
minorCards: id, suit, rank, nodeId
symbols: id, type, category, difficulty
cardAppearances: ++id, symbolId, cardId
relationships: ++id, sourceId, targetId, type
cardMeanings: ++id, cardId, title
symbolDetails: ++id, cardMeaningId
hotspots: ++id, cardId, symbolId
geometries: id
decans: id, position, sign, planet, minorCard
```

### React Hooks API

```typescript
// Available hooks in /src/db/hooks.ts
useCard(cardId) - Get single card
useCards() - Get all cards
useCardsByPath(nodeA, nodeB) - Cards by Tree path
useSephirot() - All sephirot
useMinorCards(suit?) - Minor arcana cards
useSymbols(type?) - Symbols by type
useCardMeaning(cardId) - Card interpretations
useSearchCards(query) - Search cards
useSearchSymbols(query) - Search symbols
```

### Migration from Static Files
- All data from `/src/data/` now stored in IndexedDB
- Automatic seeding on first load
- Database persists across sessions
- Reset functionality available

### 6. Database Schema Page (`/schema`)
**Added: 2025-09-03**
**Enhanced: 2025-09-03** - Added interactive visual diagram with SVG-based table connections

#### Purpose
Visual representation of the database structure showing all 11 tables, their fields, relationships, and current record counts. Provides an interactive way to explore the database schema with both a visual diagram and detailed table cards.

#### Components

##### DatabaseDiagram (`/src/components/DatabaseDiagram.tsx`)
- **SVG-based visual diagram** showing all tables and their connections
- **Color-coded table categories**:
  - Blue: Core Tables (cards, sephirot, minorCards)
  - Green: Symbol System (symbols, cardAppearances, relationships)
  - Purple: Meanings (cardMeanings, symbolDetails)
  - Yellow: Visual (hotspots, geometries)
  - Red: Astrological (decans)
- **Interactive hover effects**: Highlights connected tables and relationships
- **Click navigation**: Click a table node to scroll to its detailed card
- **Relationship lines**: Curved paths showing foreign key connections
- **Field labels**: Shows relationship field names on hover

##### DatabaseSchemaPage (`/src/pages/DatabaseSchemaPage.tsx`)
- Main page combining visual diagram and detailed cards
- Smooth scroll animation to table cards
- Highlight animation when navigating from diagram
- Real-time record counts for all tables

#### Features
- **Visual Database Diagram**: SVG visualization of entire database structure
- **Interactive Table Cards**: Click to expand/collapse table details
- **Field Information**: Shows field names, types, and optionality
- **Index Indicators**: Visual badges for primary keys and indexed fields
- **Foreign Key Relationships**: Shows FK connections between tables
- **Compound Indices**: Displays multi-field indices
- **Database Statistics**: Total tables, records, indices, and relationships
- **Relationship Visualization**: Shows all table connections
- **Hover Interactions**: Highlights related tables and connections
- **Click-to-Navigate**: Jump from diagram to detailed table view
- **Responsive Design**: Works on mobile and desktop

#### Tables Displayed
1. **cards** - Major Arcana cards with paths and correspondences
2. **sephirot** - Tree of Life nodes
3. **minorCards** - 40 Minor Arcana cards
4. **symbols** - 450+ symbol definitions
5. **cardAppearances** - Symbol-card associations
6. **relationships** - Symbol relationships
7. **cardMeanings** - Card interpretations
8. **symbolDetails** - Additional symbol notes
9. **hotspots** - Visual hotspot mappings
10. **geometries** - Geometric data storage
11. **decans** - Astrological decan data

#### Testing
- Comprehensive E2E test suite: `/tests/e2e/database-schema.spec.ts`
- Tests cover visual diagram, hover effects, click navigation, and all existing features

### 7. Card Relationships Page (`/relationships`)
**Added: 2025-09-03**
**Fixed: 2025-09-03** - Resolved 3D view THREE.js import issue

#### Purpose
Interactive network visualization showing philosophical connections between tarot cards through elemental, astrological, numerical, Tree of Life path, and sephirotic relationships. Designed as an educational tool to help users understand tarot philosophy through visual connections rather than individual card meanings.

#### Components

##### CardRelationshipsPage (`/src/pages/CardRelationshipsPage.tsx`)
- Main component using react-cytoscapejs for network visualization
- Interactive force-directed graph layout with 78 tarot cards + 10 Sephirot nodes
- Multiple relationship type filters with educational descriptions
- **Sacred Geometry Layout Options**: 6 layout types including Tree of Life, Metatron's Cube, Flower of Life
- Node selection showing detailed card information
- Legend panel explaining node types and elemental colors
- Reset layout functionality for graph re-arrangement

##### Relationship Data System (`/src/data/cardRelationships.ts`)
- **CardNode type**: Represents cards and Sephirot as graph nodes
- **CardRelationship type**: Defines connections between nodes
- **generateCardNodes()**: Creates 100+ nodes (22 Major + 40 Minor + 10 Sephirot)
- **generateCardRelationships()**: Creates 200+ relationships across 5 types
- **EDUCATIONAL_DESCRIPTIONS**: Explains each relationship type's significance

##### Sacred Geometry Layout System (`/src/utils/sacredGeometryLayouts.ts`)
- **getLayoutPositions()**: Calculates node positions based on sacred geometry patterns
- **getLayoutConfig()**: Returns Cytoscape layout configuration for each geometry type
- **Layout Types**: 
  - **Dynamic**: Force-directed layout (default)
  - **Tree of Life**: Traditional Kabbalistic positions with sephirot alignment
  - **Metatron's Cube**: 13-point Fruit of Life pattern formation
  - **Flower of Life**: 19 overlapping circles sacred geometry
  - **Circle**: Simple circular arrangement for equal distribution
  - **Hexagram**: Star of David formation with inner and outer points
- **Auto-scaling**: Positions automatically scale to fit viewport dimensions
- **Preset Layout Integration**: Uses Cytoscape's preset layout with calculated coordinates

#### Features
- **Interactive Network Graph**: Force-directed layout with draggable nodes
- **Sacred Geometry Layouts**: 6 layout options for node positioning:
  - **Dynamic**: Force-directed layout with physics simulation
  - **Tree of Life**: Traditional Kabbalistic positions aligning sephirot to sacred coordinates
  - **Metatron's Cube**: 13-point Fruit of Life pattern with nested geometric positioning
  - **Flower of Life**: 19 overlapping circles following sacred geometry principles
  - **Circle**: Equal distribution around a circle for balanced viewing
  - **Hexagram**: Star of David formation with dual-triangle positioning
- **Relationship Type Filtering**: Toggle 5 different connection types:
  - **Path**: Major Arcana connecting Sephirot via Tree of Life paths
  - **Sephirotic**: Minor Arcana manifesting Sephirot energies (Ace=Kether, 10=Malkuth)
  - **Elemental**: Cards sharing Fire/Water/Air/Earth correspondences
  - **Numerical**: Sequential progression through Major Arcana (Fool's Journey)
  - **Astrological**: Planetary and zodiacal influences (future implementation)
- **Color Coding**: Visual distinction by elements and relationship types
- **Educational Tooltips**: Descriptions explaining philosophical significance
- **Node Details Panel**: Shows card correspondences, Hebrew letters, elements
- **Dynamic Legend**: Node types, elemental associations, and relationship colors
- **Responsive Layout**: Auto-adjusting graph with collision detection

#### Educational Framework
Based on research of tarot philosophy and traditional correspondences:

1. **Elemental Theory**: Four classical elements connecting related cards
2. **Tree of Life Mapping**: Major Arcana as paths, Minor Arcana as emanations
3. **Astrological Correspondences**: Golden Dawn attributions for deeper meaning
4. **Numerical Progression**: Spiritual journey from Fool (0) to World (21)
5. **Hebrew Letter Sequence**: Aleph through Tav representing cosmic principles

#### Data Structure

```typescript
type CardNode = {
  id: string;
  label: string;
  type: 'major' | 'minor' | 'sephirah';
  data: any; // Original card or sephirah data
  color: string; // Element-based coloring
  size: number; // Visual prominence
};

type CardRelationship = {
  id: string;
  source: string;
  target: string;
  type: RelationshipType;
  strength: number; // 1-10 for visual weight
  description: string; // Educational explanation
  color: string; // Relationship type color
};
```

#### Technical Implementation
- **react-cytoscapejs**: Network visualization with WebGL rendering
- **Cytoscape.js**: Graph theory library with advanced layouts
- **Force-directed Layout**: Organic positioning based on connections
- **Real-time Filtering**: Dynamic graph updates without full re-render
- **Performance Optimization**: Efficient handling of 200+ relationships
- **TypeScript**: Full type safety for graph elements and callbacks
- **3D Visualization**: THREE.js integration for 3D force graph rendering with proper ESM imports
- **Dual Engine Support**: Toggle between 2D/3D force graph and Cytoscape visualization

#### Usage Workflow
1. **Load Page**: Default shows Tree of Life path connections
2. **Add Relationship Types**: Toggle elemental, numerical, or sephirotic connections  
3. **Explore Connections**: Hover and click nodes to see details
4. **Educational Learning**: Read descriptions explaining each relationship type
5. **Visual Analysis**: Observe clustering and connection patterns
6. **Reset Layout**: Re-arrange graph for better visualization

#### Educational Value
- **Pattern Recognition**: Visual clusters show related card groups
- **Philosophical Understanding**: See how ancient wisdom systems connect
- **Comparative Analysis**: Multiple filtering shows different perspectives
- **Memory Aid**: Visual associations help remember card meanings
- **System Thinking**: Understand tarot as interconnected wisdom tradition

#### Testing
- Comprehensive E2E test suite: `/tests/e2e/card-relationships.spec.ts`
- Tests relationship filtering, node interactions, legend display, and educational content
- Validates network visualization loads and responds to user interactions

## Roadmap

### Implemented ✅
- Tree of Life visualization
- Symbol Graph System (450+ symbols)
- Symbol Quiz System
- Symbol Hotspot Editor
- Symbol Association Page with arrow drawing
- Database migration to IndexedDB (Dexie)
- Database Schema Visualization
- Card Relationships Network Visualization

### Not Yet Implemented
- `/cards` - Card library page
- `/zodiac` - Zodiac wheel visualization
- Daily card system components
- Minor Arcana integration
- Symbol reference library (distinct from demo)

### Future Enhancements
- Polygon drawing for non-rectangular symbols
- Multi-card batch editing
- Symbol relationship visualization on cards
- Integration with AI for automatic symbol detection
- Collaborative annotation features
- Mobile/tablet optimization
- API backend for data persistence
- Real-time collaboration features

## Database Migration Complete ✅

**Completed 2025-09-03**: Successfully migrated the entire application from static file imports to database-only architecture.

### Migration Summary
- **Eliminated duplicate data**: All data now stored exclusively in IndexedDB via Dexie.js
- **Database hooks**: Created comprehensive React hooks for data access
- **Components updated**: All 6+ major components now use database hooks instead of static imports
- **Build success**: Application builds without TypeScript errors
- **Single source of truth**: Database is now the authoritative source for all data

### New Database Hooks Added
- `useCards()` - Get all cards with metadata
- `useSymbolRegistry()` - Get symbol registry as Map
- `useAllSymbols()` - Get all symbols
- `useSymbolsByCard(cardId)` - Get symbols for specific card
- `useQuizSymbols()` - Get symbols for quiz with appearance counts
- `useSymbolCounts()` - Get symbol statistics
- `useSearchSymbols(query)` - Search symbols by meaning

### Benefits Achieved
- **Reactive data**: Components automatically update when database changes
- **Performance**: Efficient IndexedDB queries with proper indexing  
- **Offline support**: Full offline functionality with client-side database
- **Type safety**: All database operations are fully typed
- **Maintainability**: Single source of truth eliminates sync issues