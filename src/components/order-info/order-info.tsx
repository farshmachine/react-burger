import { OrderCount } from '../order-count/order-count';
import { OrderStatus } from '../order-status/order-status';
import styles from './order-info.module.scss';
import cn from 'classnames';
import { useAppSelector } from '../../hooks/useAppSelector';

export const OrderInfo = () => {
  const { orders, total, totalToday } = useAppSelector(state => state.order);
  return (
    orders ?
      <div className={styles.wrapper}>
        <div className={styles.status}>
          <OrderStatus
            title='Готовы:'
            orders={orders?.filter(o => o.status === 'done')!}
            className={cn(styles.ready, styles.number)}
          />
          <OrderStatus
            title='В работе:'
            orders={orders?.filter(o => o.status === 'pending')!}
            className={cn(styles.number)}
          />
        </div>
        <OrderCount
          className={styles.shadow}
          title='Выполнено за все время:'
          count={total}
        />
        <OrderCount
          className={styles.shadow}
          title='Выполнено за сегодня:'
          count={totalToday}
        />
      </div> : null
  );
};
