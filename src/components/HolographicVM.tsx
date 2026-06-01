import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { ACCENT_BLUE } from "../utils/colors";

export const HolographicVM: React.FC<{ size: number }> = ({ size }) => {
  const frame = useCurrentFrame();

  const scanLineY = interpolate(frame % 120, [0, 120], [0, 100]);
  const flicker = Math.random() > 0.99 ? 0.7 : 1; // More subtle flicker

  return (
    <div
      style={{
        width: size,
        height: size * 1.2,
        position: "relative",
        perspective: "1000px",
        opacity: flicker,
      }}
    >
      {/* 3D Box Base */}
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "rgba(52, 152, 219, 0.05)",
          border: `2px solid ${ACCENT_BLUE}88`,
          borderRadius: "12px",
          transform: "rotateX(20deg) rotateY(-10deg)",
          boxShadow: `0 0 30px ${ACCENT_BLUE}33, inset 0 0 20px ${ACCENT_BLUE}22`,
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          overflow: "hidden",
          backdropFilter: "blur(4px)",
        }}
      >
        {/* Internal "Circuitry" Pattern */}
        <div
          style={{
            opacity: 0.1,
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
          }}
        >
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="vm-grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke={ACCENT_BLUE}
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#vm-grid)" />
          </svg>
        </div>

        {/* Scan Line */}
        <div
          style={{
            position: "absolute",
            top: `${scanLineY}%`,
            left: 0,
            width: "100%",
            height: "2px",
            background: ACCENT_BLUE,
            boxShadow: `0 0 15px ${ACCENT_BLUE}`,
            opacity: 0.5,
            zIndex: 10,
          }}
        />

        {/* Content */}
        <div
          style={{
            zIndex: 5,
            color: ACCENT_BLUE,
            fontFamily: "monospace",
            fontSize: 12,
          }}
        >
          <div style={{ marginBottom: 10, fontWeight: "bold" }}>
            SYSTEM STATUS: ACTIVE
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div
              style={{
                width: 40,
                height: 4,
                background: ACCENT_BLUE,
                opacity: 0.3,
              }}
            />
            <div
              style={{
                width: 60,
                height: 4,
                background: ACCENT_BLUE,
                opacity: 0.6,
              }}
            />
          </div>
          <div style={{ marginTop: "auto", fontSize: 10, opacity: 0.6 }}>
            0x7F...4E2A
            <br />
            CPU LOAD: 14%
          </div>
        </div>
      </div>

      {/* Floating Orbs around the VM */}
      {[0, 1, 2].map((i) => {
        const orbFrame = frame + i * 40;
        const orbX = Math.sin(orbFrame / 30) * 80;
        const orbY = Math.cos(orbFrame / 40) * 100;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 6,
              height: 6,
              background: ACCENT_BLUE,
              borderRadius: "50%",
              boxShadow: `0 0 10px ${ACCENT_BLUE}`,
              left: "50%",
              top: "50%",
              transform: `translate(${orbX}px, ${orbY}px)`,
              opacity: 0.6,
            }}
          />
        );
      })}
    </div>
  );
};
