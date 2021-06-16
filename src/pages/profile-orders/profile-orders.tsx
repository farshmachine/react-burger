import { Orders } from '../../components/orders/orders';
import { getOrderList } from '../../utils/mock';
import styles from './profile-orders.module.scss';

export const ProfileOrdersPage = () => {
  const data = getOrderList();

  return <Orders data={data} itemClassName={styles.order} />;
};
