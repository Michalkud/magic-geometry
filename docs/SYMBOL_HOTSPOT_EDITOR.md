# Symbol Hotspot Editor - Feature Documentation

## Overview
The Symbol Hotspot Editor is an interactive tool for annotating tarot card images with precise symbol locations. It allows users to draw rectangles around significant symbols and associate them with entries from the comprehensive symbol registry.

## Problem Solved
Previously, symbol data existed only as text descriptions without visual references. This editor bridges the gap by creating spatial mappings between card imagery and symbolic meanings, enabling:
- Precise symbol location tracking
- Visual learning of tarot symbolism
- Data export for zoom/detail views
- Foundation for interactive card exploration

## Implementation Details

### Architecture
The editor follows a component-based architecture with clear separation of concerns:

```
SymbolHotspotEditor (Page)
├── HotspotCanvas (Drawing/Selection)
├── SymbolList (Symbol Browser)
├── CoordinateDisplay (Position Feedback)
└── ExportModal (Data Export)
```

### Key Technical Decisions

#### 1. Normalized Coordinates (0-1 range)
- **Why**: Ensures hotspots scale correctly across different screen sizes
- **Implementation**: All coordinates stored as percentages of image dimensions
- **Benefit**: Responsive design without recalculation

#### 2. Rectangle-based Regions
- **Why**: Simple to implement, covers 90% of use cases
- **Trade-off**: Some symbols may need approximate rectangles
- **Future**: Can extend to polygons if needed

#### 3. LocalStorage Persistence
- **Why**: Simple, no backend required
- **Limitation**: Data tied to browser
- **Migration Path**: Can sync to backend API later

#### 4. Event Handling Strategy
- **Mouse Events**: Separate handlers for draw vs select
- **Click Prevention**: Prevents drawing when clicking existing hotspots
- **Right-click Context**: Custom menu for deletion

### Component Responsibilities

#### HotspotCanvas
**Purpose**: Core drawing and interaction surface

**Key Features**:
- Mouse event coordination for drawing
- Hotspot rendering with visual states
- Selection and deletion handling
- Preview mode for testing

**State Management**:
```typescript
- isDrawing: boolean
- drawStart/drawEnd: coordinates
- hoveredHotspot: string | null
- selectedHotspot: string | null
```

#### SymbolList
**Purpose**: Browse and select symbols from registry

**Key Features**:
- 454 symbols from complete registry
- Real-time search filtering
- Type-based categorization
- Visual preview of meanings

**Performance**: 
- Memoized filtering for efficient updates
- Virtual scrolling ready (if needed)

#### CoordinateDisplay
**Purpose**: Visual feedback during drawing

**Key Features**:
- Normalized coordinates display
- Pixel coordinates for precision
- Dimension calculations
- Real-time updates while drawing

#### ExportModal
**Purpose**: Data extraction for integration

**Key Features**:
- JSON formatting
- Clipboard copy
- File download
- Timestamp inclusion

### Data Flow

1. **Drawing Flow**:
   ```
   MouseDown → Start Drawing → MouseMove → Update Preview → MouseUp → Create Hotspot
   ```

2. **Selection Flow**:
   ```
   Click Hotspot → Update Selection → Display Coordinates → Enable Symbol Assignment
   ```

3. **Symbol Assignment Flow**:
   ```
   Select Hotspot → Browse Symbols → Click Symbol → Update Hotspot → Visual Feedback
   ```

4. **Persistence Flow**:
   ```
   Changes → Update State → Save Button → LocalStorage → Reload → Restore State
   ```

## Usage Guide

### Basic Workflow

1. **Initial Setup**
   - Navigate to `/editor`
   - Select a card from dropdown
   - Use Demo button for sample hotspots

2. **Creating Hotspots**
   - Click and drag to draw rectangle
   - Rectangle appears in blue while drawing
   - Release to create (gray if no symbol)

3. **Assigning Symbols**
   - Click rectangle to select (blue highlight)
   - Search/browse symbol list on right
   - Click symbol to assign (rectangle turns green)

4. **Managing Hotspots**
   - Right-click to delete with confirmation
   - Click empty area to deselect
   - Use coordinates panel for precision

5. **Saving Work**
   - Click Save for browser persistence
   - Click Export for JSON output
   - Copy or download data

### Keyboard Shortcuts
- `Delete` - Remove selected hotspot
- `Ctrl+Z` - Undo last action
- `Ctrl+Shift+Z` - Redo action
- `Ctrl+S` - Save to localStorage

## Testing Coverage

