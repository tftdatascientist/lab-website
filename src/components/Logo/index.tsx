'use client';
import dynamic from 'next/dynamic';
import { StaticLogoFallback } from './AnimatedLogo';

const AnimatedLogo = dynamic(() => import('./AnimatedLogo'), {
  ssr: false,
  loading: () => <StaticLogoFallback />,
});

export { AnimatedLogo, StaticLogoFallback };
export type { LogoProps, AccentColor } from './AnimatedLogo';
