# Notes

The app lives in `task-dashboard/`. Run it with `npm install && npm start`; run the tests with `npm test`.

## Trade-offs and decisions

I used Vite instead of Create React App because CRA is deprecated. npm start still works, but it just starts the Vite development server.

For loading tasks, I created a custom useTasks hook as requested in the specification instead of using React Query. It includes some basic caching and makes sure old requests don't overwrite newer data. In a real production project, I would probably use React Query for this instead.

The filters are handled with useReducer and React Context. I split the filter values and filter actions into two separate contexts. This helps avoid unnecessary re-renders in components that only need to update the filters.

For larger task lists, I use lazy loading with IntersectionObserver, loading 50 tasks at a time as the user scrolls. I chose this because the cards can have different heights and it still keeps normal browser scrolling. For very large lists, like 10,000+ tasks, I would only render what's visible on screen and move pagination and filtering to the server.


## Use of AI

After some consideration I decided to go with an agentic workflow for this assignment. I believe this is the way we are coding going forward, even if coding manually is something I appreciate a lot (just been doing it for 30 years or so =D). I used my coding and react experience to monitorize and correct the code when needed and to make sure it followed my style of coding. The benefit with using AI is shown really well in "Task 6 - Testing" when starting to write that task the AI had already been written 17 tests in 6 files. The dashboard test `src/pages/Dashboard/Dashboard.test.tsx` is choosen as the headline test for Task 6.

**Tool:** Claude Code (Claude Opus), run in this repository.

**Prompt and spec files:**

- [`Assesment-Readme.md`](Assesment-Readme.md): the assessment spec, used as-is.
- [`claude.md`](claude.md): my own project rules, loaded automatically in every session. They cover MUI with the Inter font, SCSS, the Prettier config, the folder structure (`pages/` and `components/`), custom hooks, `useReducer` for complex state and `async/await`.
- The prompts were short and went one task at a time, e.g. _"go ahead with task 4 in the assesment readme"_.

**Review mechanism:**

1. **One task per iteration.** Each task was implemented, reviewed and committed on its own (see the git history), so every diff stayed small enough to read in full. I find that working in small chunks is benefitial when working with Agents.
2. **Automated checks after every change:** `tsc -b` (strict, no `any`), `oxlint`, `prettier --check` and `vitest`. The AI had to fix any failure before handing the work back. For example, a failing test caught a stale-closure bug in the lazy-rendering hook.
3. **Visual verification:** UI changes were checked in a real browser by taking Playwright screenshots of the running app, such as the empty state and the error snackbar (produced by making the mock API fail temporarily), against the precision rules in `claude.md`.
4. **Human review:** I read each diff before committing and asked for changes where needed.

**Why this solution:** It sticks to what the spec asks for (a custom hook, Context, `React.memo`, `React.lazy`, an Error Boundary, React Testing Library) instead of reaching for libraries that would hide those concepts. Each concern has its own small file (reducer, cache, hook, component), which keeps files short and readable. I only added dependencies I can justify: MUI, Sass and Inter were my style requirements, and Vitest replaces Jest because the project runs on Vite.
