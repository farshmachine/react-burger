import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type websocketState = {
    opened: boolean;
    error: string;
};

export const initialState: websocketState = {
    opened: false,
    error: '',
};


const wsSlice = createSlice({
    name: 'ws',
    initialState,
    reducers: {
        setOpened(state, { payload }: PayloadAction<boolean>) {
            state.opened = payload;
        },
        setError(state, { payload }: PayloadAction<string>) {
            state.error = payload;
        },
        connect(_state, _payload: PayloadAction<string>) {
            console.log('connecting');
        },
        disconnect(state) {
            state.opened = false;
        }
    },
});

export const { setOpened, setError, connect, disconnect } = wsSlice.actions;

export default wsSlice.reducer;
