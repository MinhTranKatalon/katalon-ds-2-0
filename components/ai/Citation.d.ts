import type { CSSProperties } from 'react';

export interface Source { label: string; href?: string; meta?: string; }

/** An inline reference inside an assistant answer. */
export interface CitationProps {
  /** The numeral shown in the pill, matching its entry in CitationSources. */
  index?: number;
  label: string;
  href?: string;
  className?: string;
  style?: CSSProperties;
}
export declare function Citation(props: CitationProps): JSX.Element;

/** The numbered source list under an answer. */
export interface CitationSourcesProps {
  sources: Source[];
  label?: string;
  className?: string;
  style?: CSSProperties;
}
export declare function CitationSources(props: CitationSourcesProps): JSX.Element;
