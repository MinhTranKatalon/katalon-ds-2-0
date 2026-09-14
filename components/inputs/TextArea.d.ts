import type { CSSProperties, TextareaHTMLAttributes } from 'react';

export interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'style'> {
  invalid?: boolean;
  rows?: number;
  className?: string;
  style?: CSSProperties;
}
export declare function TextArea(props: TextAreaProps): JSX.Element;
