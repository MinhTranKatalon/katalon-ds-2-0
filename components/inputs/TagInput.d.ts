import type { CSSProperties } from 'react';

/** Free-form labels entered one at a time. Enter or comma commits; Backspace removes the last. */
export interface TagInputProps {
  tags: string[];
  onAdd?: (tag: string) => void;
  onRemove?: (tag: string) => void;
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
}
export declare function TagInput(props: TagInputProps): JSX.Element;
