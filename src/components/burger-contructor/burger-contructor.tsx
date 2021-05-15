import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useCallback, useContext } from 'react';
import { IngrediendsDataContext } from '../app/app';
import { useModal } from '../../hooks/useModal';
import ContructorItem from '../contructor-item/contructor-item';
import Price from '../price/price';
import styles from './burger-contructor.module.scss';
import { useIngredientDataValidation } from '../../hooks/useIngredientDataValidation';
import cn from 'classnames';

type BurgerConstructorProps = {};

const BurgerConstructor: FC<BurgerConstructorProps> = () => {
  const { data } = useContext(IngrediendsDataContext);
  const { openModal } = useModal();
  const status = useIngredientDataValidation(data);
  const isValidData = status?.type === 'SUCCESS';
  const first = data?.shift();
  const last = data?.pop();

  if (!isValidData) {
    throw Error('Ошибка в модели полученных данных');
  }

  const handleButtonClick = useCallback(() => {
    openModal('orderDetails', {});
  }, [openModal]);

  return isValidData && data ? (
    <div className={styles.container}>
      {first && (
        <ContructorItem
          item={first}
          className={cn(styles.item, styles['item-first'])}
          locked
        />
      )}
      <ul className={`${styles.wrapper}`}>
        {data.map((item) => (
          <ContructorItem item={item} key={item._id} />
        ))}
      </ul>
      {last && <ContructorItem item={last} className={styles.item} locked />}
      <div className={styles.basket}>
        <Price
          value={610}
          iconClassName={styles.icon}
          titleClassName={styles.price}
        />
        <div className={styles.button}>
          <Button type='primary' size='large' onClick={handleButtonClick}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default BurgerConstructor;
