import orderReducer, {
  setOrder,
  setLoading,
  setRequestFailed,
  setRequestSuccess,
  resetOrderState,
  initialState,
} from './order';
import { store } from '../store';

describe('order reducer slice', () => {
  beforeEach(() => store.dispatch(resetOrderState()));

  it('should return inital value', () => {
    expect(orderReducer(undefined, {})).toEqual(initialState);
  });

  it('should set order and request status info', () => {
    let {
      name,
      id,
      orderRequest: { success, loading },
    } = store.getState().order;

    expect(loading).toBeFalsy();
    expect(name).toBe('');
    expect(id).toBe(undefined);

    store.dispatch(setLoading(true));
    store.dispatch(setOrder({ id: 1, name: 'order' }));
    store.dispatch(setRequestSuccess(true));

    ({
      name,
      id,
      orderRequest: { success, loading },
    } = store.getState().order);

    expect(loading).toBeTruthy();
    expect(success).toBeTruthy();
    expect(name).toBe('order');
    expect(id).toBe(1);
  });

  it('should set failed request status and error message', () => {
    let {
      orderRequest: { failed, error },
    } = store.getState().order;

    expect(failed).toBeFalsy();
    expect(error).toBe('');

    store.dispatch(setRequestFailed('error'));

    ({
      orderRequest: { failed, error },
    } = store.getState().order);

    expect(failed).toBeTruthy();
    expect(error).toBe('error');
  });
});
