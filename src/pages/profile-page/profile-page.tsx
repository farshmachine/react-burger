import { Switch, useLocation, useRouteMatch } from 'react-router-dom';
import { ProfileForm } from '../../components/profile-form/profile-form';
import { ProfileMenu } from '../../components/profile-menu/profile-menu';
import { ProtectedRoute } from '../../components/protected-route/protected-route';
import { FeedItemPage } from '../feed-item/feed-item';
import { ProfileOrdersPage } from '../profile-orders/profile-orders';
import styles from './profile-page.module.scss';

export const ProfilePage = () => {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();
  const isOrderPage = pathname.split('/').length === 4;

  return (
    <div className={styles.wrapper}>
      {!isOrderPage && <ProfileMenu />}
      <Switch>
        <ProtectedRoute path={path} exact>
          <ProfileForm />
        </ProtectedRoute>
        <ProtectedRoute path={`${path}/orders`} exact>
          <ProfileOrdersPage />
        </ProtectedRoute>
        <ProtectedRoute path={'/profile/orders/:id'}>
          <FeedItemPage />
        </ProtectedRoute>
      </Switch>
    </div>
  );
};
