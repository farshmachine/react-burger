import { FC } from 'react';
import Price from '../price/price';
import Title from '../title/title';
import styles from './order-count.module.scss';

type OrderCountProps = {
  title: string;
  count: number;
  className?: string;
};

export const OrderCount: FC<OrderCountProps> = ({
  title,
  count,
  className = '',
}) => {
  return (
    <div className={styles.wrapper}>
      <Title type='medium'>{title}</Title>
      <Price
        type='large'
        value={count.toLocaleString('ru-RU')}
        currency={false}
        className={className}
      />
    </div>
  );
};
