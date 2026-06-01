/**
 * Scene8_Closing
 * ACT 6: Closing message + social handles (82-90s, frames 0-480 local)
 */

import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { ParticleField } from '../components/ParticleField';
import {
    fontFamily,
    TITLE_XL,
    TITLE_XS,
    BODY_SM,
    BODY_XS,
    FONT_BOLD,
    FONT_REGULAR,
    FONT_MEDIUM,
} from '../utils/typography';
import { BG_START, BG_END, PRIMARY_TEXT, ACCENT_BLUE, SECONDARY_TEXT } from '../utils/colors';
import { fadeIn, pulse } from '../utils/animations';

export const Scene8_Closing: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // "This is Friday" — fade + scale (frames 0–120)
    const titleScale = interpolate(
        spring({
            frame,
            fps,
            config: { stiffness: 100, damping: 20 },
        }),
        [0, 1],
        [0.95, 1],
    );
    const titleOpacity = fadeIn(frame, 0, 60);

    // "Your AI that actually works" — italic + underline (frames 120–240)
    const subtitleOpacity = fadeIn(frame, 120, 60);

    // Underline draw
    const underlineWidth = interpolate(frame, [150, 240], [0, 100], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // "Follow the journey" — gentle pulse (frames 240–360)
    const followOpacity = fadeIn(frame, 240, 60);
    const followPulse = pulse(frame, fps, 3);

    // Social handles — slide from bottom (frames 300–400)
    const linkedInDelay = 300;
    const twitterDelay = 330;
    const linkedInSlide = spring({
        frame: frame - linkedInDelay,
        fps,
        config: { stiffness: 120, damping: 18 },
    });
    const twitterSlide = spring({
        frame: frame - twitterDelay,
        fps,
        config: { stiffness: 120, damping: 18 },
    });

    const linkedInTranslateY = interpolate(linkedInSlide, [0, 1], [40, 0]);
    const twitterTranslateY = interpolate(twitterSlide, [0, 1], [40, 0]);

    // Final fade to white (frames 440–480)
    const whiteOverlay = interpolate(frame, [440, 480], [0, 1], {
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
            {/* Particle field background */}
            <ParticleField count={20} opacity={0.1} color={ACCENT_BLUE} />

            {/* "This is Friday" */}
            <div
                style={{
                    position: 'absolute',
                    top: '25%',
                    left: '50%',
                    transform: `translate(-50%, -50%) scale(${titleScale})`,
                    opacity: titleOpacity,
                    fontSize: TITLE_XL,
                    fontWeight: FONT_BOLD,
                    color: PRIMARY_TEXT,
                    textAlign: 'center',
                }}
            >
                This is Friday
            </div>

            {/* "Your AI that actually works" — underline draw */}
            <div
                style={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: subtitleOpacity,
                    textAlign: 'center',
                }}
            >
                <span
                    style={{
                        fontSize: TITLE_XS,
                        fontWeight: FONT_REGULAR,
                        fontStyle: 'italic',
                        color: PRIMARY_TEXT,
                    }}
                >
                    Your AI that actually works
                </span>
                <div
                    style={{
                        width: `${underlineWidth}%`,
                        height: 3,
                        backgroundColor: ACCENT_BLUE,
                        margin: '8px auto 0',
                        borderRadius: 2,
                    }}
                />
            </div>

            {/* "Follow the journey" */}
            <div
                style={{
                    position: 'absolute',
                    top: '55%',
                    left: '50%',
                    transform: `translate(-50%, -50%) scale(${followPulse})`,
                    opacity: followOpacity,
                    fontSize: BODY_SM,
                    fontWeight: FONT_MEDIUM,
                    color: SECONDARY_TEXT,
                    textAlign: 'center',
                }}
            >
                Follow the journey
            </div>

            {/* Social handles */}
            <div
                style={{
                    position: 'absolute',
                    top: '65%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '60px',
                }}
            >
                {/* LinkedIn */}
                <div
                    style={{
                        transform: `translateY(${linkedInTranslateY}px)`,
                        opacity: linkedInSlide,
                        fontSize: BODY_XS,
                        fontWeight: FONT_MEDIUM,
                        color: ACCENT_BLUE,
                        textAlign: 'center',
                    }}
                >
                    🔗 LinkedIn
                </div>

                {/* X / Twitter */}
                <div
                    style={{
                        transform: `translateY(${twitterTranslateY}px)`,
                        opacity: twitterSlide,
                        fontSize: BODY_XS,
                        fontWeight: FONT_MEDIUM,
                        color: PRIMARY_TEXT,
                        textAlign: 'center',
                    }}
                >
                    𝕏 Twitter
                </div>
            </div>

            {/* White overlay fade */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#FFFFFF',
                    opacity: whiteOverlay,
                    pointerEvents: 'none',
                }}
            />
        </AbsoluteFill>
    );
};
