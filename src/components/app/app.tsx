import { FC } from 'react';
import { Header } from '../header/header';
import Main from '../main/main';
import styles from './app.module.scss';
import { ApiContext } from '../../contexts/api-context';
import { api } from '../../api/api';
import { Provider } from 'react-redux';
import { store } from '../../services/store';

type AppProps = {};

let App: FC<AppProps> = () => {
  return (
    <div className={styles.app}>
      <ApiContext.Provider value={api}>
        <Provider store={store}>
          <Header />
          <Main />
        </Provider>
      </ApiContext.Provider>
    </div>
  );
};

export default App;
