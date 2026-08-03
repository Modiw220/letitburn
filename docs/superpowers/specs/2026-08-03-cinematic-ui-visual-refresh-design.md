# Let It Burn Cinematic UI Visual Refresh Design

Date: 2026-08-03
Status: Approved design, awaiting user review of written spec
Owner: Codex

## Objective

Evolve Let It Burn's existing dark, quiet, privacy-led identity into a more cinematic and emotionally expressive interface without changing route names, core feature flows, or the product's non-coercive tone.

This pass is dark-mode-first. Light mode remains supported but intentionally simpler. The redesign should make immersive pages feel atmospheric, discovery pages feel editorial and scan-friendly, and trust pages feel calmer and easier to read.

## Design Goals

1. Increase visual personality through typography, contrast, and page-specific surfaces rather than a full rebrand.
2. Reduce layout sameness across routes by strengthening the difference between immersive, discovery, and editorial page archetypes.
3. Improve readability and section hierarchy so pages stop feeling like one long stack of similar translucent cards.
4. Preserve accessibility, privacy signaling, and reduced-motion behavior.
5. Keep the emotional tone gentle and cinematic, not aggressive or gamified.

## Constraints

1. Existing route names and core tool flows remain unchanged.
2. Existing palette direction stays recognizable: orange as emotional lead, cyan as reassurance/support, purple as restrained atmospheric accent.
3. No backend or payment-flow redesign is included unless a UI issue requires a very small interface adjustment.
4. Existing privacy-first messaging stays, but repeated reassurance blocks should be consolidated.
5. `/contact` and `/safety-resources` remain valid destinations.

## Recommended Approach

Use a hybrid cinematic system:

1. Rebuild the font hierarchy and visual rhythm first.
2. Add selective atmosphere to hero areas, tool surfaces, and trust moments.
3. Keep dense content and long-form reading areas quieter than the immersive pages.

This is preferred over a type-only refresh because the current weakness is not just typography; it is the repeated visual rhythm across pages. It is preferred over a pure effects pass because atmosphere alone would increase noise without fixing information hierarchy.

## Page Archetypes

### 1. Immersive tool pages

Routes:

- `/burn-thoughts`
- `/relaxing-drawing`
- `/sounds`
- individual quiz flow pages

Design behavior:

- Strongest atmosphere and page-specific background treatment
- Fewer but more intentional surfaces
- Tighter relationship between intro, workspace, controls, and reassurance
- Visual focus on one primary action or state at a time

### 2. Discovery/catalog pages

Routes:

- `/`
- `/quizzes`
- `/pricing`

Design behavior:

- Strong hero identity, then faster scanability below the fold
- Editorial section intros instead of utility-panel repetition
- Card systems that vary by content importance
- One clearer “start here” path per page where appropriate

### 3. Editorial/trust pages

Routes:

- `/about`
- `/privacy`
- `/support`
- `/contact`
- `/safety-resources`

Design behavior:

- Quieter surfaces and stronger typography hierarchy
- More readable first two screens
- Fewer competing side widgets or stacked support boxes
- Emotional warmth without theatrical effects

## Visual System

### Typography

Introduce a three-tier type system:

1. Display face for logo, hero lines, major section headings, and select editorial anchors.
2. Interface/body face for navigation, labels, cards, controls, and dense reading.
3. Accent face for emotionally expressive moments such as handwritten notes, pull quotes, micro-reassurance, and ritual-like labels.

Recommended direction:

- Display: an expressive serif with cinematic character such as `Cormorant Garamond`
- Interface/body: a clean modern sans such as `Manrope`
- Accent: keep a handwritten voice for selective emotional moments only

Usage rules:

1. Expressive typography should appear in logo, hero lines, section headings, pull quotes, trust strips, and key callouts.
2. Body copy, controls, tables, and legal content should stay highly readable and restrained.
3. Accent font use must remain sparse so it feels intentional rather than decorative noise.

### Color and Contrast

Dark mode is the visual reference mode.

System rules:

1. Deepen the background into clearer tonal layers rather than one generic navy field.
2. Use orange as the primary emotional heat.
3. Use cyan for privacy, calm, reassurance, and focus states.
4. Use purple sparingly for atmospheric support, not as a constant active accent.
5. Increase contrast between background, elevated surface, and interactive surface so cards stop blending together.

