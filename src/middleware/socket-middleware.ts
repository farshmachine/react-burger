import { PayloadAction } from '@reduxjs/toolkit';
import { Action, Dispatch, Middleware } from 'redux';
import { setOrders } from '../services/order/order';
import { setError, setOpened } from '../services/ws/ws';

export const wsMiddleware: Middleware = (store) => {
  let socket: WebSocket | null = null;

  return (next: Dispatch<Action<any>>) =>
    (action: PayloadAction<any, string>) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === 'ws/connect') {
        socket = new WebSocket(payload);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch(setOpened(true));
        };

        socket.onerror = (event) => {
          dispatch(setError(event.type));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          dispatch(setOrders(JSON.parse(data)));
        };

        socket.onclose = (event) => {
          dispatch(setOpened(false));
        };

        if (type === 'ws/send') {
          const message = payload;

          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
};
