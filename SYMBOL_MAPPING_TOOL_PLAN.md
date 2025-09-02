# Symbol Coordinate Mapping Tool Plan

## Overview
Create an interactive UI where you can:
1. Select a tarot card
2. See a list of symbols for that card
3. Click on the card image to set coordinates for each symbol
4. Save the mapped coordinates to the data structure

## Implementation Plan

### 1. Create Symbol Mapping Page Component
**File: `src/pages/SymbolMappingTool.tsx`**
- Split screen layout:
  - Left: Card image with click detection
  - Right: Symbol list with coordinate status
- Click handler to capture x,y coordinates relative to image
- Visual markers showing placed symbols

### 2. Create Symbol Types & Initial Data
**File: `src/data/symbols/types.ts`**
```typescript
export type SymbolCoordinate = {
  symbolId: string;
  x: number;  // percentage (0-100)
  y: number;  // percentage (0-100)
}

export type CardSymbolData = {
  cardId: string;
  symbols: {
    id: string;
    label: string;
    category: string;
    coordinates?: SymbolCoordinate;
  }[];
}
```

### 3. Symbol List Component
**File: `src/components/symbol-mapping/SymbolList.tsx`**
- Display all symbols for selected card
- Show status: ✓ mapped, ⚠️ unmapped
- Highlight currently selected symbol
- Allow reordering/editing

### 4. Interactive Card Canvas
**File: `src/components/symbol-mapping/CardCanvas.tsx`**
- Display card image
- Capture click coordinates
- Convert to percentage-based positions
- Show placed symbol markers
- Support drag to reposition
- Hover to show symbol names

### 5. Data Persistence
**File: `src/data/symbols/symbolCoordinates.ts`**
- Store coordinates in JSON format
- Export function to generate TypeScript files
- Import/export functionality

### 6. Features
- **Card Selector**: Dropdown to choose Major Arcana (0-21)
- **Symbol Manager**: 
  - Add new symbols on the fly
  - Edit symbol names/categories
  - Delete incorrect symbols
- **Visual Feedback**:
  - Crosshair cursor on hover
  - Symbol dots with labels
  - Different colors for categories
  - Grid overlay option for precision
- **Bulk Actions**:
  - Clear all coordinates
  - Import from existing data
  - Export to TypeScript format
- **Keyboard Shortcuts**:
  - Arrow keys for fine adjustment
  - Delete to remove coordinate
  - Tab to next symbol

### 7. Workflow
1. Select card from dropdown
2. System loads predefined symbol list (from research)
3. Click symbol in list to select it
4. Click on card image to place marker
5. Repeat for all symbols
6. Save/export when complete
7. Move to next card

### 8. Data Export Format
Generate TypeScript files like:
```typescript
// src/data/symbols/coordinates/00-the-fool.ts
export const FOOL_COORDINATES = {
  cardId: 'the-fool',
  symbols: [
    { id: 'white-rose', x: 45.2, y: 62.3 },
    { id: 'cliff', x: 78.5, y: 85.0 },
    { id: 'white-dog', x: 55.0, y: 75.5 },
    // ...
  ]
}
```

### 9. Route Setup
- Add route: `/symbol-mapping`
- Add navigation link in header
- Restrict to development mode only

## Benefits
1. **Accurate Positioning**: Click exactly where symbols appear
2. **Visual Verification**: See all mappings at once
3. **Efficient Workflow**: Map all 22 cards systematically
4. **Reusable Data**: Export to production-ready format
5. **Quality Control**: Easy to spot missing symbols

## Implementation Steps
1. Create basic page structure and routing
2. Implement card image display with click detection
3. Build symbol list management
4. Add coordinate capture and storage
5. Create visual marker system
6. Implement data export functionality
7. Add polish: keyboard shortcuts, grid overlay, etc.

This tool will make collecting coordinate data for 400-600 symbols much faster and more accurate than manual coding!