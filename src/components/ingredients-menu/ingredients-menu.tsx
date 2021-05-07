import { FC } from 'react';
import { Ingredient } from '../../types/ingredients';
import IngredientList from '../ingredient-list/ingredient-list';
import styles from './ingredients-menu.module.scss';

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
        <IngredientList items={ingredients[key]} title={label} key={label} />
      ))}
    </div>
  );
};

export default IngredientsMenu;
