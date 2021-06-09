import {
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import NavItem from '../nav-item/nav-item';
import Nav from '../nav/nav';
import styles from './header.module.scss';

export const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Nav />
        <div className={styles.logo}>
          <Logo />
        </div>
        <NavItem
          title={'Личный кабинет'}
          icon={<ProfileIcon type='secondary' />}
          to='/profile'
          exact={false}
        />
      </div>
    </div>
  );
};
