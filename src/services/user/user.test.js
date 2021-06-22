import { store } from '../store';
import userReducer, {
  initialState,
  setLoading,
  setRequestFailed,
  setRequestSuccess,
  setUser,
  resetState,
  setTokenInfo,
  setResetPwdRequestedStatus,
} from './user';

describe('user reducer slice', () => {
  beforeEach(() => store.dispatch(resetState()));

  it('should return inital value', () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it('should set state loading/success values properly', () => {
    let loadingState = store.getState().user.userRequest.loading;
    expect(loadingState).toBeFalsy();

    store.dispatch(setLoading(true));

    loadingState = store.getState().user.userRequest.loading;
    expect(loadingState).toBeTruthy();

    store.dispatch(setLoading(false));
    store.dispatch(setRequestSuccess(true));

    loadingState = store.getState().user.userRequest.loading;
    const successState = store.getState().user.userRequest.success;

    expect(loadingState).toBeFalsy();
    expect(successState).toBeTruthy();
  });

  it('should reset state to initial value and set failed request status', () => {
    let failState = store.getState().user.userRequest.failed;
    let errorMsg = store.getState().user.userRequest.error;
    expect(failState).toBeFalsy();
    expect(errorMsg).toBe('');

    store.dispatch(setRequestFailed('error'));

    failState = store.getState().user.userRequest.failed;
    errorMsg = store.getState().user.userRequest.error;

    expect(failState).toBeTruthy();
    expect(errorMsg).toBe('error');

    store.dispatch(resetState());

    expect(store.getState().user).toBe(initialState);
  });

  it('should set user, token and reset password status info', () => {
    const time = Date.now();
    let {
      email,
      name,
      tokenUpdateDate,
      isTokenUpdated,
      passwordResetRequested,
    } = store.getState().user;

    expect(email).toBe('');
    expect(name).toBe('');
    expect(tokenUpdateDate).toBe(undefined);
    expect(isTokenUpdated).toBeFalsy();
    expect(passwordResetRequested).toBeFalsy();

    store.dispatch(setUser({ name: 'Vasya', email: 'vasya@ya.ru' }));
    store.dispatch(setTokenInfo(time));
    store.dispatch(setResetPwdRequestedStatus(true));

    ({ email, name, tokenUpdateDate, isTokenUpdated, passwordResetRequested } =
      store.getState().user);

    expect(email).toBe('vasya@ya.ru');
    expect(name).toBe('Vasya');
    expect(tokenUpdateDate).toBe(time);
    expect(isTokenUpdated).toBeTruthy();
    expect(passwordResetRequested).toBeTruthy();
  });
});
