import type { CSSProperties } from 'react';

export interface TypeaheadOption { value: string; label: string; meta?: string; }

/** Type-to-filter over a list too long to show. Filtering is the caller's data, not a fetch. */
export interface TypeaheadProps {
  options: TypeaheadOption[];
  value?: string;
  onChange?: (query: string) => void;
  onSelect?: (option: TypeaheadOption) => void;
  placeholder?: string;
  /** Shown when the query matches nothing. Say what would match. */
  emptyText?: string;
  className?: string;
  style?: CSSProperties;
}
export declare function Typeahead(props: TypeaheadProps): JSX.Element;
