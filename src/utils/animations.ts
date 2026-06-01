/**
 * Animation Utilities for Friday Reveal Video
 * Reusable frame-driven animation helpers
 */

import { interpolate, spring, SpringConfig } from 'remotion';

/**
 * Spring Configuration Presets
 */
export const springConfig: Partial<SpringConfig> = { stiffness: 120, damping: 18 };
export const smoothConfig: Partial<SpringConfig> = { damping: 200 };
export const heavyConfig: Partial<SpringConfig> = { stiffness: 100, damping: 20 };
export const lightConfig: Partial<SpringConfig> = { stiffness: 140, damping: 15 };
export const flipConfig: Partial<SpringConfig> = { stiffness: 80, damping: 25 };

/**
 * Fade in animation (0 → 1)
 */
export const fadeIn = (
    frame: number,
    startFrame: number,
    duration: number,
): number => {
    return interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
};

/**
 * Fade out animation (1 → 0)
 */
export const fadeOut = (
    frame: number,
    startFrame: number,
    duration: number,
): number => {
    return interpolate(frame, [startFrame, startFrame + duration], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
};

/**
 * Slide up animation (translateY: 40 → 0)
 */
export const slideUp = (frame: number, delay: number, fps: number): number => {
    const progress = spring({
        frame: frame - delay,
        fps,
        config: springConfig,
    });
    return interpolate(progress, [0, 1], [40, 0]);
};

/**
 * Scale in animation (0.8 → 1)
 */
export const scaleIn = (frame: number, delay: number, fps: number): number => {
    const progress = spring({
        frame: frame - delay,
        fps,
        config: springConfig,
    });
    return interpolate(progress, [0, 1], [0.8, 1]);
};

/**
 * 3D flip animation (rotateY: 0 → 180deg)
 * Used for card flips
 */
export const flip3D = (frame: number, delay: number, fps: number): number => {
    const progress = spring({
        frame: frame - delay,
        fps,
        config: flipConfig,
    });
    return interpolate(progress, [0, 1], [0, 180]);
};

/**
 * Line drawing animation (stroke-dashoffset: 100% → 0%)
 * Used for connection lines
 */
export const lineDrawProgress = (
    frame: number,
    start: number,
    duration: number,
): number => {
    return interpolate(frame, [start, start + duration], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
};

/**
 * Typewriter progress - returns character index to slice string
 * Supports pause after specific text
 */
export const typewriterProgress = (
    frame: number,
    text: string,
    charFrames: number,
    pauseAfter?: string,
    pauseFrames?: number,
): number => {
    if (!pauseAfter || !pauseFrames) {
        return Math.floor(frame / charFrames);
    }

    const pauseIndex = text.indexOf(pauseAfter);
    const preLen =
        pauseIndex >= 0 ? pauseIndex + pauseAfter.length : text.length;

    let typedChars = 0;
    if (frame < preLen * charFrames) {
        typedChars = Math.floor(frame / charFrames);
    } else if (frame < preLen * charFrames + pauseFrames) {
        typedChars = preLen;
    } else {
        const postPhase = frame - preLen * charFrames - pauseFrames;
        typedChars = Math.min(text.length, preLen + Math.floor(postPhase / charFrames));
    }
    return typedChars;
};

/**
 * Calculate stagger delay for array animations
 */
export const staggerDelay = (index: number, intervalFrames: number): number => {
    return index * intervalFrames;
};

/**
 * Pop animation (scale 0 → 1.2 → 1)
 * Used for checkmarks and emphasis
 */
export const popIn = (frame: number, delay: number, fps: number): number => {
    const progress = spring({
        frame: frame - delay,
        fps,
        config: { stiffness: 200, damping: 12 },
    });
    // Overshoot to 1.2, then settle to 1
    return progress > 1 ? 1 : interpolate(progress, [0, 1], [0, 1.2]);
};

/**
 * Pulse animation (continuous loop)
 * Used for breathing effects
 */
export const pulse = (frame: number, fps: number, frequency = 2): number => {
    const cycleFrames = fps * frequency;
    return interpolate(
        frame % cycleFrames,
        [0, cycleFrames / 2, cycleFrames],
        [1, 1.05, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        },
    );
};

/**
 * Blink animation (opacity: 1 → 0 → 1)
 * Used for cursor blinking
 */
export const blink = (frame: number, blinkFrames: number): number => {
    return interpolate(
        frame % blinkFrames,
        [0, blinkFrames / 2, blinkFrames],
        [1, 0, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        },
    );
};
