import { FC } from 'react';
import { mockData } from '../../utils/data';
import IngredientList from '../ingredient-list/ingredient-list';
import styles from './ingredients-menu.module.scss';

export type Ingredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

type IngredientsMenuProps = {
  items: Ingredient[];
  tabs: {
    label: string;
    key: string;
  }[];
};

const IngredientsMenu: FC<IngredientsMenuProps> = ({ items, tabs }) => {
  const ingredients: {
    [k: string]: Ingredient[];
  } = {
    bun: [],
    main: [],
    sauce: [],
  };

  items.forEach((e) => ingredients[e.type].push(e));

  return (
    <div className={styles.wrapper}>
      {tabs.map(({ label, key }) => (
        <IngredientList items={ingredients[key]} title={label} />
      ))}
    </div>
  );
};

export default IngredientsMenu;
