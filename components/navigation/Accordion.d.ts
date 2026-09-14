import type { CSSProperties, ReactNode } from 'react';

export interface AccordionItem { id: string; title: string; body: ReactNode; }

/** Progressive disclosure for long prose — FAQ, docs, a settings group. */
export interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string[];
  /** false makes it behave as one-at-a-time. */
  allowMultiple?: boolean;
  className?: string;
  style?: CSSProperties;
}
export declare function Accordion(props: AccordionProps): JSX.Element;
