# Canvas pipeline — key files

| File | Role |
| ---- | ---- |
| `packages/excalidraw/components/canvases/StaticCanvas.tsx` | React wrapper; calls `renderStaticScene`. |
| `packages/excalidraw/components/canvases/InteractiveCanvas.tsx` | React wrapper; calls `renderInteractiveScene`. |
| `packages/excalidraw/components/canvases/NewElementCanvas.tsx` | In-progress element; calls `renderNewElementScene`. |
| `packages/excalidraw/renderer/staticScene.ts` | Static board paint (grid, elements). |
| `packages/excalidraw/renderer/interactiveScene.ts` | Selection and editor overlays. |
| `packages/excalidraw/renderer/renderNewElementScene.ts` | Preview while creating an element. |
| `packages/excalidraw/renderer/staticSvgScene.ts` | SVG export (`renderSceneToSvg`). |
| `packages/excalidraw/scene/` | Scene construction, types, export helpers. |
| `@excalidraw/element` | `renderElement` and geometry for element types. |
