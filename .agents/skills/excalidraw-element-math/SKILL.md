---
name: excalidraw-element-math
description: >-
  Work in @excalidraw/math and @excalidraw/element when adding or changing element
  geometry, bounds, collision, transforms, linear elements, text sizing, or any
  element data shape. Use for safe mutation/versioning, branded point types,
  Scene updates, ShapeCache, new element factories, and keeping editor state
  consistent. Also use when the user names excalidraw element packages, bounds,
  hit-testing, arrow/elbow math, resize logic, or "element behavior" outside React UI.
---

# Excalidraw element and math packages

## Roles

| Package | Purpose |
| -------- | -------- |
| **@excalidraw/math** | Pure 2D geometry: points, segments, curves, angles, distances, rectangles. No element types, no React, no scene. |
| **@excalidraw/element** | Everything about **Excalidraw elements as data**: types, creation (`newElement` helpers), mutation, bounds, collision, bindings, z-order, groups, text metrics, and helpers consumed by the canvas and actions. |

The element package **depends on** math and `@excalidraw/common`. Prefer implementing reusable numeric geometry in **math** first, then wire it into **element** (bounds, collision, shape builders).

## Geometry safety (@excalidraw/math)

- **Branded coordinates** — `GlobalPoint`, `LocalPoint`, `Radians`, `Degrees`, etc. are nominal types. Use the exported constructors/helpers (`pointFrom`, `degreesToRadians`, …) instead of casting raw tuples or numbers. Mixing spaces (local vs global) causes subtle bugs in rotation and hit targets.
- **Stable, pure functions** — Math helpers should not read app state. Pass in everything they need as arguments so they stay testable from `packages/math/tests/`.
- **No DOM or React** — Do not import from `packages/excalidraw` UI layers into math.

## Element behavior safety (@excalidraw/element)

### Mutations and versioning

- **`mutateElement(element, elementsMap, updates, options?)`** — Mutates in place, bumps `version`, `versionNonce`, and `updated`, and clears **`ShapeCache`** when size/points/image change. Does **not** trigger a React re-render. Use when you already own the object and the caller will refresh UI (e.g. batch updates).
- **`newElementWith(element, updates, force?)`** — Returns a **new** element object with bumped version fields. Use for immutable update pipelines.
- **`bumpVersion(element)`** — Minimal version bump when you changed nested data the shallow compare might miss (use sparingly and deliberately).

In the full app, prefer **`scene.mutateElement(...)`** (or the imperative API equivalent) when the editor must re-render: it wraps `mutateElement` and calls `triggerUpdate()` when the version actually changes. See `Scene.ts` — comments note calling from React handlers or `unstable_batchedUpdates`.

Avoid assigning to element fields ad hoc in app code without going through one of the above; collaboration and scene hashing rely on consistent version metadata.

### Caches and derived geometry

- **`ShapeCache`** — Derived shapes for rendering and queries. If you add a code path that changes geometry without going through `mutateElement` / `newElementWith`, ensure cache invalidation stays correct (those helpers already delete the cache when width/height/points/fileId change).

### Types and guards

- Extend **`types.ts`** and **`typeChecks.ts`** together: new `type` discriminators need runtime guards (`isFooElement`) so downstream code stays narrow and safe.
- New element factories belong in **`newElement.ts`** (or a dedicated module re-exported from the package index) so defaults (`version`, `seed`, stroke props, etc.) stay consistent.

### Layering

- Some element modules reference types from the main app package for historical reasons; treat that as a **tight coupling** to avoid spreading. New code should minimize new imports from `packages/excalidraw` into `packages/element` unless you are already working in those files.

## Where to implement a change

| Goal | Likely home |
| ----- | ------------- |
| Angle, distance, intersection, polygon ops | `packages/math/src/` |
| Element bounds, hit area, resize, drag, align | `packages/element/src/` (e.g. `bounds.ts`, `resizeElements.ts`, `collision.ts`) |
| Arrow / line control points | `packages/element/src/linearElementEditor.ts`, `elbowArrow.ts`, `arrows/` |
| How it draws on canvas | Also read [excalidraw-canvas-pipeline](../excalidraw-canvas-pipeline/SKILL.md); element supplies data and `renderElement` / shape helpers |
| Toolbar, dialog, action wiring | `packages/excalidraw/` — call into `@excalidraw/element`, do not duplicate geometry |

## Verification

- Add or extend tests under `packages/element/tests/` and `packages/math/tests/` (or colocated `__tests__`) for geometry and mutation edge cases.
- After behavioral changes, exercise the relevant element type in the editor (create, resize, rotate, bind, export) — not only unit tests.

## See also

- File map: [references/KEY-FILES.md](references/KEY-FILES.md)
- Canvas vs DOM: [excalidraw-canvas-pipeline](../excalidraw-canvas-pipeline/SKILL.md)
- App state and packages: [excalidraw-architecture](../excalidraw-architecture/SKILL.md)
