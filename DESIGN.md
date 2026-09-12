# Grundform — design guide

A visual identity for mobile apps built from three shapes, three hues, one geometric typeface and a black rule. Derived from Bauhaus exhibition posters (1919–1923), Kandinsky's form–colour correspondence, and the black-grid structure of De Stijl.

Tokens live in `tokens/tokens.json`; the rendered guide is at https://grundform.pages.dev. Everything in this document is a rule for using them. If a rule and a token disagree, the token file is wrong — fix it and rebuild.

## Principles

1. **Shape carries meaning.** Circle, square and triangle are the icon and status vocabulary. Circle = a state or a person. Square = a thing or a place. Triangle = a signal or a warning. Colour reinforces shape; it never substitutes for it.
2. **Black rules, not shadows.** Structure is drawn with 2px lines in the ink colour. Elevation is expressed by surface tone, never by shadow or blur.
3. **Rectangles stay rectangular.** Only elements derived from the circle — avatars, FABs, toggles, pills, segmented controls — are rounded, and then fully. Inputs get 4px. Nothing else has a radius.
4. **Paper, not white.** The light canvas is warm paper (`#F3EFE7`). Pure white is reserved for raised surfaces so cards read as sheets on a page.
5. **One loud thing per screen.** A screen carries one primary-coloured block or one accent action, not both.
6. **Blue acts, red alerts.** Blue is the action colour. Red is reserved for emphasis, destructive actions and errors. Yellow warns, highlights and marks focus. Green is admitted only for success states.

## Colour

### Core hues
| Name | Hex | Use |
|---|---|---|
| Red | `#D8262C` | Accent, destructive, error, FAB |
| Red deep | `#8E1421` | Pressed red, red text on tint |
| Blue | `#1E5AA8` | Primary action, selected state |
| Blue deep | `#123C74` | Pressed blue |
| Yellow | `#F2B20A` | Warning, highlight, focus ring |
| Yellow deep | `#B77F00` | Yellow text on light surfaces |
| Black | `#000000` | Ink, rules (light); canvas (dark) |
| Paper | `#F3EFE7` | Canvas (light); ink, rules (dark) |
| Orange `#F04E23`, Cyan `#1FB6E0` | | Data-viz series only. Never UI chrome. |
| Green `#2E7D4F` | | Success only. |

### Theme roles
| Role | Light | Dark |
|---|---|---|
| bg | `#F3EFE7` | `#000000` |
| surface | `#FFFFFF` | `#1B1B1B` |
| surface-2 (inputs, chips) | `#E9E4DA` | `#2A2A2A` |
| ink | `#000000` | `#F3EFE7` |
| ink-2 (secondary text) | `#4A4741` | `#C9C3B7` |
| ink-3 (placeholders) | `#8A857C` | `#8A857C` |
| rule (2px structure) | `#000000` | `#F3EFE7` |
| hairline (1px dividers) | `#D6D0C4` | `#3A3A3A` |
| primary / on-primary | `#1E5AA8` / `#FFFFFF` | `#3E7DD1` / `#000000` |
| accent, danger / on- | `#D8262C` / `#FFFFFF` | `#E8434A` / `#000000` |
| warn / on-warn | `#F2B20A` / `#000000` | same |
| success / on-success | `#2E7D4F` / `#FFFFFF` | `#4CA36E` / `#000000` |
| focus | `#F2B20A` | `#F2B20A` |

Dark-mode primaries are lifted two steps to hold contrast on black; text-on-colour flips to black. All pairs above meet WCAG AA for body text.

### Data visualisation
Categorical order: red, blue, yellow, orange, cyan, black, grey. Sequential scales are single-hue steps (`viz.sequential-red`, `viz.sequential-blue`). Bars are square-cornered; lines are 3px with circle markers; axes are a 2px rule with hairline gridlines. ECharts themes are in `dist/`.

## Typography
One family: **Jost** (Google Fonts), fallback Futura → Century Gothic → Avenir → system sans. Weight and size do the work. No italics. No all-caps labels. No monospace for data.

| Role | Size | Weight | Line height | Tracking |
|---|---|---|---|---|
| Display | 40 | 700 | 1.05 | −0.03em |
| Title | 28 | 600 | 1.15 | −0.01em |
| Heading | 22 | 600 | 1.2 | −0.01em |
| Body | 17 | 400 | 1.5 | 0 |
| Label | 15 | 500 | 1.3 | 0 |
| Caption | 13 | 400 | 1.4 | 0 |

Line length under 70 characters. Body text on `surface-2` or tints uses `ink`, never `ink-2`.

## Shape, stroke, spacing
- **Radius:** 0 (default: cards, sheets, buttons, images, list containers) · 4 (text inputs only) · full (anything born from the circle).
- **Stroke:** 2px `rule` for structural borders (cards, tabs, bottom nav, alerts) · 1px `hairline` for row dividers inside a container · 3px `focus` outline with 2px offset · 2px icon stroke, flat caps.
- **Spacing:** 4pt scale — 4, 8, 12, 16, 24, 32, 48, 64. Screen gutter 16. Card padding 16. Section gap 24.
- **Sizes:** touch target 48 · button height 48 · FAB 56 · icon grid 24.
- **No shadows, no gradients, no blur.**

## Iconography
Build icons from the three primitives on a 24pt grid, 2px stroke, flat ends. Filled = selected, outlined = unselected. Status glyphs: circle for success/presence, square for stopped/neutral, triangle for warning. Leading list glyphs are filled primitives coloured by category.

## Components
- **Buttons.** Square-cornered, 48 tall, 2px `ink` border. Primary fills `primary`; destructive fills `danger`; secondary is outline only. Pill variant is for filters and chips, never the main call to action.
- **Tabs.** Text on a 2px rule; active tab carries a 4px `primary` underline inside the rule. No pill or segmented tabs at the top of a screen.
- **Cards.** `surface` with a 2px rule. At most one card per screen is a colour block (`primary` fill, `on-primary` text) — that card is the screen's single loud element.
- **Lists.** Rows inside a ruled container, hairline dividers, leading primitive glyph.
- **Alerts.** Full-width ruled bar, glyph leads the message. Warning inverts to yellow with black text; error and success keep the surface and colour only the glyph.
- **Toggle.** Pill track with 2px rule; circle thumb; on-state fills `primary`.
- **FAB.** Red circle, 56, bottom-right. The only red fill on a default screen.
- **Bottom nav.** 2px rule above; glyphs are primitives; active = `ink`, inactive = `ink-3`.
- **Inputs.** `surface-2` fill, 4px radius, 2px `ink` border on focus plus the yellow focus ring.

## Writing
Sentence case everywhere. Buttons name the action ("Save changes", not "Submit"). Errors say what happened and what to do next, without apology. Empty states invite an action.
