import { ReactNode, useCallback, useState, createContext } from 'react';
import IngredientDetails, {
  IngredientDetailsProps,
} from '../ingredient-details/ingredient-details';
import OrderDetails, {
  OrderDetailsProps,
} from '../order-details/order-details';

type ModalType = 'orderDetails' | 'ingredientDetails';

type ModalPropsMap = {
  orderDetails: OrderDetailsProps;
  ingredientDetails: IngredientDetailsProps;
};

type ModalProps<T extends ModalType> = ModalPropsMap[T];

type ModalProviderState<T extends ModalType | null> = {
  type: T;
  isOpened: boolean;
  modalProps: T extends ModalType ? ModalProps<T> : null;
};

type BaseModalProps = {
  handleClose: () => void;
  isOpened: boolean;
};

type ModalOpener = <T extends ModalType>(
  type: T,
  modalProps: ModalProps<T>
) => void;

export type ModalComponentProps<T extends ModalType> = ModalProps<T> &
  BaseModalProps;

export const ModalContext = createContext<{
  openModal: ModalOpener;
  closeModal: () => void;
}>({
  openModal: () => {},
  closeModal: () => {},
});

const modalsMap: { [K in ModalType]: React.FC<any> } = {
  orderDetails: OrderDetails,
  ingredientDetails: IngredientDetails,
};

const initialState = {
  type: null,
  isOpened: false,
  modalProps: null,
};

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [{ type, isOpened, modalProps }, setState] = useState<
    ModalProviderState<ModalType | null>
  >(initialState);
  const Component = type ? modalsMap[type] : null;

  const openModal: ModalOpener = useCallback(
    (type, modalProps) => {
      setState({
        type,
        isOpened: true,
        modalProps,
      });
    },
    [setState]
  );

  const closeModal = useCallback(() => {
    setState(initialState);
  }, [setState]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isOpened && Component && (
        <Component
          isOpened={isOpened}
          handleClose={closeModal}
          {...modalProps}
        />
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
