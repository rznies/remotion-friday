/**
 * Scene5_ToolsGrid
 * ACT 3: Tools showcase in 2×4 grid (28-52s, frames 0-1440 local)
 */

import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { TextReveal } from '../components/TextReveal';
import { ToolCard } from '../components/ToolCard';
import {
    GitHubIcon,
    FirecrawlIcon,
    WhatsAppIcon,
    GmailIcon,
    GoogleWorkspaceIcon,
    GeminiIcon,
    OpenCodeIcon,
    ParallelIcon,
} from '../components/icons';
import {
    fontFamily,
    TITLE_LG,
    FONT_BOLD,
    FONT_MEDIUM,
    BODY_SM,
} from '../utils/typography';
import { BG_START, PRIMARY_TEXT, ACCENT_BLUE, SECONDARY_TEXT } from '../utils/colors';
import { fadeIn, staggerDelay } from '../utils/animations';

/**
 * Micro-animation: Commit Graph (3 vertical bars scaling)
 */
const CommitGraphMicro: React.FC = () => {
    const frame = useCurrentFrame();
    const heights = [20, 30, 15];
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            {heights.map((h, i) => {
                const scale = interpolate(
                    (frame + i * 10) % 60,
                    [0, 30, 60],
                    [0.5, 1, 0.5],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
                );
                return (
                    <rect
                        key={i}
                        x={12 + i * 10}
                        y={44 - h * scale}
                        width={6}
                        height={h * scale}
                        rx={2}
                        fill={ACCENT_BLUE}
                        opacity={0.6}
                    />
                );
            })}
        </svg>
    );
};

/**
 * Micro-animation: Scanning line sweeping left→right
 */
const ScanLineMicro: React.FC = () => {
    const frame = useCurrentFrame();
    const x = interpolate(frame % 90, [0, 90], [0, 48], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <line x1={x} y1="8" x2={x} y2="40" stroke="#FF5722" strokeWidth="2" opacity={0.5} />
        </svg>
    );
};

/**
 * Micro-animation: Message bubble pulse
 */
const MessagePulseMicro: React.FC = () => {
    const frame = useCurrentFrame();
    const scale = interpolate(frame % 60, [0, 30, 60], [0.9, 1.05, 0.9], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    return (
        <div
            style={{
                width: 24,
                height: 18,
                backgroundColor: '#25D366',
                borderRadius: '10px 10px 10px 2px',
                transform: `scale(${scale})`,
                opacity: 0.4,
                position: 'absolute',
                bottom: 4,
                right: 4,
            }}
        />
    );
};

/**
 * Micro-animation: Envelope flap opening
 */
const EnvelopeFlapMicro: React.FC = () => {
    const frame = useCurrentFrame();
    const angle = interpolate(frame % 80, [0, 40, 80], [0, -30, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <polygon
                points="12,22 24,14 36,22"
                fill="#EA4335"
                opacity={0.4}
                style={{
                    transformOrigin: '24px 22px',
                    transform: `rotateX(${angle}deg)`,
                }}
            />
        </svg>
    );
};

/**
 * Micro-animation: Document icons shuffling
 */
const DocShuffleMicro: React.FC = () => {
    const frame = useCurrentFrame();
    const offsets = [0, 1, 2].map((i) => {
        const shift = interpolate(
            (frame + i * 20) % 90,
            [0, 45, 90],
            [0, 6, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
        );
        return shift;
    });
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            {offsets.map((offset, i) => (
                <rect
                    key={i}
                    x={14 + i * 8 + offset}
                    y={12}
                    width={8}
                    height={24}
                    rx={2}
                    fill="#4285F4"
                    opacity={0.3 + i * 0.1}
                />
            ))}
        </svg>
    );
};

/**
 * Micro-animation: Star twinkle
 */
const StarTwinkleMicro: React.FC = () => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame % 60, [0, 30, 60], [0.2, 0.7, 0.2], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path
                d="M24 10l2 12 12 2-12 2-2 12-2-12-12-2 12-2z"
                fill="#FBBC04"
                opacity={opacity}
            />
        </svg>
    );
};

