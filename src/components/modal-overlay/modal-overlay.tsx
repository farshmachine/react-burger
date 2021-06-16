import { ReactNode, SyntheticEvent, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../hooks/useModal';
import { clearConstructor } from '../../services/constuctor/constructor';
import styles from './modal-overlay.module.scss';

const ModalOverlay = ({ children }: { children: ReactNode }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(clearConstructor());
        closeModal();
      }
    };

    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [closeModal, dispatch]);

  const handleOverlayCloseClick = useCallback(
    (e: SyntheticEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        closeModal();
        dispatch(clearConstructor());
      }
    },
    [closeModal, dispatch]
  );

  return (
    <div className={styles.wrapper} onClick={handleOverlayCloseClick}>
      {children}
    </div>
  );
};

export default ModalOverlay;
