import { FC } from 'react';
import Digits from '../digits/digits';
import Title from '../title/title';
import styles from './order-detalis.module.scss';
import { ReactComponent as DoneSign } from '../../assets/images/done.svg';
import Modal from '../modal/modal';
import { ModalComponentProps } from '../modal-provider/modal-provider';
import cn from 'classnames';

export type OrderDetailsProps = {
  orderId: number;
};

const OrderDetails: FC<ModalComponentProps<'orderDetails'>> = ({
  isOpened,
  handleClose,
  orderId,
}) => {
  return (
    <Modal isOpened={isOpened} handleClose={handleClose}>
      <div className={styles.wrapper}>
        <Digits type='large' className={styles.digits}>
          {orderId}
        </Digits>
        <Title type='medium' className={cn(styles.text, styles.title)}>
          индентификатор заказа
        </Title>
        <div className={styles['done-sign']}>
          <DoneSign />
        </div>
        <Title className={cn(styles.text, styles.title, 'mb-2')}>
          Ваш заказ начали готовить
        </Title>
        <Title className={cn(styles.text, styles['title-secondary'])}>
          Дождитесь готовности на орбитальной станции
        </Title>
      </div>
    </Modal>
  );
};

export default OrderDetails;
