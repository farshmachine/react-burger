import ContructorItem from './contructor-item';
import cn from 'classnames';
import styles from './contructor-item.module.scss';
import { IngredientType } from '../../types/ingredients';
import { FC } from 'react';

type ConstructorItemBunProps = {
  item: IngredientType;
  type: 'first' | 'second';
};

export const ConstructorItemBun: FC<ConstructorItemBunProps> = ({
  item,
  type,
}) => {
  const bunType = type === 'first' ? '(верх)' : '(низ)';
  const bun = { ...item, name: `${item.name} ${bunType}` };

  return (
    <ContructorItem
      item={bun}
      className={cn(styles.item, styles[`item-${type}`])}
      locked
    />
  );
};
