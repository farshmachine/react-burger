import { FC } from 'react';
import Title from '../title/title';

import styles from './nav-item.module.scss';
import cn from 'classnames';

type NavItemProps = {
  title: string;
  icon: JSX.Element;
  type?: string;
};

const NavItem: FC<NavItemProps> = ({ title, icon, type }) => {
  return (
    <a
      href='/'
      className={cn(styles.button, 'pl-2 pr-2 pb-3 pt-3')}
      key={title}
    >
      <div className={styles.icon}>{icon}</div>
      <Title className={type ? styles[type] : ''}>{title}</Title>
    </a>
  );
};

export default NavItem;
