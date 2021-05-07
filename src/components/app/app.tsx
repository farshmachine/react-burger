import React, { FC } from 'react';
import { Header } from '../header/header';
import Main from '../main/main';
import styles from './app.module.scss';
import withData, { WithDataProps } from '../hocs/with-data';
import { IngrediendsData } from '../../types/ingredients';

type AppProps = WithDataProps<IngrediendsData> & {};

export const IngrediendsDataContext = React.createContext<
  WithDataProps<IngrediendsData>
>({
  data: undefined,
  loading: false,
  error: undefined,
});

let App: FC<AppProps> = ({ data, loading, error }) => {
  return data ? (
    <IngrediendsDataContext.Provider value={{ data, loading, error }}>
      <div className={styles.app}>
        <Header />
        <Main />
      </div>
    </IngrediendsDataContext.Provider>
  ) : null;
};

export default withData<AppProps>(
  'https://norma.nomoreparties.space/api/ingredients'
)(App);
