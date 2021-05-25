import { useMemo, useState } from 'react';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-inrgedients';
import Title from '../title/title';
import styles from './main.module.scss';
import cn from 'classnames';
import { IngrediendsListType, IngredientType } from '../../types/ingredients';
import { ConstructorContext } from '../../contexts/constructor-context';

const Main = () => {
  const [items, setItems] = useState<{
    bun: IngredientType | undefined;
    other: IngrediendsListType;
  }>({
    bun: undefined,
    other: [],
  });

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
        <ConstructorContext.Provider value={setItems}>
          <BurgerIngredients title={title} />
          <BurgerConstructor items={items.other} bun={items.bun} />
        </ConstructorContext.Provider>
      </div>
    </main>
  );
};

export default Main;
