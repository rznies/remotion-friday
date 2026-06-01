/**
 * TextReveal Component
 * Supports multiple animation modes: word-slide, char-slide, fade, wipe
 */

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { springConfig } from '../utils/animations';

export type TextRevealMode = 'word-slide' | 'char-slide' | 'fade' | 'wipe';

interface TextRevealProps {
    text: string;
    mode: TextRevealMode;
    fontSize: number;
    fontWeight: string;
    color: string;
    highlightWord?: string;
    highlightColor?: string;
    startFrame?: number;
    staggerInterval?: number; // frames between each word/char
}

export const TextReveal: React.FC<TextRevealProps> = ({
    text,
    mode,
    fontSize,
    fontWeight,
    color,
    highlightWord,
    highlightColor,
    startFrame = 0,
    staggerInterval = 5,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const localFrame = frame - startFrame;

    if (mode === 'word-slide') {
        const words = text.split(' ');
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em' }}>
                {words.map((word, index) => {
                    const delay = index * staggerInterval;
                    const progress = spring({
                        frame: localFrame - delay,
                        fps,
                        config: springConfig,
                    });

                    const translateY = interpolate(progress, [0, 1], [40, 0]);
                    const opacity = interpolate(progress, [0, 1], [0, 1], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                    });

                    const isHighlight = highlightWord && word === highlightWord;

                    return (
                        <span
                            key={index}
                            style={{
                                fontSize,
                                fontWeight,
                                color: isHighlight ? highlightColor : color,
                                transform: `translateY(${translateY}px)`,
                                opacity,
                                display: 'inline-block',
                            }}
                        >
                            {word}
                        </span>
                    );
                })}
            </div>
        );
    }

    if (mode === 'char-slide') {
        const chars = text.split('');
        // Helper to check if a character index belongs to the highlighted word
        let highlightIndices: number[] = [];
        if (highlightWord) {
            const wordIndex = text.indexOf(highlightWord);
            if (wordIndex !== -1) {
                for (let i = 0; i < highlightWord.length; i++) {
                    highlightIndices.push(wordIndex + i);
                }
            }
        }

        return (
            <div style={{ display: 'flex' }}>
                {chars.map((char, index) => {
                    const delay = index * staggerInterval;
                    const progress = spring({
                        frame: localFrame - delay,
                        fps,
                        config: springConfig,
                    });

                    const translateY = interpolate(progress, [0, 1], [40, 0]);
                    const opacity = interpolate(progress, [0, 1], [0, 1], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                    });

                    const isHighlight = highlightIndices.includes(index);

                    return (
                        <span
                            key={index}
                            style={{
                                fontSize,
                                fontWeight,
                                color: isHighlight ? highlightColor : color,
                                transform: `translateY(${translateY}px)`,
                                opacity,
                                display: 'inline-block',
                            }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    );
                })}
            </div>
        );
    }

    if (mode === 'fade') {
        const opacity = interpolate(localFrame, [0, 30], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        });

        return (
            <div
                style={{
                    fontSize,
                    fontWeight,
                    color,
                    opacity,
                }}
            >
                {text}
            </div>
        );
    }

    if (mode === 'wipe') {
        const progress = interpolate(localFrame, [0, 40], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        });

        const clipPath = `inset(0 ${100 - progress * 100}% 0 0)`;

        return (
            <div
                style={{
                    fontSize,
                    fontWeight,
                    color,
                    clipPath,
                }}
            >
                {text}
            </div>
        );
    }

    return null;
};
