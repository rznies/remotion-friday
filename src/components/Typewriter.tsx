/**
 * Typewriter Component
 * String slicing with optional blinking cursor
 */

import React from "react";
import { useCurrentFrame } from "remotion";
import { typewriterProgress, blink } from "../utils/animations";

interface TypewriterProps {
  text: string;
  fontSize: number;
  fontWeight?: string;
  color: string;
  charFrames?: number; // frames per character
  showCursor?: boolean;
  cursorSymbol?: string;
  blinkFrames?: number;
  startFrame?: number; // when the typing should start (default: 0)
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  fontSize,
  fontWeight = "400",
  color,
  charFrames = 2,
  showCursor = true,
  cursorSymbol = "▌",
  blinkFrames = 16,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = Math.max(0, frame - startFrame);

  const typedLength = typewriterProgress(relativeFrame, text, charFrames);
  const typedText = text.slice(0, Math.min(typedLength, text.length));
  const cursorOpacity = blink(frame, blinkFrames);

  return (
    <span
      style={{
        fontSize,
        fontWeight,
        color,
      }}
    >
      {typedText}
      {showCursor && (
        <span style={{ opacity: cursorOpacity }}>{cursorSymbol}</span>
      )}
    </span>
  );
};
