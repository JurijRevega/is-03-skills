# Key files: @excalidraw/element and @excalidraw/math

## @excalidraw/math (`packages/math/src/`)

| Area | Files |
| ---- | ----- |
| Entry / exports | `index.ts` |
| Branded types | `types.ts` (`GlobalPoint`, `LocalPoint`, `Radians`, …) |
| Primitives | `point.ts`, `vector.ts`, `segment.ts`, `line.ts`, `ellipse.ts`, `curve.ts`, `polygon.ts`, `rectangle.ts`, `triangle.ts`, `angle.ts`, `range.ts` |
| Shared helpers | `utils.ts`, `constants.ts` |
| Tests | `packages/math/tests/*.test.ts` |

## @excalidraw/element (`packages/element/src/`)

| Area | Files |
| ---- | ----- |
| Entry / exports | `index.ts` |
| Element unions / maps | `types.ts` |
| Runtime type guards | `typeChecks.ts` |
| Create defaults | `newElement.ts` |
| In-place vs immutable updates | `mutateElement.ts` (`mutateElement`, `newElementWith`, `bumpVersion`) |
| Scene + coordinated updates | `Scene.ts` (`mutateElement` triggers `triggerUpdate`) |
| Bounds / coords | `bounds.ts` |
| Hit testing / overlap | `collision.ts` |
| Drag, resize, transform | `dragElements.ts`, `resizeElements.ts`, `transform.ts`, `transformHandles.ts` |
| Lines / arrows | `linearElementEditor.ts`, `elbowArrow.ts`, `arrows/`, `arrowheads.ts`, `binding.ts` |
| Derived draw shape | `shape.ts` (`ShapeCache`, `getElementShape`, …) |
| Canvas draw helpers | `renderElement.ts` |
| Text | `textElement.ts`, `textMeasurements.ts`, `textWrapping.ts` |
| Ordering / groups / frames | `sortElements.ts`, `zindex.ts`, `groups.ts`, `frame.ts` |
| Tests | `packages/element/tests/`, `src/__tests__/` |
