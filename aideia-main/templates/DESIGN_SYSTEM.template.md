# Design system

This file records the target project's reusable visual grammar. Keep it concrete and implementation-oriented.

## Tokens

### Color roles
- bg:
- surface:
- surface-raised:
- text:
- text-muted:
- border:
- accent:
- accent-contrast:
- success:
- warning:
- danger:

Prefer semantic roles over appearance-only names at usage sites.

### Typography
- display:
- h1:
- h2:
- h3:
- body:
- small:
- label:
- data/mono:

Document family, weight, size, line-height and tracking where they matter.

### Spacing
Base scale: [define]
Density exceptions: [define]

### Radius
- control:
- surface:
- modal:
- chip/pill:

### Borders
[width/contrast/rules]

### Elevation
[level definitions or "none by default"]

### Motion
- quick:
- standard:
- expressive:
- easing/spring:

## Canonical primitives

List component paths:
- Button:
- Input:
- Select:
- Dialog:
- Tooltip:
- Tabs:
- Card/surface:
- Table:
- Toast:
- Empty state:

Agents should extend these before creating equivalents.

## States
Document canonical hover, focus-visible, active, disabled, loading, error, success and selected states.

## Icons
Primary library/style: [define]
Sizing rules: [define]

## Responsive system
Breakpoints: [project-specific]
Mobile behavior principles: [define]

## Content density
Tables/lists: [define]
Forms: [define]
Application chrome: [define]

## Exceptions
Record intentional exceptions here instead of scattering unexplained one-off CSS throughout the codebase.