### E2E Tests (`symbol-hotspot-editor.spec.ts`)
1. ✅ Display card image and drawing canvas
2. ✅ Allow selecting different cards
3. ✅ Draw rectangle on canvas click and drag
4. ✅ Select symbol and associate with hotspot
5. ✅ Display normalized coordinates
6. ✅ Delete hotspot on right click
7. ✅ Export hotspot data
8. ✅ Save and load from localStorage
9. ✅ Toggle between edit and preview modes
10. ⏭️ Keyboard shortcuts (planned)

### Manual Testing Checklist
- [ ] Draw multiple overlapping rectangles
- [ ] Test with all 22 Major Arcana cards
- [ ] Export and reimport data
- [ ] Test on different screen sizes
- [ ] Verify coordinate accuracy

## API Reference

### Export Data Structure
```typescript
interface ExportData {
  cardId: string;
  hotspots: Array<{
    id: string;           // Symbol ID or unique identifier
    rectangle: {
      x1: number;        // 0-1 normalized
      y1: number;        // 0-1 normalized
      x2: number;        // 0-1 normalized
      y2: number;        // 0-1 normalized
    };
  }>;
  exportedAt: string;    // ISO timestamp
}
```

### LocalStorage Schema
```typescript
interface StoredHotspots {
  [cardId: string]: Rectangle[];
}
```

## Integration Examples

### Creating Zoom Views
```javascript
// Use exported rectangle to create focused view
function createZoomView(hotspot, imageUrl) {
  const { x1, y1, x2, y2 } = hotspot.rectangle;
  
  // Calculate pixel coordinates
  const left = x1 * imageWidth;
  const top = y1 * imageHeight;
  const width = (x2 - x1) * imageWidth;
  const height = (y2 - y1) * imageHeight;
  
  // Create cropped view
  return {
    backgroundImage: `url(${imageUrl})`,
    backgroundPosition: `-${left}px -${top}px`,
    width: width,
    height: height
  };
}
```

### Symbol Overlay System
```javascript
// Overlay symbol information on hover
function createSymbolOverlay(hotspot, symbolData) {
  return {
    position: 'absolute',
    left: `${hotspot.rectangle.x1 * 100}%`,
    top: `${hotspot.rectangle.y1 * 100}%`,
    width: `${(hotspot.rectangle.x2 - hotspot.rectangle.x1) * 100}%`,
    height: `${(hotspot.rectangle.y2 - hotspot.rectangle.y1) * 100}%`,
    data: symbolData[hotspot.id]
  };
}
```

## Performance Considerations

### Current Optimizations
- React.useCallback for event handlers
- Memoized symbol filtering
- Efficient coordinate calculations
- Minimal re-renders with proper state updates

### Scaling Considerations
- **100+ hotspots**: Consider virtualization
- **Large images**: Implement lazy loading
- **Complex shapes**: Add polygon support
- **Multi-user**: Add collaboration features

## Future Enhancements

### Phase 1 (Next Sprint)
- [ ] Polygon drawing for irregular shapes
- [ ] Hotspot copying between cards
- [ ] Bulk operations (select multiple)
- [ ] Hotspot templates for common symbols

### Phase 2 (Future)
- [ ] AI-assisted symbol detection
- [ ] Collaborative annotations
- [ ] Version history for hotspots
- [ ] Advanced search (by position, size)

### Phase 3 (Long-term)
- [ ] Mobile/tablet support
- [ ] API backend integration
- [ ] Real-time collaboration
- [ ] Symbol relationship visualization

## Troubleshooting

### Common Issues

1. **Hotspots not saving**
   - Check browser localStorage limits
   - Verify Save button click
   - Check console for errors

2. **Can't select rectangles**
   - Ensure Edit Mode is active
   - Check z-index conflicts
   - Verify no JavaScript errors

3. **Export not working**
   - Check popup blockers
   - Verify clipboard permissions
   - Try download option instead

## Code Snippets

### Adding Custom Symbol Types
```typescript
// In SymbolList.tsx
const customTypes = ['mynew-type', ...symbolTypes];
```

### Customizing Hotspot Colors
```typescript
// In HotspotCanvas.tsx
const getHotspotColor = (hotspot) => {
  if (hotspot.symbolId?.includes('divine')) return 'gold';
  if (hotspot.symbolId?.includes('shadow')) return 'purple';
  return 'blue';
};
```

### Adding Validation
```typescript
// Minimum size validation
const MIN_RECT_SIZE = 0.02; // 2% of image
if (width < MIN_RECT_SIZE || height < MIN_RECT_SIZE) {
  return; // Don't create tiny rectangles
}
```

## Credits
- Developed as part of Magic Geometry project
- Symbol registry from existing tarot database
- UI components using React and Tailwind CSS
- Testing with Playwright

## Version History
- v1.0.0 (2025-09-02): Initial implementation with rectangle drawing, symbol assignment, and export functionality