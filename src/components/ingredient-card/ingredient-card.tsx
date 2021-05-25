import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useCallback, useContext } from 'react';
import { useModal } from '../../hooks/useModal';
import { IngredientType } from '../../types/ingredients';
import Price from '../price/price';
import Title from '../title/title';
import cn from 'classnames';
import styles from './ingredient-card.module.scss';
import { ConstructorContext } from '../../contexts/constructor-context';

type IngredientCardProps = {
  item: IngredientType;
};

const IngredientCard: FC<IngredientCardProps> = ({ item }) => {
  const addItem = useContext(ConstructorContext);

  const { openModal } = useModal();
  const { _id, name, price, image } = item;

  const handleAddItem = useCallback(
    (item: IngredientType) => {
      if (item.type === 'bun') {
        addItem!((prevState) => ({
          ...prevState,
          bun: item,
        }));
      } else {
        addItem!((prevState) => ({
          bun: prevState.bun,
          other: [...prevState.other, item],
        }));
      }
    },
    [addItem]
  );

  const handleClick = useCallback(() => {
    handleAddItem(item);
    openModal('ingredientDetails', { item });
  }, [item, openModal, handleAddItem]);

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
