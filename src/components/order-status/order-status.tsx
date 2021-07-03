import { FC } from 'react';
import { Order } from '../../types/order';
import Price from '../price/price';
import Title from '../title/title';
import styles from './order-status.module.scss';

type OrderStatusProps = {
  title: string;
  orders: Order[];
  className?: string;
};

export const OrderStatus: FC<OrderStatusProps> = ({
  title,
  orders,
  className = '',
}) => {
  return (
    <div>
      <Title type='medium' className={styles.title}>
        {title}
      </Title>
      <div className={styles.orders}>
        {orders.map((el) => (
          <Price key={el.number} value={el.number} currency={false} className={className} />
        ))}
      </div>
    </div>
  );
};
