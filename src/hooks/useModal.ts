import { useContext } from 'react';
import { ModalContext } from '../components/modal-provider/modal-provider';

export const useModal = () => {
  const { openModal, closeModal } = useContext(ModalContext);
  return { openModal, closeModal };
};
