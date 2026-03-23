# Liuyao Tool Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static Vite + React tool that supports three-coin divination, computes a structured six-line chart locally, and renders a clear result page.

**Architecture:** The app is a client-side React SPA with a small route surface: home, cast, and result. All divination and chart computation lives in `src/core` as pure functions backed by static rule data in `src/data`, while UI components only collect input and render a formatted result object.

**Tech Stack:** Vite, React, TypeScript, React Router, Tailwind CSS, Vitest, Testing Library, Cloudflare Pages

---

## File Map

### Create

- `package.json`
- `tsconfig.json`
- `tsconfig.node.json`
- `vite.config.ts`
- `vitest.config.ts`
- `index.html`
- `postcss.config.js`
- `tailwind.config.ts`
- `src/main.tsx`
- `src/app/App.tsx`
- `src/app/router.tsx`
- `src/styles/index.css`
- `src/pages/HomePage.tsx`
- `src/pages/CastPage.tsx`
- `src/pages/ResultPage.tsx`
- `src/pages/NotFoundPage.tsx`
- `src/components/layout/AppShell.tsx`
- `src/components/cast/CastForm.tsx`
- `src/components/cast/CoinThrowInput.tsx`
- `src/components/cast/RandomCastButton.tsx`
- `src/components/result/HexagramCard.tsx`
- `src/components/result/LineTable.tsx`
- `src/components/result/ResultSummary.tsx`
- `src/components/result/ErrorState.tsx`
- `src/core/divination/coinValues.ts`
- `src/core/divination/normalizeCastInput.ts`
- `src/core/divination/randomCast.ts`
- `src/core/hexagram/buildHexagram.ts`
- `src/core/hexagram/buildChangedHexagram.ts`
- `src/core/hexagram/getMovingLines.ts`
- `src/core/relations/getSixSpirits.ts`
- `src/core/relations/getSixRelations.ts`
- `src/core/relations/getShiYing.ts`
- `src/core/formatter/formatChartResult.ts`
- `src/core/index.ts`
- `src/data/trigrams.ts`
- `src/data/hexagrams.ts`
- `src/data/sixSpirits.ts`
- `src/data/sixRelations.ts`
- `src/data/shiYing.ts`
- `src/types/divination.ts`
- `src/types/hexagram.ts`
- `src/types/chartResult.ts`
- `src/lib/resultStore.ts`
- `src/tests/divination/coinValues.test.ts`
- `src/tests/divination/normalizeCastInput.test.ts`
- `src/tests/hexagram/buildHexagram.test.ts`
- `src/tests/hexagram/buildChangedHexagram.test.ts`
- `src/tests/relations/getSixSpirits.test.ts`
- `src/tests/relations/getSixRelations.test.ts`
- `src/tests/relations/getShiYing.test.ts`
- `src/tests/formatter/formatChartResult.test.ts`
- `src/tests/pages/cast-flow.test.tsx`
- `README.md`
- `wrangler.toml`
- `.gitignore`

### Responsibility Notes

- `src/core/*` contains deterministic business rules only.
- `src/data/*` contains static lookup tables that power core rules.
- `src/lib/resultStore.ts` is the only place allowed to bridge computed result state into route navigation.
- `src/components/*` must stay presentation-focused and should not compute chart rules.
- `src/tests/*` should mirror the production module layout to keep rule coverage obvious.

## Chunk 1: Scaffold The Frontend Workspace

### Task 1: Create the package and toolchain baseline

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `vitest.config.ts`
- Create: `postcss.config.js`
- Create: `tailwind.config.ts`
- Create: `index.html`
- Create: `.gitignore`

- [ ] **Step 1: Write the baseline config files**

