import type { CSSProperties } from 'react';

/** A drop zone with a real browse fallback. The dashed border is 1.5px by spec. */
export interface FileUploadProps {
  /** Accept filter, e.g. ".csv,.json". */
  accept?: string;
  multiple?: boolean;
  onFiles?: (files: File[]) => void;
  /** One line saying what belongs here and in what format. */
  hint?: string;
  className?: string;
  style?: CSSProperties;
}
export declare function FileUpload(props: FileUploadProps): JSX.Element;
