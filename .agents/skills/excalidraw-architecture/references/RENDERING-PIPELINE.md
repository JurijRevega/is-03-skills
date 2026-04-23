# Rendering Pipeline in Excalidraw

## Overview
Excalidraw renders to HTML Canvas 2D, not React DOM.

## Pipeline
1. Scene collects all elements
2. `renderScene()` processes element list
3. Each element type has a dedicated renderer
4. Output goes to canvas 2D context

## Key files
- `packages/excalidraw/renderer/staticScene.ts` — `renderStaticScene` (elements + grid)
- `packages/excalidraw/renderer/interactiveScene.ts` — `renderInteractiveScene` (handles, overlays)
- `packages/excalidraw/renderer/renderNewElementScene.ts` — in-progress element preview
- `@excalidraw/element` — `renderElement` and per-element drawing
- `packages/excalidraw/scene/` — scene management
- For canvas-vs-React boundaries and the full stack, see skill `excalidraw-canvas-pipeline`

## Constraints
- DO NOT use react-konva, fabric.js, pixi.js
- DO NOT render drawing elements via React DOM
- Performance-critical: avoid unnecessary re-renders
- Batch canvas operations when possible