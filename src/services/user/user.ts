import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../../api/user';
import {
  LoginUserData,
  LoginUserResponse,
  RegisterUserData,
  RegisterUserResponse,
} from '../../types/user';
import { resetTokens } from '../../utils/reset-tokens';
import { setCookie } from '../../utils/set-cookie';
import { AppDispatch, AppThunk } from '../store';

type UserSliceState = {
  email: string;
  name: string;
  isTokenUpdated: boolean;
  tokenUpdateDate: number | undefined;
  passwordResetRequested: boolean;
  userRequest: {
    loading: boolean;
    failed: boolean;
    success: boolean;
    error: string;
  };
};

export const initialState: UserSliceState = {
  email: '',
  name: '',
  isTokenUpdated: false,
  tokenUpdateDate: undefined,
  passwordResetRequested: false,
  userRequest: {
    loading: false,
    failed: false,
    success: false,
    error: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.userRequest.loading = payload;
    },
    setRequestFailed(state, { payload }: PayloadAction<string>) {
      state.userRequest.failed = true;
      state.userRequest.error = payload;
    },
    setRequestSuccess(state, { payload }: PayloadAction<boolean>) {
      state.userRequest.success = payload;
    },
    setUser(
      state,
      { payload }: PayloadAction<{ name: string; email: string; }>
    ) {
      // TODO Any other methods to set multiple values?
      state.name = payload.name;
      state.email = payload.email;
    },
    setTokenInfo(state, { payload }: PayloadAction<number>) {
      state.isTokenUpdated = true;
      state.tokenUpdateDate = payload;
    },
    resetState() {
      return initialState;
    },
    setResetPwdRequestedStatus(state, { payload }: PayloadAction<boolean>) {
      state.passwordResetRequested = payload;
    },
  },
});

const handleAuthResponse = (
  {
    success,
    user,
    accessToken,
    refreshToken,
    message,
  }: RegisterUserResponse | LoginUserResponse,
  dispatch: AppDispatch
) => {
  dispatch(setLoading(false));
  if (success) {
    if (refreshToken && accessToken) {
      localStorage.setItem('refreshToken', refreshToken);
      setCookie('accessToken', accessToken);
    }
    dispatch(setTokenInfo(Date.now()));
    dispatch(setUser(user));
  }

  if (message) {
    dispatch(setRequestFailed(message));
  }
};

const handleAuthError = (err: any, dispatch: AppDispatch) => {
  dispatch(setLoading(false));
  dispatch(setRequestFailed(err.message));
  return { success: false, message: err };
};

export const register =
  (data: RegisterUserData): AppThunk =>
    async (dispatch) => {
      dispatch(setLoading(true));
      userApi
        .register(data)
        .then((data) => {
          handleAuthResponse(data, dispatch);
        })
        .catch((err) => handleAuthError(err, dispatch));
    };

export const login =
  (data: LoginUserData): AppThunk =>
    async (dispatch) => {
      dispatch(setLoading(true));
      userApi
        .login(data)
        .then((data) => {
          handleAuthResponse(data, dispatch);
        })
        .catch((err) => handleAuthError(err, dispatch));
    };

export const logout = () => async (dispatch: AppDispatch) => {
  dispatch(resetState());
  dispatch(setLoading(true));
  const token = localStorage.getItem('refreshToken')!;

  return userApi
    .logout({ token })
    .then(({ success }) => {
      dispatch(setLoading(false));

      if (success) {
        resetTokens();
      }
    })
    .catch((err) => handleAuthError(err, dispatch));
};

export const updateInfo =
  (data: Partial<RegisterUserData>) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    return userApi
      .update(data)
      .then(({ success, user, message }) => {
        dispatch(setLoading(false));

        if (success) {
          dispatch(setUser(user));
        }
      })
      .catch((err) => handleAuthError(err, dispatch));
  };

export const getUser = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  return userApi
    .user()
    .then((data) => {
      handleAuthResponse(data, dispatch);
    })
    .catch((err) => handleAuthError(err, dispatch));
};

export const refreshToken = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  const token = localStorage.getItem('refreshToken')!;

  return userApi
    .token({ token })
    .then(({ refreshToken, accessToken, success, message }) => {
      dispatch(setLoading(false));
      if (success) {
        localStorage.setItem('refreshToken', refreshToken);
        setCookie('accessToken', accessToken);
        dispatch(setTokenInfo(Date.now()));
      }

      return { success, message };
    })
    .catch((err) => handleAuthError(err, dispatch));
};

export const passwordResetRequest =
  (data: { email: string; }) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));

    return userApi
      .forgotPassword(data)
      .then(({ success, message }) => {
        if (success) {
          dispatch(setResetPwdRequestedStatus(true));
          return success;
        } else {
          handleAuthError(message, dispatch);
          return Promise.reject(message);
        }
      })
      .catch((err) => handleAuthError(err, dispatch));
  };

export const passwordReset =
  (data: { password: string; token: string; }) =>
    async (dispatch: AppDispatch) => {
      dispatch(setLoading(true));

      return userApi
        .resetPassword(data)
        .then(({ success, message }) => {
          if (success) {
            return success;
          } else {
            handleAuthError(message, dispatch);
            return Promise.reject(message);
          }
        })
        .catch((err) => handleAuthError(err, dispatch));
    };

export const {
  setLoading,
  setRequestFailed,
  setRequestSuccess,
  setUser,
  resetState,
  setTokenInfo,
  setResetPwdRequestedStatus,
} = userSlice.actions;

export default userSlice.reducer;
