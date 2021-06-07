import { useEffect, useMemo } from 'react';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-inrgedients';
import Title from '../title/title';
import styles from './main.module.scss';
import cn from 'classnames';
import { getIngredients } from '../../services/ingredients/ingredients';
import { useAppSelector } from '../../hooks/useAppSelector';
import ErrorIndicator from '../error-indicator/error-indicator';
import LoadingIndicator from '../loading-indicator/loading-indicator';
import { useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Main = () => {
  const {
    ingredientsRequest: { loading, error },
    ingredients,
  } = useAppSelector((state) => state.ingredients);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

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
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients title={title} />
            <BurgerConstructor />
          </DndProvider>
        </div>
      )}
    </main>
  );
};

export default Main;
