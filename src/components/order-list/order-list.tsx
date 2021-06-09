import { getOrderList } from '../../utils/mock';
import { Orders } from '../orders/orders';
import Title from '../title/title';
import styles from './order-list.module.scss';

export const OrderList = () => {
  const data = getOrderList();
  return (
    <section className={styles.wrapper}>
      <Title type='large'>Лента заказов</Title>
      <Orders data={data} />
    </section>
  );
};
