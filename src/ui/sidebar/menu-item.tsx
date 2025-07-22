import { createElement, isValidElement } from 'react';

import { Link } from '@/components/link';
import { HashIcon } from '@/ui/icons';
import { cx } from '@/ui/utils';

import styles from './menu-item.module.scss';

import type { ComponentProps, ReactNode } from 'react';
import type { UrlObject } from 'url';

type SidebarMenuItemProps = ComponentProps<'li'> & {
  icon?: ReactNode
  badge?: ReactNode
  text?: string
  href?: string | UrlObject
  replace?: boolean
  external?: boolean
  active?: boolean
};

const SidebarMenuItem = ({ className, children, icon, badge, text, href = '#', replace, external, active, ...props }: SidebarMenuItemProps) => {
  return (
    <li {...props} className={cx(styles.item, "sidebar-menu-item", { active }, className)}>
      {isValidElement<HTMLElement>(icon)
        ? createElement(icon.type, { ...icon.props, className: cx("sidebar-menu-icon", icon.props.className) })
        : icon !== false
          ? <HashIcon className="sidebar-menu-icon" />
          : null }
      <Link href={href} replace={replace} external={external}>
        {text
          ? <div className="sidebar-menu-text">{text}</div>
          : isValidElement<HTMLElement>(children)
            ? createElement(children.type, { ...children.props, className: cx("sidebar-menu-text", children.props.className) })
            : typeof children === 'string'
              ? <div className="sidebar-menu-text">{children}</div>
              : null}
      </Link>
      {isValidElement<HTMLElement>(badge)
        ? createElement(badge.type, { ...badge.props, className: cx("sidebar-menu-badge", badge.props.className) })
        : badge
          ? <div className="sidebar-menu-badge">{badge}</div>
          : null }
    </li>
  )
};

export { SidebarMenuItem };
export type { SidebarMenuItemProps };
