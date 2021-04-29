import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { Ingredient } from '../ingredients-menu/ingredients-menu';
import Price from '../price/price';
import Title from '../title/title';

import styles from './ingredient-card.module.scss';

type IngredientCardProps = {
  item: Ingredient;
};

const IngredientCard: FC<IngredientCardProps> = ({ item }) => {
  const { _id, name, price, image } = item;
  return (
    <li key={_id} className={styles.card}>
      <img src={image} alt={name} className={`${styles.image} mb-1`} />
      <Price type='default' value={price} className='mb-1' />
      <Title type='default' className={styles.title}>
        {name}
      </Title>
      <div className={styles.counter}>
        <Counter count={1} size='default' />
      </div>
    </li>
  );
};

export default IngredientCard;
