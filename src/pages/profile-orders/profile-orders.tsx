import { useEffect } from 'react';
import { Orders } from '../../components/orders/orders';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { resetOrderState } from '../../services/order/order';
import { connect, disconnect } from '../../services/ws/ws';
import { getCookie } from '../../utils/get-cookie';
import styles from './profile-orders.module.scss';

export const userFeedUrl = `wss://norma.nomoreparties.space/orders?token=${getCookie('accessToken')?.split(' ')[1]}`;

export const ProfileOrdersPage = () => {
  const { opened } = useAppSelector(state => state.ws);
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(resetOrderState());
    if (!opened) {
      dispatch(connect(userFeedUrl));
    }

    return () => {
      dispatch(disconnect());
    };
  }, []);

  return <Orders itemClassName={styles.order} />;
};
