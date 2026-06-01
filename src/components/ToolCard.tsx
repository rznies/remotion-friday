/**
 * ToolCard Component
 * Card with icon, label, sublabel, and micro-animation
 */

import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { scaleIn, fadeIn } from '../utils/animations';
import { SHADOW, PRIMARY_TEXT, SECONDARY_TEXT } from '../utils/colors';
import { LABEL_MD, LABEL_SM } from '../utils/typography';

interface ToolCardProps {
    icon: React.ReactNode;
    label: string;
    sublabel: string;
    delay: number;
    microAnimation: React.ReactNode;
}

export const ToolCard: React.FC<ToolCardProps> = ({
    icon,
    label,
    sublabel,
    delay,
    microAnimation,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = scaleIn(frame, delay, fps);
    const opacity = fadeIn(frame, delay, 30);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                borderRadius: '16px',
                backgroundColor: '#FFFFFF',
                boxShadow: `0 4px 12px ${SHADOW}`,
                transform: `scale(${scale})`,
                opacity,
                width: '200px',
                height: '220px',
                position: 'relative',
            }}
        >
            {/* Icon area with micro-animation */}
            <div
                style={{
                    fontSize: '48px',
                    marginBottom: '12px',
                    position: 'relative',
                }}
            >
                {icon}
                {/* Micro-animation overlay */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    {microAnimation}
                </div>
            </div>

            {/* Label */}
            <div
                style={{
                    fontSize: LABEL_MD,
                    fontWeight: '600',
                    color: PRIMARY_TEXT,
                    textAlign: 'center',
                    marginBottom: '4px',
                }}
            >
                {label}
            </div>

            {/* Sublabel */}
            <div
                style={{
                    fontSize: LABEL_SM,
                    fontWeight: '400',
                    color: SECONDARY_TEXT,
                    textAlign: 'center',
                }}
            >
                {sublabel}
            </div>
        </div>
    );
};
