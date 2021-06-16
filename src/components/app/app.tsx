import { FC } from 'react';
import { Header } from '../header/header';
import Main from '../../pages/main/main';
import styles from './app.module.scss';
import { ApiContext } from '../../contexts/api-context';
import { ingredientsApi } from '../../api/ingredients';
import { orderApi } from '../../api/order';
import { userApi } from '../../api/user';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPwdPage } from '../../pages/forgot-pwd/forgot-pwd';
import { ResetPwdPage } from '../../pages/reset-pwd/reset-pwd';
import { FeedPage } from '../../pages/feed/feed';
import { FeedItemPage } from '../../pages/feed-item/feed-item';
import { ProfilePage } from '../../pages/profile-page/profile-page';
import { ProtectedRoute } from '../protected-route/protected-route';
import Modal from '../modal/modal';
import IngredientDetailsPage from '../ingredient-details/ingredient-details';

type AppProps = {};

const App: FC<AppProps> = () => {
  const history = useHistory();
  const location = useLocation<{ background: any }>();
  const { pathname } = location;
  const background = location.state && location.state.background;

  return (
    <div className={styles.app}>
      <ApiContext.Provider
        value={{
          ingredientsApi,
          orderApi,
          userApi,
        }}
      >
        <Header />
        <div className={styles.content}>
          <Switch location={background || location}>
            <Route path='/login'>
              <LoginPage />
            </Route>
            <Route path='/register'>
              <RegisterPage />
            </Route>
            <Route path='/forgot-password'>
              <ForgotPwdPage />
            </Route>
            <Route path='/reset-password'>
              <ResetPwdPage />
            </Route>
            <Route path='/feed' exact>
              <FeedPage />
            </Route>
            <Route path='/feed/:id'>
              <FeedItemPage />
            </Route>
            <Route path='/ingredients/:id'>
              <IngredientDetailsPage />
            </Route>
            <ProtectedRoute path='/profile'>
              <ProfilePage />
            </ProtectedRoute>
            <Route path='/' exact>
              <Main />
            </Route>
          </Switch>
          {background && (
            <Route
              path={['/feed/:id', '/profile/orders/:id', '/ingredients/:id']}
              children={
                <Modal
                  children={
                    pathname.includes('ingredients') ? (
                      <IngredientDetailsPage />
                    ) : (
                      <FeedItemPage />
                    )
                  }
                  isOpened={true}
                  handleClose={() => history.goBack()}
                />
              }
            />
          )}
        </div>
      </ApiContext.Provider>
    </div>
  );
};

export default App;
