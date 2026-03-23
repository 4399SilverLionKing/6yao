# Liuyao Formal Chart Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the current lightweight chart output into a formally structured `增删卜易` chart with Beijing-time calendar conversion, Na Jia data, formal six relations, six spirits, shi-ying, and hidden spirit output.

**Architecture:** The implementation remains a client-side React application, but formal chart logic is split into three stable layers: calendar conversion, table-driven `增删卜易` rule evaluation, and result formatting. UI changes are intentionally thin; correctness lives in pure functions and regression fixtures.

**Tech Stack:** Vite, React, TypeScript, Vitest, React Testing Library, lunar-typescript, Cloudflare Pages

---

## File Map

### Create

- `src/core/calendar/buildCalendarContext.ts`
- `src/core/calendar/parseBeijingDateTime.ts`
- `src/core/calendar/types.ts`
- `src/core/liuyao/buildNaJiaLines.ts`
- `src/core/liuyao/buildHiddenLines.ts`
- `src/core/liuyao/getFormalSixRelations.ts`
- `src/core/liuyao/getFormalSixSpirits.ts`
- `src/core/liuyao/getFormalShiYing.ts`
- `src/core/liuyao/index.ts`
- `src/data/zengshan/naJia.ts`
- `src/data/zengshan/fuShen.ts`
- `src/data/zengshan/shiYing.ts`
- `src/data/zengshan/sixSpirits.ts`
- `src/data/zengshan/relations.ts`
- `src/tests/calendar/buildCalendarContext.test.ts`
- `src/tests/liuyao/buildNaJiaLines.test.ts`
- `src/tests/liuyao/buildHiddenLines.test.ts`
- `src/tests/liuyao/getFormalSixRelations.test.ts`
- `src/tests/liuyao/getFormalSixSpirits.test.ts`
- `src/tests/liuyao/getFormalShiYing.test.ts`
- `src/tests/formatter/formalChartResult.test.ts`
- `src/tests/fixtures/formal-chart-cases.ts`

### Modify

- `package.json`
- `pnpm-lock.yaml`
- `src/types/chartResult.ts`
- `src/types/hexagram.ts`
- `src/core/formatter/formatChartResult.ts`
- `src/core/index.ts`
- `src/components/cast/CastForm.tsx`
- `src/pages/CastPage.tsx`
- `src/pages/ResultPage.tsx`
- `src/components/result/ResultSummary.tsx`
- `src/components/result/LineTable.tsx`
- `src/tests/pages/cast-flow.test.tsx`
- `README.md`

### Responsibility Notes

- `src/core/calendar/*` is the only layer allowed to call the lunar calendar library.
- `src/data/zengshan/*` holds all static `增删卜易` rule tables and must be readable enough to review without running the code.
- `src/core/liuyao/*` must consume normalized chart input and `CalendarContext`, then return deterministic formal-chart structures.
- `src/core/formatter/formatChartResult.ts` remains the top-level orchestrator; do not let UI components piece together chart semantics.
- Fixtures under `src/tests/fixtures/` should describe expected formal chart outputs in a way that can be audited by a human reader.

## Chunk 1: Add The Calendar Conversion Layer

### Task 1: Install and wire the calendar library

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `README.md`

- [ ] **Step 1: Add the failing import smoke test**

Add a minimal test in `src/tests/calendar/buildCalendarContext.test.ts` that imports `buildCalendarContext` and expects a concrete `dayGanzhi` string for a fixed input.

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/tests/calendar/buildCalendarContext.test.ts`
Expected: FAIL because the calendar module and dependency are not present

- [ ] **Step 3: Add the calendar dependency**

Dependency requirement:

```text
lunar-typescript
```

Install command:

```bash
pnpm add lunar-typescript
```

- [ ] **Step 4: Update README for the new formal-chart scope**

Add one short note that formal chart generation includes Beijing-time calendar conversion and depends on a local calendar library.

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml README.md
git commit -m "chore: add calendar dependency for formal charting"
```

### Task 2: Build the Beijing-time calendar context

**Files:**
- Create: `src/core/calendar/types.ts`
- Create: `src/core/calendar/parseBeijingDateTime.ts`
- Create: `src/core/calendar/buildCalendarContext.ts`
- Test: `src/tests/calendar/buildCalendarContext.test.ts`

- [ ] **Step 1: Write the failing calendar tests**

Required test cases:

