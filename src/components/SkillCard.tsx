/**
 * SkillCard Component
 * 3D flip card animation for skills showcase
 */

import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { flip3D, fadeIn } from '../utils/animations';
import { SHADOW_MEDIUM, PRIMARY_TEXT, SECONDARY_TEXT } from '../utils/colors';
import { LABEL_MD, LABEL_SM } from '../utils/typography';

interface SkillCardProps {
    icons: React.ReactNode;
    label: string;
    sublabel: string;
    delay: number;
    sampleVisual: React.ReactNode;
}

export const SkillCard: React.FC<SkillCardProps> = ({
    icons,
    label,
    sublabel,
    delay,
    sampleVisual,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Flip from 180deg (invisible/back) to 0deg (front/visible)
    const rotateY = interpolate(
        spring({
            frame: frame - delay,
            fps,
            config: { stiffness: 80, damping: 25 },
        }),
        [0, 1],
        [180, 0]
    );
    const opacity = fadeIn(frame, delay, 30);



    return (
        <div
            style={{
                perspective: '1000px',
                width: '240px',
                height: '280px',
                opacity,
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    transform: `rotateY(${rotateY}deg)`,
                    transformStyle: 'preserve-3d',
                    position: 'relative',
                }}
            >
                {/* Front face */}
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '24px',
                        borderRadius: '16px',
                        backgroundColor: '#FFFFFF',
                        boxShadow: `0 8px 24px ${SHADOW_MEDIUM}`,
                    }}
                >
                    {/* Icons */}
                    <div style={{ fontSize: '40px', marginBottom: '16px' }}>
                        {icons}
                    </div>

                    {/* Sample Visual */}
                    <div style={{ marginBottom: '16px' }}>
                        {sampleVisual}
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
            </div>
        </div>
    );
};
