import { FC } from 'react';
import Title from '../title/title';

import styles from './nav-item.module.scss';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

type NavItemProps = {
  title: string;
  icon?: JSX.Element;
  to?: string;
  type?: 'default' | 'large' | 'medium' | 'small';
  exact?: boolean;
};

const NavItem: FC<NavItemProps> = ({
  title,
  icon,
  type = 'default',
  to = '',
  exact = true,
}) => {
  return (
    <NavLink
      activeClassName={styles.active}
      to={to}
      className={cn(styles.button, 'pl-2 pr-2 pb-3 pt-3')}
      key={title}
      exact={exact}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      <Title type={type}>{title}</Title>
    </NavLink>
  );
};

export default NavItem;
