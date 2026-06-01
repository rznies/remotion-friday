/**
 * Scene2_HomeBase - Orchestrated "Infrastructure Reveal"
 */

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Easing,
} from "remotion";
import { BackgroundAura } from "../components/BackgroundAura";
import { CinematicText } from "../components/CinematicText";
import { CloudCluster } from "../components/CloudCluster";
import { GCPLogo } from "../components/GCPLogo";
import { Terminal } from "../components/Terminal";
import { TechnicalParticles } from "../components/TechnicalParticles";
import {
  fontFamily,
  TITLE_XL,
  FONT_BOLD,
  FONT_MEDIUM,
} from "../utils/typography";
import { PRIMARY_TEXT, SECONDARY_TEXT, ACCENT_BLUE } from "../utils/colors";

export const Scene2_HomeBase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Headline Reveal (0-150)
  const headlineOpacity = interpolate(frame, [0, 40, 110, 140], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });
  const headlineY = interpolate(frame, [0, 40, 110, 140], [20, 0, 0, -50], {
    easing: Easing.out(Easing.quad),
    extrapolateRight: "clamp",
  });

  // 2. Cloud Descent & Particles (Starts 120)
  const particlesOpacity = interpolate(frame, [120, 160], [0, 1], {
    extrapolateLeft: "clamp",
  });

  // 3. GCP Logo Reveal (Starts 180)
  const logoProgress = spring({
    frame: frame - 180,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const logoScale = interpolate(logoProgress, [0, 1], [0, 1.2]);
  const logoOpacity = interpolate(frame, [180, 200], [0, 1], {
    extrapolateLeft: "clamp",
  });

  // 4. Terminal Rise (Starts 240)
  const terminalProgress = spring({
    frame: frame - 240,
    fps,
    config: { damping: 20, stiffness: 80 },
  });
  const terminalY = interpolate(terminalProgress, [0, 1], [600, 0]);
  const terminalOpacity = interpolate(
    frame,
    [240, 260, 330, 360],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" },
  );

  // 5. Metadata Text (Starts 300)
  const metaOpacity = interpolate(frame, [300, 330, 360], [0, 1, 0], {
    extrapolateRight: "clamp",
  });

  // Scene Scale
  const sceneScale = interpolate(frame, [0, 360], [1, 1.05], {
    easing: Easing.out(Easing.quad),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FAFBFC",
        fontFamily,
      }}
    >
      <BackgroundAura />

      {frame >= 120 && (
        <div style={{ opacity: particlesOpacity }}>
          <TechnicalParticles count={80} />
        </div>
      )}

      <AbsoluteFill style={{ transform: `scale(${sceneScale})` }}>
        {/* 1. Headline */}
        {frame < 150 && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              top: "50%",
              transform: `translateY(calc(-50% + ${headlineY}px))`,
              opacity: headlineOpacity,
              textAlign: "center",
            }}
          >
            <CinematicText
              text="I live in the cloud"
              fontSize={TITLE_XL}
              fontWeight={FONT_BOLD}
              color={PRIMARY_TEXT}
              startFrame={0}
            />
          </div>
        )}

        {/* 2. Cloud Cluster (Top Descent) */}
        {frame >= 120 && (
          <div
            style={{
              position: "absolute",
              top: 150,
              left: "50%",
              transform: `translateX(-50%)`,
            }}
          >
            <CloudCluster startFrame={120} />
          </div>
        )}

        {/* 3. GCP Logo (From Cloud) */}
        {frame >= 180 && (
          <div
            style={{
              position: "absolute",
              top: 150,
              left: "50%",
              transform: `translate(-50%, -50%) scale(${logoScale})`,
              opacity: logoOpacity,
              zIndex: 20,
              filter: "drop-shadow(0 0 20px rgba(66, 133, 244, 0.4))",
            }}
          >
            <GCPLogo size={120} />
          </div>
        )}

        {/* 4. Terminal (Bottom Rise) */}
        {frame >= 240 && (
          <div
            style={{
              position: "absolute",
              bottom: 120,
              left: "50%",
              transform: `translateX(-50%) translateY(${terminalY}px)`,
              opacity: terminalOpacity,
              zIndex: 30,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Terminal width={800} startFrame={240} />

            {/* 5. Metadata */}
            <div
              style={{
                marginTop: 30,
                textAlign: "center",
                opacity: metaOpacity,
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  fontWeight: FONT_BOLD,
                  color: PRIMARY_TEXT,
                  letterSpacing: "0.1em",
                }}
              >
                DEBIAN 12 // GOOGLE CLOUD VM
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: ACCENT_BLUE,
                  fontWeight: FONT_MEDIUM,
                  letterSpacing: "0.4em",
                  marginTop: 10,
                  textTransform: "uppercase",
                }}
              >
                Instance: friday-core-01 // us-central1-a
              </div>
            </div>
          </div>
        )}
      </AbsoluteFill>

      {/* Top Left Branding */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          fontSize: 24,
          fontWeight: FONT_BOLD,
          color: PRIMARY_TEXT,
          opacity: 0.8,
          letterSpacing: "-0.02em",
        }}
      >
        Friday<span style={{ color: ACCENT_BLUE }}>.</span>
      </div>

      {/* Modern Scene Indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 80,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          opacity: 0.4,
        }}
      >
        <div style={{ width: 40, height: 1, background: SECONDARY_TEXT }} />
        <div
          style={{
            fontSize: 16,
            color: SECONDARY_TEXT,
            fontWeight: FONT_MEDIUM,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Infrastructure // 02
        </div>
      </div>
    </AbsoluteFill>
  );
};
