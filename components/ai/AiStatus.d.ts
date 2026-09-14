import type { CSSProperties } from 'react';

/**
 * Katalon AI at work. The mark MOVES — a static avatar here is a bug, not a simplification.
 * @startingPoint section="AI & chat" subtitle="Moving mark + state label" viewport="700x120"
 */
export interface AiStatusProps {
  /** The mode must name the actual work: analyzing a log, executing a suite, working a tool call. */
  mode?:
    | 'thinking' | 'searching' | 'working' | 'solving' | 'listening' | 'analyzing'
    | 'fixing' | 'generating' | 'fetching' | 'debugging' | 'executing' | 'reasoning'
    | 'reviewing' | 'processing' | 'scanning' | 'drafting' | 'waiting';
  /** The words beside the mark. Motion is never the only signal. */
  label: string;
  size?: number;
  /** Forest green on light grounds. */
  tint?: string;
  /**
   * The motion engine — ThinkingMark from thinking-mark.jsx at the package root. Pass it in,
   * or expose it as window.ThinkingMark. Without it the component falls back to the static
   * AI mark and warns: a static mark for a working agent is a defect.
   */
  mark?: React.ComponentType<{ mode?: string; size?: number; tint?: string }>;
  /** Path to the static AI mark used only as the no-engine fallback. */
  aiMarkSrc?: string;
  className?: string;
  style?: CSSProperties;
}
export declare function AiStatus(props: AiStatusProps): JSX.Element;
