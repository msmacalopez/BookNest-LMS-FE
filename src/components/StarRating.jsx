import React from "react";
import { FaStar } from "react-icons/fa";

export default function StarRating({
  value = 0,
  max = 5,
  size = 18,
  showText = true,
}) {
  const v = parseFloat(value);
  const clamped = Number.isFinite(v) ? Math.min(Math.max(v, 0), max) : 0;
  const percent = (clamped / max) * 100;

  // total width = star size * number of stars
  const totalWidth = size * max;

  return (
    <div className="flex items-center gap-2">
      <div
        className="relative"
        style={{
          width: totalWidth,
          height: size,
          lineHeight: 0,
        }}
      >
        {/* EMPTY stars (base layer) */}
        <div
          className="absolute left-0 top-0 flex"
          style={{ width: totalWidth, height: size }}
          aria-hidden="true"
        >
          {Array.from({ length: max }).map((_, i) => (
            <FaStar key={`e-${i}`} size={size} className="text-base-300" />
          ))}
        </div>

        {/* FILLED stars (clipped layer) */}
        <div
          className="absolute left-0 top-0 overflow-hidden"
          style={{
            width: `${percent}%`,
            height: size,
          }}
          aria-hidden="true"
        >
          <div className="flex" style={{ width: totalWidth, height: size }}>
            {Array.from({ length: max }).map((_, i) => (
              <FaStar key={`f-${i}`} size={size} className="text-warning" />
            ))}
          </div>
        </div>
      </div>

      {showText && (
        <span className="text-sm opacity-80">
          {clamped.toFixed(1)} / {max}
        </span>
      )}
    </div>
  );
}
