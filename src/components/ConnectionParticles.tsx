/**
 * ConnectionParticles Component
 * Animated dots flowing along a connection line
 */

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { ACCENT_BLUE } from '../utils/colors';

interface ConnectionParticlesProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    dotCount?: number;
    staggerFrames?: number;
    loopFrames?: number;
}

export const ConnectionParticles: React.FC<ConnectionParticlesProps> = ({
    x1,
    y1,
    x2,
    y2,
    dotCount = 4,
    staggerFrames = 18,
    loopFrames = 120,
}) => {
    const frame = useCurrentFrame();

    const dots = Array.from({ length: dotCount }, (_, i) => {
        const delay = i * staggerFrames;
        const localFrame = (frame - delay) % loopFrames;

        // Progress from start to end
        const progress = interpolate(localFrame, [0, loopFrames], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        });

        const x = x1 + (x2 - x1) * progress;
        const y = y1 + (y2 - y1) * progress;

        // Fade in at start, fade out at end
        const opacity = interpolate(
            localFrame,
            [0, 15, loopFrames - 15, loopFrames],
            [0, 1, 1, 0],
            {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
            },
        );

        return (
            <circle
                key={i}
                cx={x}
                cy={y}
                r={4}
                fill={ACCENT_BLUE}
                opacity={opacity}
            />
        );
    });

    return (
        <svg
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
            }}
        >
            {dots}
        </svg>
    );
};
