import { FC } from 'react';
import { Ingredient } from '../../types/ingredients';
import IngredientCard from '../ingredient-card/ingredient-card';
import Title from '../title/title';
import styles from './ingredient-list.module.scss';
import cn from 'classnames';

type IngredientListProps = {
  items: Ingredient[];
  title: string;
};

const IngredientList: FC<IngredientListProps> = ({ items, title }) => {
  return (
    <ul className={styles.wrapper}>
      <Title type='medium' className='mb-4'>
        {title}
      </Title>
      <div className={cn(styles.container, 'pl-2 pr-2 pb-1')}>
        {items.map((el) => (
          <IngredientCard item={el} key={el._id} />
        ))}
      </div>
    </ul>
  );
};

export default IngredientList;
