import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { ACCENT_BLUE } from "../utils/colors";

const LOGS = [
  "> systemctl start friday.service",
  "[ OK ] Loaded Friday Assistant Environment",
  "[ OK ] Initializing Neural Engine...",
  "[ OK ] Connecting to GCP us-central1-a",
  "> friday status --verbose",
  "STATUS: ACTIVE",
  "LATENCY: 14ms",
  "MEMORY: 1.2GB/16GB",
  "> _",
];

export const Terminal: React.FC<{ width: number; startFrame: number }> = ({
  width,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;
  const height = width * (9 / 16);

  const progress = spring({
    frame: localFrame,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const visibleLogs = Math.floor(
    interpolate(localFrame, [20, 100], [0, LOGS.length], {
      extrapolateRight: "clamp",
    }),
  );

  return (
    <div
      style={{
        width,
        height,
        background: "rgba(10, 15, 25, 0.85)",
        backdropFilter: "blur(16px)",
        borderRadius: "12px",
        border: "1px solid rgba(52, 152, 219, 0.3)",
        boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transform: `scale(${progress})`,
      }}
    >
      {/* Terminal Header */}
      <div
        style={{
          height: 32,
          background: "rgba(255, 255, 255, 0.05)",
          display: "flex",
          alignItems: "center",
          padding: "0 15px",
          gap: 8,
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#FF5F56",
          }}
        />
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#FFBD2E",
          }}
        />
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#27C93F",
          }}
        />
        <div
          style={{
            marginLeft: "auto",
            fontSize: 10,
            color: "rgba(255, 255, 255, 0.3)",
            fontFamily: "monospace",
            letterSpacing: "0.1em",
          }}
        >
          friday@debian:~
        </div>
      </div>

      {/* Terminal Body */}
      <div
        style={{
          padding: 20,
          flex: 1,
          fontFamily: "monospace",
          fontSize: 16,
          color: ACCENT_BLUE,
          lineHeight: 1.6,
          textAlign: "left",
        }}
      >
        {LOGS.slice(0, visibleLogs).map((log, i) => (
          <div key={i} style={{ opacity: i === visibleLogs - 1 ? 1 : 0.6 }}>
            {log}
          </div>
        ))}
        {visibleLogs < LOGS.length && localFrame > 20 && (
          <div style={{ opacity: 0.8 }}>
            {LOGS[visibleLogs].substring(0, Math.floor((localFrame % 10) * 2))}
            <span style={{ opacity: (frame / 30) % 2 > 1 ? 1 : 0 }}>_</span>
          </div>
        )}
      </div>
    </div>
  );
};
