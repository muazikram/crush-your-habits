# Assessment Answers

## 1. How to run
1. Clone or download the repository.
2. Run `npm install` to install the dependencies.
3. Run `npm run dev` to start the Vite development server.
4. Open the provided `localhost` link in your browser.

## 2. Stack & design choices
**Frontend Stack:** React + Vite + TailwindCSS + Framer Motion. 
I chose React for its component-driven state management (perfect for tracking individual habit completions) and Vite for its incredibly fast build times. TailwindCSS was used to keep styling self-contained within components without managing separate CSS files, and Framer Motion was essential for adding playful, physical feedback (like the checkmark stamp and card pop-ins).

**Design Decision 1: Monday Start vs. Sunday Start**
The tracker uses a Monday start (`dayjs().startOf('isoWeek')`). I chose this because a habit tracker is fundamentally a productivity tool. Aligning the visual week with the standard ISO workweek allows users to mentally compartmentalize "weekday habits" vs. "weekend habits" together at the end of the grid, rather than splitting the weekend across the edges.

**Design Decision 2: Streak Behavior & Danger States**
My streak counter counts up to *yesterday* if today is currently unchecked, and places the badge in a red "Danger" state (`!todayDone && count > 0`). I designed it this way to be forgiving but urgent. If you haven't checked off your habit by 2 PM, you shouldn't feel like you've already lost your streak. Instead, the danger state acts as a persistent warning that action is required before midnight to keep it alive.

**Design Decision 3: The Playing Card Grid**
I allocated `1.5fr` for the habit name column and `1fr` for the 7 day columns. This ensures long habit names aren't severely truncated while keeping the "playing card" day toggles perfectly square and rhythmically spaced.

## 3. Responsive & accessibility
**Responsive Design:** On a 1440px laptop, the app uses `WeekGrid.jsx` to display a data-dense, horizontal row-by-row grid. However, grids do not scale well down to a 360px phone screen without forcing horizontal scrolling. To solve this, the app uses a CSS breakpoint (`sm:hidden` / `hidden sm:block`) to swap the UI entirely. On mobile, it uses `MobileHabitCard.jsx`, which stacks the habits into individual cards with the 7 days wrapped inside them.

**Accessibility Handled:** Keyboard navigation is fully supported for data entry. The `AddHabitInput` and `HabitRow` edit modes capture the `Enter` key to save and the `Escape` key to cancel, preventing the user from needing to reach for the mouse to manage habit names.

**Accessibility Skipped:** I knowingly skipped adding robust ARIA labels and `aria-pressed` states to the playing card toggle buttons. Currently, the app relies heavily on visual color changes (turning orange with a checkmark) to indicate a completed state. To make it truly accessible for screen readers, I would need to add screen-reader-only text inside the buttons so visually impaired users know exactly which day they are toggling.

## 4. AI usage
I utilized an AI assistant during development and at the final stages of the project for code generation, review and assessment compliance validation.
* **Prompt:** I uploaded my codebase along with the assessment requirements and asked the AI to verify if the final project fulfilled all the requirements. 
* **What it gave me:** The AI pointed out that while my technical and design execution was complete, I had missed the documentation requirements (`ANSWERS.md` and `README.md`). 
* **What I changed:** Before reviewing the assessment requirements, I asked the AI for advice on readability. It provided a list of specific Tailwind classes to change (e.g., `text-[7px]` to `text-sm`) because the text was very small. I evaluated the changes but explicitly decided to ignore the AI's output and keep the original hardcoded pixel sizes because I felt that increasing the text size compromised the dense, playing-card aesthetic of the UI.

## 5. An honest gap
The biggest gap is the data architecture. Relying entirely on `localStorage` means the user's data is tied to a single browser on a single device. If they clear their cache, the data is gone forever. For a production-ready application, I would need to implement a backend to authenticate users and sync their habit completions across devices. Additionally, the "future dates" are currently just visually disabled; a malicious user could manipulate the DOM to check off future dates, which real backend validation would prevent.