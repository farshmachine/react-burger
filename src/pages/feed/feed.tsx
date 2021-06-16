import { OrderInfo } from '../../components/order-info/order-info';
import { OrderList } from '../../components/order-list/order-list';
import styles from './feed.module.scss';

export const FeedPage = () => {
  return (
    <div className={styles.container}>
      <OrderList />
      <OrderInfo />
    </div>
  );
};