- fixed Beijing datetime returns month branch, day ganzhi, and day xun kong
- empty datetime throws a validation error
- malformed datetime throws a validation error

Example test skeleton:

```ts
import { expect, test } from "vitest";
import { buildCalendarContext } from "../../core/calendar/buildCalendarContext";

test("builds Beijing-time calendar context", () => {
  const result = buildCalendarContext("2026-03-23T10:30");
  expect(result.timezone).toBe("Asia/Shanghai");
  expect(result.dayGanzhi.length).toBeGreaterThan(1);
  expect(result.dayXunKong.length).toBeGreaterThan(0);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/tests/calendar/buildCalendarContext.test.ts`
Expected: FAIL because the calendar conversion functions do not exist

- [ ] **Step 3: Implement the minimal calendar context**

Code requirements:

```ts
export interface CalendarContext {
  inputDateTime: string;
  timezone: "Asia/Shanghai";
  solarDate: string;
  lunarDate: string;
  monthBranch: string;
  dayGanzhi: string;
  dayXun: string;
  dayXunKong: string;
}
```

Behavior requirements:

- parse browser input in local `YYYY-MM-DDTHH:mm` format as Beijing time
- validate that the input is present and parseable
- use the calendar library to compute lunar date, month branch, day ganzhi, day xun, and xun kong
- throw explicit errors on invalid input

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- src/tests/calendar/buildCalendarContext.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/core/calendar/types.ts src/core/calendar/parseBeijingDateTime.ts src/core/calendar/buildCalendarContext.ts src/tests/calendar/buildCalendarContext.test.ts
git commit -m "feat: add beijing-time calendar context"
```

## Chunk 2: Add Table-Driven Formal Liuyao Rules

### Task 3: Introduce Na Jia and shi-ying rule tables

**Files:**
- Create: `src/data/zengshan/naJia.ts`
- Create: `src/data/zengshan/shiYing.ts`
- Create: `src/core/liuyao/buildNaJiaLines.ts`
- Create: `src/core/liuyao/getFormalShiYing.ts`
- Test: `src/tests/liuyao/buildNaJiaLines.test.ts`
- Test: `src/tests/liuyao/getFormalShiYing.test.ts`

- [ ] **Step 1: Write the failing Na Jia and shi-ying tests**

Required test cases:

- a fixed hexagram returns six Na Jia line entries
- every Na Jia line includes branch and element data
- shi and ying are distinct valid line positions

Example Na Jia line expectation:

```ts
expect(result[0]).toMatchObject({
  position: 1,
  branch: expect.any(String),
  element: expect.any(String)
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test -- src/tests/liuyao/buildNaJiaLines.test.ts src/tests/liuyao/getFormalShiYing.test.ts`
Expected: FAIL because the rule tables and functions do not exist

- [ ] **Step 3: Implement the minimal table-driven logic**

Behavior requirements:

- represent Na Jia using static per-trigram or per-hexagram tables in `src/data/zengshan/naJia.ts`
- compute formal shi-ying from static `增删卜易` rule data, not from the current simplified heuristic
- return explicit errors when a lookup is missing

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test -- src/tests/liuyao/buildNaJiaLines.test.ts src/tests/liuyao/getFormalShiYing.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/zengshan/naJia.ts src/data/zengshan/shiYing.ts src/core/liuyao/buildNaJiaLines.ts src/core/liuyao/getFormalShiYing.ts src/tests/liuyao/buildNaJiaLines.test.ts src/tests/liuyao/getFormalShiYing.test.ts
git commit -m "feat: add formal na jia and shi-ying rules"
```

### Task 4: Add formal six spirits and six relations

**Files:**
- Create: `src/data/zengshan/sixSpirits.ts`
- Create: `src/data/zengshan/relations.ts`
- Create: `src/core/liuyao/getFormalSixSpirits.ts`
- Create: `src/core/liuyao/getFormalSixRelations.ts`
- Test: `src/tests/liuyao/getFormalSixSpirits.test.ts`
- Test: `src/tests/liuyao/getFormalSixRelations.test.ts`

- [ ] **Step 1: Write the failing tests**

Required test cases:

- six spirits depend on day stem and return six labels in order
- six relations depend on Na Jia line elements and palace/self element
- both functions throw when a lookup table is incomplete

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test -- src/tests/liuyao/getFormalSixSpirits.test.ts src/tests/liuyao/getFormalSixRelations.test.ts`
Expected: FAIL because formal spirit and relation modules do not exist

- [ ] **Step 3: Implement the minimal formal logic**

Behavior requirements:

- derive six-spirit start order from day stem, not from a fixed sequence
- derive six relations from formal Na Jia line elements
- keep the implementation table-driven and pure

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test -- src/tests/liuyao/getFormalSixSpirits.test.ts src/tests/liuyao/getFormalSixRelations.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/zengshan/sixSpirits.ts src/data/zengshan/relations.ts src/core/liuyao/getFormalSixSpirits.ts src/core/liuyao/getFormalSixRelations.ts src/tests/liuyao/getFormalSixSpirits.test.ts src/tests/liuyao/getFormalSixRelations.test.ts
git commit -m "feat: add formal six spirits and relations"
```

### Task 5: Add hidden spirit output

**Files:**
- Create: `src/data/zengshan/fuShen.ts`
- Create: `src/core/liuyao/buildHiddenLines.ts`
- Test: `src/tests/liuyao/buildHiddenLines.test.ts`

- [ ] **Step 1: Write the failing hidden-line tests**

Required test cases:

- a hexagram that needs hidden lines returns at least one hidden line
- returned hidden line data includes source position, branch, relation, and label

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/tests/liuyao/buildHiddenLines.test.ts`
Expected: FAIL because hidden-line logic does not exist

- [ ] **Step 3: Implement the minimal hidden-line builder**

Behavior requirements:

- use static hidden-spirit mappings from `src/data/zengshan/fuShen.ts`
- return an empty array when a chart does not expose hidden lines
- keep hidden-line output separate from the six main lines

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- src/tests/liuyao/buildHiddenLines.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/zengshan/fuShen.ts src/core/liuyao/buildHiddenLines.ts src/tests/liuyao/buildHiddenLines.test.ts
git commit -m "feat: add hidden line output"
```

## Chunk 3: Rebuild The Chart Result As A Formal Chart

### Task 6: Expand chart result types and formatter output

**Files:**
- Modify: `src/types/chartResult.ts`
- Modify: `src/types/hexagram.ts`
- Create: `src/core/liuyao/index.ts`
- Modify: `src/core/formatter/formatChartResult.ts`
- Modify: `src/core/index.ts`
- Test: `src/tests/formatter/formalChartResult.test.ts`

- [ ] **Step 1: Write the failing formal formatter test**

Required assertions:

- formatted result includes `calendar`, `monthBranch`, `dayGanzhi`, and `dayXunKong`
- each main line includes Na Jia, relation, spirit, and shi-ying markers
- hidden lines are present as a separate array

Example expectation:

```ts
expect(result.calendar.timezone).toBe("Asia/Shanghai");
expect(result.lines[0].branch).toBeTruthy();
expect(result.hiddenLines).toBeDefined();
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/tests/formatter/formalChartResult.test.ts`
Expected: FAIL because the formatter still returns the lightweight chart shape

- [ ] **Step 3: Implement the formal formatter**

Behavior requirements:

- accept both six throw values and calendar input
- build calendar context first
- build original and changed hexagrams
- derive Na Jia, six relations, six spirits, shi-ying, and hidden lines
- return one serializable formal chart object

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- src/tests/formatter/formalChartResult.test.ts`
Expected: PASS

- [ ] **Step 5: Run the focused formal-rule suite**

Run: `pnpm test -- src/tests/calendar src/tests/liuyao src/tests/formatter`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/types/chartResult.ts src/types/hexagram.ts src/core/liuyao/index.ts src/core/formatter/formatChartResult.ts src/core/index.ts src/tests/formatter/formalChartResult.test.ts
git commit -m "feat: format formal liuyao chart results"
```

### Task 7: Add auditable full-chart fixtures

**Files:**
- Create: `src/tests/fixtures/formal-chart-cases.ts`
- Modify: `src/tests/formatter/formalChartResult.test.ts`

- [ ] **Step 1: Write fixture-driven failing assertions**

Fixture requirements:

- at least two fixed chart cases
- each case includes input datetime, throws, and expected key output fields
- expected fields should include month branch, day ganzhi, xun kong, shi-ying, and one or more Na Jia line values

- [ ] **Step 2: Run test to verify a fixture mismatch fails**

Run: `pnpm test -- src/tests/formatter/formalChartResult.test.ts`
Expected: FAIL if the fixture expectations are intentionally stricter than the current formatter output

- [ ] **Step 3: Align the formatter and fixture shape**

Implementation notes:

- prefer explicit expectations over opaque snapshots
- keep fixture data readable enough for manual review

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- src/tests/formatter/formalChartResult.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/tests/fixtures/formal-chart-cases.ts src/tests/formatter/formalChartResult.test.ts
git commit -m "test: add formal chart regression fixtures"
```

## Chunk 4: Update The User Flow And Presentation

### Task 8: Add datetime input to the cast flow

**Files:**
- Modify: `src/components/cast/CastForm.tsx`
- Modify: `src/pages/CastPage.tsx`
- Modify: `src/tests/pages/cast-flow.test.tsx`

- [ ] **Step 1: Extend the failing page-flow test**

Required test cases:

- submit without datetime shows a validation message
- submit with datetime and six throws reaches the result page

Example interaction:

```tsx
await user.type(screen.getByLabelText(/起卦时间/i), "2026-03-23T10:30");
await user.click(screen.getByRole("button", { name: /开始排盘/i }));
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/tests/pages/cast-flow.test.tsx`
Expected: FAIL because datetime input is not yet required

- [ ] **Step 3: Implement the minimal form changes**

Behavior requirements:

- add a `datetime-local` input
- label it clearly as Beijing-time chart input
- block submission when datetime is missing
- pass datetime into the formal chart formatter

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- src/tests/pages/cast-flow.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/cast/CastForm.tsx src/pages/CastPage.tsx src/tests/pages/cast-flow.test.tsx
git commit -m "feat: add beijing datetime input to cast flow"
```

### Task 9: Present formal chart information on the result page

**Files:**
- Modify: `src/pages/ResultPage.tsx`
- Modify: `src/components/result/ResultSummary.tsx`
- Modify: `src/components/result/LineTable.tsx`
- Modify: `src/tests/pages/cast-flow.test.tsx`

- [ ] **Step 1: Add failing UI assertions**

Required test cases:

- result page shows month branch, day ganzhi, and xun kong
- line table shows branch / Na Jia information
- hidden lines render in a dedicated section when present

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/tests/pages/cast-flow.test.tsx`
Expected: FAIL because the current result page only renders the lightweight chart

- [ ] **Step 3: Implement the minimal formal result presentation**

Behavior requirements:

- add a time-info summary block
- add Na Jia and branch columns to the line table
- add a separate hidden-line area
- keep the missing-result recovery state intact

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- src/tests/pages/cast-flow.test.tsx`
Expected: PASS

- [ ] **Step 5: Run all tests and build**

Run: `pnpm test`
Expected: PASS

Run: `pnpm build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/pages/ResultPage.tsx src/components/result/ResultSummary.tsx src/components/result/LineTable.tsx src/tests/pages/cast-flow.test.tsx
git commit -m "feat: present formal chart information"
```

## Chunk 5: Final Verification And Delivery

### Task 10: Verify the complete formal-chart baseline

**Files:**
- Modify: none

- [ ] **Step 1: Run the full verification suite**

Run: `pnpm test`
Expected: PASS with all formal-chart and page-flow tests green

Run: `pnpm build`
Expected: PASS with a production bundle emitted to `dist`

- [ ] **Step 2: Check repository status**

Run: `git status --short --branch`
Expected: clean working tree on the current branch

- [ ] **Step 3: Review recent commits**

Run: `git log --oneline --decorate -8`
Expected: recent commits correspond to the task breakdown above

- [ ] **Step 4: Perform a manual smoke check**

Run: `pnpm dev`
Expected: the cast page accepts Beijing datetime input, and the result page shows time context plus formal chart fields

- [ ] **Step 5: Close out with verification evidence**

Use `@superpowers:verification-before-completion` before claiming the formal chart feature is complete.

## Notes For Execution

- Use `@superpowers:test-driven-development` for every behavior change in this plan. If a test did not fail first, the implementation step is invalid.
- Do not keep the current simplified six-relations, six-spirits, or shi-ying logic in parallel once the formal modules are ready. Replace callers with the formal path.
- Prefer explicit regression fixtures over broad snapshots; the goal is to make rule output reviewable by a human who knows `增删卜易`.
- Keep all datetime logic in Beijing time. Do not add user-selectable timezones in this plan.
- If the formal Na Jia or hidden-line tables prove ambiguous, stop and record the ambiguity in the plan execution notes instead of silently inventing a rule.

Plan complete and saved to `docs/superpowers/plans/2026-03-23-liuyao-formal-chart-implementation-plan.md`. Ready to execute?
