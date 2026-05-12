'use client';
import dynamic from 'next/dynamic';
import { StaticLogoFallback } from './AnimatedLogo';
import type { LogoProps } from './AnimatedLogo';

export { StaticLogoFallback };

const AnimatedLogoDynamic = dynamic(() => import('./AnimatedLogo'), {
  ssr: false,
  loading: () => <StaticLogoFallback />,
});

export default function AnimatedLogoWrapper(props: LogoProps) {
  return <AnimatedLogoDynamic {...props} />;
}
