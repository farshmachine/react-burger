import { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.scss';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalPortalNode = document.getElementById('modal-portal')!;

type ModalProps = {
  children: ReactNode;
  isOpened: boolean;
  handleClose(): void;
};

const Modal: FC<ModalProps> = ({ children, isOpened, handleClose }) => {
  return isOpened
    ? ReactDOM.createPortal(
        <ModalOverlay>
          <div className={styles.wrapper}>
            <div className={styles.closeIcon} onClick={handleClose}>
              <CloseIcon type='primary' />
            </div>
            {children}
          </div>
        </ModalOverlay>,
        modalPortalNode
      )
    : null;
};

export default Modal;
