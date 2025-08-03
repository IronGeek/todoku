import { createElement, isValidElement } from 'react';

import { Link } from '@/components/link.tsx';
import { HashIcon } from '@/ui/icons.ts';
import { cx } from '@/ui/utils.ts';

import styles from './menu-item.module.scss';

import type { UrlObject } from 'url';

import type { ComponentProps, JSX, ReactNode } from 'react';

type SidebarMenuItemProps = ComponentProps<'li'> & {
  readonly active?: boolean
  readonly badge?: ReactNode
  readonly external?: boolean
  readonly href?: string | UrlObject
  readonly icon?: ReactNode
  readonly replace?: boolean
  readonly text?: string
};

const SidebarMenuItem = ({ className, children, icon, badge, text, href = '#', replace, external, active, ...props }: SidebarMenuItemProps): JSX.Element => (
  <li {...props} className={cx(styles.item, 'sidebar-menu-item', { active }, className)}>
    {isValidElement<HTMLElement>(icon)
      ? createElement(icon.type, { ...icon.props, className: cx('sidebar-menu-icon', icon.props.className) })
      : icon !== false
        ? <HashIcon className="sidebar-menu-icon" />
        : null }

    <Link external={external} href={href} replace={replace}>
      {text
        ? <div className="sidebar-menu-text">{text}</div>
        : isValidElement<HTMLElement>(children)
          ? createElement(children.type, { ...children.props, className: cx('sidebar-menu-text', children.props.className) })
          : typeof children === 'string'
            ? <div className="sidebar-menu-text">{children}</div>
            : null}
    </Link>

    {isValidElement<HTMLElement>(badge)
      ? createElement(badge.type, { ...badge.props, className: cx('sidebar-menu-badge', badge.props.className) })
      : badge
        ? <div className="sidebar-menu-badge">{badge}</div>
        : null }
  </li>
);

SidebarMenuItem.displayName = 'SidebarMenuItem';

export { SidebarMenuItem };
export type { SidebarMenuItemProps };