### Surface Taxonomy

Replace the current “nearly everything is a translucent rounded card” pattern with a small set of explicit surface roles:

1. `hero-stage`: cinematic background and light treatment for major page intros
2. `editorial-panel`: quieter content container for long-form sections
3. `tool-stage`: high-focus functional surface for workspaces and players
4. `trust-strip`: narrow reassurance surface for privacy, safety, or support cues
5. `ritual-surface`: tactile or metaphorical treatment such as paper, ember, or waveform context

Each page should use only the surfaces it needs. Repetition of the same panel shell should be reduced.

### Spacing and Rhythm

Adopt clearer spacing tiers:

1. Hero spacing
2. Primary functional section spacing
3. Secondary reassurance spacing
4. Editorial reading spacing

Rules:

1. Tool pages should feel more vertically continuous and less section-stacked.
2. Discovery pages should move more quickly into action after the hero.
3. Trust pages should reduce decorative padding and emphasize reading flow.

### Motion

Motion stays supportive, not ornamental.

Allowed motion:

- hero atmosphere
- ambient particles or glows
- state transitions for burn, drawing, or player contexts
- subtle hover lift on desktop

Rules:

1. Reduced-motion support remains first-class.
2. Motion should clarify state changes, not exist for its own sake.
3. Trust and legal pages should use very restrained animation.

## Shared Layout Changes

### Header

1. Make the brand block feel more premium through improved type, spacing, and icon framing.
2. Reduce the visual prominence of the theme control relative to the main navigation.
3. Improve menu-state clarity on mobile through stronger open/close feedback and better overlay hierarchy.
4. Keep the header compact enough that the hero still owns the first screen.

### Footer

1. Tighten density and reduce visual sprawl.
2. Group links by intent: tools, trust, support.
3. Preserve valid links only.
4. Carry the quieter editorial tone instead of repeating full-width stacked CTA behavior.

### Shared Primitives

Refine and extend the existing primitives for:

1. page hero variants
2. section intro blocks
3. privacy or trust strips
4. support callout panels
5. dense-content navigation for long pages

These primitives should encode the new surface taxonomy and spacing rules so the page-level redesign is consistent.

## Route-by-Route Design

### Home

Keep the hero image and core messaging. Improve the transition below the hero by making the tools section feel like an intentional continuation rather than a separate card block. The tool grid should feel more editorial and curated, with clearer visual distinction between featured and secondary options if needed.

The support block should become a quieter emotional checkpoint rather than a competing CTA section. The trust area should compress into a calmer reassurance strip with one strong safety action and fewer equal-weight items. Typography should do more of the work here: bigger emotional hero language, cleaner mid-page section intros, and lighter metadata.

### Burn Thoughts

This page should feel like a guided ritual. The writing paper, action controls, and privacy reassurance must feel visually connected as one stage. The header state should become more atmospheric and less detached from the note surface. The writing, confirming, burning, breathing, and completion phases should have clearer stage transitions through spacing, surface treatment, and visual emphasis.

The footer-like safety message should be integrated into the active layout as a trust strip so it no longer feels appended.

### Relaxing Drawing

This page needs clearer zoning: intro, mode choice, workspace, tools, support, and future upgrades. The canvas area should read as the primary stage. Toolbar and color controls should feel more tactile and better grouped, especially on mobile.

Upsell or “coming later” content should be quieter and deferred so it stops interrupting the creative flow. The overall page should feel more studio-like than dashboard-like.

### Sounds

The default state before a sound is chosen should feel alive and atmospheric rather than empty. The featured player should feel like a stage, not just a card. Free sounds, premium previews, support, and privacy should each have clearer roles so the page reads in distinct beats instead of one long sequence.

The persistent mini-player remains, but the surrounding chrome becomes cleaner and more deliberate.

### Quizzes Index

This page should scan faster. The filter/search zone should feel editorial and compact rather than heavy. Quiz cards should tighten metadata, reduce sameness, and support a clearer featured “start here” path. Repeated reassurance or disclaimer blocks should be merged or removed.

### Individual Quiz Page

