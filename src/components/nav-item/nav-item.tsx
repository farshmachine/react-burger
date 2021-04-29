import { FC } from 'react';
import Title from '../title/title';

import styles from './nav-item.module.scss';

export type NavItemProps = {
  title: string;
  icon: JSX.Element;
  type?: string;
};

const NavItem: FC<NavItemProps> = ({ title, icon, type }) => {
  return (
    <a href='/' className={`${styles.button} pl-2 pr-2 pb-3 pt-3`}>
      <div className={styles.icon}>{icon}</div>
      <Title className={type ? styles[type] : ''} type='default'>
        {title}
      </Title>
    </a>
  );
};

export default NavItem;
