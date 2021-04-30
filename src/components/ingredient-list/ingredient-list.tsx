import { FC } from 'react';
import IngredientCard from '../ingredient-card/ingredient-card';
import { Ingredient } from '../ingredients-menu/ingredients-menu';
import Title from '../title/title';
import styles from './ingredient-list.module.scss';

type IngredientListProps = {
  items: Ingredient[];
  title: string;
};

const IngredientList: FC<IngredientListProps> = ({ items, title }) => {
  return (
    <ul className={`${styles.wrapper}`}>
      <Title type='medium' className='mb-4'>
        {title}
      </Title>
      <div className={`${styles.container} pl-2 pr-2 pb-1`}>
        {items.map((el) => (
          <IngredientCard item={el} key={el._id} />
        ))}
      </div>
    </ul>
  );
};

export default IngredientList;
