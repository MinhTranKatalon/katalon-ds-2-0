import React from 'react';

function Node({ node, depth, open, onToggle }) {
  const has = node.children && node.children.length;
  const isOpen = open.includes(node.id);
  return (
    <li role="treeitem" aria-expanded={has ? isOpen : undefined}>
      <span
        onClick={() => has && onToggle(node.id)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          minHeight: 36, paddingLeft: 8 + depth * 16, paddingRight: 8,
          cursor: has ? 'pointer' : 'default', borderRadius: 'var(--k-radius-sm)',
          fontSize: 14, color: 'var(--k-text-body)',
        }}
      >
        {has ? (
          <span aria-hidden="true" style={{
            flex: 'none', width: 12, fontSize: 9, color: 'var(--k-text-tertiary)',
            transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
            transition: 'transform var(--k-dur-fast) var(--k-ease-std)',
          }}>▼</span>
        ) : <span aria-hidden="true" style={{ flex: 'none', width: 12 }} />}
        {node.icon}
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{node.label}</span>
        {node.meta ? <span style={{ marginLeft: 'auto', fontFamily: 'var(--k-font-mono)', fontSize: 12, color: 'var(--k-text-tertiary)' }}>{node.meta}</span> : null}
      </span>
      {has && isOpen ? (
        <ul role="group" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {node.children.map((c) => <Node key={c.id} node={c} depth={depth + 1} open={open} onToggle={onToggle} />)}
        </ul>
      ) : null}
    </li>
  );
}

export function TreeList({ nodes = [], defaultOpen = [], label, className = '', style }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const toggle = (id) => setOpen((o) => o.includes(id) ? o.filter((x) => x !== id) : [...o, id]);
  return (
    <ul role="tree" aria-label={label} className={className} style={{ margin: 0, padding: 0, listStyle: 'none', ...style }}>
      {nodes.map((n) => <Node key={n.id} node={n} depth={0} open={open} onToggle={toggle} />)}
    </ul>
  );
}
