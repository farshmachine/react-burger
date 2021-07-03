import { useParams } from 'react-router-dom';
import { OrderIngredient } from '../../components/order-ingredient/order-ingredient';
import { OrderTime } from '../../components/order-time/order-time';
import Price from '../../components/price/price';
import Title from '../../components/title/title';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Ingredient } from '../../types/ingredients';
import styles from './feed-item.module.scss';

export const FeedItemPage = () => {
  const { id } = useParams<{ id: string; }>();
  const { orders } = useAppSelector(state => state.order);
  const { ingredients: ings } = useAppSelector(state => state.ingredients);
  const item = orders!.find((el) => el._id === id)!;
  const price = item.ingredients.reduce((sum, item) => {
    return sum += ings!.find(i => i._id === item)!.price;
  }, 0);
  const ingredients = item.ingredients.map(i => ings!.find(ing => ing._id === i)).reduce(
    (acc, i) => {
      acc[i!.name] = {
        item: i!,
        count: item.ingredients.filter((el) => el === i!._id).length,
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
      <Price className={styles.order} value={`#${item.number}`} currency={false}></Price>
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
        <OrderTime value={item.createdAt} className={styles.time} />
        <Price value={price} />
      </div>
    </div>
  );
};
