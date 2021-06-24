import ingredientsReducer, {
  setCurrentIngredient,
  setLoading,
  setIngredients,
  setRequestFailed,
  setRequestSuccess,
  initialState,
  resetIngredients,
} from './ingredients';
import { store } from '../store';

describe('ingredients reducer slice', () => {
  const ingredient = {
    _id: '1',
    name: 'ingredient',
    type: 'bun',
    proteins: 2,
    fat: 3,
    carbohydrates: 4,
    calories: 5,
    price: 6,
    image: 'img',
    image_mobile: 'img mobile',
    image_large: 'img large',
    __v: 8,
    uuid: '2',
  };

  beforeEach(() => store.dispatch(resetIngredients()));

  it('should return inital value', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState);
  });

  it('should set current ingredient and request status info', () => {
    let {
      ingredients,
      currentIngredient,
      ingredientsRequest: { success, loading },
    } = store.getState().ingredients;
    expect(loading).toBeFalsy();
    expect(success).toBeFalsy();
    expect(currentIngredient).toBe(undefined);
    expect(ingredients).toStrictEqual(undefined);

    store.dispatch(setLoading(true));
    store.dispatch(setCurrentIngredient(ingredient));
    store.dispatch(setRequestSuccess(true));
    store.dispatch(setIngredients([ingredient, ingredient]));

    ({
      ingredients,
      currentIngredient,
      ingredientsRequest: { success, loading },
    } = store.getState().ingredients);

    expect(loading).toBeTruthy();
    expect(success).toBeTruthy();
    expect(currentIngredient).toBe(ingredient);
    expect(ingredients).toStrictEqual([ingredient, ingredient]);
  });

  it('should set failed request status and error message', () => {
    let {
      ingredientsRequest: { failed, error },
    } = store.getState().ingredients;

    expect(failed).toBeFalsy();
    expect(error).toBe('');

    store.dispatch(setRequestFailed('error'));

    ({
      ingredientsRequest: { failed, error },
    } = store.getState().ingredients);

    expect(failed).toBeTruthy();
    expect(error).toBe('error');
  });

  it('should reset state to initial value', () => {
    expect(store.getState().ingredients).toBe(initialState);

    store.dispatch(setLoading(true));
    let {
      ingredientsRequest: { loading },
    } = store.getState().ingredients;

    expect(loading).toBeTruthy();

    store.dispatch(resetIngredients());

    expect(store.getState().ingredients).toBe(initialState);
  });
});
