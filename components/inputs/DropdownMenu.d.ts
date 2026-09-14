import type { CSSProperties, ReactNode } from 'react';

export interface MenuItem {
  label?: string;
  icon?: ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  /** Renders the fail ink. Destructive items go last. */
  danger?: boolean;
  /** Renders a hairline instead of an item. */
  separator?: boolean;
}

/** A menu of actions hung off a trigger. Closes on outside click and Escape. */
export interface DropdownMenuProps {
  trigger: ReactNode;
  items: MenuItem[];
  align?: 'start' | 'end';
  className?: string;
  style?: CSSProperties;
}
export declare function DropdownMenu(props: DropdownMenuProps): JSX.Element;
