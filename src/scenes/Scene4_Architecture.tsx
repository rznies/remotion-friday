/**
 * Scene4_Architecture
 * ACT 2: Architecture summary with breathing effects + checkmarks (24-28s, frames 0-240 local)
 */

import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { CloudIcon, VMBox, DaytonaIcon } from '../components/icons';
import { fontFamily, BODY_SM, FONT_MEDIUM } from '../utils/typography';
import { BG_START, BG_END, PRIMARY_TEXT, SUCCESS } from '../utils/colors';
import { fadeIn, popIn, pulse } from '../utils/animations';

export const Scene4_Architecture: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Breathing pulse effect on cloud & VM & Daytona
    const breathScale = pulse(frame, fps, 2);

    // Checkmark items
    const checkmarks = ['Clean', 'Fast', 'Scalable'];

    // Fade out for transition
    const transitionOpacity = interpolate(frame, [200, 240], [1, 0], {
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
                opacity: transitionOpacity,
            }}
        >
            {/* Background: Cloud + VM + Daytona (persistent, breathing) */}
            <div
                style={{
                    position: 'absolute',
                    top: '25%',
                    left: '50%',
                    transform: `translate(-50%, -50%) scale(${breathScale})`,
                    opacity: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '60px',
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CloudIcon size={140} color="#4285F4" />
                    <VMBox size={80} color="#5F6368" />
                </div>
                <DaytonaIcon size={100} color="#00BCD4" />
            </div>

            {/* Checkmarks: ✓ Clean ✓ Fast ✓ Scalable */}
            <div
                style={{
                    display: 'flex',
                    gap: '60px',
                    position: 'absolute',
                    top: '55%',
                }}
            >
                {checkmarks.map((item, index) => {
                    const delay = 60 + index * 40;
                    const scale = popIn(frame, delay, fps);
                    const opacity = fadeIn(frame, delay, 30);

                    return (
                        <div
                            key={item}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                transform: `scale(${scale})`,
                                opacity,
                            }}
                        >
                            <span
                                style={{
                                    fontSize: 36,
                                    color: SUCCESS,
                                    fontWeight: '700',
                                }}
                            >
                                ✓
                            </span>
                            <span
                                style={{
                                    fontSize: BODY_SM,
                                    fontWeight: FONT_MEDIUM,
                                    color: PRIMARY_TEXT,
                                }}
                            >
                                {item}
                            </span>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
