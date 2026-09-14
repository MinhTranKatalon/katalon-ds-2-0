import type { CSSProperties } from 'react';

/** A tool the assistant ran, collapsed by default, with its raw output on demand. */
export interface ToolCallProps {
  /** The tool name, verbatim, in mono. */
  name: string;
  state?: 'running' | 'done' | 'failed';
  /** One line of what it did or returned. */
  summary?: string;
  /** Raw output. Rendered on the forest code surface when expanded. */
  detail?: string;
  defaultOpen?: boolean;
  className?: string;
  style?: CSSProperties;
}
export declare function ToolCall(props: ToolCallProps): JSX.Element;
