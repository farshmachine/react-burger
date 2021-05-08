import {
  DragIcon,
  LockIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { IngredientType } from '../../types/ingredients';
import Price from '../price/price';
import Title from '../title/title';
import styles from './contructor-item.module.scss';
import cn from 'classnames';
import { DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';

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
  const { image, name, price } = item;
  return (
    <div className={cn(styles.wrapper, 'mb-2', className)}>
      <span className={styles.icon}>
        <DragIcon type='primary' />
      </span>
      <div className={cn(styles.item, 'ml-1')}>
        <img src={image} alt={name} className={cn(styles.image, 'ml-4')} />
        <Title className={cn(styles.title, 'ml-2')}>{name}</Title>
        <Price value={price} className={'ml-2'} />
        <span className={styles.delete}>
          {locked ? (
            <LockIcon type='primary' />
          ) : (
            <DeleteIcon type='secondary' />
          )}
        </span>
      </div>
    </div>
  );
};

export default ContructorItem;
