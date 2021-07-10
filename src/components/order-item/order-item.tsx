import { FC } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { OrderTime } from '../order-time/order-time';
import Price from '../price/price';
import Title from '../title/title';
import styles from './order-item.module.scss';
import cn from 'classnames';
import { useAppSelector } from '../../hooks/useAppSelector';
import { translateStatus } from '../../utils/translate-status';

type OrderItemProps = {
  _id: string;
  createdAt: string;
  number: number;
  ingredients: string[];
  className: string;
  name: string;
  status: string;
};

const OrderItem: FC<OrderItemProps> = ({
  _id,
  name,
  number,
  createdAt,
  ingredients,
  status,
  className,
}) => {
  const { ingredients: items } = useAppSelector(state => state.ingredients);
  const { url } = useRouteMatch();
  const location = useLocation();
  const isProfileFeed = location.pathname.includes('profile');
  const images = ingredients.map(i => items?.find(item => item._id === i)).map((el, index) => (
    <img
      src={el!.image}
      alt={el!.name}
      key={index}
      style={{
        zIndex: -index,
      }}
    />
  ));
  const price = ingredients.reduce((sum, item) => {
    return sum += items!.find(i => i._id === item)!.price;
  }, 0);

  return (
    <Link
      to={{
        pathname: `${url}/${_id}`,
        state: { background: location },
      }}
      className={styles.link}
    >
      <div className={cn(styles.wrapper, className)}>
        <div className={styles.title}>
          <Title>{`#${number}`}</Title>
          <OrderTime value={createdAt} className={styles.time} />
        </div>
        <Title className={styles.name}>{name}</Title>
        {isProfileFeed && <Title className={styles.name} type='small'>{translateStatus(status)}</Title>}
        <div className={styles.footer}>
          <div className={styles.images}>{images}</div>
          <Price value={price} />
        </div>
      </div>
    </Link>
  );
};

export default OrderItem;
