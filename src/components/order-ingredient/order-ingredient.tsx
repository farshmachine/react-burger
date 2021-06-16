import { FC } from 'react';
import { Ingredient } from '../../types/ingredients';
import Price from '../price/price';
import Title from '../title/title';
import styles from './order-ingredient.module.scss';

type OrderIngredientProps = {
  item: Ingredient;
  count: number;
};

export const OrderIngredient: FC<OrderIngredientProps> = ({ item, count }) => {
  return (
    <div className={styles.wrapper}>
      <img src={item.image} alt={item.name} className={styles.image} />
      <Title className={styles.title}>{item.name}</Title>
      <Price value={`${count} x ${item.price}`} className={styles.price} />
    </div>
  );
};
