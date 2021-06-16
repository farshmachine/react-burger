import { useEffect, useMemo } from 'react';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-inrgedients';
import Title from '../../components/title/title';
import styles from './main.module.scss';
import cn from 'classnames';
import { getIngredients } from '../../services/ingredients/ingredients';
import { useAppSelector } from '../../hooks/useAppSelector';
import ErrorIndicator from '../../components/error-indicator/error-indicator';
import LoadingIndicator from '../../components/loading-indicator/loading-indicator';
import { useDispatch } from 'react-redux';

const Main = () => {
  const {
    ingredientsRequest: { loading, error },
    ingredients,
  } = useAppSelector((state) => state.ingredients);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!ingredients) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredients]);

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
      {loading && <LoadingIndicator />}
      {error && <ErrorIndicator error={error} />}
      {ingredients && (
        <div className={styles.container}>
          <BurgerIngredients title={title} />
          <BurgerConstructor />
        </div>
      )}
    </main>
  );
};

export default Main;
