import React, { FC } from 'react';
import { Header } from '../header/header';
import Main from '../main/main';
import styles from './app.module.scss';
import withData, { WithDataProps } from '../hocs/with-data';
import { IngrediendsListType, IngredientType } from '../../types/ingredients';
import { orderApi } from '../../api/orderApi';

type AppProps = WithDataProps<IngrediendsListType> & {};
type ApiContextType = {
  createOrder: (i: IngredientType[]) => Promise<Response>;
};

export const IngrediendsDataContext = React.createContext<
  WithDataProps<IngrediendsListType>
>({
  data: [],
  loading: false,
  error: undefined,
});

export const ApiContext = React.createContext<ApiContextType>(
  {} as ApiContextType
);

let App: FC<AppProps> = ({ data, loading, error }) => {
  return data ? (
    <div className={styles.app}>
      <IngrediendsDataContext.Provider value={{ data, loading, error }}>
        <ApiContext.Provider value={orderApi}>
          <Header />
          <Main />
        </ApiContext.Provider>
      </IngrediendsDataContext.Provider>
    </div>
  ) : null;
};

export default withData<AppProps>(
  'https://norma.nomoreparties.space/api/ingredients'
)(App);
