import { FC, useCallback, useEffect } from 'react';
import { useModal } from '../../hooks/useModal';
import ContructorItem from '../contructor-item/contructor-item';
import Price from '../price/price';
import styles from './burger-constructor.module.scss';
import { ConstructorItemBun } from '../contructor-item/constructor-item-bun';
import cn from 'classnames';
import { Ingredient } from '../../types/ingredients';
import { useDrop } from 'react-dnd';
import {
  addIngredient,
  reorderIngredients,
} from '../../services/constuctor/constructor';
import { useAppSelector } from '../../hooks/useAppSelector';
import update from 'immutability-helper';
import { createOrder } from '../../services/order/order';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useUser } from '../../hooks/useUser';
import { useHistory } from 'react-router-dom';
import { v4 } from 'uuid';
import { Button } from '../button/button';

type BurgerConstructorProps = {};

const BurgerConstructor: FC<BurgerConstructorProps> = () => {
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const history = useHistory();
  const { openModal } = useModal();
  const { main, bun, totalPrice } = useAppSelector(
    (state) => state.counstructor
  );
  const { loading } = useAppSelector(state => state.order.orderRequest);
  const { id } = useAppSelector((state) => state.order);

  useEffect(() => {
    if (id) {
      openModal('orderDetails', { orderId: id.toString() });
    }
  }, [id, openModal]);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: Ingredient) {
      dispatch(addIngredient({ ...item, id: v4() }));
    },
  });

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = main[dragIndex];
      dispatch(
        reorderIngredients(
          update(main, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          })
        )
      );
    },
    [main, dispatch]
  );

  const handleButtonClick = useCallback(() => {
    if (!user) {
      history.push({ pathname: '/login' });
    } else {
      if (bun) {
        const items = [...main];
        items.push(bun, bun);
        dispatch(
          createOrder({
            ingredients: items.map((item) => item._id),
          })
        );
      }
    }
  }, [bun, main, dispatch, user, history]);

  return (
    <div
      className={styles.container}
      ref={dropTarget}
      data-test-id='dropTarget'
    >
      {bun && <ConstructorItemBun item={bun} type='first' />}
      <ul className={`${styles.wrapper}`}>
        {main.map((item, i) => (
          <ContructorItem
            item={item}
            key={item.id}
            moveCard={moveCard}
            index={i}
          />
        ))}
      </ul>
      {bun && <ConstructorItemBun item={bun} type='second' />}
      <div className={styles.basket}>
        <Price
          value={totalPrice}
          iconClassName={styles.icon}
          titleClassName={styles.price}
        />
        <div className={cn(styles.button)}>
          <Button kind='primary' onClick={handleButtonClick} disabled={loading}>
            ???????????????? ??????????
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BurgerConstructor;
