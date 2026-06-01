/**
 * FlowDiagram Component
 * 5-step animated process flow: You Ask → I Analyze → Choose Tools → Execute → Deliver
 */

import React from 'react';
import { useCurrentFrame, interpolate, useVideoConfig } from 'remotion';
import { lineDrawProgress, popIn } from '../utils/animations';
import { PRIMARY_TEXT, SECONDARY_TEXT, ACCENT_BLUE, SUCCESS } from '../utils/colors';
import { LABEL_MD } from '../utils/typography';

interface FlowStep {
    label: string;
    icon: string;
    color: string;
}

const steps: FlowStep[] = [
    { label: 'You Ask', icon: '💬', color: ACCENT_BLUE },
    { label: 'I Analyze', icon: '🧠', color: ACCENT_BLUE },
    { label: 'Choose Tools', icon: '🔧', color: ACCENT_BLUE },
    { label: 'Execute', icon: '⚡', color: ACCENT_BLUE },
    { label: 'Deliver', icon: '✓', color: SUCCESS },
];

export const FlowDiagram: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const stepDuration = 60; // frames per step
    const connectionDuration = 30; // frames for line drawing

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '40px',
            }}
        >
            {steps.map((step, index) => {
                const stepStart = index * stepDuration;
                const scale = popIn(frame, stepStart, fps);
                const opacity = interpolate(frame, [stepStart, stepStart + 20], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                });

                // Connection line to next step
                const showConnection = index < steps.length - 1;
                const connectionStart = stepStart + stepDuration / 2;
                const lineProgress = lineDrawProgress(
                    frame,
                    connectionStart,
                    connectionDuration,
                );

                return (
                    <React.Fragment key={index}>
                        {/* Step bubble */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '12px',
                            }}
                        >
                            {/* Icon circle */}
                            <div
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    backgroundColor: step.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '36px',
                                    transform: `scale(${scale})`,
                                    opacity,
                                    boxShadow: `0 4px 12px ${step.color}40`,
                                }}
                            >
                                {step.icon}
                            </div>

                            {/* Label */}
                            <div
                                style={{
                                    fontSize: LABEL_MD,
                                    fontWeight: '600',
                                    color: PRIMARY_TEXT,
                                    opacity,
                                }}
                            >
                                {step.label}
                            </div>
                        </div>

                        {/* Connection arrow */}
                        {showConnection && (
                            <div
                                style={{
                                    position: 'relative',
                                    width: '60px',
                                    height: '4px',
                                }}
                            >
                                <svg
                                    width="60"
                                    height="4"
                                    viewBox="0 0 60 4"
                                    style={{
                                        overflow: 'visible',
                                    }}
                                >
                                    {/* Arrow line */}
                                    <line
                                        x1="0"
                                        y1="2"
                                        x2="60"
                                        y2="2"
                                        stroke={SECONDARY_TEXT}
                                        strokeWidth="2"
                                        strokeDasharray="60"
                                        strokeDashoffset={lineProgress * 60}
                                    />
                                    {/* Arrow head */}
                                    <polygon
                                        points="55,0 60,2 55,4"
                                        fill={SECONDARY_TEXT}
                                        opacity={lineProgress < 0.2 ? 1 : 0}
                                    />
                                </svg>

                                {/* Flowing particles - continuous loop */}
                                {[0, 1].map((pIndex) => {
                                    const loopDuration = 90; // Frames for one full cycle
                                    const offset = pIndex * (loopDuration / 2); // Spacing between particles
                                    const progress = ((frame + offset) % loopDuration) / loopDuration;

                                    // Only show if connection has started drawing
                                    const isVisible = frame > connectionStart;

                                    return isVisible ? (
                                        <div
                                            key={pIndex}
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: `${progress * 100}%`,
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                backgroundColor: ACCENT_BLUE,
                                                transform: 'translate(-50%, -50%)',
                                                opacity: lineProgress < 0.8 ? 1 : 0,
                                            }}
                                        />
                                    ) : null;
                                })}
                            </div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};
