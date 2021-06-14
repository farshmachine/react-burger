import { useParams } from 'react-router-dom';
import { OrderIngredient } from '../../components/order-ingredient/order-ingredient';
import { OrderTime } from '../../components/order-time/order-time';
import Price from '../../components/price/price';
import Title from '../../components/title/title';
import { Ingredient } from '../../types/ingredients';
import { getOrderList } from '../../utils/mock';
import styles from './feed-item.module.scss';

export const FeedItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const item = getOrderList().find((el) => el.id === id)!;
  const ingredients = item?.ingredients.reduce(
    (acc, i) => {
      acc[i.name] = {
        item: i,
        count: item.ingredients.filter((el) => el._id === i._id).length,
      };
      return acc;
    },
    {} as {
      [k: string]: {
        item: Ingredient;
        count: number;
      };
    }
  );

  return (
    <div className={styles.wrapper}>
      <Price className={styles.order} value={`#${id}`} currency={false}></Price>
      <Title type='medium' className={styles.name}>
        {item.name}
      </Title>
      <Title className={styles.status}>Выполнен</Title>
      <Title type='medium' className={styles.title}>
        Состав:
      </Title>
      <div className={styles.ingredients}>
        <div>
          {Object.keys(ingredients).map((el) => (
            <OrderIngredient {...ingredients[el]} key={el} />
          ))}
        </div>
      </div>
      <div className={styles.info}>
        <OrderTime value={item.orderTime} className={styles.time} />
        <Price value={item.price} />
      </div>
    </div>
  );
};
