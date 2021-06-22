import { useCallback } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useUser } from '../../hooks/useUser';
import { logout } from '../../services/user/user';
import NavItem from '../nav-item/nav-item';
import Title from '../title/title';
import styles from './profile-menu.module.scss';

export const ProfileMenu = () => {
  const { loading } = useUser();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { url } = useRouteMatch();

  const onLogout = useCallback(() => {
    history.push('/login');
  }, [history]);

  const handleLogout = () => {
    dispatch(logout()).then(onLogout);
  };

  return (
    <div className={styles.wrapper}>
      <NavItem title={'Профиль'} type='medium' to={'/profile'} />
      <NavItem title={'История заказов'} type='medium' to={`${url}/orders`} />
      <Title className={styles.button} type={'medium'} onClick={handleLogout}>
        {loading ? 'Ожидайте...' : 'Выход'}
      </Title>
      <Title className={styles.text}>
        В этом разделе вы можете изменить свои персональные данные
      </Title>
    </div>
  );
};
