import { PayloadAction } from '@reduxjs/toolkit';
import { Action, Dispatch, Middleware } from 'redux';

export const wsMiddleware =
  (wsUrl: string): Middleware =>
  (store) => {
    let socket: WebSocket | null = null;

    return (next: Dispatch<Action<any>>) =>
      (action: PayloadAction<any, string>) => {
        const { dispatch } = store;
        const { type, payload } = action;

        if (type === 'ws/connect') {
          socket = new WebSocket(wsUrl);
        }

        if (socket) {
          socket.onopen = (event) => {
            console.log(event);
            dispatch({ type: 'ws/opened', payload: event });
          };

          socket.onerror = (event) => {
            console.log(event);

            dispatch({ type: 'ws/error', payload: event });
          };

          socket.onmessage = (event) => {
            console.log(event);

            const { data } = event;
            dispatch({ type: 'ws/message', payload: data });
          };

          socket.onclose = (event) => {
            console.log(event);

            dispatch({ type: 'ws/closed', payload: event });
          };

          if (type === 'ws/send') {
            const message = payload;

            socket.send(JSON.stringify(message));
          }
        }

        next(action);
      };
  };
