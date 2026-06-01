/**
 * ParticleField Component
 * Ambient floating particles for backgrounds
 */

import React from 'react';
import { useCurrentFrame, interpolate, random } from 'remotion';

interface ParticleFieldProps {
    count?: number;
    opacity?: number;
    color?: string;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
    count = 20,
    opacity = 0.15,
    color = '#3498DB',
}) => {
    const frame = useCurrentFrame();

    const particles = Array.from({ length: count }, (_, i) => {
        const seed = `particle-${i}`;
        const x = random(seed + '-x') * 100;
        const y = random(seed + '-y') * 100;
        const size = random(seed + '-size') * 3 + 2;
        const speed = random(seed + '-speed') * 0.5 + 0.2;

        // Slow drift upward
        const drift = (frame * speed) % 100;
        const yPos = (y + drift) % 100;

        // Gentle opacity pulse
        const pulseFrames = 120 + random(seed + '-pulse') * 60;
        const opacityMultiplier = interpolate(
            frame % pulseFrames,
            [0, pulseFrames / 2, pulseFrames],
            [0.5, 1, 0.5],
            {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
            },
        );

        return (
            <circle
                key={i}
                cx={`${x}%`}
                cy={`${yPos}%`}
                r={size}
                fill={color}
                opacity={opacity * opacityMultiplier}
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
            {particles}
        </svg>
    );
};
