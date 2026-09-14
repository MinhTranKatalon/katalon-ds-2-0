import type { CSSProperties } from 'react';

/** Copy, retry and feedback on one assistant turn. Only the handlers you pass are rendered. */
export interface MessageActionsProps {
  onCopy?: () => void;
  onRetry?: () => void;
  onGood?: () => void;
  onBad?: () => void;
  className?: string;
  style?: CSSProperties;
}
export declare function MessageActions(props: MessageActionsProps): JSX.Element;
