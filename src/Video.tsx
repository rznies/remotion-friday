/**
 * Video.tsx — Main Composition
 * Orchestrates all 8 scenes using Sequences with exact frame timings
 * Total: 5400 frames at 60fps = 90 seconds
 */

import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { BG_START, BG_END } from './utils/colors';
import { fontFamily } from './utils/typography';

import { Scene1_Opening } from './scenes/Scene1_Opening';
import { Scene2_HomeBase } from './scenes/Scene2_HomeBase';
import { Scene3_Workspace } from './scenes/Scene3_Workspace';
import { Scene4_Architecture } from './scenes/Scene4_Architecture';
import { Scene5_ToolsGrid } from './scenes/Scene5_ToolsGrid';
import { Scene6_Skills } from './scenes/Scene6_Skills';
import { Scene7_HowItWorks } from './scenes/Scene7_HowItWorks';
import { Scene8_Closing } from './scenes/Scene8_Closing';

export const Video: React.FC = () => {
    return (
        <AbsoluteFill
            style={{
                background: `linear-gradient(135deg, ${BG_START} 0%, ${BG_END} 100%)`,
                fontFamily,
            }}
        >
            {/* ACT 1: Opening — frames 0–720 (0–12s) */}
            <Sequence from={0} durationInFrames={720} premountFor={60}>
                <Scene1_Opening />
            </Sequence>

            {/* ACT 2: Home Base — frames 720–1080 (12–18s) */}
            <Sequence from={720} durationInFrames={360} premountFor={60}>
                <Scene2_HomeBase />
            </Sequence>

            {/* ACT 2 cont: Workspace — frames 1080–1440 (18–24s) */}
            <Sequence from={1080} durationInFrames={360} premountFor={60}>
                <Scene3_Workspace />
            </Sequence>

            {/* ACT 2 cont: Architecture — frames 1440–1680 (24–28s) */}
            <Sequence from={1440} durationInFrames={240} premountFor={60}>
                <Scene4_Architecture />
            </Sequence>

            {/* ACT 3: Tools Grid — frames 1680–3120 (28–52s) */}
            <Sequence from={1680} durationInFrames={1440} premountFor={60}>
                <Scene5_ToolsGrid />
            </Sequence>

            {/* ACT 4: Skills — frames 3120–4200 (52–70s) */}
            <Sequence from={3120} durationInFrames={1080} premountFor={60}>
                <Scene6_Skills />
            </Sequence>

            {/* ACT 5: How It Works — frames 4200–4920 (70–82s) */}
            <Sequence from={4200} durationInFrames={720} premountFor={60}>
                <Scene7_HowItWorks />
            </Sequence>

            {/* ACT 6: Closing — frames 4920–5400 (82–90s) */}
            <Sequence from={4920} durationInFrames={480} premountFor={60}>
                <Scene8_Closing />
            </Sequence>
        </AbsoluteFill>
    );
};
