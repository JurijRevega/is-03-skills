---
name: excalidraw-canvas-pipeline
description: >-
  Places Canvas 2D drawing in Excalidraw's static, interactive, and in-progress
  element layers; maps React wrappers to renderStaticScene, renderInteractiveScene,
  and renderNewElementScene. Use when adding or changing how shapes, selection,
  grid, or overlays are drawn, or when deciding whether logic belongs in React DOM
  vs the canvas pipeline.
---

# Excalidraw Canvas 2D Pipeline

## React DOM vs canvas

| Layer | Responsibility |
| ----- | -------------- |
| **React DOM** | Chrome UI: `LayerUI`, toolbars, dialogs, labels that are real DOM, embeddable iframes, accessibility wrappers. State still comes from `App` / `actionManager`. |
| **HTML Canvas** | Board content: elements, grid, selection handles, drag previews, and other editor visuals drawn with `CanvasRenderingContext2D` (and Rough.js where used). |

**Do not** implement drawable diagram elements as React components (divs/SVG) on the board. **Do** change element data in scene/state and extend canvas renderers.

## Canvas stack (three render paths)

1. **Static** — Committed elements + grid + background. `StaticCanvas.tsx` calls `renderStaticScene()` from `renderer/staticScene.ts` inside `useEffect` (every paint; throttling optional).
2. **Interactive** — Selection, transform handles, bind hints, etc. `InteractiveCanvas.tsx` calls `renderInteractiveScene()` from `renderer/interactiveScene.ts`.
3. **New element in progress** — Shape being drawn before commit. `NewElementCanvas.tsx` calls `renderNewElementScene()` from `renderer/renderNewElementScene.ts`.

DOM test helpers expect `canvas.static` and `canvas.interactive` class names.

## Where drawing logic lives

- **Per-element appearance**: `renderElement` and related helpers in `@excalidraw/element` (imported by static scene).
- **Scene ordering / visibility / frames**: `packages/excalidraw/scene/` plus arguments passed into the render functions.
- **Export / SVG**: `renderer/staticSvgScene.ts` (`renderSceneToSvg`), used from export flows — not the live editor loop.

## Decision guide

- **User-visible stroke/fill/shape of an element type** → element package + static (and SVG if exported).
- **Handles, selection box, alignment hints** → interactive renderer (and types in `scene/types` if new config is needed).
- **Rubber-band while creating** → new-element scene.
- **Button, panel, modal** → React in `components/`, not canvas.

## Constraints

- Do not add react-konva, Fabric, or Pixi for core board rendering.
- Prefer batching canvas work and avoiding redundant full-scene work; static scene uses throttling when enabled.
- Keep canvas render code free of React hooks; React components only own refs, sizing, and invoking render functions.

## See also

- Monorepo and state overview: [excalidraw-architecture](../excalidraw-architecture/SKILL.md)
- File-level map: [references/KEY-FILES.md](references/KEY-FILES.md)
