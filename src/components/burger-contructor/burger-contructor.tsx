import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import ContructorItem from '../contructor-item/contructor-item';
import { Ingredient } from '../ingredients-menu/ingredients-menu';
import Price from '../price/price';
import styles from './burger-contructor.module.scss';

type BurgerConstructorProps = {
  data: Ingredient[];
};

const BurgerConstructor: FC<BurgerConstructorProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      <ul className={`${styles.wrapper}`}>
        {data.map((item) => (
          <ContructorItem item={item} />
        ))}
      </ul>
      <div className={styles.basket}>
        <Price
          type='default'
          value={610}
          iconClassName={styles.icon}
          titleClassName={styles.price}
        />
        <div className={styles.button}>
          <Button type='primary' size='large'>
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BurgerConstructor;
