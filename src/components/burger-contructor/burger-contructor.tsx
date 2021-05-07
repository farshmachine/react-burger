import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useCallback, useContext } from 'react';
import { IngrediendsDataContext } from '../app/app';
import { useModal } from '../../hooks/useModal';
import ContructorItem from '../contructor-item/contructor-item';
import Price from '../price/price';
import styles from './burger-contructor.module.scss';

type BurgerConstructorProps = {};

const BurgerConstructor: FC<BurgerConstructorProps> = () => {
  const { data } = useContext(IngrediendsDataContext);
  const { openModal } = useModal();

  const handleButtonClick = useCallback(() => {
    openModal('orderDetails', {});
  }, [openModal]);

  return data ? (
    <div className={styles.container}>
      <ul className={`${styles.wrapper}`}>
        {data.map((item) => (
          <ContructorItem item={item} key={item._id} />
        ))}
      </ul>
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
