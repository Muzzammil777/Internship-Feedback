# Design System Specification: The Fluid Academic

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Curator"**
This design system rejects the "SaaS-in-a-box" aesthetic. For an Internship Feedback Management System, the interface must feel authoritative yet encouraging—like a high-end editorial journal mixed with a precision instrument. 

We break the "template" look through **Intentional Asymmetry** and **Tonal Depth**. Instead of rigid, boxed-in grids, we use breathing room as a functional element. Elements should feel like they are floating on a curated canvas, using overlapping layers and varying typographic scales to guide the eye, rather than forced structural lines.

---

## 2. Colors & Surface Architecture
The color palette is built on the tension between the intellectual depth of Indigo (`primary`) and the energetic clarity of Teal (`secondary`).

### The "No-Line" Rule
**Explicit Instruction:** Traditional 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined solely through background color shifts. Use `surface-container-low` for large section backgrounds and `surface-container-lowest` for the "active" content area to create a natural, borderless transition.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. We use Material-style tiers to define depth:
- **Base Layer:** `surface` (#fcf8ff) - The ultimate background.
- **Sectioning Layer:** `surface-container-low` (#f5f2ff) - Used for sidebar backgrounds or secondary content zones.
- **Content Layer:** `surface-container-lowest` (#ffffff) - Used for cards and primary data containers.
- **Interaction Layer:** `surface-container-high` (#eae6f4) - For hovered states or nested metadata.

### The "Glass & Gradient" Rule
To add "soul" to the SaaS experience:
- **Hero CTAs:** Use a subtle linear gradient from `primary` (#3525cd) to `primary_container` (#4f46e5) at a 135-degree angle.
- **Floating Elements:** Use Glassmorphism for top headers and floating action panels. Apply a `surface` color at 80% opacity with a `24px` backdrop-blur.

---

### 3. Typography: The Editorial Voice
We utilize a dual-font strategy to balance character with readability.

*   **Display & Headlines (Manrope):** These are our "Editorial" anchors. Use `display-lg` and `headline-md` with tight letter-spacing (-0.02em) to create an authoritative, modern feel for dashboard stats and page titles.
*   **Body & Labels (Inter):** Our "Functional" workhorse. Inter provides maximum legibility for feedback forms and data tables. 

**Hierarchy Note:** Always pair a `display-sm` (Manrope) metric with a `label-md` (Inter) description in Uppercase with +0.05em tracking to create a premium, high-contrast information hierarchy.

---

## 4. Elevation & Depth
Depth is a feeling, not a drop-shadow.

*   **The Layering Principle:** Avoid shadows on standard cards. Place a `surface-container-lowest` card on a `surface-container-low` background. The slight shift from #ffffff to #f5f2ff provides all the "lift" required.
*   **Ambient Shadows:** When an element must "float" (e.g., a modal or a primary dropdown), use an extra-diffused shadow: `0px 20px 40px rgba(53, 37, 205, 0.06)`. Note the tint—we use a 6% opacity of our `primary` color, never pure black.
*   **The Ghost Border:** If accessibility requires a stroke (e.g., in high-contrast needs), use `outline-variant` at 15% opacity. It should be felt, not seen.

---

## 5. Components & Interaction Patterns

### Sidebar Navigation
- **Architecture:** Use `surface-container-low` as the background. 
- **Active State:** No "pill" background. Instead, use a `primary` 4px vertical "tick" with rounded ends (`full`) on the left and transition the text to `on-surface` Bold.
- **Spacing:** Generous vertical padding (12px) between nav items to emphasize the "Spacious" requirement.

### Stats Cards
- **Construction:** Use `xl` (1.5rem / 24px) corner radius.
- **Styling:** Forbid dividers. Use a `secondary_fixed` (#71f8e4) soft glow (15% opacity) in the top right corner of the card to highlight positive growth metrics.

### Data Tables (The "Curated List")
- **The Rule:** Forbid row lines. 
- **Structure:** Use `surface-container-lowest` for the table container. Rows should have a 4px gap between them. On hover, the row background shifts to `surface-container-low` and the corner radius animates to `md` (12px).
- **Typography:** Table headers use `label-sm` in `outline` (#777587).

### Interactive Form Elements
- **Inputs:** `md` (12px) corners. Background is `surface-container-lowest`. When focused, the "Ghost Border" transitions to a 2px `primary` glow with a 4px spread of 10% opacity `primary`.
- **Primary Buttons:** Use the `xl` (1.5rem) radius. Background: `primary_container`. Text: `on_primary`. 

### Specialized Component: The Feedback Ribbon
- A custom component for internship reviews. A horizontal "progress" track using a gradient from `secondary` (#006b5f) to `primary` (#3525cd), indicating the transition from "Initial Learning" to "Expertise."

---

## 6. Do’s and Don’ts

### Do
*   **Do** use `xl` (24px) rounding for large containers and `md` (12px) for internal elements like buttons and inputs.
*   **Do** use `tertiary` (#7e3000) sparingly for "Warning" or "Needs Attention" feedback states—it provides a sophisticated alternative to "Standard Orange."
*   **Do** prioritize whitespace over lines. If the layout feels "loose," increase the font-weight of the labels rather than adding a border.

### Don't
*   **Don't** use 100% black text. Always use `on-surface` (#1b1b24) to maintain the soft, premium feel.
*   **Don't** use standard "Select" dropdowns. Create custom "Glass" overlays that blur the content beneath them.
*   **Don't** crowd the Stats Cards. Each card should focus on one primary metric (`display-sm`) and one supporting trend (`body-sm`).