import React from "react";
import { useCurrentFrame, random, interpolate } from "remotion";
import { ACCENT_BLUE } from "../utils/colors";

export const TechnicalParticles: React.FC<{ count?: number }> = ({
  count = 60,
}) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {Array.from({ length: count }).map((_, i) => {
        const seed = `tech-part-${i}`;
        const x = random(seed + "x") * 100;
        const y = random(seed + "y") * 100;
        const size = random(seed + "s") * 2 + 1;
        const speed = random(seed + "sp") * 2 + 1;

        const driftX = (frame * speed * 0.5) % 100;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${(x + driftX) % 100}%`,
              top: `${y}%`,
              width: size,
              height: size,
              background: ACCENT_BLUE,
              opacity: interpolate(
                Math.sin(frame / 20 + i),
                [-1, 1],
                [0.1, 0.4],
              ),
              borderRadius: "50%",
              boxShadow: `0 0 5px ${ACCENT_BLUE}88`,
            }}
          />
        );
      })}
    </div>
  );
};
