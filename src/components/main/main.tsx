import { useContext, useMemo } from 'react';
import BurgerConstructor from '../burger-contructor/burger-contructor';
import BurgerIngredients from '../burger-ingredients/burger-inrgedients';
import Title from '../title/title';
import styles from './main.module.scss';
import cn from 'classnames';
import { IngrediendsDataContext } from '../app/app';
import LoadingIndicator from '../loading-indicator/loading-indicator';
import ErrorIndicator from '../error-indicator/error-indicator';

const Main = () => {
  const { loading, error } = useContext(IngrediendsDataContext);
  const title = useMemo(
    () => (
      <Title type='large' className={cn('mb-3 mt-3', styles.title)}>
        Соберите бургер
      </Title>
    ),
    []
  );

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        {loading && <LoadingIndicator />}
        {error && <ErrorIndicator />}
        <BurgerIngredients title={title} />
        <BurgerConstructor />
      </div>
    </main>
  );
};

export default Main;
