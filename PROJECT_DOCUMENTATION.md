# Magic Geometry - Project Documentation

## Overview
Magic Geometry is an interactive web application for exploring Tarot symbolism through the Tree of Life. It provides tools for studying card meanings, symbol relationships, and creating detailed annotations of tarot imagery.

## Current Implementation State

### Core Application
- **Stack**: React 18 + TypeScript + Vite + Tailwind CSS
- **Routes**:
  - `/` - Interactive Tree of Life with 22 Major Arcana paths
  - `/quiz` - Symbol memory quiz with 150+ symbols from RWS/Thoth/Universal sources
  - `/symbols` - Symbol Graph System demo page
  - `/editor` - Symbol Hotspot Editor for card annotation

## Core Features

### 1. Tree of Life Visualization (`/`)
- Interactive Kabbalistic Tree of Life with 22 Major Arcana paths
- 10 Sephiroth with Hebrew names
- Hover effects showing floating card previews
- Dual display modes (line paths vs individual cards)

### 2. Symbol Quiz System (`/quiz`)
- Memory quiz with 150+ symbols from multiple sources
- Progress tracking with LocalStorage
- Gamification features (streaks and achievements)
- Multi-source symbols (RWS, Thoth, Universal)

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

### 4. Symbol Hotspot Editor (`/editor`)
**Added: 2025-09-02**  
**Updated: 2025-09-03** - Added smooth rectangle movement capability

Interactive tool for defining precise symbol locations on tarot cards using rectangular regions.

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

##### SymbolHotspotEditor (`/src/pages/SymbolHotspotEditor.tsx`)
- Main editor page with all components integrated
- Card selector for all 22 Major Arcana
- Edit/Preview mode toggle
- Save to localStorage for persistence
- Undo/Redo support with state history
- Demo button for testing with sample hotspots
- Statistics panel showing hotspot counts

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
6. **Save Work**: Click Save to persist to browser storage
7. **Export Data**: Click Export to get JSON for integration with other features

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
- Comprehensive E2E test suite (`/tests/e2e/symbol-hotspot-editor.spec.ts`)
- 10 passing tests covering all major functionality
- Tests drawing, selection, deletion, moving, export, and persistence

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

## Technical Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation

### Data Management
- LocalStorage for persistence
- In-memory symbol registry
- Graph-based data structures

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
│   ├── editor/
│   │   ├── HotspotCanvas.tsx
│   │   ├── SymbolList.tsx
│   │   ├── CoordinateDisplay.tsx
│   │   └── ExportModal.tsx
│   ├── TreeOfLifeMystical.tsx
│   └── CardCanvas.tsx
├── pages/
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

## Roadmap

### Implemented ✅
- Tree of Life visualization
- Symbol Graph System (450+ symbols)
- Symbol Quiz System
- Symbol Hotspot Editor

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