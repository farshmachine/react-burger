import { FC, useEffect, useState } from 'react';
import { Header } from '../header/header';
import Main from '../main/main';
import styles from './app.module.scss';
import { IngrediendsListType } from '../../types/ingredients';
import { ApiContext } from '../../contexts/api-context';
import { IngrediendsContext } from '../../contexts/ingredients-context';
import LoadingIndicator from '../loading-indicator/loading-indicator';
import { api } from '../../api/api';
import ErrorIndicator from '../error-indicator/error-indicator';

type AppProps = {};

let App: FC<AppProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IngrediendsListType | null>(null);
  const [{ hasError, msg }, setError] = useState<{
    hasError: boolean;
    msg: string;
  }>({ hasError: false, msg: '' });

  useEffect(() => {
    setLoading(true);
    api.getIngredients().then(({ data, success, error }) => {
      setLoading(false);
      if (success && data) {
        setData(data);
      }

      if (error) {
        setError({
          hasError: true,
          msg: error.message,
        });
      }
    });
  }, []);

  if (loading) return <LoadingIndicator />;
  if (hasError) return <ErrorIndicator error={msg} />;

  return data ? (
    <div className={styles.app}>
      <IngrediendsContext.Provider value={data}>
        <ApiContext.Provider value={api}>
          <Header />
          <Main />
        </ApiContext.Provider>
      </IngrediendsContext.Provider>
    </div>
  ) : null;
};

export default App;
