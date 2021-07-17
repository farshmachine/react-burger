import { useEffect } from 'react';
import LoadingIndicator from '../../components/loading-indicator/loading-indicator';
import { OrderInfo } from '../../components/order-info/order-info';
import { OrderList } from '../../components/order-list/order-list';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { connect, disconnect } from '../../services/ws/ws';
import styles from './feed.module.scss';

export const feedUrl = 'wss://norma.nomoreparties.space/orders/all';

export const FeedPage = () => {
  const { opened } = useAppSelector(state => state.ws);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(connect(feedUrl));

    return () => {
      dispatch(disconnect());
    };
  }, []);

  return (
    <div>
      {!opened && <LoadingIndicator />}
      {opened && <div className={styles.container}>
        <OrderList />
        <OrderInfo />
      </div>}
    </div>
  );
};
