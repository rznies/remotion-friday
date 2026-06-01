import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { springConfig } from "../utils/animations";

interface CinematicTextProps {
  text: string;
  fontSize: number;
  fontWeight: string;
  color: string;
  startFrame: number;
  letterSpacing?: number;
  letterSpacingEnd?: number;
}

export const CinematicText: React.FC<CinematicTextProps> = ({
  text,
  fontSize,
  fontWeight,
  color,
  startFrame,
  letterSpacing = 20,
  letterSpacingEnd = 2,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  const progress = spring({
    frame: localFrame,
    fps,
    config: {
      ...springConfig,
      damping: 20,
    },
  });

  const currentLetterSpacing = interpolate(
    progress,
    [0, 1],
    [letterSpacing, letterSpacingEnd],
    { easing: Easing.out(Easing.quad) },
  );

  const opacity = interpolate(localFrame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const blur = interpolate(localFrame, [0, 40], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        fontSize,
        fontWeight,
        color,
        opacity,
        letterSpacing: `${currentLetterSpacing}px`,
        filter: `blur(${blur}px)`,
        textTransform: "uppercase",
        textAlign: "center",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textShadow: `0 10px 30px rgba(0,0,0,0.05)`,
      }}
    >
      {text}
    </div>
  );
};
