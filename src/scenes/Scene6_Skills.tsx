/**
 * Scene6_Skills
 * ACT 4: Specialized skills showcase with 3D flip cards (52-70s, frames 0-1080 local)
 */

import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { SkillCard } from '../components/SkillCard';
import { TextReveal } from '../components/TextReveal';
import {
    fontFamily,
    TITLE_MD,
    BODY_SM,
    FONT_BOLD,
    FONT_REGULAR,
} from '../utils/typography';
import {
    BG_START,
    BG_END,
    PRIMARY_TEXT,
    ACCENT_BLUE,
    ACCENT_ORANGE,
    SECONDARY_TEXT,
} from '../utils/colors';
import { fadeIn, staggerDelay } from '../utils/animations';

/**
 * Sample Visual: Stacked page icons
 */
const StackedPages: React.FC = () => {
    const frame = useCurrentFrame();
    return (
        <svg width="60" height="50" viewBox="0 0 60 50" fill="none">
            {[0, 1, 2, 3].map((i) => {
                const offset = i * 4;
                const opacity = interpolate(
                    (frame + i * 10) % 80,
                    [0, 40, 80],
                    [0.3, 0.7, 0.3],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
                );
                return (
                    <rect
                        key={i}
                        x={8 + offset}
                        y={4 + offset}
                        width={32}
                        height={40}
                        rx={3}
                        fill={ACCENT_BLUE}
                        opacity={opacity}
                    />
                );
            })}
        </svg>
    );
};

/**
 * Sample Visual: Color wave gradient
 */
const ColorWave: React.FC = () => {
    const frame = useCurrentFrame();
    const hueShift = (frame * 2) % 360;
    return (
        <div
            style={{
                width: 60,
                height: 40,
                borderRadius: 6,
                background: `linear-gradient(${hueShift}deg, #FF6B6B, #FECA57, #48DBFB, #FF9FF3)`,
                opacity: 0.6,
            }}
        />
    );
};

/**
 * Sample Visual: Component boxes assembling
 */
const AssemblingBoxes: React.FC = () => {
    const frame = useCurrentFrame();
    return (
        <svg width="60" height="50" viewBox="0 0 60 50" fill="none">
            {[0, 1, 2].map((i) => {
                const targetX = 8 + i * 18;
                const startX = targetX + (i - 1) * 30;
                const x = interpolate(
                    frame % 120,
                    [0, 60, 120],
                    [startX, targetX, startX],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
                );
                return (
                    <rect
                        key={i}
                        x={x}
                        y={10}
                        width={14}
                        height={30}
                        rx={3}
                        fill={['#FF6B6B', '#48DBFB', '#FECA57'][i]}
                        opacity={0.6}
                    />
                );
            })}
        </svg>
    );
};

/**
 * Sample Visual: Rotating gear
 */
const RotatingGear: React.FC = () => {
    const frame = useCurrentFrame();
    const rotation = (frame * 3) % 360;
    return (
        <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            style={{ transform: `rotate(${rotation}deg)` }}
        >
            <circle cx="25" cy="25" r="8" fill={ACCENT_ORANGE} opacity={0.5} />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <rect
                    key={angle}
                    x="23"
                    y="4"
                    width="4"
                    height="10"
                    rx={2}
                    fill={ACCENT_ORANGE}
                    opacity={0.5}
                    style={{ transformOrigin: '25px 25px', transform: `rotate(${angle}deg)` }}
                />
            ))}
        </svg>
    );
};

/**
 * Sample Visual: Animated bar chart
 */
const AnimatedChart: React.FC = () => {
    const frame = useCurrentFrame();
    const heights = [25, 35, 20];
    return (
        <svg width="60" height="50" viewBox="0 0 60 50" fill="none">
            {heights.map((h, i) => {
                const animated = interpolate(
                    (frame + i * 15) % 90,
                    [0, 45, 90],
                    [h * 0.3, h, h * 0.3],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
                );
                return (
                    <rect
                        key={i}
                        x={10 + i * 16}
                        y={48 - animated}
                        width={10}
                        height={animated}
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
 * Sample Visual: Morphing shape (triangle → circle → square)
 */
const MorphingShape: React.FC = () => {
    const frame = useCurrentFrame();
    const phase = Math.floor((frame / 60) % 3);
    const opacity = interpolate(frame % 60, [0, 10, 50, 60], [0, 0.6, 0.6, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    return (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
            {phase === 0 && (
                <polygon points="25,5 45,40 5,40" fill="#FF9FF3" opacity={opacity} />
            )}
            {phase === 1 && (
                <circle cx="25" cy="25" r="18" fill="#FF9FF3" opacity={opacity} />
            )}
            {phase === 2 && (
                <rect x="7" y="7" width="36" height="36" rx={4} fill="#FF9FF3" opacity={opacity} />
            )}
        </svg>
    );
};

const skills = [
    { label: 'Document Creation', sublabel: 'Reports & proposals', icons: '📄', visual: <StackedPages /> },
    { label: 'Frontend Design', sublabel: 'Beautiful interfaces', icons: '🎨', visual: <ColorWave /> },
    { label: 'Web Development', sublabel: 'Full-stack apps', icons: '🌐', visual: <AssemblingBoxes /> },
    { label: 'Automation', sublabel: 'Workflow scripts', icons: '⚙️', visual: <RotatingGear /> },
    { label: 'Data Processing', sublabel: 'Analytics & insights', icons: '📊', visual: <AnimatedChart /> },
    { label: 'Creative Tools', sublabel: 'Design & media', icons: '✨', visual: <MorphingShape /> },
];

export const Scene6_Skills: React.FC = () => {
    const frame = useCurrentFrame();

    // Title highlight
    const titleOpacity = fadeIn(frame, 0, 60);

    // "And I'm always learning more"
    const closingOpacity = fadeIn(frame, 900, 120);

    // Cards collapse transition
    const collapseScale = interpolate(frame, [960, 1080], [1, 0.3], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const collapseOpacity = interpolate(frame, [960, 1080], [1, 0], {
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
            {/* Title: "I've mastered specialized skills" */}
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
                    text="I've mastered specialized skills"
                    mode="word-slide"
                    fontSize={TITLE_MD}
                    fontWeight={FONT_BOLD}
                    color={PRIMARY_TEXT}
                    highlightWord="mastered"
                    highlightColor={ACCENT_ORANGE}
                    startFrame={0}
                    staggerInterval={10}
                />
            </div>

            {/* 6 Skill Cards in horizontal layout */}
            <div
                style={{
                    display: 'flex',
                    gap: '20px',
                    padding: '0 40px',
                    transform: `scale(${collapseScale})`,
                    opacity: collapseOpacity,
                }}
            >
                {skills.map((skill, index) => (
                    <SkillCard
                        key={skill.label}
                        icons={<span style={{ fontSize: 36 }}>{skill.icons}</span>}
                        label={skill.label}
                        sublabel={skill.sublabel}
                        delay={120 + staggerDelay(index, 120)}
                        sampleVisual={skill.visual}
                    />
                ))}
            </div>

            {/* "And I'm always learning more" */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 80,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: BODY_SM,
                    fontWeight: FONT_REGULAR,
                    fontStyle: 'italic',
                    color: SECONDARY_TEXT,
                    opacity: closingOpacity,
                    textAlign: 'center',
                }}
            >
                And I'm always learning more
            </div>
        </AbsoluteFill>
    );
};
