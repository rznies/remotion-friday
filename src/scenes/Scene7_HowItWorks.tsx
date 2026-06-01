/**
 * Scene7_HowItWorks
 * ACT 5: Flow diagram showing how Friday thinks (70-82s, frames 0-720 local)
 */

import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { FlowDiagram } from '../components/FlowDiagram';
import { TextReveal } from '../components/TextReveal';
import {
    fontFamily,
    TITLE_SM,
    BODY_LG,
    FONT_BOLD,
    FONT_MEDIUM,
} from '../utils/typography';
import { BG_START, BG_END, PRIMARY_TEXT, SECONDARY_TEXT, ACCENT_BLUE } from '../utils/colors';
import { fadeIn } from '../utils/animations';

export const Scene7_HowItWorks: React.FC = () => {
    const frame = useCurrentFrame();

    // Title: "Watch how I think"
    const titleOpacity = fadeIn(frame, 0, 60);

    // Flow diagram visible from frame 60 onward
    const diagramOpacity = fadeIn(frame, 60, 60);

    // Bottom text: "All in seconds, while you focus on what matters"
    const bottomOpacity = fadeIn(frame, 420, 120);

    // Speed lines behind diagram (subtle)
    const speedLineOffset = interpolate(frame, [300, 600], [0, 200], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Fade to white transition
    const whiteOverlay = interpolate(frame, [660, 720], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill
            style={{
                background: `linear-gradient(135deg, ${BG_START} 0%, ${BG_END} 100%)`,
                fontFamily,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Title: "Watch how I think" */}
            <div
                style={{
                    position: 'absolute',
                    top: 80,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    opacity: titleOpacity,
                }}
            >
                <TextReveal
                    text="Watch how I think"
                    mode="word-slide"
                    fontSize={TITLE_SM}
                    fontWeight={FONT_BOLD}
                    color={PRIMARY_TEXT}
                    startFrame={0}
                    staggerInterval={10}
                />
            </div>

            {/* Speed lines background */}
            <svg
                style={{
                    position: 'absolute',
                    top: '40%',
                    left: 0,
                    width: '100%',
                    height: '20%',
                    pointerEvents: 'none',
                    opacity: 0.08,
                }}
            >
                {[0, 1, 2, 3, 4].map((i) => (
                    <line
                        key={i}
                        x1={speedLineOffset + i * 40}
                        y1={20 + i * 25}
                        x2={speedLineOffset + i * 40 + 300}
                        y2={20 + i * 25}
                        stroke={ACCENT_BLUE}
                        strokeWidth="1"
                    />
                ))}
            </svg>

            {/* Flow Diagram */}
            <div
                style={{
                    position: 'absolute',
                    top: '35%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: diagramOpacity,
                }}
            >
                <FlowDiagram />
            </div>

            {/* Bottom text */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 100,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    opacity: bottomOpacity,
                    textAlign: 'center',
                    maxWidth: '800px',
                }}
            >
                <TextReveal
                    text="All in seconds, while you focus on what matters"
                    mode="word-slide"
                    fontSize={BODY_LG}
                    fontWeight={FONT_MEDIUM}
                    color={SECONDARY_TEXT}
                    startFrame={420}
                    staggerInterval={8}
                />
            </div>

            {/* White overlay transition */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#FFFFFF',
                    opacity: whiteOverlay,
                }}
            />
        </AbsoluteFill>
    );
};
