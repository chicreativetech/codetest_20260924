
# CLAUDE.md
Project guidelines for Claude. Follow these conventions for all code written in this repository.
 
follow the Assesment-Readme.md for basic spec and the following preferences on top of this.
---
 
## Visuals
 
- **Component library:** Use base [Material UI (MUI)](https://mui.com/) for all UI components (cards, buttons, inputs, layout, etc.).
- **Precision:** Everything must be aligned and implemented to perfection — consistent spacing, alignment, and sizing throughout.
- **Typography:** Use the Google Font [Inter](https://fonts.google.com/specimen/Inter) for a clean, Helvetica-like look. Configure it as the default font in the MUI theme.
- **Icons:** Use [Material Icons](https://mui.com/material-ui/material-icons/) via `@mui/icons-material`.
---
 
## Styling
 
- Use **Sass (SCSS)** for styling.
---
 
## Formatting
 
Use **Prettier**. The project's `.prettierrc.yaml` must contain:
 
```yaml
trailingComma: 'none'
semi: true
singleQuote: true
jsxSingleQuote: true
printWidth: 120
tabWidth: 2
```
 
---
 
## Code Principles
 
### General
 
- Write **modern React** and **TypeScript**.
- Follow **clean code** principles.
- Keep methods **short** and focused on a single responsibility.
- Every file should be **simple and readable** for a human.
### Folder Structure
 
- Components that represent a whole page (e.g. `Dashboard`) go in `src/pages/`.
- Reusable UI components go in `src/components/`.
### State and Logic
 
- Extract logic into **custom hooks** instead of stacking many `useState` and `useEffect` calls in a component.
- If state management in a single file becomes messy, use **`useReducer`** instead.
### Async and Data Fetching
 
- Prefer **`async/await`** for readability.
- Use **Promises** directly only when necessary (e.g. `Promise.all`).
 