import React from "react";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { StarDrawing } from "./StarDrawing";

describe("StarDrawing", () => {
  it("renders an svg with a star polygon", () => {
    const { container } = render(<StarDrawing data-testid="star-root" />);

    const svg = container.querySelector('[data-testid="star-root"]');
    expect(svg?.tagName.toLowerCase()).toBe("svg");

    const polygon = container.querySelector("polygon");
    expect(polygon).not.toBeNull();
    expect(polygon?.getAttribute("points")).toMatch(/\d/);
  });

  it("applies width and height", () => {
    const { container } = render(<StarDrawing width={32} height={48} />);
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("width")).toBe("32");
    expect(svg?.getAttribute("height")).toBe("48");
  });

  it("uses custom point count", () => {
    const { container } = render(<StarDrawing points={6} />);
    const polygon = container.querySelector("polygon");
    const pts = polygon?.getAttribute("points")?.trim().split(/\s+/) ?? [];
    expect(pts.length).toBe(12);
  });
});
