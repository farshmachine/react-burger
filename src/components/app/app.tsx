import { FC } from 'react';
import { Header } from '../header/header';
import Main from '../../pages/main/main';
import styles from './app.module.scss';
import { ApiContext } from '../../contexts/api-context';
import { ingredientsApi } from '../../api/ingredients';
import { orderApi } from '../../api/order';
import { userApi } from '../../api/user';
import { Provider } from 'react-redux';
import { store } from '../../services/store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPwdPage } from '../../pages/forgot-pwd/forgot-pwd';
import { ResetPwdPage } from '../../pages/reset-pwd/reset-pwd';
import { FeedPage } from '../../pages/feed/feed';
import { FeedItemPage } from '../../pages/feed-item/feed-item';
import { ProfilePage } from '../../pages/profile-page/profile-page';
import ModalProvider from '../modal-provider/modal-provider';

type AppProps = {};

const App: FC<AppProps> = () => {
  return (
    <div className={styles.app}>
      <ApiContext.Provider
        value={{
          ingredientsApi,
          orderApi,
          userApi,
        }}
      >
        <Provider store={store}>
          <ModalProvider>
            <Router>
              <Header />
              <div className={styles.content}>
                <Switch>
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
                  <Route path='/profile'>
                    <ProfilePage />
                  </Route>
                  <Route path='/' exact>
                    <Main />
                  </Route>
                </Switch>
              </div>
            </Router>
          </ModalProvider>
        </Provider>
      </ApiContext.Provider>
    </div>
  );
};

export default App;
