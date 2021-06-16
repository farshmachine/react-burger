import { FC } from 'react';
import Price from '../price/price';
import Title from '../title/title';
import styles from './order-status.module.scss';

type OrderStatusProps = {
  title: string;
  orders: string[];
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
      <div>
        {orders.map((el) => (
          <Price key={el} value={el} currency={false} className={className} />
        ))}
      </div>
    </div>
  );
};
