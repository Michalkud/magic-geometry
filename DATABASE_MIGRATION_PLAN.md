# Database Migration Plan

## Components to Migrate (Priority Order)

### Phase 1: Simple Components (Day 1)
1. **TreeOfLifeMystical.tsx**
   - Replace: `SEPHIROT`, `TAROT_CARDS` → `useSephirot()`, `useCards()`

2. **SymbolHotspotEditor.tsx**
   - Replace: `TAROT_CARDS` → `useCards()`

3. **editor/SymbolList.tsx** & **editor/AssignedSymbolsList.tsx**
   - Replace: `SYMBOL_REGISTRY` → `useSymbols()`

### Phase 2: Complex Components (Day 2-3)
4. **ThothCardDetailPage.tsx** (8 imports)
   - Add missing tables: `majorsMeta`, `cardSymbols`, `rwsCardSymbols`, `decans`
   - Create composite hook: `useCardDetailPage(cardId)`

5. **SymbolAssociationPage.tsx**
   - Replace: `SYMBOL_REGISTRY`, `TAROT_CARDS` → `useSymbols()`, `useCards()`

6. **Quiz Components** (QuizCard, QuizProgress, SymbolQuizPage)
   - Add `quizProgress` table
   - Create `useQuizData()` hook
   - Migrate localStorage to database

### Phase 3: Cleanup (Day 4)
- Remove `/src/data/` files (keep only types)
- Update all tests
- Update documentation

## Implementation Steps

### For Each Component:
1. Write Playwright test
2. Create/update database hooks
3. Replace static imports
4. Add loading states
5. Test functionality

## Success Criteria
- All tests passing
- No static data imports remain
- Page load < 1 second
- Database queries < 50ms

## Rollback Plan
- Keep `/src/data.backup/`
- Feature flag: `USE_DATABASE=true/false`
- Restore original imports if needed