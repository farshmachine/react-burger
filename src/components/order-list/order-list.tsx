import { Orders } from '../orders/orders';
import Title from '../title/title';
import styles from './order-list.module.scss';

export const OrderList = () => {
  return (
    <section className={styles.wrapper}>
      <Title type='large'>Лента заказов</Title>
      <Orders />
    </section>
  );
};
