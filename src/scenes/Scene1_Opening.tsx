/**
 * Scene1_Opening - Refined for "Steve Jobs" Premium Feel
 * ACT 1: The Introduction (0-12s, frames 0-720)
 */

import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { BackgroundAura } from "../components/BackgroundAura";
import { CinematicText } from "../components/CinematicText";
import { TextReveal } from "../components/TextReveal";
import { Typewriter } from "../components/Typewriter";
import {
  fontFamily,
  TITLE_HERO,
  TITLE_XL,
  TITLE_MD,
  TITLE_SM,
  FONT_BOLD,
  FONT_MEDIUM,
  FONT_REGULAR,
} from "../utils/typography";
import { PRIMARY_TEXT, ACCENT_BLUE, SECONDARY_TEXT } from "../utils/colors";

export const Scene1_Opening: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. "HELLO WORLD!" (0-200)
  const helloY = interpolate(frame, [0, 160, 200], [20, 0, -50], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const helloOpacity = interpolate(frame, [160, 200], [1, 0], {
    extrapolateRight: "clamp",
  });

  // 2. "I'm Friday" (200-400)
  const fridayY = interpolate(frame, [200, 360, 400], [20, 0, -50], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const fridayOpacity = interpolate(frame, [360, 400], [1, 0], {
    extrapolateRight: "clamp",
  });

  // 3. "An advanced AI assistant" (400-580)
  const assistantY = interpolate(frame, [400, 540, 580], [20, 0, -50], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const assistantOpacity = interpolate(frame, [540, 580], [1, 0], {
    extrapolateRight: "clamp",
  });

  // 4. "Want to see how I operate?" (580-720)
  const questionY = interpolate(frame, [580, 720], [20, 0], {
    extrapolateRight: "clamp",
  });

  // Scene Transition Fade
  const sceneOpacity = interpolate(frame, [680, 720], [1, 0], {
    extrapolateRight: "clamp",
  });

  // 3D-like Parallax Push
  const scale = interpolate(frame, [0, 720], [1.02, 1.1], {
    easing: Easing.out(Easing.quad),
  });

  const cameraZ = interpolate(frame, [0, 720], [0, 50]);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #FAFBFC 0%, #F0F4F8 100%)",
        fontFamily,
        opacity: sceneOpacity,
      }}
    >
      <BackgroundAura />

      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translateZ(${cameraZ}px)`,
          perspective: "1000px",
        }}
      >
        {/* 1. HELLO WORLD */}
        {frame < 200 && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              top: "50%",
              transform: `translateY(calc(-50% + ${helloY}px))`,
              opacity: helloOpacity,
              textAlign: "center",
            }}
          >
            <CinematicText
              text="HELLO WORLD!"
              fontSize={TITLE_HERO}
              fontWeight={FONT_BOLD}
              color={PRIMARY_TEXT}
              startFrame={0}
            />
          </div>
        )}

        {/* 2. I'm Friday */}
        {frame >= 200 && frame < 400 && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              top: "50%",
              transform: `translateY(calc(-50% + ${fridayY}px))`,
              opacity: fridayOpacity,
              textAlign: "center",
            }}
          >
            <TextReveal
              text="I'm Friday"
              mode="char-slide"
              fontSize={TITLE_XL}
              fontWeight={FONT_MEDIUM}
              color={PRIMARY_TEXT}
              highlightWord="Friday"
              highlightColor={ACCENT_BLUE}
              startFrame={200}
              staggerInterval={4}
            />
          </div>
        )}

        {/* 3. An advanced AI assistant */}
        {frame >= 380 && frame < 580 && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              top: "50%",
              transform: `translateY(calc(-50% + ${assistantY}px))`,
              opacity: assistantOpacity,
              textAlign: "center",
            }}
          >
            <Typewriter
              text="An advanced AI assistant"
              fontSize={TITLE_MD}
              fontWeight={FONT_REGULAR}
              color={PRIMARY_TEXT}
              charFrames={2}
              showCursor={true}
              startFrame={400}
            />
          </div>
        )}

        {/* 4. Want to see how I operate? */}
        {frame >= 560 && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              top: "50%",
              transform: `translateY(calc(-50% + ${questionY}px))`,
              textAlign: "center",
            }}
          >
            <Typewriter
              text="Want to see how I operate?"
              fontSize={TITLE_SM}
              fontWeight={FONT_REGULAR}
              color={SECONDARY_TEXT}
              charFrames={2}
              showCursor={true}
              startFrame={580}
            />
          </div>
        )}
      </AbsoluteFill>

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
          Perspective // 01
        </div>
      </div>

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
    </AbsoluteFill>
  );
};
