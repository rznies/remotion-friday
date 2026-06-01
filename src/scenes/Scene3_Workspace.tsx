/**
 * Scene3_Workspace
 * ACT 2: Daytona Workspace + Connection Particles (18-24s, frames 0-360 local)
 *
 * Director's Cut:
 * - Fluid narrative transition from Infrastructure to Sandbox
 * - Prominent, centered high-level statements
 * - Dynamic data-flow visualization (GCP -> Daytona)
 * - Industrial glassmorphism for workspace representation
 */

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { CloudIcon, VMBox, DaytonaIcon } from "../components/icons";
import { ConnectionParticles } from "../components/ConnectionParticles";
import {
  fontFamily,
  TITLE_XL,
  TITLE_MD,
  TITLE_SM,
  FONT_BOLD,
  FONT_MEDIUM,
} from "../utils/typography";
import {
  BG_START,
  BG_END,
  PRIMARY_TEXT,
  SECONDARY_TEXT,
  ACCENT_BLUE,
  GLOW_BLUE,
} from "../utils/colors";

export const Scene3_Workspace: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // --- Timing Presets (60fps) ---
  // 0-140: Statement 1 "With my own sandbox to experiment"
  // 120-360: Visual transition & Data flow
  // 240-360: Statement 2 "Everything stays clean..."

  // 1. Headline: "With my own sandbox to experiment"
  const headOpacity = interpolate(frame, [0, 30, 110, 140], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });
  const headY = interpolate(frame, [0, 30, 110, 140], [30, 0, 0, -30], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    extrapolateRight: "clamp",
  });

  // 2. Visual Elements Entrance (Starts 110)
  const visualProgress = spring({
    frame: frame - 110,
    fps,
    config: { damping: 20 },
  });

  // Position of Source (Left) and Target (Right)
  const sourceX = width * 0.28;
  const targetX = width * 0.72;
  const centerY = height * 0.5;

  // Source (Cloud/VM) Group
  const sourceOpacity = interpolate(
    frame,
    [110, 140, 330, 360],
    [0, 0.6, 0.6, 0],
    { extrapolateRight: "clamp" },
  );
  const sourceScale = interpolate(visualProgress, [0, 1], [0.8, 1]);

  // Target (Daytona Sandbox)
  const daytonaOpacity = interpolate(
    frame,
    [130, 160, 330, 360],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" },
  );
  const daytonaScale = interpolate(visualProgress, [0, 1], [0.5, 1]);
  const daytonaDriftY = interpolate(frame, [110, 360], [0, -20]);

  // 3. Data Flow
  const connectionProgress = interpolate(frame, [160, 220], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flowOpacity = interpolate(frame, [160, 190, 330, 360], [0, 1, 1, 0]);

  // 4. Summary Statement (Starts 240)
  const summaryOpacity = interpolate(
    frame,
    [240, 270, 330, 360],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" },
  );
  const summaryY = interpolate(frame, [240, 270], [20, 0], {
    easing: Easing.out(Easing.quad),
    extrapolateRight: "clamp",
  });

  // Background slow zoom
  const bgScale = interpolate(frame, [0, 360], [1.05, 1.1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${BG_START} 0%, ${BG_END} 100%)`,
        fontFamily,
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${bgScale})`,
      }}
    >
      {/* 1. Primary Headline */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          transform: `translateY(calc(-50% + ${headY}px))`,
          fontSize: TITLE_XL,
          fontWeight: FONT_BOLD,
          color: PRIMARY_TEXT,
          opacity: headOpacity,
          textAlign: "center",
          width: "80%",
        }}
      >
        With my own sandbox to experiment
      </div>

      {/* 2. Source Infrastructure (Persistent Left) */}
      <div
        style={{
          position: "absolute",
          top: centerY,
          left: sourceX,
          transform: `translate(-50%, -50%) scale(${sourceScale})`,
          opacity: sourceOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <CloudIcon size={120} color={ACCENT_BLUE} />
        <VMBox size={80} color="#FFFFFF" />
      </div>

      {/* 3. Data Flow Line & Particles */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: flowOpacity,
        }}
      >
        <line
          x1={sourceX + 80}
          y1={centerY}
          x2={interpolate(
            connectionProgress,
            [0, 1],
            [sourceX + 80, targetX - 120],
          )}
          y2={centerY}
          stroke={ACCENT_BLUE}
          strokeWidth="3"
          strokeDasharray="10 6"
          opacity={0.3}
        />
      </svg>

      {frame >= 160 && (
        <div style={{ opacity: flowOpacity }}>
          <ConnectionParticles
            x1={sourceX + 80}
            y1={centerY}
            x2={targetX - 120}
            y2={centerY}
            dotCount={6}
            staggerFrames={15}
            loopFrames={90}
          />
        </div>
      )}

      {/* 4. Target: Daytona Sandbox */}
      <div
        style={{
          position: "absolute",
          top: centerY,
          left: targetX,
          transform: `translate(-50%, -50%) scale(${daytonaScale}) translateY(${daytonaDriftY}px)`,
          opacity: daytonaOpacity,
          zIndex: 50,
        }}
      >
        <div
          style={{
            padding: "40px",
            background: "rgba(0, 188, 212, 0.05)",
            borderRadius: "40px",
            border: "2px solid rgba(0, 188, 212, 0.3)",
            backdropFilter: "blur(15px)",
            boxShadow: `0 0 50px ${GLOW_BLUE}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <DaytonaIcon size={200} color="#00BCD4" />
          <div
            style={{
              fontSize: 24,
              fontWeight: FONT_BOLD,
              color: "#00BCD4",
              letterSpacing: "0.2em",
            }}
          >
            DAYTONA
          </div>
        </div>
      </div>

      {/* 5. Summary Text */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: "50%",
          transform: `translateX(-50%) translateY(${summaryY}px)`,
          fontSize: TITLE_MD,
          fontWeight: FONT_MEDIUM,
          color: PRIMARY_TEXT,
          opacity: summaryOpacity,
          textAlign: "center",
          width: "100%",
          letterSpacing: "0.02em",
        }}
      >
        Everything stays clean, organized, efficient
      </div>

      {/* Scene Badge */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 60,
          opacity: 0.3,
          fontSize: 14,
          color: SECONDARY_TEXT,
          letterSpacing: "0.1em",
        }}
      >
        WORKSPACE // 03
      </div>
    </AbsoluteFill>
  );
};