```json
{
  "name": "liuyao-tool",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 2: Add dependencies and devDependencies**

Required runtime packages:

```text
react
react-dom
react-router-dom
```

Required dev packages:

```text
typescript
vite
vitest
@testing-library/react
@testing-library/jest-dom
@testing-library/user-event
jsdom
tailwindcss
postcss
autoprefixer
@vitejs/plugin-react
```

- [ ] **Step 3: Run install to generate the lockfile**

Run: `npm install`
Expected: install completes and `package-lock.json` is created

- [ ] **Step 4: Verify the toolchain boots**

Run: `npm run build`
Expected: build fails only because app source files do not exist yet

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json tsconfig.json tsconfig.node.json vite.config.ts vitest.config.ts postcss.config.js tailwind.config.ts index.html .gitignore
git commit -m "chore: scaffold vite toolchain"
```

### Task 2: Create the app shell and route skeleton

**Files:**
- Create: `src/main.tsx`
- Create: `src/app/App.tsx`
- Create: `src/app/router.tsx`
- Create: `src/styles/index.css`
- Create: `src/pages/HomePage.tsx`
- Create: `src/pages/CastPage.tsx`
- Create: `src/pages/ResultPage.tsx`
- Create: `src/pages/NotFoundPage.tsx`
- Create: `src/components/layout/AppShell.tsx`

- [ ] **Step 1: Write the failing smoke test for routing**

```tsx
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routes } from "../../app/router";

test("renders home page heading", () => {
  const router = createMemoryRouter(routes, { initialEntries: ["/"] });
  render(<RouterProvider router={router} />);
  expect(screen.getByRole("heading", { name: /六爻/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/tests/pages/cast-flow.test.tsx`
Expected: FAIL because router and pages do not exist

- [ ] **Step 3: Implement the minimal route skeleton**

Code requirements:

```tsx
export const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/cast", element: <CastPage /> },
  { path: "/result", element: <ResultPage /> },
  { path: "*", element: <NotFoundPage /> }
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/tests/pages/cast-flow.test.tsx`
Expected: PASS

- [ ] **Step 5: Run the app build**

Run: `npm run build`
Expected: PASS and `dist/` is generated

- [ ] **Step 6: Commit**

```bash
git add src/main.tsx src/app/App.tsx src/app/router.tsx src/styles/index.css src/pages/HomePage.tsx src/pages/CastPage.tsx src/pages/ResultPage.tsx src/pages/NotFoundPage.tsx src/components/layout/AppShell.tsx src/tests/pages/cast-flow.test.tsx
git commit -m "feat: add app shell and route skeleton"
```

## Chunk 2: Build The Core Divination Engine

### Task 3: Define domain types and coin normalization rules

**Files:**
- Create: `src/types/divination.ts`
- Create: `src/types/hexagram.ts`
- Create: `src/types/chartResult.ts`
- Create: `src/core/divination/coinValues.ts`
- Create: `src/core/divination/normalizeCastInput.ts`
- Test: `src/tests/divination/coinValues.test.ts`
- Test: `src/tests/divination/normalizeCastInput.test.ts`

- [ ] **Step 1: Write the failing tests for coin mapping**

```ts
import { describe, expect, it } from "vitest";
import { mapCoinThrowToLine } from "../../core/divination/coinValues";

describe("mapCoinThrowToLine", () => {
  it("maps 6 to old yin", () => {
    expect(mapCoinThrowToLine(6).moving).toBe(true);
    expect(mapCoinThrowToLine(6).polarity).toBe("yin");
  });

  it("maps 9 to old yang", () => {
    expect(mapCoinThrowToLine(9).moving).toBe(true);
    expect(mapCoinThrowToLine(9).polarity).toBe("yang");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- src/tests/divination/coinValues.test.ts src/tests/divination/normalizeCastInput.test.ts`
Expected: FAIL because the modules do not exist

- [ ] **Step 3: Implement the minimal types and normalization**

Code requirements:

```ts
export type CoinThrowValue = 6 | 7 | 8 | 9;
export type LinePolarity = "yin" | "yang";

export interface NormalizedLine {
  throwValue: CoinThrowValue;
  polarity: LinePolarity;
  moving: boolean;
}
```

