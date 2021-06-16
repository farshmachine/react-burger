import { useRouteMatch } from 'react-router-dom';
import NavItem from '../nav-item/nav-item';
import Title from '../title/title';
import styles from './profile-menu.module.scss';

export const ProfileMenu = () => {
  const { url } = useRouteMatch();

  return (
    <div className={styles.wrapper}>
      <NavItem title={'Профиль'} type='medium' to={'/profile'} />
      <NavItem title={'История заказов'} type='medium' to={`${url}/orders`} />
      <NavItem title={'Выход'} type='medium' />
      <Title className={styles.text}>
        В этом разделе вы можете изменить свои персональные данные
      </Title>
    </div>
  );
};
