/**
 * Cloud Icon - GCP Cloud
 */
import React from 'react';

export const CloudIcon: React.FC<{ size?: number; color?: string }> = ({
    size = 100,
    color = '#4285F4',
}) => (
    <svg width={size} height={size * 0.7} viewBox="0 0 100 70" fill="none">
        <path
            d="M75 30c0-11-9-20-20-20-8 0-15 5-18 12-1 0-2-1-3-1-8 0-14 6-14 14 0 1 0 2 1 3-5 2-8 7-8 13 0 8 6 14 14 14h44c8 0 15-7 15-15 0-7-5-13-11-14z"
            fill={color}
        />
    </svg>
);

/**
 * VM Box Icon - Virtual Machine
 */
export const VMBox: React.FC<{ size?: number; color?: string }> = ({
    size = 80,
    color = '#5F6368',
}) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <rect x="10" y="10" width="60" height="60" rx="4" stroke={color} strokeWidth="2" fill="none" />
        <line x1="10" y1="25" x2="70" y2="25" stroke={color} strokeWidth="2" />
        <circle cx="20" cy="17.5" r="2" fill={color} />
        <circle cx="28" cy="17.5" r="2" fill={color} />
        <circle cx="36" cy="17.5" r="2" fill={color} />
        <rect x="20" y="35" width="40" height="4" rx="2" fill={color} opacity="0.4" />
        <rect x="20" y="45" width="30" height="4" rx="2" fill={color} opacity="0.4" />
        <rect x="20" y="55" width="35" height="4" rx="2" fill={color} opacity="0.4" />
    </svg>
);

/**
 * Daytona Icon - Container/Sandbox
 */
export const DaytonaIcon: React.FC<{ size?: number; color?: string }> = ({
    size = 80,
    color = '#00BCD4',
}) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <rect x="15" y="15" width="50" height="50" rx="6" stroke={color} strokeWidth="2" fill="none" />
        <path d="M25 30h30M25 40h30M25 50h30" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <circle cx="35" cy="35" r="3" fill={color} opacity="0.5" />
    </svg>
);

/**
 * GitHub Icon
 */
export const GitHubIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="20" fill="#181717" />
        <path
            d="M24 8c-8.8 0-16 7.2-16 16 0 7.1 4.6 13.1 10.9 15.2.8.1 1.1-.3 1.1-.8v-2.7c-4.5 1-5.4-2.2-5.4-2.2-.7-1.8-1.8-2.3-1.8-2.3-1.5-1 .1-1 .1-1 1.6.1 2.5 1.7 2.5 1.7 1.4 2.4 3.7 1.7 4.7 1.3.1-1 .6-1.7 1-2.1-3.6-.4-7.4-1.8-7.4-8 0-1.8.6-3.2 1.7-4.4-.2-.4-.7-2 .2-4.2 0 0 1.4-.4 4.5 1.7 1.3-.4 2.7-.5 4.1-.5 1.4 0 2.8.2 4.1.5 3.1-2.1 4.5-1.7 4.5-1.7.9 2.2.3 3.8.2 4.2 1 1.2 1.7 2.6 1.7 4.4 0 6.2-3.8 7.6-7.4 8 .6.5 1.1 1.5 1.1 3v4.4c0 .4.3.9 1.1.8 6.4-2.1 10.9-8.1 10.9-15.2 0-8.8-7.2-16-16-16z"
            fill="white"
        />
    </svg>
);

/**
 * Firecrawl Icon - Flame + Magnifying Glass
 */
export const FirecrawlIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <path
            d="M24 10c-2 4-3 8-1 12 1 2 3 3 5 3 1 0 2-1 2-2 0-3-2-5-2-8 0-2 1-3 2-3 2 0 3 2 3 4 0 4-1 7-3 10-1 2-3 3-5 3-4 0-7-3-7-7 0-5 2-9 4-12z"
            fill="#FF5722"
        />
        <circle cx="32" cy="32" r="8" stroke="#333" strokeWidth="2" fill="none" />
        <line x1="38" y1="38" x2="44" y2="44" stroke="#333" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

/**
 * WhatsApp Icon
 */
export const WhatsAppIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="20" fill="#25D366" />
        <path
            d="M24 8c-8.8 0-16 7.2-16 16 0 2.8.7 5.5 2.1 7.8L8 40l8.4-2.1c2.3 1.3 4.9 2.1 7.6 2.1 8.8 0 16-7.2 16-16S32.8 8 24 8zm8 22c-.3.9-1.8 1.7-3 1.9-.8.2-1.8.3-3-.2-1-.4-2.2-1-3.8-1.9-4.4-2.5-7.2-6.9-7.4-7.2-.2-.3-1.7-2.3-1.7-4.3s1.1-3.1 1.5-3.5c.3-.3.8-.5 1.1-.5.3 0 .5 0 .8.1.3 0 .6.1.9.7.3.7 1.1 2.7 1.2 2.9.1.2.2.4.1.7-.1.3-.2.4-.4.7-.2.2-.4.5-.6.7-.2.2-.4.4-.2.8.2.4 1 1.6 2.1 2.6 1.5 1.3 2.7 1.7 3.1 1.9.4.2.6.1.8-.1.2-.2.9-1 1.1-1.4.2-.4.5-.3.8-.2.3.1 2.1 1 2.5 1.2.4.2.6.3.7.5.1.3.1 1.4-.2 2.3z"
            fill="white"
        />
    </svg>
);

/**
 * Gmail Icon
 */
export const GmailIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <path d="M8 36V16l16 10 16-10v20c0 2.2-1.8 4-4 4H12c-2.2 0-4-1.8-4-4z" fill="#F4B400" />
        <path d="M8 16l16 10V14z" fill="#EA4335" />
        <path d="M24 26l16-10v12z" fill="#34A853" />
        <path d="M8 14c0-1.1.9-2 2-2h4l10 8-10 6z" fill="#C5221F" />
        <path d="M40 14c0-1.1-.9-2-2-2h-4l-10 8 10 6z" fill="#0F9D58" />
    </svg>
);

/**
 * Google Workspace Icon
 */
export const GoogleWorkspaceIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="4" fill="#4285F4" />
        <path d="M14 16h20M14 24h20M14 32h14" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

/**
 * Gemini Icon - Sparkle/Star
 */
export const GeminiIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <path
            d="M24 4l2 20 20 2-20 2-2 20-2-20-20-2 20-2z"
            fill="url(#gemini-gradient)"
        />
        <defs>
            <linearGradient id="gemini-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4285F4" />
                <stop offset="50%" stopColor="#EA4335" />
                <stop offset="100%" stopColor="#FBBC04" />
            </linearGradient>
        </defs>
    </svg>
);

/**
 * OpenCode Icon - Code Brackets
 */
export const OpenCodeIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <path
            d="M16 14l-8 10 8 10M32 14l8 10-8 10M28 10l-8 28"
            stroke="#5C6BC0"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

/**
 * Parallel Icon - Parallel Lines
 */
export const ParallelIcon: React.FC<{ size?: number }> = ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <path d="M8 16h32M8 24h32M8 32h32" stroke="#00BCD4" strokeWidth="3" strokeLinecap="round" />
    </svg>
);
