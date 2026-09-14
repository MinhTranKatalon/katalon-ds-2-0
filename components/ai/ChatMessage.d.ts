import type { CSSProperties, ReactNode } from 'react';

/** One turn in a Katalon AI conversation. The assistant is marked by the AI brand asset. */
export interface ChatMessageProps {
  role?: 'user' | 'assistant';
  /** The person's name. Ignored for the assistant — it is always "Katalon AI". */
  name?: string;
  authorSrc?: string;
  /**
   * Path to the Katalon AI mark, resolved from YOUR page. Defaults to the repo path
   * assets/brand-svg/ai-katalon-color.svg; use ai-katalon-white.svg on green, dark or image
   * grounds. A locked brand asset — swap the file, never filter or recolour it.
   */
  aiMarkSrc?: string;
  /** MessageActions, Citation sources, or a Timestamp. */
  footer?: ReactNode;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
export declare function ChatMessage(props: ChatMessageProps): JSX.Element;
