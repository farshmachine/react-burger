import { OrderCount } from '../order-count/order-count';
import { OrderStatus } from '../order-status/order-status';
import styles from './order-info.module.scss';
import cn from 'classnames';

export const OrderInfo = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.status}>
        <OrderStatus
          title='Готовы:'
          orders={['034533', '034534', '034535', '034536', '034537']}
          className={cn(styles.ready, styles.number)}
        />
        <OrderStatus
          title='В работе:'
          orders={['034533', '034534', '034535', '034536', '034537']}
          className={cn(styles.number)}
        />
      </div>
      <OrderCount
        className={styles.shadow}
        title='Выполнено за все время:'
        count={20534}
      />
      <OrderCount
        className={styles.shadow}
        title='Выполнено за сегодня:'
        count={1500}
      />
    </div>
  );
};
