import {
  DragIcon,
  LockIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { Ingredient } from '../../types/ingredients';
import Price from '../price/price';
import Title from '../title/title';
import styles from './contructor-item.module.scss';
import cn from 'classnames';

type ContructorItemProps = {
  item: Ingredient;
};

const ContructorItem: FC<ContructorItemProps> = ({ item }) => {
  const { image, name, price } = item;
  return (
    <div className={cn(styles.wrapper, 'mb-2')}>
      <span className={styles.icon}>
        <DragIcon type='primary' />
      </span>
      <div className={cn(styles.item, 'ml-1')}>
        <img src={image} alt={name} className={cn(styles.image, 'ml-4')} />
        <Title className={cn(styles.title, 'ml-2')}>{name}</Title>
        <Price value={price} className={'ml-2'} />
        <span className={styles.delete}>
          <LockIcon type='primary' />
        </span>
      </div>
    </div>
  );
};

export default ContructorItem;
