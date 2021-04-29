import { FC, useMemo } from 'react';
import IngredientsMenu, {
  Ingredient,
} from '../ingredients-menu/ingredients-menu';
import Tabs from '../tabs/tabs';
import styles from './burger-inrgedients.module.scss';

type BurgerIngredientsProps = {
  data: Ingredient[];
  title: JSX.Element;
};

const BurgerIngredients: FC<BurgerIngredientsProps> = ({ data, title }) => {
  const tabs = useMemo(
    () => [
      {
        label: 'Булки',
        key: 'bun',
      },
      {
        label: 'Начинки',
        key: 'main',
      },
      {
        label: 'Соусы',
        key: 'sauce',
      },
    ],
    []
  );

  return (
    <section className={styles.wrapper}>
      {title}
      <Tabs items={tabs} />
      <IngredientsMenu items={data} tabs={tabs} />
    </section>
  );
};

export default BurgerIngredients;
