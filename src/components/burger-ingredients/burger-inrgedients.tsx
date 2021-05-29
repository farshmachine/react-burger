import { FC, useMemo } from 'react';
import IngredientsMenu from '../ingredients-menu/ingredients-menu';
import Tabs, { TabItem } from '../tabs/tabs';
import styles from './burger-inrgedients.module.scss';

type BurgerIngredientsProps = {
  title: JSX.Element;
};

const BurgerIngredients: FC<BurgerIngredientsProps> = ({ title }) => {
  const tabs: TabItem[] = useMemo(
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
      <IngredientsMenu tabs={tabs} />
    </section>
  );
};

export default BurgerIngredients;
