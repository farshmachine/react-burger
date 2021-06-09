import {
  BurgerIcon,
  ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useMemo } from 'react';
import NavItem from '../nav-item/nav-item';
import styles from './nav.module.scss';

type NavProps = {};

const Nav: FC<NavProps> = () => {
  const navItems = useMemo(
    () => [
      {
        title: 'Конструктор',
        icon: <BurgerIcon type='secondary' />,
        to: '/',
      },
      {
        title: 'Лента заказов',
        icon: <ListIcon type='secondary' />,
        to: '/feed',
      },
    ],
    []
  );
  return (
    <nav>
      <ul className={styles.nav}>
        {navItems.map(({ title, icon, to }) => (
          <NavItem to={to} title={title} icon={icon} key={title} />
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
