import { FC } from 'react';
import { IngredientList } from '../../types/ingredients';
import OrderItem from '../order-item/order-item';
import styles from './order.module.scss';

type OrdersProps = {
  data: {
    id: string;
    orderTime: number;
    name: string;
    ingredients: IngredientList;
    price: number;
  }[];
  itemClassName?: string;
};

export const Orders: FC<OrdersProps> = ({ data, itemClassName = '' }) => {
  return (
    <div className={styles.container}>
      {data.map((item) => (
        <OrderItem className={itemClassName} key={item.id} {...item} />
      ))}
    </div>
  );
};
