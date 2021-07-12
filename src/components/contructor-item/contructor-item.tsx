import {
  DragIcon,
  LockIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, memo, useCallback, useRef } from 'react';
import { Ingredient } from '../../types/ingredients';
import Price from '../price/price';
import Title from '../title/title';
import styles from './contructor-item.module.scss';
import cn from 'classnames';
import { DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { removeIngredient } from '../../services/constuctor/constructor';
import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch } from '../../hooks/useAppDispatch';

type ContructorItemProps = {
  item: Ingredient & { id: string };
  className?: string;
  locked?: boolean;
  moveCard?: (dragIndex: number, hoverIndex: number) => void;
  index: number;
};

const ContructorItem: FC<ContructorItemProps> = memo(
  ({ item, className, locked, index, moveCard }) => {
    const { image, name, price, type, id } = item;
    const isBun = type === 'bun';
    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    const handleDeleteClick = useCallback(() => {
      dispatch(removeIngredient(item));
    }, [dispatch, item]);

    const [{ isDragging }, drag] = useDrag({
      type: 'main',
      item: () => {
        return { ...item, id, index };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [{ handlerId }, drop] = useDrop({
      accept: 'main',
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        };
      },
      hover(item: Ingredient & { index: number }, monitor) {
        if (item.type !== 'bun') {
          if (!ref.current) {
            return;
          }
          const dragIndex = item.index;
          const hoverIndex = index;
          if (dragIndex === hoverIndex) {
            return;
          }
          const hoverBoundingRect = ref.current!.getBoundingClientRect();
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          const clientOffset = monitor.getClientOffset();
          const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
          }
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
          }
          if (moveCard) {
            moveCard(dragIndex, hoverIndex);
          }

          item.index = hoverIndex;
        }
      },
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    return (
      <div
        className={cn(styles.wrapper, 'mb-2', className)}
        ref={ref}
        style={{ opacity }}
        data-handler-id={handlerId}
      >
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
              <DeleteIcon type='secondary' onClick={handleDeleteClick} />
            )}
          </span>
        </div>
      </div>
    );
  }
);

export default ContructorItem;
