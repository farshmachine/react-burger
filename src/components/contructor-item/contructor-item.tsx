import {
  DragIcon,
  LockIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useCallback, useContext } from 'react';
import { IngredientType } from '../../types/ingredients';
import Price from '../price/price';
import Title from '../title/title';
import styles from './contructor-item.module.scss';
import cn from 'classnames';
import { DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { ConstructorContext } from '../../contexts/constructor-context';

type ContructorItemProps = {
  item: IngredientType;
  className?: string;
  locked?: boolean;
};

const ContructorItem: FC<ContructorItemProps> = ({
  item,
  className,
  locked,
}) => {
  const addItem = useContext(ConstructorContext);

  const { image, name, price } = item;
  const isBun = item.type === 'bun';

  const handleDeleteItem = useCallback(() => {
    addItem!((prevState) => {
      const newState = prevState.other.filter((e) => e._id !== item._id);
      return {
        ...prevState,
        other: newState,
      };
    });
  }, [addItem, item._id]);
  return (
    <div className={cn(styles.wrapper, 'mb-2', className)}>
      <span className={styles.icon}>
        {!isBun && <DragIcon type='primary' />}
      </span>
      <div className={cn(styles.item, 'ml-1')}>
        <img src={image} alt={name} className={cn(styles.image, 'ml-4')} />
        <Title className={cn(styles.title, 'ml-2')}>{name}</Title>
        <Price value={price} className={'ml-2'} />
        <span className={styles.delete}>
          {locked ? (
            <LockIcon type='primary' />
          ) : (
            <DeleteIcon type='secondary' onClick={handleDeleteItem} />
          )}
        </span>
      </div>
    </div>
  );
};

export default ContructorItem;
