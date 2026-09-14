import type { CSSProperties } from 'react';

/** Starter asks, shown only on an empty conversation. */
export interface SuggestedPromptsProps {
  /** Three to five, each a real question a tester would ask. */
  prompts: string[];
  onPick?: (prompt: string) => void;
  label?: string;
  className?: string;
  style?: CSSProperties;
}
export declare function SuggestedPrompts(props: SuggestedPromptsProps): JSX.Element;
