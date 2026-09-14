import type { CSSProperties, ReactNode } from 'react';

/**
 * A status pill. The tint carries the meaning, the label carries the word — never colour alone.
 * @startingPoint section="Data display" subtitle="8 status tones with dots" viewport="700x120"
 */
export interface BadgeProps {
  tone?: 'pass' | 'fail' | 'flaky' | 'warning' | 'pending' | 'info' | 'neutral' | 'action';
  /** Adds the 6px tone dot — the second signal beside the tint. */
  dot?: boolean;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** The status word. Required in practice: a badge with no label is colour-only. */
  children?: ReactNode;
}
export declare function Badge(props: BadgeProps): JSX.Element;