Behavior requirements:

- input must contain exactly 6 throw values
- values outside `6 | 7 | 8 | 9` must throw an error
- output order must preserve bottom-to-top line ordering

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- src/tests/divination/coinValues.test.ts src/tests/divination/normalizeCastInput.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/types/divination.ts src/types/hexagram.ts src/types/chartResult.ts src/core/divination/coinValues.ts src/core/divination/normalizeCastInput.ts src/tests/divination/coinValues.test.ts src/tests/divination/normalizeCastInput.test.ts
git commit -m "feat: add coin normalization rules"
```

### Task 4: Compute original and changed hexagrams

**Files:**
- Create: `src/core/hexagram/buildHexagram.ts`
- Create: `src/core/hexagram/buildChangedHexagram.ts`
- Create: `src/core/hexagram/getMovingLines.ts`
- Create: `src/data/trigrams.ts`
- Create: `src/data/hexagrams.ts`
- Test: `src/tests/hexagram/buildHexagram.test.ts`
- Test: `src/tests/hexagram/buildChangedHexagram.test.ts`

- [ ] **Step 1: Write the failing hexagram tests**

```ts
import { expect, test } from "vitest";
import { buildHexagram } from "../../core/hexagram/buildHexagram";

test("builds a named original hexagram from six lines", () => {
  const result = buildHexagram([
    { throwValue: 7, polarity: "yang", moving: false },
    { throwValue: 8, polarity: "yin", moving: false },
    { throwValue: 8, polarity: "yin", moving: false },
    { throwValue: 8, polarity: "yin", moving: false },
    { throwValue: 7, polarity: "yang", moving: false },
    { throwValue: 7, polarity: "yang", moving: false }
  ]);

  expect(result.lines).toHaveLength(6);
  expect(result.name).toBeTruthy();
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- src/tests/hexagram/buildHexagram.test.ts src/tests/hexagram/buildChangedHexagram.test.ts`
Expected: FAIL because hexagram modules and static data are missing

- [ ] **Step 3: Implement the minimal hexagram builders**

Behavior requirements:

- derive the original hexagram from normalized lines
- collect moving line indexes from bottom to top
- flip moving lines to produce the changed hexagram
- resolve upper and lower trigrams from line polarity
- resolve a stable hexagram identifier and name from static data

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- src/tests/hexagram/buildHexagram.test.ts src/tests/hexagram/buildChangedHexagram.test.ts`
Expected: PASS

- [ ] **Step 5: Add one regression test for a known moving-line case**

Run: `npm test -- src/tests/hexagram/buildChangedHexagram.test.ts`
Expected: PASS with a case that confirms changed lines invert correctly

- [ ] **Step 6: Commit**

```bash
git add src/core/hexagram/buildHexagram.ts src/core/hexagram/buildChangedHexagram.ts src/core/hexagram/getMovingLines.ts src/data/trigrams.ts src/data/hexagrams.ts src/tests/hexagram/buildHexagram.test.ts src/tests/hexagram/buildChangedHexagram.test.ts
git commit -m "feat: add hexagram calculation engine"
```

### Task 5: Add six spirits, six relations, and shi-ying rules

**Files:**
- Create: `src/core/relations/getSixSpirits.ts`
- Create: `src/core/relations/getSixRelations.ts`
- Create: `src/core/relations/getShiYing.ts`
- Create: `src/data/sixSpirits.ts`
- Create: `src/data/sixRelations.ts`
- Create: `src/data/shiYing.ts`
- Test: `src/tests/relations/getSixSpirits.test.ts`
- Test: `src/tests/relations/getSixRelations.test.ts`
- Test: `src/tests/relations/getShiYing.test.ts`

- [ ] **Step 1: Write failing tests for each relation module**

Test requirements:

- `getSixSpirits` returns six items in stable order
- `getSixRelations` returns one relation label per line
- `getShiYing` returns two distinct line indexes within `1..6`

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- src/tests/relations/getSixSpirits.test.ts src/tests/relations/getSixRelations.test.ts src/tests/relations/getShiYing.test.ts`
Expected: FAIL because relation modules do not exist

- [ ] **Step 3: Implement the minimal rule modules**

Implementation notes:

- keep all lookup tables in `src/data/*`
- keep the exported functions pure
- throw explicit errors when a rule lookup is missing

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- src/tests/relations/getSixSpirits.test.ts src/tests/relations/getSixRelations.test.ts src/tests/relations/getShiYing.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/core/relations/getSixSpirits.ts src/core/relations/getSixRelations.ts src/core/relations/getShiYing.ts src/data/sixSpirits.ts src/data/sixRelations.ts src/data/shiYing.ts src/tests/relations/getSixSpirits.test.ts src/tests/relations/getSixRelations.test.ts src/tests/relations/getShiYing.test.ts
git commit -m "feat: add relation calculation rules"
```

### Task 6: Assemble the formatted chart result

**Files:**
- Create: `src/core/formatter/formatChartResult.ts`
- Create: `src/core/index.ts`
- Test: `src/tests/formatter/formatChartResult.test.ts`

- [ ] **Step 1: Write the failing integration test for the formatted result**

```ts
import { expect, test } from "vitest";
import { computeChartResult } from "../../core";

test("computes a complete chart result object", () => {
  const result = computeChartResult([7, 8, 8, 6, 7, 9]);
  expect(result.originalHexagram.name).toBeTruthy();
  expect(result.changedHexagram.name).toBeTruthy();
  expect(result.lines).toHaveLength(6);
  expect(result.sixSpirits).toHaveLength(6);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/tests/formatter/formatChartResult.test.ts`
Expected: FAIL because the orchestrator does not exist

- [ ] **Step 3: Implement the chart formatter**

Behavior requirements:

- accept raw six-throw input
- normalize and validate the input
- compute original and changed hexagrams
- attach moving lines, six relations, six spirits, and shi-ying
- return one serializable result object for the UI

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/tests/formatter/formatChartResult.test.ts`
Expected: PASS

- [ ] **Step 5: Run all core tests**

Run: `npm test -- src/tests/divination src/tests/hexagram src/tests/relations src/tests/formatter`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/core/formatter/formatChartResult.ts src/core/index.ts src/tests/formatter/formatChartResult.test.ts
git commit -m "feat: add chart result formatter"
```

## Chunk 3: Implement The User Flow

### Task 7: Add local result transport and cast form behavior

**Files:**
- Create: `src/lib/resultStore.ts`
- Create: `src/components/cast/CastForm.tsx`
- Create: `src/components/cast/CoinThrowInput.tsx`
- Create: `src/components/cast/RandomCastButton.tsx`
- Create: `src/core/divination/randomCast.ts`
- Modify: `src/pages/CastPage.tsx`
- Test: `src/tests/pages/cast-flow.test.tsx`

- [ ] **Step 1: Extend the failing page flow test**

```tsx
import userEvent from "@testing-library/user-event";

test("submits a valid cast and navigates to result", async () => {
  const user = userEvent.setup();
  renderCastRoute();
  const selects = screen.getAllByRole("combobox");

  for (const select of selects) {
    await user.selectOptions(select, "7");
  }

  await user.click(screen.getByRole("button", { name: /开始排盘/i }));
  expect(await screen.findByRole("heading", { name: /排盘结果/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/tests/pages/cast-flow.test.tsx`
Expected: FAIL because the cast form and result transport do not exist

- [ ] **Step 3: Implement the minimal form flow**

Behavior requirements:

- render six throw inputs with allowed values `6, 7, 8, 9`
- provide a random-fill action that produces six valid values
- require exactly six values before allowing submission
- compute the chart locally on submit
- store the result in a small in-memory module or session-backed helper
- navigate to `/result` after successful computation

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/tests/pages/cast-flow.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/resultStore.ts src/components/cast/CastForm.tsx src/components/cast/CoinThrowInput.tsx src/components/cast/RandomCastButton.tsx src/core/divination/randomCast.ts src/pages/CastPage.tsx src/tests/pages/cast-flow.test.tsx
git commit -m "feat: add cast form workflow"
```

### Task 8: Render the result page and empty-state guard

**Files:**
- Create: `src/components/result/HexagramCard.tsx`
- Create: `src/components/result/LineTable.tsx`
- Create: `src/components/result/ResultSummary.tsx`
- Create: `src/components/result/ErrorState.tsx`
- Modify: `src/pages/ResultPage.tsx`
- Test: `src/tests/pages/cast-flow.test.tsx`

- [ ] **Step 1: Add the failing test for direct result access**

```tsx
test("shows a recovery state when result data is missing", () => {
  renderResultRouteWithoutStoredData();
  expect(screen.getByText(/请先起卦/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/tests/pages/cast-flow.test.tsx`
Expected: FAIL because the result page does not guard missing data

- [ ] **Step 3: Implement the result presentation**

Behavior requirements:

- display original hexagram and changed hexagram cards
- show six lines with polarity, moving status, relation, and spirit labels
- show shi and ying markers clearly
- if result data is absent, render a recovery state with a link back to `/cast`

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/tests/pages/cast-flow.test.tsx`
Expected: PASS

- [ ] **Step 5: Run the full test suite**

Run: `npm test`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/result/HexagramCard.tsx src/components/result/LineTable.tsx src/components/result/ResultSummary.tsx src/components/result/ErrorState.tsx src/pages/ResultPage.tsx src/tests/pages/cast-flow.test.tsx
git commit -m "feat: add result page presentation"
```

## Chunk 4: Finish Delivery And Deployment

### Task 9: Polish the static site for deployment

**Files:**
- Create: `README.md`
- Create: `wrangler.toml`
- Modify: `package.json`

- [ ] **Step 1: Write the deployment docs**

README requirements:

- local development commands
- test command
- build command
- Cloudflare Pages build output directory
- short note that the app is fully static and computes locally

- [ ] **Step 2: Add Pages-compatible deployment config**

Configuration requirements:

- compatibility with static asset deployment
- project name placeholder
- no server runtime assumptions

- [ ] **Step 3: Run final verification**

Run: `npm run build`
Expected: PASS

Run: `npm test`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add README.md wrangler.toml package.json
git commit -m "docs: add deployment and project usage notes"
```

### Task 10: Final verification and branch hygiene

**Files:**
- Modify: none

- [ ] **Step 1: Check repository status**

Run: `git status --short --branch`
Expected: clean working tree on the current branch

- [ ] **Step 2: Review the last few commits**

Run: `git log --oneline --decorate -5`
Expected: the recent commits match the task breakdown above

- [ ] **Step 3: Perform manual smoke checks**

Run: `npm run dev`
Expected: home, cast, and result routes render locally without console errors

- [ ] **Step 4: Close out with verification evidence**

Use `@superpowers:verification-before-completion` before claiming the feature is complete.

## Notes For Execution

- Use `@superpowers:test-driven-development` for each implementation task. The test examples in this plan are intentionally minimal; flesh them out when coding.
- Keep all chart rules in pure functions. Do not let React components derive business rules from raw throws.
- Do not add a backend, persistence layer, analytics, or AI integration during this plan.
- If the six-relations or shi-ying rule tables prove incomplete, stop and extend `src/data/*` rather than embedding exceptions in components.
- Prefer Chinese UI copy in visible text, but keep code identifiers and file names in English.

Plan complete and saved to `docs/superpowers/plans/2026-03-23-liuyao-tool-implementation-plan.md`. Ready to execute?
