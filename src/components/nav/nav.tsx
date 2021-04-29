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
        icon: <BurgerIcon type='primary' />,
        type: 'primary',
      },
      {
        title: 'Лента заказов',
        icon: <ListIcon type='secondary' />,
      },
    ],
    []
  );
  return (
    <nav>
      <ul className={styles.nav}>
        {navItems.map(({ title, icon, type }) => (
          <NavItem title={title} icon={icon} type={type} />
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
