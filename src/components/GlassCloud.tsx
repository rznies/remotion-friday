import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { ACCENT_BLUE } from "../utils/colors";

export const GlassCloud: React.FC<{ size: number }> = ({ size }) => {
  const frame = useCurrentFrame();

  const float = Math.sin(frame / 30) * 10;

  // Animation for the inner "data" pulses
  const pulse = interpolate(Math.sin(frame / 20), [-1, 1], [0.3, 0.7]);

  return (
    <div style={{ position: "relative", width: size, height: size * 0.6 }}>
      {/* Outer Glow */}
      <div
        style={{
          position: "absolute",
          inset: -20,
          background: `radial-gradient(circle, ${ACCENT_BLUE}44 0%, transparent 70%)`,
          filter: "blur(30px)",
          opacity: pulse,
        }}
      />

      {/* Main Cloud Body (Glassmorphic) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(12px)",
          borderRadius: "100px",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          boxShadow: `0 20px 50px rgba(0,0,0,0.1), inset 0 0 20px rgba(255,255,255,0.5)`,
          transform: `translateY(${float}px)`,
          overflow: "hidden",
        }}
      >
        {/* Inner Animated Lines */}
        <div
          style={{
            position: "absolute",
            width: "200%",
            height: "100%",
            background: `repeating-linear-gradient(90deg, transparent, transparent 40px, ${ACCENT_BLUE}11 40px, ${ACCENT_BLUE}11 41px)`,
            transform: `translateX(${-(frame % 80) * 2}px)`,
          }}
        />
      </div>

      {/* Smaller Cloud Humps */}
      <div
        style={{
          position: "absolute",
          width: "50%",
          height: "60%",
          top: "-30%",
          left: "15%",
          background: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(10px)",
          borderRadius: "50%",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          transform: `translateY(${float * 0.8}px)`,
          zIndex: -1,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "40%",
          height: "50%",
          top: "-20%",
          right: "20%",
          background: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(10px)",
          borderRadius: "50%",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          transform: `translateY(${float * 1.2}px)`,
          zIndex: -1,
        }}
      />
    </div>
  );
};