The opening state should become a more complete onboarding section with clearer expectations, time estimate, privacy reassurance, and a stronger start action. Empty space should feel earned through a better composition rather than unfinished.

Once the quiz begins, the interface should remain distraction-light and focused.

### About

This page should read like a paced editorial story. Combine overlapping sections, reduce repeated card shells, and emphasize three anchor ideas: what the product is, what it is not, and why privacy shapes the design. Typography, pull quotes, and content pacing should carry more of the tone than generic panels.

### Pricing

Shorten decision time. Lead with free core versus optional upgrades before the broader catalog. Reduce visual sameness across upgrade cards and comparison areas. Future bundles or roadmap content should stay secondary.

The ethical tone remains, but the first answer for a new visitor should appear faster.

### Privacy

Keep the table-of-contents and accordion approach, but simplify the top stack and reduce support-widget competition. The first screens should feel readable and calm before the full policy detail begins. Configuration warnings must stay state-aware and visually subordinate in production-facing layouts.

### Support

Support should remain warm and non-coercive, but the donation decision should arrive earlier. The pre-donation narrative gets shorter. “Other ways to help” should feel like real alternatives with enough visual presence to be credible, while still staying secondary to the donation flow.

### Contact and Safety Resources

These pages should match the quieter trust-page archetype. They do not need heavy atmosphere, but they should still inherit the new typography and surface system so they feel like first-class destinations.

## Component and Data-Flow Impact

This redesign is primarily presentation-layer work. Expected impact areas:

1. `src/index.css` theme tokens, font imports, motion guards, and shared utility classes
2. shared layout components such as header, footer, logo, and mobile menu
3. shared content primitives such as section intros, support callouts, and page-hero variants
4. page components for route-level composition and spacing changes
5. selected feature components where the workspace or player surface must change visually

No data model changes are required. Existing props and route flow should remain stable where possible. New visual variants should be introduced through presentational props or utility classes rather than deeper behavioral rewrites.

## Accessibility and Error Handling

Accessibility requirements:

1. Maintain keyboard access for menu, accordions, drawing controls, sound controls, and quiz flow.
2. Preserve or improve focus visibility under the darker, higher-contrast visual system.
3. Avoid using expressive typography in dense content where legibility drops.
4. Preserve reduced-motion alternatives for animated heroes and tool states.

Error and fallback requirements:

1. Remote font loading should fail gracefully to defined fallback stacks.
2. Hero media or decorative states must degrade cleanly without breaking core content.
3. Atmosphere must never obscure actionable controls, support links, or legal text.

## Testing Strategy

### Functional checks

1. Route audit across header, footer, and in-page CTAs
2. Header/mobile menu keyboard and focus checks
3. Quiz flow, drawing tools, and sound controls regression checks

### Visual checks

1. Desktop and mobile QA for `/`, `/burn-thoughts`, `/relaxing-drawing`, `/sounds`, `/quizzes`, `/quizzes/emotional-wellbeing-check-in`, `/about`, `/pricing`, `/privacy`, `/support`, `/contact`, and `/safety-resources`
2. Dark-mode-first review across all shared surfaces and hero states
3. Light-mode sanity review for readability and structure
4. Reduced-motion review for all animated hero or immersive states

### Content-density checks

1. Remove repeated disclaimers or duplicate reassurance stacks
2. Avoid stacked secondary CTAs competing in the same screen area
3. Ensure editorial pages do not revert to repeated equal-weight card blocks

## Delivery Order

1. Global tokens, fonts, surface taxonomy, header/footer, shared primitives
2. Home and immersive pages
3. Discovery pages
4. Editorial and trust pages
5. QA, polish, and regression review

## Out of Scope

1. Rebranding the product name or route vocabulary
2. Rewriting core flows or backend logic
3. Payment architecture changes
4. New product features unrelated to the visual refresh

## Success Criteria

1. The site feels more cinematic and emotionally expressive in dark mode without sacrificing clarity.
2. Page archetypes feel intentionally different rather than visually recycled.
3. Typography carries more of the brand identity.
4. Trust and privacy messaging feel integrated rather than repeatedly stacked.
5. The first screen of each major route communicates a stronger, clearer purpose.
