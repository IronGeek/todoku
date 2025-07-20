import { createElement, isValidElement } from 'react';
import clsx from 'clsx';

import { Link } from '@/components/link';
import { HashIcon } from '@/ui/icons';

import styles from './menu-item.module.scss';

import type { ComponentProps, ReactNode } from 'react';
import type { UrlObject } from 'url';

type SidebarMenuItemProps = ComponentProps<'li'> & {
  icon?: ReactNode
  text?: string
  href?: string | UrlObject
  replace?: boolean
  external?: boolean
  active?: boolean
};

const SidebarMenuItem = ({ className, children, icon, text, href = '#', replace, external, active, ...props }: SidebarMenuItemProps) => {
  return (
    <li {...props} className={clsx(styles.item, "sidebar-menu-item", { active }, className)}>
      {isValidElement<HTMLElement>(icon)
        ? createElement(icon.type, { ...icon.props, className: clsx("sidebar-menu-icon", icon.props.className) })
        : icon !== false
          ? <HashIcon className="sidebar-menu-icon" />
          : null }
      <Link href={href} replace={replace} external={external}>
        {text
          ? <div className="sidebar-menu-text">{text}</div>
          : isValidElement<HTMLElement>(children)
            ? createElement(children.type, { ...children.props, className: clsx("sidebar-menu-text", children.props.className) })
            : typeof children === 'string'
              ? <div className="sidebar-menu-text">{children}</div>
              : null}
      </Link>
    </li>
  )
};

export { SidebarMenuItem };
export type { SidebarMenuItemProps };
