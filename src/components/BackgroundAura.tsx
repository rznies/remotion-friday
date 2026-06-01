import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  useVideoConfig,
} from "remotion";
import { ACCENT_BLUE, ACCENT_ORANGE } from "../utils/colors";

export const BackgroundAura: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Pulse animation for the auras
  const pulse1 = Math.sin(frame / 60) * 0.1 + 0.9;
  const pulse2 = Math.cos(frame / 45) * 0.1 + 0.9;

  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#FAFBFC" }}>
      {/* Soft mesh-like auras */}
      <div
        style={{
          position: "absolute",
          width: width * 1.5,
          height: height * 1.5,
          top: "-25%",
          left: "-25%",
          background: `radial-gradient(circle, ${ACCENT_BLUE}33 0%, transparent 70%)`,
          transform: `translate(${Math.sin(frame / 120) * 100}px, ${Math.cos(frame / 150) * 50}px) scale(${pulse1})`,
          filter: "blur(100px)",
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: width * 1.5,
          height: height * 1.5,
          bottom: "-25%",
          right: "-25%",
          background: `radial-gradient(circle, ${ACCENT_ORANGE}22 0%, transparent 70%)`,
          transform: `translate(${Math.cos(frame / 100) * 100}px, ${Math.sin(frame / 130) * 50}px) scale(${pulse2})`,
          filter: "blur(100px)",
          opacity: 0.4,
        }}
      />

      {/* Subtle Grid Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
                        linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
                    `,
          backgroundSize: "80px 80px",
          opacity: interpolate(frame, [0, 60], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* Grain Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </AbsoluteFill>
  );
};
