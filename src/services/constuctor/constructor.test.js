import constructorReducer, {
  addIngredient,
  removeIngredient,
  reorderIngredients,
  clearConstructor,
  initialState,
} from './constructor';
import { store } from '../store';

describe('constructor reducer slice', () => {
  const bunIngredient = {
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
    id: '1',
  };
  const mainIngredient = {
    _id: '2',
    name: 'ingredient',
    type: 'main',
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
    id: '2',
  };

  beforeEach(() => store.dispatch(clearConstructor()));

  it('should return inital value', () => {
    expect(constructorReducer(undefined, {})).toEqual(initialState);
  });

  it('should add ingredient and calculate price', () => {
    let { bun, main, totalPrice } = store.getState().counstructor;
    expect(bun).toBe(undefined);
    expect(main).toStrictEqual([]);
    expect(totalPrice).toBe(0);

    store.dispatch(addIngredient(bunIngredient));
    store.dispatch(addIngredient(mainIngredient));

    ({ bun, main, totalPrice } = store.getState().counstructor);
    expect(bun).toStrictEqual(bunIngredient);
    expect(main).toStrictEqual([mainIngredient]);
    expect(totalPrice).toBe(18);
  });

  it('should remove ingredient', () => {
    let { main, totalPrice } = store.getState().counstructor;
    expect(main).toStrictEqual([]);
    expect(totalPrice).toBe(0);

    store.dispatch(addIngredient(mainIngredient));
    store.dispatch(addIngredient({ ...mainIngredient, id: '3' }));
    store.dispatch(removeIngredient(mainIngredient));

    ({ main, totalPrice } = store.getState().counstructor);

    expect(main).toStrictEqual([{ ...mainIngredient, id: '3' }]);
    expect(totalPrice).toBe(6);
  });

  it('should re-order ingredients', () => {
    let ingredients = store.getState().counstructor.main;
    expect(ingredients).toStrictEqual([]);

    store.dispatch(addIngredient(mainIngredient));
    store.dispatch(addIngredient({ ...mainIngredient, id: '3' }));

    ingredients = store.getState().counstructor.main;
    expect(ingredients).toStrictEqual([
      mainIngredient,
      { ...mainIngredient, id: '3' },
    ]);

    store.dispatch(
      reorderIngredients([{ ...mainIngredient, id: '3' }, mainIngredient])
    );

    ingredients = store.getState().counstructor.main;
    expect(ingredients).toStrictEqual([
      { ...mainIngredient, id: '3' },
      mainIngredient,
    ]);
  });

  it('should reset state to initial value', () => {
    let { main, totalPrice } = store.getState().counstructor;
    expect(main).toStrictEqual([]);
    expect(totalPrice).toBe(0);

    store.dispatch(addIngredient(mainIngredient));
    ({ main, totalPrice } = store.getState().counstructor);
    expect(main).toStrictEqual([mainIngredient]);
    expect(totalPrice).toBe(6);

    store.dispatch(clearConstructor());

    expect(store.getState().counstructor).toBe(initialState);
  });
});
