import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useCallback, useContext } from 'react';
import { useModal } from '../../hooks/useModal';
import ContructorItem from '../contructor-item/contructor-item';
import Price from '../price/price';
import styles from './burger-constructor.module.scss';
import { IngrediendsListType, IngredientType } from '../../types/ingredients';
import { ApiContext } from '../../contexts/api-context';
import { ConstructorItemBun } from '../contructor-item/constructor-item-bun';

type BurgerConstructorProps = {
  items: IngrediendsListType;
  bun: IngredientType | undefined;
};

const BurgerConstructor: FC<BurgerConstructorProps> = ({ items, bun }) => {
  const orderApi = useContext(ApiContext);
  const { openModal } = useModal();
  const ingredients = items.filter((e) => e.type !== 'bun');
  const bunPrice = bun ? bun.price * 2 : 0;
  const totalCost =
    ingredients.reduce((acc, cur) => (acc += cur.price), 0) + bunPrice;

  const handleButtonClick = useCallback(async () => {
    if (items.length > 0 || bun) {
      orderApi
        .createOrder([...items, bun!])
        .then(({ success, order: { number } }) => {
          if (success) {
            openModal('orderDetails', { orderId: number });
          }
        });
    }
  }, [openModal, orderApi, bun, items]);

  return (
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
          value={totalCost ? totalCost : 0}
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
  );
};

export default BurgerConstructor;
