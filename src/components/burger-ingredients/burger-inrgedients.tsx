import { FC, useContext, useMemo } from 'react';
import { useIngredientDataValidation } from '../../hooks/useIngredientDataValidation';
import { IngrediendsDataContext } from '../app/app';
import IngredientsMenu from '../ingredients-menu/ingredients-menu';
import Tabs from '../tabs/tabs';
import styles from './burger-inrgedients.module.scss';

type BurgerIngredientsProps = {
  title: JSX.Element;
};

const BurgerIngredients: FC<BurgerIngredientsProps> = ({ title }) => {
  const { data } = useContext(IngrediendsDataContext);
  const status = useIngredientDataValidation(data);
  const isValidData = status?.type === 'SUCCESS';

  if (!isValidData) {
    throw Error('Ошибка в модели полученных данных');
  }

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

  return isValidData && data ? (
    <section className={styles.wrapper}>
      {title}
      <Tabs items={tabs} />
      <IngredientsMenu items={data} tabs={tabs} />
    </section>
  ) : null;
};

export default BurgerIngredients;