/**
 * Micro-animation: Blinking cursor
 */
const CursorBlinkMicro: React.FC = () => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame % 30, [0, 15, 30], [1, 0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    return (
        <div
            style={{
                position: 'absolute',
                bottom: 8,
                right: 12,
                width: 2,
                height: 16,
                backgroundColor: '#5C6BC0',
                opacity,
            }}
        />
    );
};

/**
 * Micro-animation: 3 horizontal lines flowing right
 */
const FlowLinesMicro: React.FC = () => {
    const frame = useCurrentFrame();
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            {[0, 1, 2].map((i) => {
                const x = interpolate(
                    (frame + i * 15) % 60,
                    [0, 60],
                    [8, 40],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
                );
                return (
                    <line
                        key={i}
                        x1={x}
                        y1={16 + i * 8}
                        x2={x + 12}
                        y2={16 + i * 8}
                        stroke="#00BCD4"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity={0.5}
                    />
                );
            })}
        </svg>
    );
};

const tools = [
    { icon: <GitHubIcon size={48} />, label: 'GitHub', sublabel: 'Code & Version Control', micro: <CommitGraphMicro /> },
    { icon: <FirecrawlIcon size={48} />, label: 'Firecrawl', sublabel: 'Research & Web Scraping', micro: <ScanLineMicro /> },
    { icon: <WhatsAppIcon size={48} />, label: 'WhatsApp', sublabel: 'Instant Messaging', micro: <MessagePulseMicro /> },
    { icon: <GmailIcon size={48} />, label: 'Gmail', sublabel: 'Email Management', micro: <EnvelopeFlapMicro /> },
    { icon: <GoogleWorkspaceIcon size={48} />, label: 'Workspace', sublabel: 'Docs, Sheets, Slides', micro: <DocShuffleMicro /> },
    { icon: <GeminiIcon size={48} />, label: 'Gemini CLI', sublabel: 'AI Model Access', micro: <StarTwinkleMicro /> },
    { icon: <OpenCodeIcon size={48} />, label: 'OpenCode', sublabel: 'Development Environment', micro: <CursorBlinkMicro /> },
    { icon: <ParallelIcon size={48} />, label: 'Parallel API', sublabel: 'Concurrent Processing', micro: <FlowLinesMicro /> },
];

export const Scene5_ToolsGrid: React.FC = () => {
    const frame = useCurrentFrame();

    // "Here's what I can do" — text reveal (frames 0–240)
    const titleOpacity = fadeIn(frame, 0, 60);

    // "All working together, seamlessly" (frames 1200–1440)
    const closingOpacity = fadeIn(frame, 1200, 120);

    // Cards scale down transition (frames 1300–1440)
    const gridScale = interpolate(frame, [1300, 1440], [1, 0.8], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const gridOpacity = interpolate(frame, [1350, 1440], [1, 0.3], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill
            style={{
                background: `linear-gradient(135deg, ${BG_START} 0%, #FFF8F0 100%)`,
                fontFamily,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Title: "Here's what I can do" */}
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
                    text="Here's what I can do"
                    mode="word-slide"
                    fontSize={TITLE_LG}
                    fontWeight={FONT_BOLD}
                    color={PRIMARY_TEXT}
                    startFrame={0}
                    staggerInterval={12}
                />
            </div>

            {/* 2×4 Grid of ToolCards */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '24px',
                    padding: '40px',
                    transform: `scale(${gridScale})`,
                    opacity: gridOpacity,
                }}
            >
                {tools.map((tool, index) => (
                    <ToolCard
                        key={tool.label}
                        icon={tool.icon}
                        label={tool.label}
                        sublabel={tool.sublabel}
                        delay={240 + staggerDelay(index, 90)}
                        microAnimation={tool.micro}
                    />
                ))}
            </div>

            {/* "All working together, seamlessly" */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 80,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: BODY_SM,
                    fontWeight: FONT_MEDIUM,
                    color: SECONDARY_TEXT,
                    opacity: closingOpacity,
                    textAlign: 'center',
                }}
            >
                All working together, seamlessly
            </div>
        </AbsoluteFill>
    );
};
