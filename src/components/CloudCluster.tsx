import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { GlassCloud } from "./GlassCloud";

export const CloudCluster: React.FC<{ startFrame: number }> = ({
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  const spr = (delay: number) =>
    spring({
      frame: localFrame - delay,
      fps,
      config: { damping: 20, stiffness: 60 },
    });

  const clouds = [
    { size: 300, top: 0, left: -100, delay: 0 },
    { size: 400, top: -20, left: 0, delay: 10 },
    { size: 280, top: 10, left: 120, delay: 20 },
  ];

  return (
    <div style={{ position: "relative", width: 400, height: 200 }}>
      {clouds.map((c, i) => {
        const progress = spr(c.delay);
        const y = interpolate(progress, [0, 1], [-400, c.top]);
        const scale = interpolate(progress, [0, 1], [0.8, 1]);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: c.left,
              transform: `translateY(${y}px) scale(${scale})`,
              opacity: interpolate(progress, [0, 0.2], [0, 1]),
              zIndex: i === 1 ? 10 : 5,
            }}
          >
            <GlassCloud size={c.size} />
          </div>
        );
      })}
    </div>
  );
};
