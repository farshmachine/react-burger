import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useCallback } from 'react';
import { useModal } from '../../hooks/useModal';
import { Ingredient } from '../../types/ingredients';
import Price from '../price/price';
import Title from '../title/title';
import cn from 'classnames';
import styles from './ingredient-card.module.scss';

type IngredientCardProps = {
  item: Ingredient;
};

const IngredientCard: FC<IngredientCardProps> = ({ item }) => {
  const { openModal } = useModal();
  const { _id, name, price, image } = item;

  const handleClick = useCallback(() => {
    openModal('ingredientDetails', { item });
  }, [item, openModal]);

  return (
    <li key={_id} className={styles.card} onClick={handleClick}>
      <img src={image} alt={name} className={cn(styles.image, 'mb-1')} />
      <Price value={price} className='mb-1' />
      <Title className={styles.title}>{name}</Title>
      <div className={styles.counter}>
        <Counter count={1} size='default' />
      </div>
    </li>
  );
};

export default IngredientCard;
