import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ApiContext, IngrediendsDataContext } from '../app/app';
import { useModal } from '../../hooks/useModal';
import ContructorItem from '../contructor-item/contructor-item';
import Price from '../price/price';
import styles from './burger-constructor.module.scss';
import { useIngredientDataValidation } from '../../hooks/useIngredientDataValidation';
import { ConstructorItemBun } from '../contructor-item/constructor-item-bun';
import { IngredientType } from '../../types/ingredients';

type BurgerConstructorProps = {};

const BurgerConstructor: FC<BurgerConstructorProps> = () => {
  const orderApi = useContext(ApiContext);
  const { data } = useContext(IngrediendsDataContext);
  const { openModal } = useModal();
  const status = useIngredientDataValidation(data);
  const [bun] = useState(data?.find((b) => b.type === 'bun'));
  const [ingredients] = useState(data?.filter((b) => b.type !== 'bun'));
  const order = useMemo(() => [...ingredients!, bun, bun], [bun, ingredients]);
  const totalPrice = order.reduce((acc, e) => acc + (e ? e?.price : 0), 0);

  const isValidData = status?.type === 'SUCCESS';

  useEffect(() => {
    if (!isValidData) {
      console.error('Wrong response data model');
    }
  }, [isValidData]);

  const handleButtonClick = useCallback(async () => {
    if (order.length > 0) {
      orderApi
        .createOrder(order as IngredientType[])
        .then((res) => {
          if (!res.ok) {
            console.error('Что-то пошло не так');
          }

          return res.json();
        })
        .then(({ order: { number } }) => {
          openModal('orderDetails', { orderId: number });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [openModal, orderApi, order]);

  return isValidData && ingredients ? (
    <div className={styles.container}>
      {bun && <ConstructorItemBun item={bun} type='first' />}
      <ul className={`${styles.wrapper}`}>
        {ingredients.map((item) => (
          <ContructorItem item={item} key={item._id} />
        ))}
      </ul>
      {bun && <ConstructorItemBun item={bun} type='second' />}
      <div className={styles.basket}>
        <Price
          value={totalPrice}
          iconClassName={styles.icon}
          titleClassName={styles.price}
        />
        <div className={styles.button}>
          <Button type='primary' size='large' onClick={handleButtonClick}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default BurgerConstructor;
