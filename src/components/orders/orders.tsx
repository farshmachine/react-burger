import { FC } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import OrderItem from '../order-item/order-item';
import styles from './order.module.scss';

type OrdersProps = {
  itemClassName?: string;
};

export const Orders: FC<OrdersProps> = ({ itemClassName = '' }) => {
  const { orders } = useAppSelector(state => state.order);

  return (
    orders ? <div className={styles.container}>
      {orders.map((item) => (
        <OrderItem className={itemClassName} key={item.number} {...item} />
      ))}
    </div> : null
  );
};
