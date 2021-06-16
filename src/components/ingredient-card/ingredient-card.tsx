import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useCallback } from 'react';
import { useModal } from '../../hooks/useModal';
import { Ingredient } from '../../types/ingredients';
import Price from '../price/price';
import Title from '../title/title';
import cn from 'classnames';
import styles from './ingredient-card.module.scss';
import { useDispatch } from 'react-redux';
import { setCurrentIngredient } from '../../services/ingredients/ingredients';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useDrag } from 'react-dnd';

type IngredientCardProps = {
  item: Ingredient;
};

const IngredientCard: FC<IngredientCardProps> = ({ item }) => {
  const { _id, name, price, image } = item;
  const { openModal } = useModal();
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item,
  });
  // TODO Добавить селектор, чтобы не фильтровать для каждого ингридиента
  const count = useAppSelector((state) => {
    if (state.counstructor.bun?._id === item._id) {
      return 2;
    }
    return state.counstructor.main.filter((el) => el._id === item._id).length;
  });

  const handleIngredientClick = useCallback(() => {
    dispatch(setCurrentIngredient(item));
    openModal('ingredientDetails', { item });
  }, [item, openModal, dispatch]);

  return (
    <li
      ref={dragRef}
      key={_id}
      className={styles.card}
      onClick={handleIngredientClick}
      draggable
    >
      <img src={image} alt={name} className={cn(styles.image, 'mb-1')} />
      <Price value={price} className='mb-1' />
      <Title className={styles.title}>{name}</Title>
      <div className={styles.counter}>
        <Counter count={count} size='default' />
      </div>
    </li>
  );
};

export default IngredientCard;
