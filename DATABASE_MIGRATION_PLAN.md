# Database Migration Plan

## Overview
Migrate static data imports to database hooks across all components using TDD approach.

## Phase 1: Simple Components (Day 1)

### 1. TreeOfLifeMystical.tsx
**Current State:**
- Imports: `TAROT_CARDS`, `SEPHIROT` from static files
- Location: `/src/components/TreeOfLifeMystical.tsx`

**Test:** `tests/e2e/tree-database-migration.spec.ts`
```typescript
// Test sephirot data loads from database
// Test cards load from database  
// Test path associations work correctly
// Test hover and click interactions preserved
```

**Migration Steps:**
1. Write test first (TDD)
2. Replace imports:
   - `import { TAROT_CARDS }` → `import { useCards }`
   - `import { SEPHIROT }` → `import { useSephirot }`
3. Add loading states:
   ```typescript
   const cards = useCards();
   const sephirot = useSephirot();
   if (!cards || !sephirot) return <LoadingSpinner />;
   ```
4. Update component logic to handle database data
5. Run tests to verify

### 2. SymbolHotspotEditor.tsx
**Current State:**
- Imports: `TAROT_CARDS` from static files
- Location: `/src/pages/SymbolHotspotEditor.tsx`

**Test:** `tests/e2e/hotspot-editor-migration.spec.ts`
```typescript
// Test cards load from database
// Test hotspot creation/editing works
// Test symbol assignment preserved
```

**Migration Steps:**
1. Write test first
2. Replace `import { TAROT_CARDS }` with `import { useCards }`
3. Add loading state handling
4. Verify hotspot functionality

### 3. SymbolList.tsx & AssignedSymbolsList.tsx
**Current State:**
- Imports: `SYMBOL_REGISTRY` from static files
- Location: `/src/components/editor/`

**Test:** `tests/e2e/symbol-list-migration.spec.ts`
```typescript
// Test symbols load from database
// Test filtering by type/card works
// Test search functionality preserved
```

**Migration Steps:**
1. Write test first
2. Replace `SYMBOL_REGISTRY` with `useSymbols()` hook
3. Update filtering logic for database data
4. Add loading states
5. Test all filter combinations

## Phase 2: Complex Components (Days 2-3)

### 4. ThothCardDetailPage.tsx (if exists)
**Current State:**
- Multiple static imports (8 total)
- Complex data relationships

**Test:** `tests/e2e/card-detail-migration.spec.ts`
```typescript
// Test all card data loads
// Test symbol associations display
// Test meanings and correspondences
```

**Migration Steps:**
1. Write comprehensive test
2. Create composite hook:
   ```typescript
   function useCardDetailData(cardId: string) {
     const card = useCard(cardId);
     const meaning = useCardMeaning(cardId);
     const symbols = useCardSymbols(cardId);
     const hotspots = useHotspots(cardId);
     return { card, meaning, symbols, hotspots };
   }
   ```
3. Replace all static imports
4. Add loading/error states
5. Verify all data displays correctly

### 5. SymbolAssociationPage.tsx
**Current State:**
- Imports: `TAROT_CARDS`, `SYMBOL_REGISTRY`
- Uses localStorage for persistence

**Test:** `tests/e2e/association-page-migration.spec.ts`
```typescript
// Test cards and symbols load
// Test associations can be created
// Test persistence to database
```

**Migration Steps:**
1. Write test first
2. Replace static imports with hooks
3. Add database persistence:
   - Create `associations` table if needed
   - Create `useAssociations` hook
   - Migrate from localStorage
4. Test drag-and-drop functionality

### 6. Quiz Components
**Components:**
- `QuizCard.tsx`
- `QuizProgress.tsx` 
- `SymbolQuizPage.tsx`

**Test:** `tests/e2e/quiz-migration.spec.ts`
```typescript
// Test quiz data loads from database
// Test progress saves to database
// Test quiz flow works correctly
```

**Migration Steps:**
1. Write test first
2. Add to database schema:
   ```typescript
   quizProgress: '++id, userId, symbolId, correct, timestamp'
   ```
3. Create `useQuizData()` hook
4. Replace localStorage with database
5. Test full quiz flow

## Phase 3: Cleanup (Day 4)

### Tasks:
1. **Remove Static Imports:**
   - Delete unused files in `/src/data/`
   - Keep only type definitions
   - Update all import paths

2. **Update Tests:**
   - Run full test suite
   - Fix any broken tests
   - Add performance tests

3. **Documentation:**
   - Update PROJECT_DOCUMENTATION.md
   - Document new hooks
   - Add migration notes

4. **Performance Testing:**
   - Create `tests/e2e/database-performance.spec.ts`
   - Measure page load times
   - Measure query response times

## Implementation Checklist

### For Each Component:
- [ ] Write Playwright test first (TDD)
- [ ] Create/update database hooks
- [ ] Replace static imports
- [ ] Add loading states
- [ ] Add error handling
- [ ] Test functionality
- [ ] Verify no regressions
- [ ] Update documentation

## Success Criteria
- ✅ All Playwright tests passing
- ✅ No static data imports in components
- ✅ Page load time < 1 second
- ✅ Database queries < 50ms
- ✅ All existing functionality preserved
- ✅ No console errors
- ✅ Smooth user experience maintained

## Rollback Strategy

### Preparation:
1. Create backup branch: `git checkout -b pre-db-migration`
2. Copy data files: `cp -r src/data src/data.backup`
3. Add feature flag:
   ```typescript
   const USE_DATABASE = process.env.VITE_USE_DATABASE === 'true';
   ```

### If Issues Arise:
1. Set `VITE_USE_DATABASE=false`
2. Restore static imports from backup
3. Deploy hotfix
4. Investigate and fix issues
5. Re-attempt migration

## Testing Commands

```bash
# Phase 1 - Simple Components
npm test -- tests/e2e/tree-database-migration.spec.ts
npm test -- tests/e2e/hotspot-editor-migration.spec.ts
npm test -- tests/e2e/symbol-list-migration.spec.ts

# Phase 2 - Complex Components
npm test -- tests/e2e/card-detail-migration.spec.ts
npm test -- tests/e2e/association-page-migration.spec.ts
npm test -- tests/e2e/quiz-migration.spec.ts

# Phase 3 - Full Suite
npm test  # Run all tests
npm test -- tests/e2e/database-performance.spec.ts

# Debugging
npm test -- --debug
npm test -- --headed  # See browser
```

## Database Hook Reference

### Available Hooks (from `/src/db/hooks.ts`):
- `useCards()` - All major arcana cards
- `useCard(cardId)` - Single card by ID
- `useSephirot()` - All sephirot
- `useSephirah(id)` - Single sephirah
- `useSymbols(type?)` - All symbols, optional filter
- `useSymbol(symbolId)` - Single symbol
- `useCardSymbols(cardId)` - Symbols for a card
- `useHotspots(cardId)` - Hotspots for a card
- `useCardMeaning(cardId)` - Meaning for a card
- `useSearchCards(query)` - Search cards
- `useSearchSymbols(query)` - Search symbols

## Notes

### Loading States Pattern:
```typescript
function Component() {
  const data = useData();
  
  if (!data) {
    return <div>Loading...</div>;
  }
  
  return <div>{/* Component content */}</div>;
}
```

### Error Handling Pattern:
```typescript
function Component() {
  const data = useData();
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!data && /* timeout check */) {
      setError('Failed to load data');
    }
  }, [data]);
  
  if (error) return <ErrorMessage />;
  if (!data) return <LoadingSpinner />;
  
  return <div>{/* Component content */}</div>;
}
```