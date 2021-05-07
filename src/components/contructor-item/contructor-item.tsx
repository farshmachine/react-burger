import {
  DragIcon,
  LockIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { Ingredient } from '../ingredients-menu/ingredients-menu';
import Price from '../price/price';
import Title from '../title/title';
import styles from './contructor-item.module.scss';

type ContructorItemProps = {
  item: Ingredient;
};

const ContructorItem: FC<ContructorItemProps> = ({ item }) => {
  const { image, name, price } = item;
  return (
    <div className={`${styles.wrapper} mb-2`}>
      <span className={styles.icon}>
        <DragIcon type='primary' />
      </span>
      <div className={`${styles.item} ml-1`}>
        <img src={image} alt={name} className={`${styles.image} ml-4 `} />
        <Title type='default' className={`${styles.title} ml-2`}>
          {name}
        </Title>
        <Price type='default' value={price} className={'ml-2'} />
        <span className={styles.delete}>
          <LockIcon type='primary' />
        </span>
      </div>
    </div>
  );
};

export default ContructorItem;
