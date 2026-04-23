import clsx from "clsx";
import React from "react";

const getStarPolygonPoints = (
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  numPoints: number,
): string => {
  const step = Math.PI / numPoints;
  const coords: string[] = [];
  for (let i = 0; i < 2 * numPoints; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const a = i * step - Math.PI / 2;
    coords.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }
  return coords.join(" ");
};

export type StarDrawingProps = {
  /** Number of tips on the star (default 5). */
  points?: number;
  /** Outer radius as a fraction of half the smaller of width/height (default 0.9). */
  outerRadiusFactor?: number;
  /** Inner radius as a fraction of the outer radius (default ~golden ratio for a regular pentagram). */
  innerRadiusRatio?: number;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
  /** When true, hides the graphic from assistive tech (default true). */
  decorative?: boolean;
} & Omit<React.SVGProps<SVGSVGElement>, "viewBox" | "children">;

export const StarDrawing = ({
  points = 5,
  outerRadiusFactor = 0.9,
  innerRadiusRatio = 0.381966,
  width = 64,
  height = 64,
  fill = "currentColor",
  stroke,
  strokeWidth = 0,
  className,
  decorative = true,
  ...rest
}: StarDrawingProps) => {
  const cx = width / 2;
  const cy = height / 2;
  const base = Math.min(width, height) / 2;
  const outerR = base * outerRadiusFactor;
  const innerR = outerR * innerRadiusRatio;

  const polygonPoints = getStarPolygonPoints(cx, cy, outerR, innerR, points);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={clsx("StarDrawing", className)}
      aria-hidden={decorative ? true : undefined}
      {...rest}
    >
      <polygon
        points={polygonPoints}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};
