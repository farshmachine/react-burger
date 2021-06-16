import { FC } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { IngredientList } from '../../types/ingredients';
import { OrderTime } from '../order-time/order-time';
import Price from '../price/price';
import Title from '../title/title';
import styles from './order-item.module.scss';
import cn from 'classnames';

type OrderItemProps = {
  id: string;
  orderTime: number;
  name: string;
  ingredients: IngredientList;
  price: number;
  className: string;
};

const OrderItem: FC<OrderItemProps> = ({
  id,
  orderTime,
  name,
  ingredients,
  price,
  className,
}) => {
  const { url } = useRouteMatch();
  const images = ingredients.map((el, index) => (
    <img
      src={el.image}
      alt={el.name}
      key={el.uuid}
      style={{
        zIndex: -index,
      }}
    />
  ));
  return (
    <Link to={`${url}/${id}`} className={styles.link}>
      <div className={cn(styles.wrapper, className)}>
        <div className={styles.title}>
          <Title>{`#${id}`}</Title>
          <OrderTime value={orderTime} className={styles.time} />
        </div>
        <Title className={styles.name}>{name}</Title>
        <div className={styles.footer}>
          <div className={styles.images}>{images}</div>
          <Price value={price} />
        </div>
      </div>
    </Link>
  );
};

export default OrderItem;
