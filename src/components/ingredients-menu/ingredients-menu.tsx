import { FC } from 'react';
import { IngredientType } from '../../types/ingredients';
import IngredientList from '../ingredient-list/ingredient-list';
import styles from './ingredients-menu.module.scss';
import cn from 'classnames';

type IngredientsMenuProps = {
  tabs: {
    label: string;
    key: IngredientType;
  }[];
};

const IngredientsMenu: FC<IngredientsMenuProps> = ({ tabs }) => {
  return (
    <div className={cn(styles.wrapper, 'scrollspy')}>
      {tabs.map(({ label, key }) => {
        return <IngredientList title={label} key={label} tab={key} />;
      })}
    </div>
  );
};

export default IngredientsMenu;
